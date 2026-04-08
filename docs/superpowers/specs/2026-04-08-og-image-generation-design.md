# OG Image Generation — Design Spec

**Date:** 2026-04-08
**Status:** Approved

## Overview

Generate static Open Graph images at build time for all pages on edvinlinden.se. Each page gets a unique PNG pre-rendered during `astro build` using Satori and resvg-js. Social crawlers receive a branded, typographically consistent image when any page is shared.

## Visual Design

**Style:** Minimal Light — white background, dark heavy-weight title text, small muted site URL label, short accent bar.

**Layout (1200×630px):**
- Top-left: `edvinlinden.se` — uppercase, tracked, muted (`#a3a3a3`), small
- Center-left: Page title — Geologica Black (weight 900), large, dark (`#171717`), max-width 80% to prevent overflow
- Bottom-left: 40px wide × 3px tall accent bar, dark (`#171717`)
- Padding: ~10% horizontal, ~8% vertical

**Font:** Geologica loaded from `/public/fonts/geologica-latin.woff2` (already on site). Satori receives the font buffer directly — no network fetch required.

**Page title content:**
- Article pages: the article's frontmatter `title`
- Home page: `"Edvin Lindén — Product Leader & Maker"`
- All other pages (About, Writing, etc.): the page's `title` prop as passed to the layout

## Architecture

### New files

**`src/pages/og/[...slug].png.ts`**
Astro static endpoint. Responsible for:
- `getStaticPaths()`: builds the full list of slugs and their titles
  - Hardcoded entries for static pages: `home`, `about`, `writing`, `the-impossible-safe`
  - Dynamic entries from `import.meta.glob('../writing/*.md')` for each article, using the path to derive the slug (`writing/article-slug`)
  - Excluded: `the-box-timer` (redirect page), privacy pages (no social sharing value)
- `GET` handler: calls `generateOgImage(title)` and returns a `Response` with `Content-Type: image/png`

**`src/utils/og-image.ts`**
Pure async function `generateOgImage(title: string): Promise<Buffer>`:
1. Reads font file using `fileURLToPath(new URL('../../../public/fonts/geologica-latin.woff2', import.meta.url))` for a reliable absolute path in Astro's build context
2. Calls `satori(<template JSX>, { width: 1200, height: 630, fonts: [...] })`
3. Passes SVG string to `new Resvg(svg).render().asPng()`
4. Returns the PNG buffer

The JSX template is defined inline in this file, using the approved Minimal Light layout.

### Updated files

**`src/components/PageMeta.astro`**
- Replaces static `ogImageURL` (profile photo) with a derived OG image path
- Slug is derived from `Astro.url.pathname`: strip leading/trailing slashes, default to `home` for `/`
- OG image URL: `new URL('/og/${slug}.png', Astro.site)`

**`src/layouts/Article.astro`**
- Replaces `socialImageURL` with the article's pre-built OG image
- Slug derived from `Astro.url.pathname` the same way (e.g. `writing/what-i-learned...`)
- OG image URL: `new URL('/og/${slug}.png', Astro.site)`

## Dependencies

Add to `package.json`:
- `satori` — JSX/HTML to SVG
- `@resvg/resvg-js` — SVG to PNG

No adapter or hosting change required. Remains fully compatible with GitHub Pages static deployment.

## Data Flow

```
astro build
  → getStaticPaths() collects all page slugs + titles
  → for each slug: GET handler calls generateOgImage(title)
      → satori renders JSX template → SVG string
      → resvg converts SVG → PNG buffer
      → written to dist/og/[slug].png
  → PageMeta + Article layouts reference /og/[slug].png in og:image tags
  → Social crawler fetches the pre-built PNG
```

## Scope

- Covers: all existing pages (home, about, writing index, all articles, project pages if they use PageMeta)
- Out of scope: runtime generation, per-page custom background colors, profile photo in image, dark mode variant
