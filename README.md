# Halo Marketing Site

Next.js marketing site for **Halo**, a Dynamic Island-style activity notch for Windows 11 with a resident mascot (Cloudee) and optional on-device AI.

## Stack

- Next.js 16 (App Router, Turbopack)
- Tailwind CSS v4
- GSAP + ScrollTrigger (scroll choreography)
- Motion (`motion/react`) (micro-interactions, accordion, floats)
- lucide-react + inline SVG icons
- Cloudee procedural avatar (vendored engine, `components/brand/cloudee-avatar.js`)

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Path | Purpose |
|------|---------|
| `/` | Hero with interactive Windows desktop demo (hover/click the notch), stations bento, principles, changelog teaser, FAQ, CTA |
| `/features` | All twelve stations index |
| `/media` `/files` `/control-center` `/calendar` `/notes` `/apps` `/clips` `/bluetooth` `/notifications` `/mascot` `/ai` `/settings` | Feature pages (shared `FeaturePageView`) |
| `/privacy` | Local-first privacy |
| `/download` | Coming-soon download |
| `/changelog` | Updates timeline |

## Structure

- `components/brand/` — Logo (cloud mark), Mascot (procedural Cloudee avatar wrapper), vendored avatar engine
- `components/marketing/` — Hero, NotchDemo (interactive device), StationsSection, PrinciplesBand, ChangelogTeaser, Faq, CtaSection, FeaturePageView, FeatureVideo
- `components/layout/` — SiteHeader (sticker pill nav), SiteFooter, ChromeGate
- `components/ui/` — Button, Reveal (GSAP scroll reveal), ProductShot, Container, WindowsIcon
- `lib/content.ts` — all copy, nav, feature pages, FAQ, changelog

## Design system

Sunny sticker world: sun `#FFD400`, paper `#FFFDF6`, ink `#1B1B20` outlines, Gabarito display + Satoshi body + Geist Mono labels, sticker shadows. Tokens live in `app/globals.css`; the durable system is recorded in `DESIGN.md`.

## Assets

- Product videos: `public/videos/` (real Halo captures)
- Brand: `public/brand/`
- Scene/product screenshots: `public/scene/`, `public/product/`

## Content rules

Copy and claims live in `lib/content.ts`. Download CTA is a placeholder until a Store or installer URL exists. Testimonials are product principles, not invented quotes. The homepage device demo is labeled as interactive demo data; notes/clips persist only in the visitor's browser.
