#!/usr/bin/env tsx
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fg from "fast-glob";
import matter from "gray-matter";
import { format } from "date-fns";

interface CliOptions {
  dryRun: boolean;
  report: boolean;
  verbose: boolean;
}

interface MigrationEntry {
  source: string;
  target: string;
  slug: string;
  locale: Locale;
  assetsCopied: string[];
  descriptionGenerated: boolean;
  warnings: string[];
  error?: string;
  skipped?: boolean;
}

type Locale = "ko" | "en";

type Frontmatter = {
  title?: string;
  description?: string;
  publishedAt?: string | Date;
  date?: string | Date | number;
  category?: string;
  tags?: unknown;
  hero?: string;
  lang?: string;
  language?: string;
  slug?: string;
  translatedFrom?: string;
  draft?: boolean;
};

const ENGLISH_SLUGS = new Set(["git-alias", "to-learn-a-new-language"]);
const SUPPORTED_LOCALES: Locale[] = ["ko", "en"];
const DEFAULT_LOCALE: Locale = "ko";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const workspaceRoot = path.resolve(projectRoot, "..");
const sourcePostsDir = path.resolve(workspaceRoot, "blog-nextjs", "posts");
const sourcePublicDir = path.resolve(workspaceRoot, "blog-nextjs", "public");
const targetContentDir = path.resolve(projectRoot, "src", "content", "blog");
const publicAssetsRoot = path.resolve(projectRoot, "public", "assets", "blog");

function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = {
    dryRun: false,
    report: false,
    verbose: false,
  };

  for (const arg of argv) {
    if (arg === "--dry-run") options.dryRun = true;
    if (arg === "--report") options.report = true;
    if (arg === "--verbose") options.verbose = true;
  }

  return options;
}

function isRemotePath(value: string) {
  return /^(https?:)?\/\//.test(value) || value.startsWith("data:");
}

function toIsoDate(value: unknown): string {
  if (!value) {
    return format(new Date(), "yyyy-MM-dd");
  }

  if (value instanceof Date) {
    return format(value, "yyyy-MM-dd");
  }

  if (typeof value === "number") {
    return format(new Date(value), "yyyy-MM-dd");
  }

  if (typeof value === "string") {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
      return format(parsed, "yyyy-MM-dd");
    }
  }

  throw new Error(`Unable to parse publishedAt value: ${String(value)}`);
}

function normalizeLocale(frontmatter: Frontmatter, slug: string): Locale {
  const langFromFrontmatter = frontmatter.lang ?? frontmatter.language;
  if (langFromFrontmatter && SUPPORTED_LOCALES.includes(langFromFrontmatter as Locale)) {
    return langFromFrontmatter as Locale;
  }

  if (ENGLISH_SLUGS.has(slug)) {
    return "en";
  }

  return DEFAULT_LOCALE;
}

function normalizeTags(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((tag) => String(tag));
  if (typeof value === "string")
    return value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  return [];
}

