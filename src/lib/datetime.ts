import { DEFAULT_LOCALE, type Locale } from "@/config/locales";

const dateFormats: Record<Locale, Intl.DateTimeFormatOptions> = {
  ko: { year: "numeric", month: "long", day: "numeric" },
  en: { year: "numeric", month: "short", day: "numeric" },
};

export function formatPublishedDate(input: Date | string, locale: Locale = DEFAULT_LOCALE) {
  const date = input instanceof Date ? input : new Date(input);
  const formatter = new Intl.DateTimeFormat(
    locale,
    dateFormats[locale] ?? dateFormats[DEFAULT_LOCALE]
  );
  return formatter.format(date);
}
