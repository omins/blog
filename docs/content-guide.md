# Content Workflow Guide

## Prerequisites

- Install dependencies once with `yarn install`
- Ensure `DEFAULT_LOCALE` and `SUPPORTED_LOCALES` are set when running commands that rely on localization (defaults are `ko` and `ko,en`)
- Keep legacy markdown in `../blog-nextjs/posts` available for migrations

## Adding A New Post

1. Choose the locale directory under `src/content/blog/<locale>/`
2. Create a folder matching the slug you want visitors to use
3. Add `index.mdx` with the required frontmatter:

```mdx
---
title: "Readable title"
description: "Concise summary for cards and meta tags"
publishedAt: 2025-01-08
tags:
  - topic
category: "category-name"
lang: "ko"
slug: "chosen-slug"
translatedFrom: "en/chosen-slug" # optional
hero: "/assets/blog/chosen-slug/ko/hero.png" # optional
draft: false
---
```

4. Author body content using Markdown or MDX; import shared components such as `@/components/mdx/Image.astro` or `Callout.astro` at the top when used
5. Store local images under `public/assets/blog/<slug>/<locale>/` and reference them with root-relative paths (the migration script enforces the same structure)

## Updating Translations

- Mirror the slug folder under the new locale, reuse the same `slug` value, and set `translatedFrom` to the source locale/slug
- Verify `LocaleSwitcher` displays only locales that have translations by visiting `/en/posts/<slug>` or `/ko/posts/<slug>`

## Running The Migration

- `yarn content:migrate --dry-run --verbose` inspects the legacy repo without touching files
- `yarn content:migrate` writes normalized frontmatter, copies assets, and injects required MDX imports
- `yarn content:report` prints JSON with migration results for auditing
- Review `public/assets/blog/<slug>/<locale>/` after migration to confirm hero images and inline assets resolved correctly

## Validation Checklist

- `yarn check` ensures Astro content schemas stay valid
- `yarn test --run` runs Vitest
- `yarn build` verifies static generation succeeds with the current content set
- Manually browse `yarn dev` (set `DEFAULT_LOCALE` and `SUPPORTED_LOCALES` overrides if you need non-default values) to confirm locale routing and theme switching
