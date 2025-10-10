# Astro Blog Migration Plan (Completed)

This document describes the original migration plan for the Astro-powered blog. All phases have been successfully completed. For current project requirements and status, see `requirements/core.md`.

## Migration Status: ✅ Complete

All phases outlined below have been implemented and verified.

## Phase 1 – Project Scaffolding & Tooling ✅

- **Create Astro workspace**
  - Scaffold a new Astro project (TypeScript template) in `astro/` adjacent to `blog-nextjs/`.
  - Add base configuration for zero-config deployments (Vercel/Netlify compatible).
- **Configure package management**
  - Initialize the project with `pnpm` and add lockfile.
  - Install core dependencies: `astro`, `@astrojs/tailwind`, `@astrojs/mdx`, `@astrojs/sitemap`, `fast-glob`, `gray-matter`, `date-fns`, `@tailwindcss/typography`.
- **Set up project scripts**
  - Add `pnpm dev`, `pnpm build`, `pnpm preview`, `pnpm lint`, `pnpm content:migrate`, `pnpm content:report`, and `pnpm test` (for automated checks) scripts to `package.json`.
- **Testing / validation**
  - Run `pnpm install` to verify dependency resolution.
  - Confirm `pnpm dev` starts the Astro dev server with default page, wrapping the command in a timeout (e.g., `timeout 60s pnpm dev`) during automated checks to avoid hanging shells.
  - Ensure TypeScript compilation succeeds (`pnpm astro check` or equivalent).

## Phase 2 – Base Configuration & Styling ✅

- **Astro configuration**
  - Enable MDX and Tailwind integrations in `astro.config.mjs`.
  - Configure `site`, `trailingSlash`, and markdown plugins (remark/rehype).
- **Tailwind setup**
  - Generate `tailwind.config.ts` with shared design tokens, light/dark color palettes, and typography plugin.
  - Create `src/styles/global.css` that imports Tailwind layers and global resets.
- **Design direction**
  - Minimal portfolio site with airy white space, single accent color, clean sans-serif typography, and gentle hover micro-interactions guides layout spacing, typography, and motion polish.
- **Theme & appearance toggle**
  - Implement a theme manager (class-based on `<html>` or CSS variables) that supports light, dark, and system modes with persisted preference (e.g., `localStorage` + hydration-safe script).
- **Testing / validation**
  - Run `pnpm dev` (with explicit timeout when scripted) and manually inspect the base layout to confirm Tailwind styles load.
  - Manually toggle between light, dark, and system modes to confirm the theme switch persists across reloads.
  - Lighthouse (local) performance check on the starter page to confirm no major regressions introduced by theme toggler baseline.

## Phase 3 – Content Collections & Schema ✅

- **Define locales**
  - Create `src/config/locales.ts` exporting strongly typed locale constants (`SUPPORTED_LOCALES` = `['ko', 'en']`, `DEFAULT_LOCALE`), display labels, and helper utilities written in TypeScript.
- **Astro content collection**
  - Configure `src/content/config.ts` with a `blog` collection schema that enforces frontmatter fields (`title`, `description`, `publishedAt`, `tags`, `category`, optional `hero`, `lang`, `slug`, `translatedFrom` references); category source is frontmatter only, independent of folder structure.
  - Set directory structure `src/content/blog/[lang]/slug/index.mdx` without category subfolders.
- **Slug map**
  - Add helper that creates locale-aware slug mapping for cross-linking and canonical URLs; write TypeScript module under `src/lib/content/`.
- **Testing / validation**
  - `pnpm astro check` to ensure schema typing works.
  - Create sample MDX files (one per locale) and verify build succeeds, ensuring collection paths resolve.

## Phase 4 – Layout & Page Structure ✅

- **Global layout**
  - Build base layout component (`src/layouts/BaseLayout.astro`) with header, footer, navigation, locale selector, and theme toggle.
  - Implement localized intro sections referencing configuration data.
- **Route structure**
  - Configure `[lang]/index.astro` for locale-specific home page with list of posts rendered via typed loaders that filter by available locale content.
  - Create `[lang]/posts/[slug].astro` for detail pages that only resolve when localized content exists; otherwise serve a 404 or redirect to the source locale.
  - Add `[lang]/tags/[tag].astro` listing with localization support and TypeScript guards.
  - Ensure no list, intro, or navigation element advertises a locale unless localized content exists; new content should appear automatically when files are added.
