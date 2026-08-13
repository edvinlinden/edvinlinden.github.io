# Real Screenshots for Project Cards — Design Spec

**Date:** 2026-08-13
**Status:** Approved

## Overview

Replace the stylized 3D device-mockup images on the three app project cards (Sudoku, Box Timer, Impossible Safe) with real iPhone screenshots. Because screenshots are tall portraits (~9:19.5) rather than the current 4:3-ish mockup crops, the `ProjectCard` image container changes from a square/full-width crop to a fixed-width portrait thumbnail at every breakpoint.

## Source Images

- **Sudoku** — `~/side-projects/sudoku-game/Screenshots/Clone 1 of iPhone 17/en-US/03_GameView_Light.png` (1206×2622)
- **Box Timer** — `~/side-projects/workout-timer/Screenshots/Clone 1 of iPhone 17 Pro/en-US/02_TimerRunningPortrait.png` (1206×2622)
- **Impossible Safe** — `~/Downloads/460x996bb.webp` (460×996)
  - The local `safe-crack-app/App Screenshots/` folder only has an older blue color theme; the Downloads file matches the app's current live sage-green theme, so it's the source of truth despite lower resolution. 460px wide is still enough for a ~180px-wide thumbnail.
- **Killedby.tech** keeps its existing image (`killedbytech-2023-compressed.webp`), unchanged. It's a website, not an app — no matching screenshot exists, and per decision it renders through the same portrait container as the others (crops harder, accepted trade-off).

## Asset Processing

For each of the 3 new screenshots:
1. Crop the top status bar / Dynamic Island strip so all three thumbnails start at the same visual point (removes mismatched clock times and the safe screenshot's lack of a status bar as a visible inconsistency).
2. Trim to a consistent ~1:2 portrait aspect ratio.
3. Export as compressed `.webp` into `public/images/`.

Replace these files (same directory, new content — filenames may be renamed to something descriptive, e.g. `sudoku-screenshot.webp`, `theboxtimer-screenshot.webp`, `theimpossiblesafe-screenshot.webp`):
- `public/images/sudoku.webp`
- `public/images/theboxtimer-2023-compressed.webp`
- `public/images/theimpossiblesafe-2023-compressed.webp`

## Component Changes

**`src/components/ProjectCard.astro`**

Current image classes:
```
h-60 w-full flex-none rounded-lg border border-line object-cover md:h-40 md:w-40
```

New: a fixed-width portrait box at both breakpoints, replacing the mobile "full-width stacked hero" behavior with a left-aligned narrow column (same row-based structure the desktop layout already uses):
- Mobile: ~176px wide (`w-44`), `aspect-[1/2]` → ~352px tall, left-aligned instead of full-width/centered.
- Desktop: ~112px wide (`w-28`), `aspect-[1/2]` → ~224px tall (up from today's 160×160 square).
- `object-cover object-top` — crops from the bottom if a source doesn't land exactly on 1:2 after processing, keeping the top (most identifying) part of the screen visible.
- Keep existing `rounded-lg border border-line` treatment. No device frame/bezel — out of scope per the "minimal tweak" decision.

The parent flex container (`group flex flex-col gap-6 ... md:flex-row`) stays structurally the same — mobile already stacks (`flex-col`), it just no longer needs a full-width image forcing that stack to look like a hero banner. No change needed to the `flex-col`/`md:flex-row` split itself, only to the image's own width/aspect classes.

## Data Changes

**`src/data/projects.ts`** — update the `image` field for the Sudoku, Box Timer, and Impossible Safe entries to the new filenames. Killedby.tech entry unchanged.

## Scope

- Covers: the 4 project card images on the home page (`/`) and `design.astro` (uses `ProjectCard` for its style-guide preview).
- Out of scope: device-frame/bezel treatment, multiple screenshots per app, per-project aspect-ratio overrides, animation/hover effects beyond what already exists.