function stripMarkdown(input: string): string {
  return input
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/[*_~`>#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function generateDescription(
  frontmatter: Frontmatter,
  content: string
): { description: string; generated: boolean } {
  const explicit = frontmatter.description;
  if (explicit && String(explicit).trim().length > 0) {
    return { description: String(explicit).trim(), generated: false };
  }

  const text = stripMarkdown(content);
  const summary = text.slice(0, 180).trim();
  return { description: summary, generated: true };
}

function findLocalAssetPaths(content: string): string[] {
  const paths = new Set<string>();
  const markdownImage = /!\[[^\]]*\]\(([^)]+)\)/g;
  let match: RegExpExecArray | null;
  while ((match = markdownImage.exec(content))) {
    const value = match[1]?.trim();
    if (value && !isRemotePath(value) && !value.startsWith("/")) {
      paths.add(value);
    }
  }

  const htmlImage = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  while ((match = htmlImage.exec(content))) {
    const value = match[1]?.trim();
    if (value && !isRemotePath(value) && !value.startsWith("/")) {
      paths.add(value);
    }
  }

  const componentSrc = /src=\{["']([^"']+)["']\}/gi;
  while ((match = componentSrc.exec(content))) {
    const value = match[1]?.trim();
    if (value && !isRemotePath(value)) {
      paths.add(value);
    }
  }

  return [...paths];
}

function replaceAssetPaths(content: string, replacements: Map<string, string>): string {
  let transformed = content;
  for (const [original, next] of replacements.entries()) {
    transformed = transformed.split(original).join(next);
  }
  return transformed;
}

async function ensureDir(dir: string, dryRun: boolean) {
  if (dryRun) return;
  await fs.mkdir(dir, { recursive: true });
}

async function copyFileSafe(from: string, to: string, dryRun: boolean) {
  if (dryRun) return;
  await ensureDir(path.dirname(to), dryRun);
  await fs.copyFile(from, to);
}

async function removeExistingDir(dir: string, dryRun: boolean) {
  if (dryRun) return;
  if (existsSync(dir)) {
    await fs.rm(dir, { recursive: true, force: true });
  }
}

async function migrate(): Promise<{ summary: MigrationEntry[] }> {
  const options = parseArgs(process.argv.slice(2));

  if (!existsSync(sourcePostsDir)) {
    throw new Error(`Source directory not found: ${sourcePostsDir}`);
  }

  const patterns = ["**/*.md", "**/*.mdx"];
  const files = await fg(patterns, { cwd: sourcePostsDir, absolute: true });

  const summary: MigrationEntry[] = [];

  for (const file of files) {
    const relativePath = path.relative(sourcePostsDir, file);
    const sourceDir = path.dirname(file);
    const rawSlug = path.parse(file).name;
    const entrySummary: MigrationEntry = {
      source: relativePath,
      target: "",
      slug: rawSlug,
      locale: DEFAULT_LOCALE,
      assetsCopied: [],
      descriptionGenerated: false,
      warnings: [],
    };

    try {
      const raw = await fs.readFile(file, "utf-8");
      const parsed = matter(raw);
      const fm = parsed.data as Frontmatter;
      const slug = (fm.slug ?? rawSlug).trim();
      const locale = normalizeLocale(fm, slug);
      entrySummary.locale = locale;
      entrySummary.slug = slug;

      const { description, generated } = generateDescription(fm, parsed.content);
      entrySummary.descriptionGenerated = generated;

      const publishedAt = toIsoDate(fm.publishedAt ?? fm["date"]);
      const tags = normalizeTags(fm.tags);
      const category = (fm.category ?? path.basename(path.dirname(file))).toString();
      const draft = Boolean(fm.draft);
      const translatedFrom = fm.translatedFrom ? String(fm.translatedFrom) : undefined;
      const hero = typeof fm.hero === "string" ? fm.hero : undefined;

      const targetDir = path.resolve(targetContentDir, locale, slug);
      const targetFile = path.resolve(targetDir, "index.mdx");
      entrySummary.target = path.relative(projectRoot, targetFile);

      const assetReplacements = new Map<string, string>();
      const assetPaths = findLocalAssetPaths(parsed.content);
      await ensureDir(publicAssetsRoot, options.dryRun);
      const assetBaseDir = path.resolve(publicAssetsRoot, slug, locale);
      await removeExistingDir(assetBaseDir, options.dryRun);

      for (const assetPath of assetPaths) {
        const cleanedPath = assetPath.replace(/^\.\//, "");
        const isRootRelative = cleanedPath.startsWith("/");
        const normalizedRelative = isRootRelative ? cleanedPath.replace(/^\//, "") : cleanedPath;
        const absoluteSource = isRootRelative
          ? path.resolve(sourcePublicDir, normalizedRelative)
          : path.resolve(sourceDir, cleanedPath);
        if (!existsSync(absoluteSource)) {
          entrySummary.warnings.push(`Missing asset: ${assetPath}`);
          continue;
        }
        const relativeDir = path.dirname(normalizedRelative);
        const assetTargetDir =
          relativeDir === "."
            ? path.resolve(publicAssetsRoot, slug, locale)
            : path.resolve(publicAssetsRoot, slug, locale, relativeDir);
        const assetFileName = path.basename(normalizedRelative);
        const targetAssetPath = path.resolve(assetTargetDir, assetFileName);
        const publicPath = path.posix.join(
          "/assets/blog",
          slug,
          locale,
          normalizedRelative.replace(/\\/g, "/")
        );
        assetReplacements.set(assetPath, publicPath);
        entrySummary.assetsCopied.push(path.relative(projectRoot, targetAssetPath));
        await copyFileSafe(absoluteSource, targetAssetPath, options.dryRun);
      }

      let nextContent = parsed.content;
      if (assetReplacements.size > 0) {
        nextContent = replaceAssetPaths(nextContent, assetReplacements);
      }

      const normalizedFrontmatter: Record<string, unknown> = {
        title: fm.title ?? slug,
        description,
        publishedAt,
        tags,
        category,
        lang: locale,
        slug,
        draft,
      };

      if (translatedFrom) {
        normalizedFrontmatter.translatedFrom = translatedFrom;
      }

      if (hero && !isRemotePath(hero)) {
        const heroCleaned = hero.replace(/^\.\//, "");
        const heroIsRoot = heroCleaned.startsWith("/");
        const heroRelative = heroIsRoot ? heroCleaned.replace(/^\//, "") : heroCleaned;
        const heroSource = heroIsRoot
          ? path.resolve(sourcePublicDir, heroRelative)
          : path.resolve(sourceDir, heroCleaned);
        if (existsSync(heroSource)) {
          const heroDir = path.dirname(heroRelative);
          const heroTargetDir =
            heroDir === "."
              ? path.resolve(publicAssetsRoot, slug, locale)
              : path.resolve(publicAssetsRoot, slug, locale, heroDir);
          const heroFileName = path.basename(heroRelative);
          const targetHeroPath = path.resolve(heroTargetDir, heroFileName);
          await copyFileSafe(heroSource, targetHeroPath, options.dryRun);
          normalizedFrontmatter.hero = path.posix.join(
            "/assets/blog",
            slug,
            locale,
            heroRelative.replace(/\\/g, "/")
          );
          entrySummary.assetsCopied.push(path.relative(projectRoot, targetHeroPath));
        } else {
          entrySummary.warnings.push(`Hero asset missing: ${hero}`);
        }
      } else if (hero) {
        normalizedFrontmatter.hero = hero;
      }

      const needsImageImport =
        /<Image\s/i.test(nextContent) && !/import\s+Image\s+from/.test(nextContent);
      const needsCalloutImport =
        /<Callout\s?/i.test(nextContent) && !/import\s+Callout\s+from/.test(nextContent);

      const importLines: string[] = [];
      if (needsImageImport) {
        importLines.push('import Image from "@/components/mdx/Image.astro";');
      }
      if (needsCalloutImport) {
        importLines.push('import Callout from "@/components/mdx/Callout.astro";');
      }

      let contentWithImports = nextContent.trimStart();
      if (importLines.length > 0) {
        contentWithImports = `${importLines.join("\n")}\n\n${contentWithImports}`;
      }

      const finalContent = matter.stringify(contentWithImports, normalizedFrontmatter);

      await removeExistingDir(targetDir, options.dryRun);
      await ensureDir(targetDir, options.dryRun);
      if (!options.dryRun) {
        await fs.writeFile(targetFile, finalContent, "utf-8");
      }

      if (options.verbose && !options.report) {
        console.log(`✔ Migrated ${relativePath} → ${path.relative(projectRoot, targetFile)}`);
      }

      summary.push(entrySummary);
    } catch (error) {
      const err = error as Error;
      entrySummary.error = err.message;
      summary.push(entrySummary);
      if (!options.report) {
        console.error(`✖ Failed to migrate ${relativePath}: ${err.message}`);
      }
    }
  }

  if (options.report) {
    console.log(JSON.stringify({ summary }, null, 2));
  } else if (!options.verbose) {
    const migrated = summary.filter((entry) => !entry.error).length;
    const failed = summary.filter((entry) => entry.error).length;
    console.log(`Migrated ${migrated} post(s). Failed: ${failed}.`);
    console.log(`Source: ${sourcePostsDir}`);
    console.log(`Target: ${targetContentDir}`);
  }

  const errors = summary.filter((entry) => entry.error);
  if (errors.length > 0) {
    process.exitCode = 1;
  }

  return { summary };
}

migrate().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
