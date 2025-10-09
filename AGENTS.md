# AGENTS.md

This repository hosts the localized Astro blog that powers `omin.blog`. Use this
guide when working on the project with a coding agent so changes stay aligned
with the existing workflows, localization model, and tooling.

## 1. Repository Snapshot

- Astro 5 + MDX site with Tailwind theming, dark/light toggle, and locale-aware routing
- Blog content lives under `src/content/blog/<locale>/<slug>/index.mdx`
- Localized copy and helpers reside in `src/config`, shared UI in `src/components`
- Generated output (`dist/`) and legacy assets should never be edited by hand
- Additional process context is documented in `docs/` and `requirements/`

## 2. Environment & Tooling

- Node `22` (`.nvmrc`) with `pnpm@10.15.1` (enable via `corepack enable`)
- Install dependencies once per checkout: `pnpm install`
- ESLint (`eslint.config.js`) and Prettier (`.prettierrc`) govern formatting
- TypeScript path alias `@` resolves to `src/`; prefer `.ts`/`.astro` sources over plain JS
- Tailwind tokens are defined in `tailwind.config.ts`; global styles live in `src/styles/global.css`

## 3. Development Workflow

| Command                         | Purpose                                                                   |
| ------------------------------- | ------------------------------------------------------------------------- |
| `pnpm dev`                      | Start Astro dev server (wrap with `timeout` in automation to avoid hangs) |
| `pnpm check`                    | Run Astro content + TypeScript checks                                     |
| `pnpm lint` / `pnpm lint --fix` | ESLint validation and autofix                                             |
| `pnpm test`                     | Vitest suite (currently minimal but keep green)                           |
| `pnpm test:e2e`                 | Playwright end-to-end tests (builds first, runs headless)                 |
| `pnpm build`                    | Generate static site in `dist/`                                           |
| `pnpm preview`                  | Preview built site on `127.0.0.1:4321`                                    |
| `pnpm content:migrate`          | Run the markdown migration script (see section 5)                         |
| `pnpm content:report`           | Emit migration summary without writing files                              |

Set `DEFAULT_LOCALE` and `SUPPORTED_LOCALES` when you need non-default values;
otherwise the code falls back to the constants in `src/config/locales.ts`.

### Testing

- Playwright e2e tests live in `tests/e2e/`
- Run tests with: `pnpm run test:e2e` (builds first, then runs headless)
- Configuration in `playwright.config.ts` supports environment variables:
  - `PLAYWRIGHT_HOST` (default: `127.0.0.1`)
  - `PLAYWRIGHT_PORT` (default: `4321`)
  - `PLAYWRIGHT_BASE_URL` (default: `http://127.0.0.1:4321`)
- Tests verify locale switching, routing, theme persistence, and navigation

## 4. Working With Content

- Posts must include the schema enforced in `src/content/config.ts` (`title`,
  `description`, `publishedAt`, `tags`, `category`, optional `hero`, etc.)
- Keep locale directories synchronized: `src/content/blog/ko/...` and
  `src/content/blog/en/...`
- Reference hero and inline images from `public/assets/blog/<slug>/<locale>/`
- Import shared MDX components (`@/components/mdx/Image.astro`,
  `Callout.astro`) at the top of each MDX file when used
- Use `src/lib/content/posts.ts` helpers to load posts instead of re-querying
  collections manually

## 5. Conventions & References

- Favor TypeScript-first changes; avoid adding JavaScript-only utilities
- Respect localization rules in `src/lib/content/posts.ts` and
  `src/config/introductions.ts` when adding routes or UI
- Theme toggle (`src/components/ThemeToggle.astro` / `ThemeScript.astro`)
  expects color tokens to stay in sync with `tailwind.config.ts`
- Check `docs/content-guide.md`, `docs/ci-guide.md`, and
  `requirements/init.md` for deeper rationale before major edits
- If you add dependencies or tooling, keep `package.json` and `pnpm-lock.yaml`
  in sync and rerun the relevant commands from section 3

Following these guardrails keeps localization logic, migration workflows, and
build tooling reliable for future agents and contributors.
