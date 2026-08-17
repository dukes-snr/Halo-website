# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: Next.js App Router, Tailwind v4, Motion (`motion/react`), GSAP + ScrollTrigger, Phosphor icons. Chosen per explicit user request for a Next.js marketing site with GSAP and Framer Motion.

## Users

Windows power users who want glanceable media, files, device status, calendar, and apps without leaving the current window.

## Product Purpose

Halo is a Dynamic Island-style activity notch for Windows. It lives at the top center of the display as a pure-black attached notch and expands for media, file drops, clipboard, devices, calendar, notes, and favorite apps.

## Positioning

Native Windows 11 app (.NET 8 + WinUI 3 settings; GDI+ layered notch) with real OS integrations (GSMTC media, Core Audio, Bluetooth, Windows Calendar, notifications). Not an Electron wrapper. Competitive frame: Mac notch utilities, purpose-built for Windows.

## Operating Context

Marketing website that persuades visitors to download Halo for Windows. Primary success action is Download (currently coming soon / placeholder URL). Content must stay code-backed and match the marketing brief in HaloWindow docs.

## Capabilities and Constraints

Confirmed product surfaces: Home dashboard, Files Tray, Clips (clipboard history opt-in), Apps favorites, Settings, media compact/expanded player, Control Center, battery HUD, Bluetooth strip, Drop Actions, Calendar + event reminders, Notes, Timer, calls, notifications, multi-monitor + DPI, fullscreen policies, 10 languages, local-first privacy.

Do not claim: cloud note sync, AirDrop/Continuity Camera, Pomodoro/Quotes/News as full products, Graph multi-account calendar, perfect BT battery for all devices, mobile/macOS apps.

Download CTA is placeholder until a real Store or installer URL is provided. Testimonials are a scaffold for user-supplied quotes.

## Brand Commitments

- Name: Halo
- Visual pin: Viktor Oddy studio page adapted for Halo. White canvas, ink `#051A24`, Satoshi body, bitmap display accents, layered pill shadows, product marquee, floating bottom nav
- Product UI chrome is the real black notch on dark product stages
- Logo assets: packaging/Assets (HaloIcon, StoreLogo)
- Download CTA is placeholder until a Store or installer URL exists

## Evidence on Hand

- Marketing brief: `E:\code\HaloWindow\docs\marketing-site\MARKETING_WEBSITE_CONTENT_BRIEF.md`
- White-stage product screenshots: `E:\code\HaloWindow\docs\marketing-site\screenshots\`
- Brand icons: `E:\code\HaloWindow\packaging\Assets\`
- CoolDock structure references (screenshots in Downloads)
- No real customer testimonials or pricing on hand yet

## Product Principles

1. Quiet until relevant: marketing should feel calm and product-led, not hype-heavy.
2. Prove with real product chrome: use authentic screenshots, never fake-div notch UI.
3. Native and local-first: privacy and Windows integration are trust pillars.
4. Glanceable craft: show the notch doing work in one viewport.
5. Honest claims only: no invented metrics, customers, or unshipped features.

## Accessibility & Inclusion

Marketing site targets WCAG AA contrast. Honor `prefers-reduced-motion`. English first; product supports ten languages plus Match Windows.
