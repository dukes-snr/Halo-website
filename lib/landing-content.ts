/**
 * Copy for the landing route.
 *
 * Every claim here traces back to MARKETING_WEBSITE_CONTENT_BRIEF.md and the
 * shipped-feature inventory in PRODUCT.md. No invented metrics, no
 * testimonials, no live installer URL.
 */

export type RevealRun = { text: string; accent?: boolean };

export const chrome = {
  tagline: "Quiet until it matters,\nthen already there.",
  strap: "& stay in flow",
  copyright: "© 2026 Halo for Windows 11",
  menuLabel: "Open menu",
  links: [
    { href: "/features", label: "Features" },
    { href: "/mascot", label: "Mascot" },
    { href: "/ai", label: "On-device AI" },
    { href: "/media", label: "Media" },
    { href: "/files", label: "Files & Tray" },
    { href: "/control-center", label: "Control Center" },
    { href: "/privacy", label: "Privacy" },
    { href: "/changelog", label: "Changelog" },
  ],
};

export const heroBlock = {
  top: "halo",
  bottom: "for windows",
  eyebrow: "Dynamic Island for Windows 11",
};

/**
 * Which desktop capture the pinned screen is showing. `at` is a normalised
 * document-scroll position, tuned so each swap lands just before the matching
 * section reaches the middle of the viewport.
 */
export const screenBeats = [
  { at: 0, screen: "home" },
  { at: 0.2, screen: "media" },
  { at: 0.36, screen: "shelf" },
  { at: 0.48, screen: "ai" },
  { at: 0.6, screen: "control" },
  { at: 0.76, screen: "apps" },
  { at: 0.92, screen: "home" },
] as const;

export type ScreenKey = (typeof screenBeats)[number]["screen"];

/**
 * Full-desktop captures at native 1919x1199, so the unit's display reads as an
 * actual Windows screen with Halo attached to it — not a cropped product shot
 * floating on a white stage.
 */
export const SCREEN_W = 1919;
export const SCREEN_H = 1199;

export const screens: Record<ScreenKey, { src: string; alt: string }> = {
  home: {
    src: "/assets/halo/desktop/home.png",
    alt: "A Windows 11 desktop with Halo expanded at the top of the screen, showing live media alongside app, calendar, notes and Bluetooth modules",
  },
  media: {
    src: "/assets/halo/desktop/media.png",
    alt: "A Windows 11 desktop with Halo showing the expanded media player, timeline and audio output picker",
  },
  shelf: {
    src: "/assets/halo/desktop/shelf.png",
    alt: "A Windows 11 desktop with Halo showing the Files Tray drop target",
  },
  ai: {
    src: "/assets/halo/desktop/ai.png",
    alt: "A Windows 11 desktop with Halo's AI station open, asking how it can help",
  },
  control: {
    src: "/assets/halo/desktop/control.png",
    alt: "A Windows 11 desktop with Halo's Control Center showing Wi-Fi, Bluetooth, Airplane, volume and brightness",
  },
  apps: {
    src: "/assets/halo/desktop/apps.png",
    alt: "A Windows 11 desktop with Halo's Apps station showing favourite app icons",
  },
};

export const manifesto: RevealRun[] = [
  {
    text: "Halo is a strip of black at the top of your display where media, files, devices, and what's next stay ",
  },
  { text: "one glance away", accent: true },
  { text: " — no window switch, no focus steal, no " },
  { text: "second thought.", accent: true },
];

export const bands = {
  proof: { text: "built on real windows apis", glyph: "⌬" },
  specs: { text: "counted, not claimed", glyph: "✳" },
  close: { text: "your desktop needs a notch", glyph: "☮︎" },
};

export type Proof = {
  id: string;
  /**
   * Which side of the viewport the copy sits on, chosen to be the opposite of
   * wherever the pinned screen parks for this section. `center` means the
   * screen is directly above the copy rather than beside it.
   */
  align: "center" | "left" | "right";
  statement: RevealRun[];
  how: { label: string; body: string };
  hood: { label: string; body: string };
};

