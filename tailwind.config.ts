import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme.js";
import typography from "@tailwindcss/typography";

type ThemeGetter = (path: string) => string;

const config: Config = {
  content: [
    "./src/**/*.{astro,html,mdx,md,js,jsx,ts,tsx}",
    "./node_modules/@astrojs/mdx/dist/**/*.mjs",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          light: "#ffffff",
          dark: "#0f172a",
        },
        surface: {
          light: "#f8fafc",
          dark: "#111827",
        },
        text: {
          light: "#0f172a",
          dark: "#e2e8f0",
        },
        accent: {
          DEFAULT: "#2563eb",
          soft: "#93c5fd",
          strong: "#1d4ed8",
        },
        border: {
          light: "#e2e8f0",
          dark: "#1f2937",
        },
      },
      fontFamily: {
        sans: ["'InterVariable'", ...defaultTheme.fontFamily.sans],
        mono: ["'Fira Code'", ...defaultTheme.fontFamily.mono],
      },
      typography: ({ theme }: { theme: ThemeGetter }) => ({
        DEFAULT: {
          css: {
            color: theme("colors.text.light"),
            a: {
              color: theme("colors.accent.DEFAULT"),
              textDecoration: "none",
              fontWeight: "600",
              "&:hover": {
                color: theme("colors.accent.strong"),
                textDecoration: "underline",
              },
            },
            code: {
              backgroundColor: theme("colors.surface.light"),
              padding: "0.125rem 0.375rem",
              borderRadius: theme("borderRadius.lg"),
              fontWeight: "500",
            },
          },
        },
        invert: {
          css: {
            color: theme("colors.text.dark"),
            a: {
              color: theme("colors.accent.soft"),
              "&:hover": {
                color: theme("colors.accent.DEFAULT"),
              },
            },
            code: {
              backgroundColor: theme("colors.surface.dark"),
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
