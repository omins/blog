/// <reference types="astro/client" />

type ThemePreference = import("@/lib/theme").ThemePreference;

declare global {
  interface Window {
    __setPreferredTheme?: (theme: ThemePreference) => void;
    __getPreferredTheme?: () => ThemePreference;
  }
}

export {};
