# Blog v2 Implementation Status

## Project Overview

An Astro 5-powered personal site serving localized intro pages and blog posts with full i18n routing support, Playwright e2e testing, and CI/CD automation.

## Completed Objectives

- ✅ Astro 5 site with MDX support and Tailwind theming
- ✅ Content migration from legacy `blog-nextjs` repository completed
- ✅ TypeScript-first tooling with ESLint, Prettier, and Astro check
- ✅ GitHub Actions CI with Playwright e2e tests
- ✅ Hosting-ready for zero-cost platforms (Vercel, Netlify, Cloudflare Pages)

## Functional Requirements

### Content Source (✅ Implemented)

- Canonical blog content lives under `src/content/blog/[lang]/` with locale-aware MDX files
- All posts from `blog-nextjs/posts` have been migrated with associated assets
- Frontmatter schema enforced via `src/content/config.ts` with `title`, `description`, `publishedAt`, `tags`, `category`, optional `hero`
- Locale-aware slug mapping implemented in `src/lib/content/posts.ts`
- 29 Korean posts and 2 English posts currently published
- Assets organized under `public/assets/blog/<slug>/<locale>/`

### Astro Frontend (✅ Implemented)

- Static site generation with Astro 5 content collections
- Routes follow `[lang]/` structure via Astro's native i18n routing
- Middleware (`src/middleware.ts`) handles root redirects based on `Accept-Language` headers
- Post listings, tag pages, and detail views filter by active locale
- Locale switcher (`src/components/LocaleSwitcher.astro`) only shows available translations

### Localization (✅ Implemented)

- Centralized locale configuration in `src/config/locales.ts` and `astro.config.mjs`
- Supported locales: `en`, `ko` (default: `en`)
- Language switcher displays only available translations per post
- Date formatting via `date-fns` with locale-aware utilities in `src/lib/datetime.ts`
- Locale-specific intros in `src/config/introductions.ts`
- Automatic locale filtering in post listings and tag archives
- Middleware redirects root (`/`) to preferred locale based on browser language
- Empty states handled per locale without cross-locale fallbacks
- Manual translation workflow (no auto-generation)

### Styling & Presentation (✅ Implemented)

- Tailwind CSS 3.4.15 with custom theme tokens in `tailwind.config.ts`
- Markdown rendering via `@tailwindcss/typography` with light/dark variants
- Components built with Tailwind utility classes (`BaseLayout.astro`, `PostCard.astro`, etc.)
- Theme toggle (`src/components/ThemeToggle.astro` + `ThemeScript.astro`) with localStorage persistence
- Three theme modes: light, dark, system (persisted per visitor)
- Centralized color tokens: `background`, `surface`, `text`, `accent`, `border` (light/dark variants)
- Typography: `InterVariable` (sans), `Fira Code` (monospace)
- Minimalist design with clean whitespace and subtle hover interactions

### Content Migration to Astro Collections (✅ Completed)

- Astro content collection configured at `src/content/blog/[lang]/` with schema in `src/content/config.ts`
- Migration script (`scripts/migrate-content.ts`) successfully migrated all legacy posts
- Assets migrated to `public/assets/blog/<slug>/<locale>/` with corrected paths
- Migration commands available:
  - `pnpm run content:migrate` - full migration
  - `pnpm run content:report` - generate coverage report
- MDX support via `@astrojs/mdx` with Astro-compatible components (`@/components/mdx/Image.astro`, `Callout.astro`)
- All 31 posts successfully migrated (29 Korean, 2 English)

## Quality & Operational Requirements (✅ Implemented)

- Build pipeline: `pnpm install && pnpm build` (no environment variables required)
- Locale configuration defaults in `src/config/locales.ts` and `astro.config.mjs`
- Deployment-ready for Vercel, Netlify, Cloudflare Pages
- CI/CD via GitHub Actions (`.github/workflows/playwright.yml`)
- Playwright e2e tests validate routing, locale switching, theme persistence
- Documentation:
  - `docs/content-guide.md` - Adding posts and translations
  - `docs/tailwind-theme.md` - Theme customization
  - `docs/ci-guide.md` - CI/CD and testing workflows
  - `AGENTS.md` - Development guidelines for AI agents

## Tooling Requirements (✅ Implemented)

- Package manager: pnpm 10.18.2 (via Corepack, defined in `packageManager` field)
- Node.js: 22 (specified in `.nvmrc`)
- Content utilities: `fast-glob`, `gray-matter`, `date-fns`
- TypeScript-first: All code uses TypeScript with `@` path alias to `src/`
- Build tools:
  - Astro 5.14.1 with MDX, Tailwind, Sitemap integrations
  - ESLint 9.37.0 with TypeScript, Astro, JSX a11y plugins
  - Prettier 3.6.2 with Astro and Tailwind plugins
  - Playwright 1.56.0 for e2e testing
  - Vitest 3.2.4 for unit testing
- Migration script: `scripts/migrate-content.ts` (TypeScript via `tsx`)

### References

- Astro Markdown: https://docs.astro.build/en/guides/markdown-content/
- Design inspiration: Lee Robinson (leerob.com), Lance Martin, Dan Abramov (overreacted.io)

## Current Status

All initial requirements have been completed. The blog is fully functional with:

- 31 posts migrated (29 Korean, 2 English)
- Full i18n routing and locale switching
- Theme toggle (light/dark/system)
- CI/CD with e2e tests
- Production-ready static site generation

### Next Steps (Optional Enhancements)

1. Add more English translations for Korean posts
2. Implement RSS feed
3. Add reading time estimates
4. Implement post search functionality
5. Add Open Graph image generation
