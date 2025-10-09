# Tailwind Theme Tokens

## Palette Overview

- `background.light` / `background.dark`: Page surfaces for light and dark themes
- `surface.light` / `surface.dark`: Elevated layers such as cards and panels
- `text.light` / `text.dark`: Primary text colors tuned for contrast against the backgrounds
- `accent`: Accent trio (`DEFAULT`, `soft`, `strong`) used by links, badges, and hover states
- `border.light` / `border.dark`: Subtle separators for headers, footers, and cards

## Typography Settings

- `InterVariable` powers the sans stack, extended from Tailwind defaults
- `Fira Code` is the monospace stack for inline code and pre blocks
- `@tailwindcss/typography` exposes `DEFAULT` and `invert` styles aligned with the theme tokens
- Links shed underlines by default, regaining them on hover for clarity

## Global Styles

- `src/styles/global.css` imports Tailwind layers and sets color transitions
- `:root` advertises dual light/dark schemes for system-aware styling
- `html.dark` activates dark tokens using the persisted theme preference
- `::selection` uses `accent.soft` for a consistent highlight color

## Extending The Theme

- Update tokens inside `tailwind.config.ts` under `theme.extend`
- Maintain parity between light and dark variants whenever possible
- Run `pnpm dev` for rapid feedback or `pnpm build` for final verification
