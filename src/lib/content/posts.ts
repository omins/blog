import { getCollection, type CollectionEntry } from "astro:content";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from "@/config/locales";

export type BlogEntry = CollectionEntry<"blog">;

export type NormalizedBlogEntry = {
  entry: BlogEntry;
  locale: Locale;
  slug: string;
  href: string;
};

export type LocaleSlugIndex = Record<string, Partial<Record<Locale, NormalizedBlogEntry>>>;

const COLLECTION_NAME = "blog";

const slugCache = new Map<string, LocaleSlugIndex>();

function normalizeSlug(entry: BlogEntry): string {
  const [, ...rest] = entry.slug.split("/");
  const fallback = rest.length > 0 ? rest.join("/") : entry.slug;
  const slug = entry.data.slug ?? fallback;

  return slug.replace(/^\/+|\/+$/g, "");
}

function toNormalizedEntry(entry: BlogEntry): NormalizedBlogEntry {
  const locale = (entry.data.lang ?? DEFAULT_LOCALE) as Locale;
  const slug = normalizeSlug(entry);

  return {
    entry,
    locale,
    slug,
    href: `/${locale}/posts/${slug}`,
  };
}

export async function loadBlogEntries(): Promise<NormalizedBlogEntry[]> {
  const entries = await getCollection(COLLECTION_NAME);
  const typedEntries = entries.filter(
    (entry: CollectionEntry<typeof COLLECTION_NAME>): entry is BlogEntry => {
      const locale = (entry.data.lang ?? DEFAULT_LOCALE) as Locale;
      return SUPPORTED_LOCALES.includes(locale) && !entry.data.draft;
    }
  ) as BlogEntry[];

  return typedEntries
    .map((entry) => toNormalizedEntry(entry))
    .sort((a: NormalizedBlogEntry, b: NormalizedBlogEntry) => {
      const dateA = a.entry.data.publishedAt.getTime();
      const dateB = b.entry.data.publishedAt.getTime();
      return dateB - dateA;
    });
}

export async function buildSlugIndex(): Promise<LocaleSlugIndex> {
  if (slugCache.has(COLLECTION_NAME)) {
    return slugCache.get(COLLECTION_NAME)!;
  }

  const entries = await loadBlogEntries();
  const index = entries.reduce<LocaleSlugIndex>((acc, normalized) => {
    const bucket = acc[normalized.slug] ?? {};
    bucket[normalized.locale] = normalized;
    acc[normalized.slug] = bucket;
    return acc;
  }, {});

  slugCache.set(COLLECTION_NAME, index);
  return index;
}

export async function getPostByLocaleSlug(
  locale: Locale,
  slug: string
): Promise<NormalizedBlogEntry | undefined> {
  const index = await buildSlugIndex();
  return index[slug]?.[locale];
}

export async function getPostsForLocale(locale: Locale): Promise<NormalizedBlogEntry[]> {
  const entries = await loadBlogEntries();
  return entries.filter((entry) => entry.locale === locale);
}

export async function getAvailableLocalesForSlug(slug: string): Promise<Locale[]> {
  const index = await buildSlugIndex();
  return SUPPORTED_LOCALES.filter((locale: Locale) => Boolean(index[slug]?.[locale]));
}

export function invalidateSlugIndex(): void {
  slugCache.delete(COLLECTION_NAME);
}
