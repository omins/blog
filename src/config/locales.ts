export const SUPPORTED_LOCALES = ["en", "ko"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  ko: "한국어",
};

export const LOCALE_FALLBACK_MESSAGES: Record<Locale, string> = {
  en: "Translation coming soon.",
  ko: "번역이 준비 중입니다.",
};

export const DISPLAY_LOCALE_ORDER: Locale[] = [...SUPPORTED_LOCALES];

export function isLocale(value: string | undefined | null): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value ?? "");
}

export function getLocaleLabel(locale: Locale): string {
  return LOCALE_LABELS[locale] ?? locale;
}
