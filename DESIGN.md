<!-- impeccable:design-schema 1 -->
---
name: Halo Marketing Site
description: White studio page for a native Windows notch
colors:
  ink: "#051A24"
  ink-2: "#0D212C"
  ink-muted: "#273C46"
  foam: "#F6FCFF"
  mist: "#E0EBF0"
  page: "#FFFFFF"
  stage: "#071016"
typography:
  display:
    fontFamily: "Bitcount Prop Single, Iowan Old Style, Palatino, serif"
    fontSize: "32px"
    fontWeight: 700
    lineHeight: "1.15"
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Satoshi, Avenir Next, Segoe UI, sans-serif"
    fontSize: "32px"
    fontWeight: 400
    lineHeight: "1.15"
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Satoshi, Avenir Next, Segoe UI, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "1.6"
    letterSpacing: "normal"
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "1.4"
    letterSpacing: "normal"
rounded:
  image: "16px"
  card: "40px"
  full: "9999px"
spacing:
  hero: "24px"
  section: "48px"
  project: "80px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.foam}"
    rounded: "{rounded.full}"
    padding: "12px 28px"
  button-secondary:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "12px 28px"
  button-tertiary:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "12px 28px"
  card-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.foam}"
    rounded: "{rounded.card}"
    padding: "32px 40px"
  card-light:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "32px 40px"
---

# Design System - Halo Marketing Site

## Overview

**Creative North Star: "The studio notch"**

Halo's marketing site is a white studio page, not a landscape SaaS hero. It borrows the Viktor Oddy single-column pitch, mixed grotesk and bitmap type, layered pill shadows, and a floating bottom nav, then fills every frame with real Halo product captures.

The page stays light from hero to footer. Ink is the only chrome color. Product UI sits on near-black stages. Conversion is one verb: Download Halo.

**Key Characteristics:**
- White canvas, ink type, no CoolDock landscape or glass header
- Satoshi body with Bitcount display accents on short words
- Real product screenshots only
- Pill buttons with stacked ink shadows
- Fixed bottom nav as the persistent download control

## Colors

One ink family on white. No second accent.

### Primary
- **Ink** (`#051A24`): wordmark, body, primary buttons, dark cards

### Neutral
- **Ink 2** (`#0D212C`): headlines
- **Ink muted** (`#273C46`): secondary lines
- **Foam** (`#F6FCFF`): text on ink
- **Mist** (`#E0EBF0`): supporting text on ink
- **Page** (`#FFFFFF`): site ground
- **Stage** (`#071016`): product image beds

**The One Ink Rule.** Buttons, type, and dark cards all use the same ink. Do not reintroduce CoolDock blue or amber.

## Typography

**Display Font:** Bitcount Prop Single 700 (Mondwest stand-in; drop in `PPMondwest-Regular.woff2` to replace)
**Body Font:** Satoshi 400/500 (Neue Montreal stand-in)
**Label/Mono Font:** Geist Mono

**Character:** A quiet grotesk pitch with bitmap words dropped into short accents. The mix is the signature. Long headings stay in Satoshi.

### Hierarchy
- **Display** (700, 32-80px, 1.15): wordmark, mixed-headline accents, partner line
- **Headline** (400, 32-44px, 1.15): hero and page titles
- **Title** (500, 22-30px): card titles, feature points
- **Body** (400, 14-16px, 1.6, max ~65ch): paragraphs
- **Label** (mono, 12-14px): hero tagline only

**The Short Accent Rule.** Bitmap type is for one or two words. Full sentences stay in Satoshi.

## Layout

Home is a centered 440px hero, then full-bleed marquee, then a 2xl manifesto, then a right-weighted two-card pair, then a testimonial strip, then 1200px project stacks, FAQ, and a 7xl partner field. Inner pages keep a 720px reading column and a 1200px header. Bottom nav is reserved with ~7rem of footer padding. Breakpoints collapse every multi-column block to a single column below 768px.

## Elevation & Depth

Depth comes from stacked ink-tinted shadows, not borders or glass.

### Shadow Vocabulary
- **Primary pill** (`0 1px 2px rgb(5 26 36 / 0.1), 0 4px 4px rgb(5 26 36 / 0.09), 0 9px 6px rgb(5 26 36 / 0.05), inset 0 2px 8px rgb(255 255 255 / 0.5)`): primary and tertiary buttons
- **Secondary pill** (`0 0 0 0.5px rgb(0 0 0 / 0.05), 0 4px 30px rgb(0 0 0 / 0.08)`): secondary buttons
- **Card** (`0 4px 16px rgb(0 0 0 / 0.08)`): light cards, partner field, quotes
- **Nav** (layered ink + inset highlight): floating bottom pill

## Shapes

Pills for every control (`9999px`). Images at 16px. Offer cards and the partner field at 40px. Product screenshots keep their own notch geometry on a `#071016` stage.

## Components

### Buttons
- **Shape:** full pill, 12px 28px
- **Primary:** ink fill, foam text, primary shadow
- **Secondary:** white fill, ink text, secondary shadow, no border
- **Tertiary:** white fill, ink text, primary shadow
- **Label:** Download Halo is the only download verb

### Cards / Containers
- Dark offer card: ink, 40px, foam type
- Light offer card: white, 40px, card shadow
- Quote cards: 32-40px, card shadow

### Navigation
- Home has no top header
- Inner pages: in-flow Halo wordmark plus a single-line text nav
- Bottom nav: white pill, bitmap H, Download Halo
- Footer: Download Halo left, two link columns right

### Product stage
- Near-black rounded-2xl bed, `object-contain`, real PNG captures only

## Do's and Don'ts

### Do:
- **Do** keep the page white from first pixel to last
- **Do** prove the product with `/public/product` and `/public/scene` captures
- **Do** mark testimonials as samples until real quotes exist
- **Do** honor `prefers-reduced-motion` on fade, marquee, and parallax

### Don't:
- **Don't** invent prices, Store URLs, or customer names
- **Don't** bring back CoolDock landscape, rocks, or glass headers
- **Don't** set long sentences in the bitmap face
- **Don't** use em-dashes in visible copy
- **Don't** build fake notch UI from divs