export const proofs: Proof[] = [
  {
    id: "media",
    align: "center",
    statement: [
      { text: "Your player lives one glance up. Play, pause, skip and seek " },
      {
        text: "without alt-tabbing away from whatever you were actually doing.",
        accent: true,
      },
    ],
    how: {
      label: "How it works",
      body: "Halo speaks Windows media sessions, so anything that publishes to GSMTC lands in the notch. Album art decodes at high fidelity and scales bicubic, and track changes stay sticky so the strip never blinks empty between songs.",
    },
    hood: {
      label: "Under the hood",
      body: "A compact live strip while music plays, an expanded transport with timeline and seek when you want it. Noisy apps can be excluded so a background video never expands the notch at you.",
    },
  },
  {
    id: "files",
    align: "right",
    statement: [
      { text: "Drag a file onto the notch and it becomes a decision, " },
      {
        text: "not a folder you will rediscover in eight months.",
        accent: true,
      },
    ],
    how: {
      label: "How it works",
      body: "Drop onto Halo and pick an action: Shelf, Share, Open with, Zip, Unzip, Convert, Move to, Copy to, OneDrive, or Music. Up to eight of them sit on the notch at once, chosen in Settings.",
    },
    hood: {
      label: "Under the hood",
      body: "The Files Tray holds references as a temporary shelf. Open them, clear them, or drag them straight back out into Explorer when you are done.",
    },
  },
  {
    id: "ai",
    align: "left",
    statement: [
      { text: "Click the face and talk. It listens on this PC, answers on this PC, " },
      { text: "and stays off until you say otherwise.", accent: true },
    ],
    how: {
      label: "How it works",
      body: "Speech runs on a downloadable Whisper model and free-form answers use an optional Gemma 3 1B. The built-in actions — timers, playback, volume, brightness, radios, calendar, clipboard and apps — need no model at all.",
    },
    hood: {
      label: "Under the hood",
      body: "Sessions start from a face click, Win + Alt + A, the AI station, or a typed command. There is no wake word and nothing is always-listening.",
    },
  },
  {
    id: "native",
    align: "center",
    statement: [
      { text: "It is a native Windows app, not a browser in a trench coat, " },
      { text: "and nothing about you leaves the machine.", accent: true },
    ],
    how: {
      label: "How it works",
      body: ".NET 8 with a WinUI 3 settings shell and a GDI+ layered notch surface. The window is non-activating, so whatever you are typing in keeps keyboard focus while Halo morphs above it.",
    },
    hood: {
      label: "Under the hood",
      body: "Clipboard history is opt-in. Notes, settings and any downloaded models live under your local app data and can be deleted whenever you like. No cloud account is required for the core product.",
    },
  },
];

export type Spec = {
  value: string;
  unit: string;
  body: string;
  source: string;
};

export const specs: Spec[] = [
  {
    value: "10",
    unit: "/ languages",
    body: "Station labels, modules and settings switch together — or just follow Windows.",
    source: "Appearance",
  },
  {
    value: "0",
    unit: "/ cloud accounts",
    body: "Clipboard, notes and settings stay on this PC. Nothing to sign into.",
    source: "Privacy",
  },
  {
    value: "3",
    unit: "/ chrome levels",
    body: "Idle, compact and expanded, with spring-like morphs and no focus steal.",
    source: "Surface",
  },
  {
    value: "10",
    unit: "/ drop actions",
    body: "Shelf, Share, Open with, Zip, Unzip, Convert, Move, Copy, OneDrive, Music.",
    source: "Files",
  },
  {
    value: "1B",
    unit: "/ params, offline",
    body: "An optional Gemma 3 1B answers free-form questions with no network at all.",
    source: "On-device AI",
  },
  {
    value: "3",
    unit: "/ global hotkeys",
    body: "Open Settings, toggle media expand, talk to Halo. All rebindable.",
    source: "Shortcuts",
  },
];

export const endCta = {
  top: "download",
  bottom: "for windows",
  href: "/download",
  note: "Installer coming soon — the download page tracks the build.",
  social: [
    { href: "/changelog", label: "Changelog" },
    { href: "/features", label: "Features" },
    { href: "/privacy", label: "Privacy" },
  ],
};
