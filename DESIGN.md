<!-- impeccable:design-schema 1 -->
---
name: Halo Marketing Site
description: Mist ground, Switzer grotesk, one orange flare, and a real Windows desktop pinned to the viewport. Scroll-driven typing reveal on display type. Adapted from the Midlife Engineering reference.
colors:
  mist: "#EBEBEB"
  mist-deep: "#E2E2E2"
  slate: "#262626"
  slate-soft: "#7D7D7D"
  slate-faint: "#A8A8A8"
  flare: "#FF611A"
  shell: "#0A0A0A"
typography:
  display: Switzer 500 (self-hosted; PP Neue Montreal stand-in)
  body: Switzer 400
  label: Fragment Mono 400
rounded:
  screen: 14-20px
  control: 9999px
components:
  button-primary: slate fill, mist text, full pill, hover flare on shell
  button-secondary: hairline ring slate/20, hover ring + text flare
  nav: sticky mist/85 blur, orange dot mark, quiet 15px links, slate Download pill
  pinned-screen: bare rounded 16:10 desktop capture, deep cast shadow, no bezel
  reveal: binary 0.1 to 1 glyph flip, scrubbed, display type only off the landing route
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

---
## Site Theme — "The Desktop on a Table"

Adapted from the [Midlife Engineering](https://www.midlife.engineering/)
reference and now used by **every** route. Tokens live under `.landing` in
`app/globals.css`; `ChromeGate` applies that class around the header and footer
for ordinary routes, and `LandingShell` applies it on `/`, which carries its own
fixed chrome and closing lockup instead.

The editorial paper system documented above is **retired** — kept here only as
the anti-reference. Do not reintroduce `--paper`, `--ink`, `--line`, Source
Serif display type or the pastel gradient stages on marketing chrome.

**Creative North Star: "one screen, pinned, that the page flows around."**

A single Windows display is fixed to the viewport for the entire page. It
drifts, rescales and swaps its capture on scroll while mist-ground mega type
and body copy move underneath it. No bezel, no chassis, no invented device
furniture — a rounded screen with a deep cast shadow, showing real captures of
Halo running on a real desktop.

### Colours

| Token | Value | Use |
| --- | --- | --- |
| `--mist` | `#EBEBEB` | The page ground. Never white. |
| `--mist-deep` | `#E2E2E2` | Menu toggle well |
| `--slate` | `#262626` | All type |
| `--slate-soft` | `#7D7D7D` | Copyright, source labels |
| `--slate-faint` | `#A8A8A8` | Column labels ("How it works") |
| `--flare` | `#FF611A` | The single accent |
| `--shell` | `#0A0A0A` | Menu-sheet CTA text on flare |

**The One Flare Rule.** Orange is the only chroma on the page: the brand dot
and the emphasis clause in a revealed statement. The blues and yellows inside
the captures are product UI, not marketing colour.

### Typography

- Display and body: **Switzer** 400/500/600/700, self-hosted from
  `public/fonts/`. Stands in for the reference's PP Neue Montreal, which is not
  licensed for redistribution; same neo-grotesk skeleton and tight sidebearings.
- Readouts and micro-labels: **Fragment Mono** 400 — the reference's own mono,
  available on Google Fonts, so this one is an exact match.
- Mega lockup: `.landing-mega`, `clamp(3.25rem, 17.4vw, 17rem)`, weight 500,
  leading `0.84`, tracking `-0.035em`. Sized to bleed the viewport.

### The pinned screen

Sizing is `min(1200px, 62vw, 92vh)`. The `92vh` term matters: a 16:10 panel
sized purely off `vw` overflows the top of a short viewport, and **the notch
lives in the top of the capture**, so the top edge may never leave the frame.
That constraint, not taste, sets the scale floor at 0.86.

Captures render at `quality={100}`. These are screenshots of UI — 8px system
type, 1px hairlines — and the default quality-75 re-encode smears both.

Motion was traced by sampling the reference's own fixed element at 1440x900,
which corrected two assumptions worth recording:

1. It is a **pure translate + scale**. There is no CSS rotation anywhere; the
   tilt people read on that site is painted into its artwork.
2. It **never gets small**. Rendered width stays between 79% and 108% of the
   viewport for the whole page.

Beats come in pairs — arrive, then hold — so the screen is still while a
section is read rather than permanently mid-drift. Transform keyframes are
interpolated by hand from the table in a resident rAF loop; a chained GSAP
timeline does not re-render duplicate hold keyframes reliably under a scrub,
and an event-driven loop that stopped on convergence left the screen a whole
section behind.

**The Dodge Rule.** Every beat that parks the screen against an edge is paired
with a `Proof.align` that puts that section's copy on the opposite half of the
viewport (`left` / `right`), at reading height. When the screen is centred the
copy drops beneath it (`center`). The screen never sits on the words.

**The Narrow Rule.** Below `md` the pinned unit is hidden. A 16:10 desktop
cannot park beside copy on a phone, so each section carries its matching
capture in the flow instead of shrinking the choreography. Hero shows `home`,
the four proof bands show `media` / `shelf` / `ai` / `control`, and the spec
row shows `apps`. Mobile is a stacked figure/caption catalog — screenshot
then its claim, no `min-h-svh` stages — because those viewport holds exist
to clear the pinned screen, and without it they are empty mist.

Per-resolution tuning lives in `tuning()`: at or above 1600px the excursion is
damped to 0.6 (an `x` in viewport widths throws the screen much further out at
1920 than at 1440, leaving a dead gap) and edge beats scale up 1.12x into the
spare room. Below that, the plain undamped 1:1 treatment.

### Other motion

All of it opts out under `prefers-reduced-motion`.

- **Eased scroll** (`useSmoothScroll`) — wheel and keyboard move a target
  offset; a rAF loop lerps `window.scrollY` toward it at `0.11`. Drives native
  scroll rather than a transformed wrapper, because a transformed ancestor
  would break the fixed screen. Skipped on coarse pointers.
- **Typing reveal** (`RevealText`) — see below.
- **Bands** (`Band`) — mega marquee type translated `xPercent 0 → -50` over the
  section's viewport pass. Scroll-driven, not timed.
- **Loader** (`BootScreen`) — see below.
- **Route enter** (`PageTransition`) — see below.

### The loader

The sheet opens near-black. Square tiles land one at a time in a scattered
order until they have paved the viewport in mist, so the screen runs dark to
white as it loads and ends on the page's own ground. A counter rides along,
climbing 0 to 100%.

The counter is **one of the squares**, not a badge sitting on top of them: same
footprint as every other cell, filled flare, count in bold white. It steps
along a single axis at a time — same row or same column, never a diagonal
jump — and only ever onto a square that has not been paved yet at that point in
the fill, so it reads as a tile sliding into open ground rather than a cursor
skittering about. Five hops across the fill, each a 320ms glide.

The grid is measured on the client, so the server renders only the dark field.
Nothing to mismatch on hydration, and the cover is up from the first paint
either way. Values written into tile styles are rounded and use literal hex
rather than `var()`: sub-millisecond precision and CSS vars in a shorthand do
not survive the SSR serialise/re-parse round trip, which trips hydration.

### Route transitions

The incoming page rises in behind a short blur, keyed on pathname so the
wrapper remounts and the animation restarts on every navigation.

Enter-only, and CSS rather than a JS animation driver. React's
`<ViewTransition>` would be the natural fit but is a canary-only export, and
this project pins react 19.2.8. `AnimatePresence mode="wait"` is the obvious
fallback and is a poor one here: it holds the incoming child until the outgoing
one finishes exiting, and the App Router swaps `children` the instant the route
resolves.

**The keyframe carries no `animation-fill-mode`.** Outside the animation's
active period the element falls back to its normal, fully visible styles — so
if animations never run, the worst case is no transition rather than a page
stuck at `opacity: 0`. An inline `opacity: 0` set by a JS driver has no such
floor. Verified by cancelling every animation on the document and confirming
the wrapper still computes to `opacity: 1`.

### The typing reveal

Measured off the reference rather than eyeballed, because two details decide
whether it reads as typing or as a soft fade:

1. **The flip is binary.** Sampling every glyph mid-sweep on the reference
   returns only `0.1` or `1` — never a value in between. The boundary travels
   like a typing cursor, left to right, line after line. Give each glyph a real
   fade instead and dozens sit part-way at once, which reads as whole lines
   resolving in blocks. `RevealText` gets this with a near-zero `duration`
   against a `stagger` that spans the sweep.
2. **Resting opacity is `0.1`**, with colour already final — so an ink glyph
   reads pale grey on the mist and an accent glyph reads pale orange.

Spaces are never dimmed, so word gaps stay stable as the front passes.

**Windows.** `default` is the reference's own: block top at 88% of the viewport
through block top at 42%. `early` (105% → 66%) is for copy sitting directly
beneath the pinned screen — that copy slides under the screen once its top
passes roughly 58%, so the default window would finish out of sight and the
tail of the sentence would never be seen revealing.

**Granularity.** `char` matches the reference exactly and belongs on display
type. `word` gives body copy the same sweep at a fraction of the node count; at
15px the difference is invisible.

**Where to use it.** On the landing page, freely — it is the page's signature.
Everywhere else, **display type only**: the `h1` and section `h2`s. Body copy,
lists and labels on secondary pages stay plain, or the effect stops reading as
emphasis and starts reading as a loading state.


### Structure

Boot sheet → hero lockup → manifesto → band → four proof screens → band →
spec marquee → band → download lockup.

### Do's and Don'ts

- **Do** keep the ground mist and let the captures carry all the colour.
- **Do** pair every edge beat with the opposite copy lane.
- **Don't** let the screen's top edge leave the viewport — it crops the notch.
- **Don't** invent testimonials. Where the reference runs quote cards, this
  page runs `specs` — code-backed counts with a named source.
- **Don't** promise an installer. The closing lockup links to `/download` and
  says the build is not out yet.
- **Don't** leak landing tokens onto the paper routes, or vice versa.
