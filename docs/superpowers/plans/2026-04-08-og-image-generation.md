# OG Image Generation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate a unique 1200×630 PNG Open Graph image for every page at build time, pre-rendered from the page title using Satori and resvg-js.

**Architecture:** A new Astro static endpoint at `src/pages/og/[...slug].png.ts` enumerates all pages via `getStaticPaths()` and renders each PNG using a shared `generateOgImage(title)` utility. `PageMeta.astro` and `Article.astro` are updated to point their `og:image` tags at the pre-built paths instead of the static profile photo.

**Tech Stack:** `satori` (JSX → SVG), `@resvg/resvg-js` (SVG → PNG), Astro static endpoints, React JSX (already configured in tsconfig)

---

## File Map

| Action | Path | Responsibility |
|--------|------|---------------|
| Create | `src/utils/og-image.tsx` | `generateOgImage(title)` — renders Satori JSX template to PNG buffer |
| Create | `src/pages/og/[...slug].png.ts` | Astro endpoint — `getStaticPaths` enumerates all pages, `GET` calls generator |
| Modify | `src/components/PageMeta.astro` | Replace static OG image URL with dynamic `/og/{slug}.png` |
| Modify | `src/layouts/Article.astro` | Replace `socialImageURL` with dynamic `/og/{slug}.png` |

---

## Task 1: Install dependencies

**Files:**
- Modify: `package.json` (via npm)

- [ ] **Step 1: Install satori and resvg-js**

```bash
npm install satori @resvg/resvg-js
```

- [ ] **Step 2: Verify both packages appear in package.json**

```bash
grep -E '"satori"|"@resvg/resvg-js"' package.json
```

Expected output:
```
    "@resvg/resvg-js": "^2.x.x",
    "satori": "^0.x.x",
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: install satori and resvg-js for OG image generation"
```

---

## Task 2: Create the OG image generator

**Files:**
- Create: `src/utils/og-image.tsx`

The project already has `"jsx": "react-jsx"` and `"jsxImportSource": "react"` in tsconfig, so JSX works in `.tsx` files. Satori accepts a React element tree and walks it to produce SVG — React's DOM renderer is not involved.

The font file at `public/fonts/geologica-latin.woff2` is a variable font covering weights 100–900. We declare it twice in the Satori fonts array (weight 400 and 900) using the same buffer.

- [ ] **Step 1: Create `src/utils/og-image.tsx`**

```tsx
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const fontPath = fileURLToPath(
  new URL('../../public/fonts/geologica-latin.woff2', import.meta.url)
);
const fontData = readFileSync(fontPath);

function OgTemplate({ title }: { title: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        paddingTop: 76,
        paddingRight: 120,
        paddingBottom: 60,
        paddingLeft: 120,
      }}
    >
      <div
        style={{
          fontSize: 20,
          letterSpacing: '0.18em',
          color: '#a3a3a3',
          fontWeight: 400,
          fontFamily: 'Geologica',
        }}
      >
        EDVINLINDEN.SE
      </div>
      <div
        style={{
          fontSize: 72,
          fontWeight: 900,
          color: '#171717',
          lineHeight: 1.1,
          fontFamily: 'Geologica',
          maxWidth: 960,
        }}
      >
        {title}
      </div>
      <div
        style={{
          width: 40,
          height: 3,
          backgroundColor: '#171717',
          borderRadius: 2,
        }}
      />
    </div>
  );
}

export async function generateOgImage(title: string): Promise<Buffer> {
  const svg = await satori(<OgTemplate title={title} />, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Geologica', data: fontData, weight: 400, style: 'normal' },
      { name: 'Geologica', data: fontData, weight: 900, style: 'normal' },
    ],
  });

  const resvg = new Resvg(svg);
  return Buffer.from(resvg.render().asPng());
}
```

- [ ] **Step 2: Commit**

```bash
git add src/utils/og-image.tsx
git commit -m "feat: add generateOgImage utility using satori and resvg"
```

---

## Task 3: Create the Astro OG image endpoint

**Files:**
- Create: `src/pages/og/[...slug].png.ts`

`getStaticPaths` builds a flat list of `{ params: { slug }, props: { title } }` for every page that needs an OG image. The `[...slug]` catch-all route handles both top-level slugs (`home`, `about`) and nested ones (`writing/the-product-kata`).

Article `.md` files live at `src/pages/writing/*.md`. From this file at `src/pages/og/`, the glob path `'../writing/*.md'` resolves to `src/pages/writing/*.md`. The key for each glob entry looks like `'../writing/the-product-kata.md'` — we strip the prefix and extension to get `'writing/the-product-kata'`.

- [ ] **Step 1: Create `src/pages/og/[...slug].png.ts`**

```ts
import type { APIRoute, GetStaticPaths } from 'astro';
import { generateOgImage } from '../../utils/og-image';

export const getStaticPaths: GetStaticPaths = async () => {
  const articleFiles = import.meta.glob('../writing/*.md', { eager: true }) as Record<
    string,
    { frontmatter: { title: string } }
  >;

  const articlePaths = Object.entries(articleFiles).map(([path, mod]) => {
    const slug = path.replace('../writing/', 'writing/').replace('.md', '');
    return { params: { slug }, props: { title: mod.frontmatter.title } };
  });

  const staticPaths = [
    {
      params: { slug: 'home' },
      props: { title: 'Edvin Lindén — Product Leader & App Developer' },
    },
    { params: { slug: 'about' }, props: { title: 'About me' } },
    { params: { slug: 'writing' }, props: { title: 'Writing' } },
    {
      params: { slug: 'the-impossible-safe' },
      props: { title: 'The Impossible Safe' },
    },
  ];

  return [...staticPaths, ...articlePaths];
};

export const GET: APIRoute = async ({ props }) => {
  const png = await generateOgImage(props.title as string);
  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
```