- **Markdown rendering**
  - Use MDX components for consistent typography, frontmatter metadata display, hero imagery.
  - Integrate Tailwind Typography for body content styling.
- **Dummy content staging**
  - Author lightweight placeholder intros and posts for each locale inside the Astro content collection to exercise layouts before migrating real entries.
  - Keep slugs/tags representative of expected production data so downstream utilities behave realistically.
- **Testing / validation**
  - `pnpm astro check` and `pnpm build` against the staged dummy content to confirm schemas, layouts, and routes work prior to migration.
  - Manual QA of navigation and pages in both locales using placeholder content.
  - Confirm `/en` routes render only English posts and intro copy when available, without showing Korean fallbacks.
  - Cypress or Playwright smoke tests (optional) validating route responses and presence of key UI elements.

## Phase 5 – Content Migration Pipeline ✅

- **Migration script**
  - Create `scripts/migrate-content.ts` that reads from `../blog-nextjs/posts`.
  - Normalize frontmatter: enforce ISO dates, convert default locale to `ko`, map known English posts.
  - Generate locale directories and copy MDX/markdown into `src/content/blog/<lang>/`.
  - Resolve asset paths and copy referenced files into `public/assets/blog/<slug>/`.
- **Reporting**
  - Emit JSON/Markdown summary with per-post slug, source locale, migrated locale files, asset status, and errors.
  - Add dry-run flag to preview output without touching filesystem.
- **Testing / validation**
  - Run dry-run (`pnpm content:migrate --dry-run`) and diff report.
  - Execute full migration and verify generated files exist.
  - Validate Astro build after migration (`pnpm build`).
  - Spot-check selected posts for accurate frontmatter/body parity.

## Phase 6 – Localization Enhancements ✅

- **Language switcher**
  - Show buttons/links only for locales with translations discovered at runtime; avoid empty placeholders and keep logic in TypeScript utilities.
- **Localized intros**
  - Store intro copy per locale (e.g., TypeScript map or content files) and render only when the locale has data so new translations surface automatically.
- **Date formatting**
  - Implement locale-aware date/number formatting utilities (using `Intl`, `date-fns`, or `formatjs`) keyed off `DEFAULT_LOCALE`.
- **Metadata & SEO**
  - Configure localized `<head>` metadata (Open Graph, Twitter cards) using post data.
- **Testing / validation**
  - Manual QA verifying switcher availability and fallback messaging.
  - Unit tests for date formatter and locale utilities.

## Phase 7 – Documentation & Developer Experience ✅

- **Contributor docs**
  - Write `docs/content-guide.md` explaining how to add new posts, translations, frontmatter rules, and migration flow.
  - Document Tailwind theme tokens and how to adjust them.
  - Collect useful Astro documentation links per requirement.
- **CI readiness**
  - Provide instructions or actual GitHub Actions workflow file running `pnpm install`, `pnpm build`, `pnpm test`.
- **Testing / validation**
  - Peer review documentation for clarity.
  - Ensure local build + tests pass following documentation steps.

## Phase 8 – Final QA & Deployment Prep ✅

- **Quality audits**
  - Run Lighthouse on production build artifacts.
  - Cross-check migrated content with legacy site for slug/title/tag parity.
- **Deployment**
  - Configure `astro.config.mjs` `site` for chosen deployment target (e.g., Vercel).
  - Provide deployment instructions (Vercel CLI or Git integration).
- **Testing / validation**
  - `pnpm build` and `pnpm preview` final run-through.
  - Confirm static assets present in `dist/`.
  - Verify environment variables (`DEFAULT_LOCALE`, `SUPPORTED_LOCALES`) documented and read at runtime.

---

### Testing Matrix Summary

- Automated: TypeScript checks, Astro build, linting, unit tests for utilities, optional end-to-end route smoke tests.
- Manual: Dev server walkthrough in both locales, theme toggle behavior, translation fallbacks, migrated content spot-check, Lighthouse audit.
- Migration: Dry-run report verification, full migration diff, asset integrity checks.
- Dev Server Safety: Wrap `pnpm dev` in timeout-managed scripts to ensure processes terminate automatically when used in CI or local automation.

### Visual & UX References

- Lee Robinson – `https://leerob.com/` (layout, typography) and writing archive `https://leerob.com/writing`.
- Lance Martin – `https://rlancemartin.github.io/` (minimalist blog presentation).
- Dan Abramov – `https://overreacted.io/` (long-form content layout and language toggle inspiration).
