# Blog v2 Requirements

## Scope & Objectives

- Deliver a new Astro-powered personal site that serves localized intro pages and blog posts.
- Preserve a clear migration path for existing `blog-nextjs/posts` markdown content before the legacy repo is retired.
- Ensure the blog stays maintainable for a solo developer using TypeScript-first tooling and CI-friendly workflows.
- Favor hosting solutions that operate on zero-cost or generous free tiers for both the Astro frontend and any supporting services.

## Functional Requirements

### Content Source

- Canonical blog content must live under the Astro project (e.g., `astro/src/content/blog/[lang]/`) using locale-aware markdown or MDX files.
- Every post currently in `blog-nextjs/posts` must be migrated into the Astro project, including associated assets.
- Each markdown/MDX file must retain its frontmatter (`title`, `description`, `publishedAt`, `tags`, `category`, optional `hero`) and full body content using consistent ISO date formats.
- The system must provide a locale-aware slug map so that routes and cross-links remain consistent across locales.
- Metadata (frontmatter and derived fields) must be read from the existing markdown corpus and reused in the Astro site so no values need to be re-entered manually.
- All migrated markdown must default to Korean (`ko`) locale unless specifically flagged as English; currently only `git-alias.mdx` and `to-learn-a-new-language.mdx` remain English seeds.

### Astro Frontend

- The Astro application must statically generate pages using filesystem-parsed markdown during build time.
- Routes must follow the `[lang]/` structure and filter post listings, tag pages, and detail views according to the active locale.
- When a translation is missing, the system must preserve existing redirect or fallback behavior to guide the reader.

### Localization

- Locales must be driven from a central configuration (`en`, `ko` at minimum) and exposed to UI components as needed.
- Language switchers must only display languages that have available translations for the current post.
- Date formatting and localized copy must respect the active locale.
- Use locale-aware date and number formatting utilities (e.g., Intl APIs or `date-fns`/`formatjs`) throughout the UI and migration pipeline to ensure consistent localization.
- Locale-specific intros, navigation items, tag archives, and post listings must automatically hide locales without content and surface new locales as soon as localized entries are added without manual toggles.
- Visitors browsing a locale (e.g., `/en`) must only see intros, listings, and post details sourced from that locale when available, without falling back to other languages unless a redirect explicitly guides them.
- Empty states must communicate translation gaps (e.g., “Translation coming soon”) whenever content for the selected locale is unavailable.
- New translations are created manually; the system must not attempt to auto-generate Korean from English content.

### Styling & Presentation

- Tailwind CSS (via `@astrojs/tailwind`) must provide the primary styling system, with shared theme tokens defined in `tailwind.config`.
- Markdown rendering must leverage Tailwind Typography (or equivalent) to ensure consistent typographic treatment for post content.
- Layout, navigation, intro sections, post cards, metadata badges, and language toggles must be rebuilt using Tailwind utility classes.
- A global appearance toggle must allow visitors to switch between light mode, dark mode, and a system-preferring auto mode, with the choice persisted per visitor.
- Color tokens for light/dark modes can be selected during implementation but must be centralized so they are easy to revise later.
- Embrace a minimalist design direction with airy white space, a single accent color, clean sans-serif typography, and gentle hover micro-interactions.

### Content Migration to Astro Collections

- An Astro content collection (e.g., `astro/src/content/blog/[lang]/`) must exist with a schema that mirrors the normalized frontmatter fields.
- A migration script must ingest markdown from the legacy `blog-nextjs/posts` directory, enforce normalization, and emit markdown/MDX files into the Astro collection while preserving slug and directory structure (categories determined strictly by frontmatter, not folder layout).
- Referenced assets (hero images, embeds) must be copied or re-linked into the Astro `public/` directory with updated relative paths.
- The migration workflow must produce a report highlighting per-post locale coverage, missing assets, and parsing errors.
- Migration must run locally (at least once) and support a single-day execution so the dev server can be launched immediately afterward.
- Migration dry runs must be repeatable and diffable so discrepancies can be resolved before the Astro build relies solely on the migrated content.
- Astro must support MDX content; if equivalent MDX components are unavailable, they must be replaced with Astro-compatible alternatives during migration.

## Quality & Operational Requirements

- The build pipeline must run via `pnpm install && pnpm build` without additional environment variables beyond `DEFAULT_LOCALE` and `SUPPORTED_LOCALES`.
- Deployment targets must include zero-cost options such as Vercel, Netlify, or Cloudflare Pages, ensuring static assets (favicons, images) ship with the build.
- QA must validate generated pages against legacy markdown to confirm parity of titles, slugs, tags, and body formatting across locales.
- Lighthouse and similar performance audits must be executed on the static build to confirm acceptable load times and accessibility.
- Documentation must explain how to add new posts, supply optional translations, and adjust Tailwind styling.
- Automated workflows or scripts that invoke long-lived commands (e.g., `pnpm dev`) must wrap them with explicit timeouts to prevent hung processes.

## Tooling Requirements

- `pnpm` must remain the dependency manager for the Astro frontend and any supporting scripts; avoid workflows that require `npm` or `yarn`.
- The content loader must use performant utilities such as `fast-glob` and `gray-matter`, caching parsed results to optimize development rebuilds.
- Application code, migration scripts, and supporting utilities must be authored in TypeScript (leveraging `tsconfig` paths or `tsx` runners where needed) to maintain static typing end-to-end.
- Official Astro documentation links and references must be collected alongside the project notes so contributors can consult them freely whenever implementation questions arise, including the Markdown content guide at https://docs.astro.build/en/guides/markdown-content/.
- Design references for inspiration: Lee Robinson’s site (`https://leerob.com/`, writing archive at `https://leerob.com/writing`), Lance Martin (`https://rlancemartin.github.io/`), and Dan Abramov’s Overreacted blog (`https://overreacted.io/`).

## Action Items

1. Scaffold the Astro project alongside any required content tooling and commit the baseline setup.
2. Implement MDX support (or replace incompatible components) and finalize Tailwind theme tokens.
3. Run the local migration today, move all posts and assets into the Astro content collection, and verify the dev server renders migrated content correctly.