- [ ] **Step 2: Do a quick build smoke-test to verify the endpoint generates files**

```bash
npm run build 2>&1 | tail -20
```

Expected: build completes without errors.

```bash
ls dist/og/
```

Expected output includes: `about.png  home.png  the-impossible-safe.png  writing  writing.png`

```bash
ls dist/og/writing/
```

Expected: one `.png` per article (e.g. `the-product-kata.png`, `be-polite-say-goodbye.png`, etc.)

- [ ] **Step 3: Commit**

```bash
git add src/pages/og/
git commit -m "feat: add Astro OG image endpoint with static path generation"
```

---

## Task 4: Update `PageMeta.astro` to use dynamic OG image

**Files:**
- Modify: `src/components/PageMeta.astro`

`Astro.url.pathname` for the home page is `'/'`, for about is `'/about/'`. Stripping leading and trailing slashes with `replace(/^\/|\/$/g, '')` gives `''` for home and `'about'` for about. We default the empty string to `'home'` to match the slug defined in `getStaticPaths`.

The current `ogImageURL` points at the static profile photo. Replace it with the derived slug path.

- [ ] **Step 1: Replace the static `ogImageURL` in `PageMeta.astro`**

Current code (lines 7–8):
```ts
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
const ogImageURL = new URL("/images/edvin-linden-2024.webp", Astro.site);
```

Replace with:
```ts
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
const ogSlug = Astro.url.pathname.replace(/^\/|\/$/g, '') || 'home';
const ogImageURL = new URL(`/og/${ogSlug}.png`, Astro.site);
```

- [ ] **Step 2: Verify the OG image tag still renders in built HTML**

```bash
npm run build 2>&1 | tail -5
grep 'og:image' dist/index.html
```

Expected output contains:
```
<meta property="og:image" content="https://edvinlinden.se/og/home.png"/>
```

```bash
grep 'og:image' dist/about/index.html
```

Expected:
```
<meta property="og:image" content="https://edvinlinden.se/og/about.png"/>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/PageMeta.astro
git commit -m "feat: use dynamic OG image URL in PageMeta"
```

---

## Task 5: Update `Article.astro` to use dynamic OG image

**Files:**
- Modify: `src/layouts/Article.astro`

An article at `/writing/the-product-kata/` has `Astro.url.pathname` of `'/writing/the-product-kata/'`. Stripping slashes gives `'writing/the-product-kata'`, which matches the slug generated by the endpoint in Task 3.

The existing `socialImageURL` is built from `frontmatter.image` — the article's cover photo path. We replace it with the pre-built OG PNG path. The `image` prop from frontmatter is no longer used for the OG tag (it may still be in the frontmatter data but just won't be destructured here).

- [ ] **Step 1: Replace `socialImageURL` in `Article.astro` and remove unused `image`**

Current code (lines 18–20):
```ts
const { title, description, date, image, readingTime } = frontmatter;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
const socialImageURL = new URL(image, Astro.url);
```

Replace with (remove `image` from destructuring — it's only used to build `socialImageURL`):
```ts
const { title, description, date, readingTime } = frontmatter;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
const ogSlug = Astro.url.pathname.replace(/^\/|\/$/g, '');
const socialImageURL = new URL(`/og/${ogSlug}.png`, Astro.site);
```

- [ ] **Step 2: Verify the OG image tag in a built article**

```bash
npm run build 2>&1 | tail -5
grep 'og:image' "dist/writing/what-i-learned-by-launching-my-first-app/index.html"
```

Expected:
```
<meta property="og:image" content="https://edvinlinden.se/og/writing/what-i-learned-by-launching-my-first-app.png"/>
```

- [ ] **Step 3: Visually inspect a generated PNG**

Open one of the generated PNG files to confirm the design looks correct:

```bash
open dist/og/home.png
open dist/og/writing/what-i-learned-by-launching-my-first-app.png
```

Confirm: white background, `EDVINLINDEN.SE` top-left, large bold title, small dark accent bar at bottom-left, Geologica font.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/Article.astro
git commit -m "feat: use dynamic OG image URL in Article layout"
```

---

## Task 6: Clean up and final verification

**Files:**
- No new files

- [ ] **Step 1: Confirm all expected OG images are generated**

```bash
find dist/og -name '*.png' | sort
```

Expected list:
```
dist/og/about.png
dist/og/home.png
dist/og/the-impossible-safe.png
dist/og/writing.png
dist/og/writing/be-polite-say-goodbye.png
dist/og/writing/the-product-kata.png
dist/og/writing/using-chatgpt-to-translate-an-ios-app.png
dist/og/writing/what-i-learned-by-launching-my-first-app.png
dist/og/writing/you-dont-notice-the-best-product-design-from-IKEA.png
```

- [ ] **Step 2: Confirm the old static profile photo is no longer referenced in og:image tags**

```bash
grep -r 'edvin-linden-2024' dist/ --include='*.html' | grep 'og:image'
```

Expected: no output.

- [ ] **Step 3: Add `.superpowers/` to `.gitignore` if not already present**

```bash
grep '.superpowers' .gitignore || echo '.superpowers/' >> .gitignore
```

- [ ] **Step 4: Final commit**

```bash
git add .gitignore
git commit -m "chore: ignore .superpowers brainstorm directory"
```
