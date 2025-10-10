# AGENTS.md

This repository hosts the localized Astro blog that powers `omin.blog`. Use this
guide when working on the project with a coding agent so changes stay aligned
with the existing workflows, localization model, and tooling.

## Repository Snapshot

- Astro 5 + MDX site with Tailwind theming, dark/light toggle, and locale-aware routing
- Blog content lives under `src/content/blog/<locale>/<slug>/index.mdx`
- Localized copy and helpers reside in `src/config`, shared UI in `src/components`
- Generated output (`dist/`) and legacy assets should never be edited by hand
- Additional process context is documented in `docs/` and `requirements/`

## Environment & Tooling

- Node `22` (`.nvmrc`) with pnpm version locked via `packageManager` field in `package.json`
- Activate pnpm via `corepack enable`, then install dependencies: `pnpm install`
- ESLint (`eslint.config.js`) and Prettier (`.prettierrc`) govern formatting
- TypeScript path alias `@` resolves to `src/`; prefer `.ts`/`.astro` sources over plain JS
- Tailwind tokens are defined in `tailwind.config.ts`; global styles live in `src/styles/global.css`

## Development Workflow

| Command             | Purpose                                                                   |
| ------------------- | ------------------------------------------------------------------------- |
| `pnpm dev`          | Start Astro dev server (wrap with `timeout` in automation to avoid hangs) |
| `pnpm check`        | Run Astro content + TypeScript checks                                     |
| `pnpm lint`         | ESLint validation                                                         |
| `pnpm lint:fix`     | ESLint validation with autofix                                            |
| `pnpm format`       | Format all files with Prettier                                            |
| `pnpm format:check` | Check formatting without writing changes                                  |
| `pnpm test:e2e`     | Playwright end-to-end tests (builds first, runs headless)                 |
| `pnpm build`        | Generate static site in `dist/`                                           |
| `pnpm preview`      | Preview built site on `127.0.0.1:4321`                                    |

Set `DEFAULT_LOCALE` and `SUPPORTED_LOCALES` when you need non-default values;
otherwise the code falls back to the constants in `src/config/locales.ts`.

## Code Quality & Formatting

### Linting

- ESLint configuration: `eslint.config.js`
- Uses flat config with TypeScript, Astro, and JSX a11y plugins
- Run `pnpm lint` to check for issues
- Run `pnpm lint:fix` to automatically fix issues
- Key rules: TypeScript strict mode, unused vars detection, a11y checks

### Formatting

- Prettier configuration: `.prettierrc`
- Plugins: `prettier-plugin-astro`, `prettier-plugin-tailwindcss`
- Settings: 2-space tabs, 100 char width, semicolons, double quotes
- Run `pnpm format` to format all files
- Run `pnpm format:check` to verify formatting without changes
- **Before committing**: Always run `pnpm lint:fix` and `pnpm format`

## Testing

- Playwright e2e tests live in `tests/e2e/`
- Run tests with: `pnpm run test:e2e` (builds first, then runs headless)
- Configuration in `playwright.config.ts` supports environment variables:
  - `PLAYWRIGHT_HOST` (default: `127.0.0.1`)
  - `PLAYWRIGHT_PORT` (default: `4321`)
  - `PLAYWRIGHT_BASE_URL` (default: `http://127.0.0.1:4321`)
- Tests verify locale switching, routing, theme persistence, and navigation

## Continuous Integration

- **Workflow location**: `.github/workflows/playwright.yml`
- **Trigger**: Pull requests and pushes to `main` branch
- **What runs**:
  - Sets up Node.js 22 (from `.nvmrc`)
  - Enables Corepack and installs pnpm
  - Installs dependencies with frozen lockfile
  - Caches pnpm store and Playwright browsers
  - Runs `pnpm run test:e2e` (builds + e2e tests)
- **Timeout**: 10 minutes
- **Browser**: Chromium only (for CI speed)

## Working With Content

- Posts must include the schema enforced in `src/content/config.ts` (`title`,
  `description`, `publishedAt`, `tags`, `category`, optional `hero`, etc.)
- Keep locale directories synchronized: `src/content/blog/ko/...` and
  `src/content/blog/en/...`
- Reference hero and inline images from `public/assets/blog/<slug>/<locale>/`
- Import shared MDX components (`@/components/mdx/Image.astro`,
  `Callout.astro`) at the top of each MDX file when used
- Use `src/lib/content/posts.ts` helpers to load posts instead of re-querying
  collections manually

## Localization

- Translation dictionaries live in `src/locales/<locale>.json`; update
  `translationDictionaries` in `src/lib/i18n/translator.ts` whenever you add a
  new locale.
- The translator resources map must stay type-safe for TypeScript checks. When
  deriving it from `Object.fromEntries`, cast through `unknown` (or build the
  object via `SUPPORTED_LOCALES`) so the result satisfies the `ResourceMap`
  shape before assigning it. Running `pnpm check` should remain clean.

## Conventions & References

- Favor TypeScript-first changes; avoid adding JavaScript-only utilities
- Respect localization rules in `src/lib/content/posts.ts` and
  `src/config/introductions.ts` when adding routes or UI
- Theme toggle (`src/components/ThemeToggle.astro` / `ThemeScript.astro`)
  expects color tokens to stay in sync with `tailwind.config.ts`
- Check `docs/content-guide.md`, `docs/ci-guide.md`, and
  `requirements/core.md` for deeper rationale before major edits
- If you add dependencies or tooling, keep `package.json` and `pnpm-lock.yaml`
  in sync and rerun the relevant commands from section 3

Following these guardrails keeps localization logic, migration workflows, and
build tooling reliable for future agents and contributors.
