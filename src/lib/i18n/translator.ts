import i18next, { type TFunction } from "i18next";

import en from "@/locales/en.json";
import ko from "@/locales/ko.json";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from "@/config/locales";

type ResourceMap = Record<Locale, { translation: Record<string, unknown> }>;

export const translationDictionaries = {
  en,
  ko,
} as const satisfies Record<Locale, Record<string, unknown>>;

const resources = Object.fromEntries(
  Object.entries(translationDictionaries).map(([locale, translation]) => [locale, { translation }])
) as unknown as ResourceMap;

const translatorCache = new Map<Locale, Promise<TFunction>>();

function resolveLocale(locale: Locale | string | undefined): Locale {
  if (locale && SUPPORTED_LOCALES.includes(locale as Locale)) {
    return locale as Locale;
  }
  return DEFAULT_LOCALE;
}

export async function getTranslator(locale: Locale | string | undefined): Promise<TFunction> {
  const targetLocale = resolveLocale(locale);
  if (!translatorCache.has(targetLocale)) {
    const instance = i18next.createInstance();
    const translatorPromise = instance
      .init({
        lng: targetLocale,
        fallbackLng: DEFAULT_LOCALE,
        resources,
        interpolation: { escapeValue: false },
        initImmediate: false,
      })
      .then(() => instance.getFixedT(targetLocale));
    translatorCache.set(targetLocale, translatorPromise);
  }

  return translatorCache.get(targetLocale)!;
}

export type TranslationKey = Parameters<TFunction>[0];
