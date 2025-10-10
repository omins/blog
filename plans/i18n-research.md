# i18n implementation research

## Context

- The existing Astro site already uses the built-in routing helpers from `astro:i18n`, but page copy is still hardcoded per locale with ternaries.
- Requirement: introduce a translation solution backed by locale JSON files so UI copy (e.g., “View all”, “Latest Posts”) is centrally managed.

## Options evaluated

### 1. Built-in `astro:i18n` helpers only

- Docs cover routing, locale params, and URL helpers but do not ship a translation dictionary API.
- Would require crafting a bespoke loader/util around static JSON without any pluralization or interpolation helpers.
- Verdict: minimal functionality; still need to write our own translation manager.

### 2. `astro-i18next` community integration

- Provides Astro components on top of `i18next` ([README](https://github.com/yassinedoghri/astro-i18next)).
- Project disclaimer highlights missing tests and evolving API, so adopting it could introduce maintenance risk.
- Verdict: promising but not production-ready enough for this blog.

### 3. Direct `i18next` usage with JSON resources

- `i18next` is a mature, framework-agnostic i18n library with interpolation, nesting, and async initialization.
- We can colocate translation JSON files under `src/locales/<locale>.json` and expose a small helper (`getTranslator`) that memoizes per-locale instances for server-rendered Astro components.
- Astro’s build pipeline can import JSON modules directly, so no extra tooling is required.
- Verdict: preferred solution—gives us full-featured translations while keeping integration lightweight.

## Implementation plan

1. Add `i18next` dependency and create locale JSON files for `en` and `ko`.
2. Introduce `src/lib/i18n/translator.ts` exposing `getTranslator(locale)` returning a memoized `t` function with interpolation support.
3. Refactor shared layout/components (`BaseLayout`, `PostMeta`, etc.) and locale-aware pages to call `getTranslator` and replace hardcoded strings with translation keys.
4. Update Playwright E2E tests to assert against translated copy per locale.
5. Run `pnpm test:e2e` to confirm translations and routing continue to work.
