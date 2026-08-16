# Halo Marketing Site

Next.js marketing site for **Halo**, a Dynamic Island-style activity notch for Windows 11.

## Stack

- Next.js 16 (App Router)
- Tailwind CSS v4
- Motion (`motion/react`)
- GSAP + ScrollTrigger
- Phosphor Icons

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Path | Purpose |
|------|---------|
| `/` | Landing (CoolDock-style structure) |
| `/media` `/files` `/control-center` `/calendar` `/notes` `/apps` `/settings` | Feature pages |
| `/privacy` | Local-first privacy |
| `/download` | Coming-soon download |
| `/changelog` | Updates timeline |

## Assets

- Product screenshots: `public/product/` (from HaloWindow marketing captures)
- Brand: `public/brand/`
- Scene (landscape + rocks): `public/scene/`

## Content

Copy and claims live in `lib/content.ts`, sourced from the Halo marketing brief. Download CTA is a placeholder until a Store or installer URL is set. Testimonials are scaffolded for real quotes.
