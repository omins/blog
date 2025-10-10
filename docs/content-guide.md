# Content Workflow Guide

## Prerequisites

- Install dependencies with `pnpm install`
- Locale configuration is centralized in `src/config/locales.ts` and `astro.config.mjs`
- Default locale: `en`, Supported locales: `en`, `ko`

## Adding A New Post

1. **Create post directory**: `src/content/blog/<locale>/<slug>/`
   - Example: `src/content/blog/en/my-new-post/`

2. **Add `index.mdx`** with required frontmatter:

```mdx
---
title: "Post Title"
description: "Brief summary for cards and meta tags"
publishedAt: 2025-01-08
tags:
  - topic
  - another-topic
category: "category-name"
lang: "en"
slug: "my-new-post"
translatedFrom: "ko/my-new-post" # optional, if translating
hero: "/assets/blog/my-new-post/en/hero.png" # optional
draft: false
---

import Image from "@/components/mdx/Image.astro";
import Callout from "@/components/mdx/Callout.astro";

Your content here...
```

3. **Add images**: Place in `public/assets/blog/<slug>/<locale>/`
   - Reference with root-relative paths: `/assets/blog/my-new-post/en/image.png`

4. **Preview locally**: Run `pnpm dev` and navigate to `/<locale>/posts/<slug>`

5. **Build check**: Run `pnpm check` to validate schema compliance

## Adding A Translation

1. Create the same post structure in the other locale directory
2. Use `translatedFrom` field to link translations
3. The locale switcher will automatically show available translations

## Frontmatter Schema

All fields defined in `src/content/config.ts`:

- `title` (required): Post title
- `description` (required): Summary for cards/SEO
- `publishedAt` (required): ISO date (YYYY-MM-DD)
- `tags` (required): Array of strings
- `category` (required): Single category string
- `lang` (required): Locale code (`en`, `ko`)
- `slug` (required): URL-safe identifier
- `translatedFrom` (optional): Link to source post
- `hero` (optional): Hero image path
- `draft` (optional): Hide from production (default: false)
