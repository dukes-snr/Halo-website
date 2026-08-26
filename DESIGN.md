<!-- impeccable:design-schema 1 -->
---
name: Halo Marketing Site
description: Editorial product catalog for Halo — plain white paper, ink type, Source Serif 4 display with italic close, black pill CTAs, and Dia-style pastel stages only behind product footage.
colors:
  ink: "#111111"
  ink-2: "#3D3D3D"
  ink-muted: "#6A6A6A"
  paper: "#FFFFFF"
  foam: "#F7F7F5"
  haze: "#F3F3F0"
  line: "#E8E8E4"
  cloud: "#FFFFFF"
  sun: "#FFD400"
typography:
  display: Source Serif 4 400-700 roman + italic
  body: Satoshi 400/500
  label: Geist Mono
rounded:
  card: 20-24px
  stage: 28-36px
  control: 9999px
components:
  button-primary: ink fill, paper text, full pill, hover ink/90
  button-secondary: paper fill, hairline ring ink/15, hover ring ink/40
  nav: sticky paper, quiet 14px links, black Download pill
  station-stage: muted pastel gradient field, product window on paper, soft pop shadow
---

# Design System - Halo Marketing Site

## Overview

**Creative North Star: "Editorial product catalog"**

The site is a quiet catalog, not a sticker shop. White paper carries Source Serif 4 headlines (roman with an italic close), Satoshi body, and a living Windows desktop demo. Color lives inside the product — the black notch, the footage, the muted pastel stages behind stations — never as a yellow field around the page.

The retired world (sun-yellow slabs, 2.5px ink outlines, Gabarito extra-bold, sticker offset shadows) is an anti-reference. Do not reintroduce it on marketing chrome.

**Key Characteristics:**
- Plain white ground; hairline dividers instead of outlined cards
- Serif display with italic emphasis; black pill CTAs
- Product demo as the hero artifact
- Pastel stages only behind station/feature footage
- Sun yellow reserved for the notch UI inside the demo

## Colors

Restrained: ink on paper, one black CTA, pastel only as stage fields.

| Token | Value | Use |
| --- | --- | --- |
| `--ink` | `#111111` | Text, primary buttons, logo tile, selected dots |
| `--ink-2` / `--ink-muted` | `#3D3D3D` / `#6A6A6A` | Secondary copy via `text-ink/55–70` |
| `--paper` / `--cloud` | `#FFFFFF` | Page, nav, product windows |
| `--haze` / `--foam` | `#F3F3F0` / `#F7F7F5` | Quiet wells (download status, changelog media) |
| `--line` | `#E8E8E4` | Hairline rules, feature grid, FAQ rows |
| `--sun` | `#FFD400` | Notch demo chrome only — never marketing fields |

**The Paper Rule.** Marketing surfaces stay white. Yellow does not own a section.

**The Stage Rule.** Soft pastel gradients (lavender, sand, mist) appear only as the rounded field behind product video, never as the page.

## Typography

- Display: **Source Serif 4** (Google, 400–700, italic). Tracking `-0.025em`, leading `1.06–1.12`. Hero up to ~76px. Italic closes the headline ("worth using.", "can do.", "for Windows").
- Body: **Satoshi** 400/500, 15–17px, leading 1.6, muted with `text-ink/55`.
- Labels: small Satoshi 12–13px at `text-ink/45`. Geist Mono remains for demo chrome and code-like values, not as a marketing costume.

**The Italic Close Rule.** Drama comes from one italic phrase in the serif, not from weight 800 or a second accent color.

## Layout

- Container: `max-w-[1120px] px-5 md:px-8`. Hero copy `max-w-[820px]` centered.
- Sticky flush nav, 72px, no floating pill.
- Section rhythm: `py-20 md:py-28` with `border-t border-line` between bands.
- Hero grid: faint 72px hairline, masked out before the product frame (pinned from the showcase reference).
- Stations: centered title + dots + caption + pastel stage.
- Principles: 3 columns divided by hairlines, not cards.

## Elevation & Depth

Soft ambient only. No ink-offset sticker shadows on marketing chrome.

```css
--shadow-card: 0 16px 40px -24px rgb(17 17 17 / 0.18);
--shadow-pop:  0 28px 70px -32px rgb(17 17 17 / 0.32);
```

`--shadow-pop` for the product window and desktop demo. `--shadow-card` for annotation cards. Focus is `2px solid var(--ink)`.

## Shapes

- Pills: every control `rounded-full`.
- Product window: 18–22px.
- Stage / demo well: 28–36px.
- Hairlines, not 2.5px ink borders, on marketing cards.

## Components

- **Buttons:** Primary `bg-ink text-paper rounded-full px-5 py-2.5 text-[14px]`. Secondary `ring-1 ring-ink/15`. Ghost is text only.
- **Nav:** Wordmark (ink tile + Source Serif "Halo") left; Features, Mascot, Privacy as 14px ink/55 links; black Download pill right. Mobile: hamburger + serif list.
- **Footer:** Paper field, hairline top, same container as the header. Logo + pokeable mascot, quiet 14px links, copyright. No inverted black slab.
- **Focus player:** Full-ink theater. Serif title + Close, full-bleed video, hairline seek rail. Inline clips use a paper play disc and a Focus label, not glass pills.
- **Station board:** "Halo is for {lane}", dot tablist, body caption, pastel stage, paper product window, floating annotation, Explore link.
- **Notch surface:** unchanged product chrome inside DroppyMock / NotchDemo. Sun yellow is legal there.

## Do's and Don'ts

- **Do** keep the page white and put color inside the product.
- **Do** close display lines in italic Source Serif 4.
- **Do** send Download to `/download` and keep installer copy honest (coming soon).
- **Don't** paint marketing sections `--sun`.
- **Don't** restore 2.5px ink outlines or offset sticker shadows on chrome.
- **Don't** invent testimonials, metrics, or a live installer URL.
