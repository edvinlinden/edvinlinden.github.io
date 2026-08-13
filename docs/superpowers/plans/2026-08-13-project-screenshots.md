# Real Screenshots for Project Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the stylized 3D device-mockup images on the Sudoku, Box Timer, and Impossible Safe project cards with real iPhone screenshots, and resize the `ProjectCard` image container from a square/full-width crop to a fixed-width portrait thumbnail.

**Architecture:** One-off Node script (using the `sharp` package already present in `node_modules`) crops each source screenshot and exports a compressed `.webp` into `public/images/`. `src/data/projects.ts` is updated to point at the new files. `src/components/ProjectCard.astro` gets new Tailwind classes for the image container.

**Tech Stack:** Astro, Tailwind CSS, `sharp` (Node image processing, ad hoc — not added as a project dependency).

**Design spec:** `docs/superpowers/specs/2026-08-13-project-screenshots-design.md`

## Global Constraints

- Final image container aspect ratio: `1:2` (portrait) at every breakpoint, applied to all 4 project cards including Killedby.tech.
- Mobile image width: `176px` (Tailwind `w-44`), left-aligned (no longer full-width/stacked hero).
- Desktop image width: `112px` (Tailwind `w-28`).
- `object-cover object-top` on the `<img>`, keeping `rounded-lg border border-line` from the current styling.
- No device frame/bezel treatment.
- Source screenshots: Sudoku and Box Timer come from full-resolution App Store exports (1206×2622); Impossible Safe comes from `~/Downloads/460x996bb.webp` (matches the app's current live theme; the local `safe-crack-app/App Screenshots/` folder is an outdated blue theme — do not use it).
- Crop status bar / Dynamic Island off Sudoku and Box Timer only. The Impossible Safe source has no status bar — do not crop its top.
- Killedby.tech's existing image (`killedbytech-2023-compressed.webp`) is untouched.

---

### Task 1: Generate the cropped screenshot assets

**Files:**
- Create (scratch, not committed to the repo): `/private/tmp/claude-501/-Users-edvin-linden-side-projects-edvinlinden-github-io/cdb9924f-bbd4-4d2c-b2fd-ff5aaece2524/scratchpad/process-screenshots.mjs`
- Create: `public/images/sudoku-screenshot.webp`
- Create: `public/images/boxtimer-screenshot.webp`
- Create: `public/images/impossiblesafe-screenshot.webp`

**Interfaces:**
- Produces: three `.webp` files in `public/images/`, each with a `1:2` width:height ratio, consumed by Task 2 (`src/data/projects.ts`).

- [ ] **Step 1: Write the processing script**

Create the script at the scratch path above with this exact content:

```javascript
import sharp from "/Users/edvin.linden/side-projects/edvinlinden.github.io/node_modules/sharp/dist/index.mjs";

const jobs = [
  {
    name: "sudoku",
    src: "/Users/edvin.linden/side-projects/sudoku-game/Screenshots/Clone 1 of iPhone 17/en-US/03_GameView_Light.png",
    crop: { left: 0, top: 210, width: 1206, height: 2412 },
    resizeWidth: 600,
    out: "/Users/edvin.linden/side-projects/edvinlinden.github.io/public/images/sudoku-screenshot.webp",
  },
  {
    name: "boxtimer",
    src: "/Users/edvin.linden/side-projects/workout-timer/Screenshots/Clone 1 of iPhone 17 Pro/en-US/02_TimerRunningPortrait.png",
    crop: { left: 0, top: 210, width: 1206, height: 2412 },
    resizeWidth: 600,
    out: "/Users/edvin.linden/side-projects/edvinlinden.github.io/public/images/boxtimer-screenshot.webp",
  },
  {
    name: "impossiblesafe",
    src: "/Users/edvin.linden/Downloads/460x996bb.webp",
    crop: { left: 0, top: 0, width: 460, height: 920 },
    resizeWidth: null,
    out: "/Users/edvin.linden/side-projects/edvinlinden.github.io/public/images/impossiblesafe-screenshot.webp",
  },
];

for (const job of jobs) {
  let pipeline = sharp(job.src).extract(job.crop);
  if (job.resizeWidth) {
    pipeline = pipeline.resize({ width: job.resizeWidth });
  }
  await pipeline.webp({ quality: 82 }).toFile(job.out);
  const meta = await sharp(job.out).metadata();
  console.log(job.name, meta.width, meta.height, (meta.width / meta.height).toFixed(3));
}
```

- [ ] **Step 2: Run the script**

Run: `node "/private/tmp/claude-501/-Users-edvin-linden-side-projects-edvinlinden-github-io/cdb9924f-bbd4-4d2c-b2fd-ff5aaece2524/scratchpad/process-screenshots.mjs"`

Expected output (three lines, one per job):
```
sudoku 600 1200 0.500
boxtimer 600 1200 0.500
impossiblesafe 460 920 0.500
```

- [ ] **Step 3: Verify the files exist and look correct**

Run: `file public/images/sudoku-screenshot.webp public/images/boxtimer-screenshot.webp public/images/impossiblesafe-screenshot.webp`
Expected: all three report as `Web/P image data` (or `RIFF ... Web/P`).

Read each of the three files with an image viewer/tool to confirm: no status bar/clock visible at the top of the Sudoku and Box Timer images, and the Impossible Safe image still shows its full dial and "OPEN SAFE" button un-cropped at the top.

- [ ] **Step 4: Commit**

```bash
git add public/images/sudoku-screenshot.webp public/images/boxtimer-screenshot.webp public/images/impossiblesafe-screenshot.webp
git commit -m "Add cropped real-screenshot assets for project cards"
```

---

### Task 2: Point project data at the new assets and remove the old files

**Files:**
- Modify: `src/data/projects.ts:8` (Sudoku `image` field)
- Modify: `src/data/projects.ts:29` (Impossible Safe `image` field)
- Modify: `src/data/projects.ts:40` (Box Timer `image` field)
- Delete: `public/images/sudoku.webp`
- Delete: `public/images/theboxtimer-2023-compressed.webp`
- Delete: `public/images/theimpossiblesafe-2023-compressed.webp`

**Interfaces:**
- Consumes: the three files produced by Task 1 (`public/images/sudoku-screenshot.webp`, `public/images/boxtimer-screenshot.webp`, `public/images/impossiblesafe-screenshot.webp`).
- Produces: updated `projects` array consumed by `ProjectCard.astro` in Task 3, and by `src/pages/index.astro` / `src/pages/design.astro` (no changes needed in either — they already spread `{...project}` into `ProjectCard`).

- [ ] **Step 1: Update `src/data/projects.ts`**

In the `"Sudoku for iPhone & iPad"` entry, change:
```typescript
    image: "/images/sudoku.webp",
```
to:
```typescript
    image: "/images/sudoku-screenshot.webp",
```

In the `"The Impossible Safe"` entry, change:
```typescript
    image: "/images/theimpossiblesafe-2023-compressed.webp",
```
to:
```typescript
    image: "/images/impossiblesafe-screenshot.webp",
```

In the `"Box Timer – Workout Timer"` entry, change:
```typescript
    image: "/images/theboxtimer-2023-compressed.webp",
```
to:
```typescript
    image: "/images/boxtimer-screenshot.webp",
```

- [ ] **Step 2: Remove the old asset files**

```bash
git rm public/images/sudoku.webp public/images/theboxtimer-2023-compressed.webp public/images/theimpossiblesafe-2023-compressed.webp
```

- [ ] **Step 3: Confirm nothing else references the removed filenames**

Run: `grep -rn "sudoku\.webp\|theboxtimer-2023-compressed\.webp\|theimpossiblesafe-2023-compressed\.webp" src public --include="*.astro" --include="*.ts"`
Expected: no output (empty).

- [ ] **Step 4: Commit**

```bash
git add src/data/projects.ts
git commit -m "Point Sudoku, Box Timer, and Impossible Safe cards at real screenshots"
```

---

### Task 3: Resize the `ProjectCard` image container

**Files:**
- Modify: `src/components/ProjectCard.astro:34-41`

**Interfaces:**
- Consumes: `image` prop (string path), already wired by Task 2's data changes.
- Produces: final rendered card layout — no other file depends on this component's internals beyond the existing `Props` interface, which is unchanged.

- [ ] **Step 1: Update the image container classes**

In `src/components/ProjectCard.astro`, change:

```astro
  <img
    src={image}
    alt=""
    loading="lazy"
    width="160"
    height="160"
    class="h-60 w-full flex-none rounded-lg border border-line object-cover md:h-40 md:w-40"
  />
```

to:

```astro
  <img
    src={image}
    alt=""
    loading="lazy"
    width="176"
    height="352"
    class="aspect-[1/2] w-44 flex-none rounded-lg border border-line object-cover object-top md:w-28"
  />
```

- [ ] **Step 2: Build the site**

Run: `npm run build`
Expected: build completes with no errors and no missing-image warnings.

- [ ] **Step 3: Visually verify in the dev server**

Run: `npm run dev`

Open `http://localhost:4321/` (or whatever port Astro prints) and check the "Projects" section:
- At a mobile viewport width (~375px): each project row shows the image on top, text below, image left-aligned at ~176px wide, clearly taller than wide, cropped from the top of the source screenshot.
- At a desktop viewport width (~1280px): each project row shows the image on the left (~112px wide) beside the text, same portrait proportions.
- Sudoku and Box Timer thumbnails show app UI starting right below where the status bar used to be (no clock/battery visible). Impossible Safe thumbnail shows its dial starting at the very top.
- Killedby.tech's thumbnail (still its old landscape image) renders in the same portrait container — expected to look more tightly cropped than the others; confirm it doesn't look broken (e.g. no stretching/distortion, `object-cover` should crop cleanly).

Also open `http://localhost:4321/design/` and confirm the single `ProjectCard` preview there (uses `projects[0]`, i.e. Sudoku) matches the same treatment.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectCard.astro
git commit -m "Resize project card thumbnails to portrait for real screenshots"
```
