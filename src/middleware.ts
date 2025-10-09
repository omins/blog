import { defineMiddleware } from "astro:middleware";
import { getRelativeLocaleUrl } from "astro:i18n";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from "./config/locales";

function resolveLocaleFromHeader(header: string | null): Locale | undefined {
  if (!header) {
    return undefined;
  }

  const candidates = header
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  for (const candidate of candidates) {
    const [language] = candidate.split(";");
    if (!language) continue;

    const normalized = language.toLowerCase();
    const exact = SUPPORTED_LOCALES.find((locale) => locale === normalized);
    if (exact) {
      return exact;
    }

    const [root] = normalized.split("-");
    const baseMatch = SUPPORTED_LOCALES.find((locale) => locale === root);
    if (baseMatch) {
      return baseMatch;
    }
  }

  return undefined;
}

export const onRequest = defineMiddleware((context, next) => {
  const { url, request } = context;
  if (request.method.toUpperCase() !== "GET") {
    return next();
  }

  const pathname = url.pathname;
  const [firstSegment] = pathname.replace(/^\/+/, "").split("/");

  if (!firstSegment) {
    const preferred = resolveLocaleFromHeader(request.headers.get("accept-language"));
    const locale = preferred ?? DEFAULT_LOCALE;
    const destination = getRelativeLocaleUrl(locale);
    const target = `${destination}${url.search}`;
    return context.redirect(target);
  }

  return next();
});
