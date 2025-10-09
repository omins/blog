export const THEME_STORAGE_KEY = "astro-blog-theme";

export const THEME_OPTIONS = ["light", "dark", "system"] as const;

export type ThemePreference = (typeof THEME_OPTIONS)[number];

export const DEFAULT_THEME: ThemePreference = "system";

export const THEME_LABELS: Record<ThemePreference, string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
};

export function isValidTheme(value: unknown): value is ThemePreference {
  return typeof value === "string" && (THEME_OPTIONS as readonly string[]).includes(value);
}
