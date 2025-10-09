# Content Workflow Guide

## Prerequisites

- Install dependencies once with `pnpm install`
- Ensure `DEFAULT_LOCALE` and `SUPPORTED_LOCALES` are set when running commands that rely on localization (defaults are `ko` and `ko,en`)

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
