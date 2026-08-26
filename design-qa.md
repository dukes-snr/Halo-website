# Halo homepage design QA

## Source of truth

- Reference: `E:\code\Github\Halo web\code.html`
- Implementation: `http://localhost:3000/`
- Browser: Microsoft Edge (Chromium), headless visual capture
- Device scale factor: 1
- Final viewports: 1440×1100, 810×1024, 390×844

## Final result

Passed on 2026-08-17.

- The React page hydrates the Framer source runtime, so responsive variants, entrance motion, fixed navigation, media behavior, and mobile-menu animation follow the HTML source.
- Desktop reference and implementation share the same 1440×16437.6 root geometry, 776.06×52.8 navigation, 1325.84px hero, and 1120×533.23 mockup placement.
- Tablet navigation is 776.06×52.8 at x=16.97. Mobile navigation is 350×50 at x=20 and switches from `Phone` to `Phone Open` when activated.
- Intentional differences are limited to Halo/Windows copy and Halo’s internal routes.
- No stale Cooldock/macOS copy, visible SSR breakpoint duplicates, page errors, or app-origin console errors remain in the final captures.

## Interaction checks

- Mobile menu opens and exposes Features, FAQ, Updates, Files & Tray, Media, Pricing, and Download.
- Download links resolve to `/download`.
- Clicking the desktop download CTA reaches `http://localhost:3000/download` with title `Download · Halo`.

## Evidence

- Reference desktop: `%TEMP%\halo-fidelity-after-runtime\reference-desktop.png`
- Final desktop: `%TEMP%\halo-final-audit\desktop.png`
- Reference tablet: `%TEMP%\halo-fidelity-after-runtime\reference-tablet.png`
- Final tablet: `%TEMP%\halo-final-audit\tablet.png`
- Reference mobile: `%TEMP%\halo-fidelity-after-runtime\reference-mobile.png`
- Final mobile: `%TEMP%\halo-final-audit\mobile.png`
- Final mobile menu: `%TEMP%\halo-final-audit\mobile-menu.png`

## Verification commands

- `npx eslint components/marketing/HaloFramerRuntime.tsx components/marketing/HaloFramerHome.tsx lib/haloFramerHtml.ts`
- `npx tsc --noEmit`
- `npm run build`

The production build passed. Next.js emitted one non-blocking warning because it could not generate fallback override values for `Bitcount Prop Single`.

## Updates page redesign

Passed on 2026-08-17.

- The linked reference at `https://www.dock.cool/updates` was captured at 1440×1100 and 390×844 before implementation.
- The React page follows the reference's compact floating navigation, centered title, narrow desktop date/content grid, stacked mobile releases, rounded media, restrained release typography, and generous vertical rhythm.
- Halo's release copy and media come from the current product brief and software captures; no Cooldock release claims were carried into the React page.
- Release entries use scroll-linked position easing without hiding unread content. Hovered release media receives a subtle lift, and reduced-motion preferences disable both effects.
- The mobile menu opens, closes, and exposes every current primary destination.

### Updates evidence

- Reference desktop: `output/playwright/updates-source-desktop.png`
- React desktop: `output/playwright/updates-react-desktop.png`
- Reference mobile: `output/playwright/updates-source-mobile.png`
- React mobile: `output/playwright/updates-react-mobile.png`
- React mobile menu: `output/playwright/updates-react-mobile-menu.png`
- Homepage platform/content check: `output/playwright/site-home-desktop.png`
- AI route desktop/mobile checks: `output/playwright/site-ai-desktop.png`, `output/playwright/site-ai-mobile.png`

## Product video distribution

Passed on 2026-08-17.

- Source directory: `C:\Users\DUKES DAVIS\Documents\Codex\2026-08-13\are-you-capable-of-using-computer\outputs`
- All ten supplied MP4 files were verified as 1728×1080 product recordings. The focused clips run from roughly 10–14 seconds; the broad dynamic-notch demo runs 82 seconds.
- Apps, Bluetooth, Calendar, Clips, Control Center, Media, Notes, and Tray are assigned to their matching feature destinations. The Home recording is used on product/release pages, and the broad dynamic-notch recording covers mascot, assistant, settings, notifications, and release-overview moments.
- Feature media plays only while intersecting the viewport, pauses when scrolled away, loops muted inline, exposes an accessible play/pause control, and remains paused by default under reduced-motion preferences.
- The homepage hero and footer keep their original `code.html` background media.

### Video evidence

- Supplied video inventory: `output/playwright/video-inventory-midpoint.png`
- Homepage hero restoration and lower product-video treatment were browser verified after the media distribution pass.
- Feature route desktop: `output/playwright/video-media-desktop.png`
- Feature route mobile: `output/playwright/video-media-mobile.png`
- Updates page with release videos: `output/playwright/video-updates-desktop.png`

## Windows icon standardization

Passed on 2026-08-17.

- `public/windows-svg.svg` is the single Windows mark used by download actions across the source-driven homepage and React pages.
- React surfaces render it through the shared `WindowsIcon` component. The homepage runtime uses the same asset as a CSS mask so the supplied black SVG inherits the light or dark button color without modifying the source file.
- The restored homepage hero and React feature CTA were visually checked after the replacement.

## Navigation parity

- The homepage navigation remains the visual source of truth: 776.0625×52.796875px on desktop, 350×50px on a 390px phone, 18px corners, translucent white glass, a 10px backdrop blur, and the original inset highlight.
- React pages share those measurements, typography, button treatment, fixed placement, mobile breakpoint, and expanded mobile-menu surface while retaining page-appropriate link labels.
- Homepage desktop content now spans the bar's padded width, placing the Halo identity and download action 10px from the inner edges.

### Navigation evidence

- Homepage desktop: `output/playwright/home-nav-desktop-windows-final.png`
- React feature desktop: `output/playwright/media-nav-desktop-final.png`
- React feature mobile/open menu: `output/playwright/media-nav-mobile-final.png`, `output/playwright/media-nav-mobile-open-final.png`
- Restored homepage footer media and Windows CTA: `output/playwright/home-footer-original-final.png`
