# Design System - Halo Marketing Site

<!-- impeccable:design-schema 1 -->

## Authority

Built world for the Halo Windows marketing site. Visual pin: CoolDock landing structure + tokens from extracted Design.md, product truth from Halo marketing brief. Light marketing chrome with one intentional dark product showcase band.

## Mode

Persuade (product marketing).

## Palette

| Token | Value | Role |
|-------|-------|------|
| primary-500 | `#0000ee` | CTAs, links, timeline dots |
| primary-600 | `#0000d6` | Hover / body links |
| accent-500 | `#f59e0b` | Sparse sparkle (stars only) |
| neutral-50 | `#f7f7f7` | Page background |
| neutral-900 | `#333333` | Body text |
| neutral-950 | `#000000` | Headings / product black stages |
| white | `#ffffff` | Cards and product stages |

Color strategy: **Restrained** neutrals + primary blue. Amber is accent only, never a second CTA color.

## Typography

- **Family:** Inter via `next/font` (`--font-inter`) for display and body (closest available match to Design.md Inter Display)
- **Base size:** `0.938rem`
- **Display:** `text-4xl` → `text-5xl` / `3.5rem` hero, semibold, tracking-tight
- **Body:** neutral-600/700, max measure ~xl on marketing subcopy

## Shape & elevation

- Radii: sm `0.5rem`, md `1.125rem`, lg `1.25rem`, xl `1.875rem`, full pills for CTAs
- Cards: soft shadow `0 4px 24px -4px rgb(0 0 0 / 0.08)` + light border
- Product stages: white rounded stage with deeper card shadow
- Corner system: soft rounded marketing chrome; product screenshots keep black notch geometry

## Layout topology

1. Sticky light header (≤64px)
2. Hero: landscape atmosphere + dual rocks + floating product stage
3. Proof, stations grid, personalization, testimonials scaffold
4. Dark showcase band (single theme switch)
5. Download CTA with rocks
6. FAQ accordion
7. Footer with landscape band + giant wordmark

Feature routes share a centered claim + product stage + three point cards template. Changelog mirrors CoolDock Updates: vertical timeline with version markers and product captures.

## Motion

| Moment | Tool | Behavior |
|--------|------|----------|
| Hero parallax | GSAP ScrollTrigger | Landscape, rocks, notch scrub on scroll |
| Hero entrance | Motion | Opacity/y spring-in |
| Section reveal | Motion `whileInView` | Once, 0.7s ease-out |
| FAQ | React state | Accordion expand |
| Reduced motion | both | Disable scrub and entrance offsets |

GSAP and Motion never share the same component tree (Hero uses GSAP+Motion for distinct elements with cleanup; SectionReveal is Motion-only leaves).

## Materials

- `/public/scene/hero-landscape.jpg` - generated golden-hour mountains
- `/public/scene/rock-left.jpg`, `rock-right.jpg` - generated rocks with CSS radial mask for cutout feel
- `/public/product/*` - real Halo white-stage screenshots
- `/public/brand/*` - Halo icons from packaging

## Components

- `SiteHeader` / `SiteFooter`
- `Hero`, `ProofSection`, `FeatureStations`, `MakeYours`, `Testimonials`, `ProductShowcase`, `DownloadCta`, `Faq`
- `FeaturePageView` for feature routes
- `Button`, `Container`, `SectionReveal`

## Anti-patterns avoided

- No inventing pricing, Store URL, or real customer claims
- Testimonials marked as placeholders
- No fake-div product UI; real PNG captures only
- No em-dashes in site copy
- No scroll cue labels

## Open handoffs

- Wire real download URL when available
- Replace testimonial placeholders with real quotes
- Optional: transparent PNG rocks (current assets use CSS mask over studio photos)
