import type { APIRoute } from "astro";
import { DEFAULT_LOCALE } from "@/config/locales";
import { getRelativeLocaleUrl } from "astro:i18n";

export const GET: APIRoute = ({ request, redirect }) => {
  const search = new URL(request.url).search;
  return redirect(`${getRelativeLocaleUrl(DEFAULT_LOCALE)}${search}`);
};
