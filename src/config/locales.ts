export const SUPPORTED_LOCALES = ["ko", "en"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ko";

export const LOCALE_LABELS: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
};

export const LOCALE_FALLBACK_MESSAGES: Record<Locale, string> = {
  ko: "번역이 준비 중입니다.",
  en: "Translation coming soon.",
};

export const DISPLAY_LOCALE_ORDER: Locale[] = [...SUPPORTED_LOCALES];

export function isLocale(value: string | undefined | null): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value ?? "");
}

export function getLocaleLabel(locale: Locale): string {
  return LOCALE_LABELS[locale] ?? locale;
}
