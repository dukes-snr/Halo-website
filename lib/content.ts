export const site = {
  name: "Halo",
  tagline: "Dynamic Island for Windows",
  description:
    "Halo is a resident activity notch for Windows. Media, files, devices, calendar, and apps without switching windows.",
};

export const nav = {
  primary: [
    { href: "/#stations", label: "Features" },
    { href: "/#faq", label: "FAQ" },
    { href: "/changelog", label: "Updates" },
    { href: "/files", label: "Files & Tray" },
    { href: "/media", label: "Media" },
    { href: "/privacy", label: "Privacy" },
  ],
  features: [
    { href: "/media", label: "Media" },
    { href: "/files", label: "Files & Tray" },
    { href: "/control-center", label: "Control Center" },
    { href: "/calendar", label: "Calendar" },
    { href: "/notes", label: "Notes" },
    { href: "/apps", label: "Apps" },
    { href: "/settings", label: "Settings" },
  ],
};

export const hero = {
  headline: "Your Windows desktop finally has a notch worth using.",
  subhead:
    "Halo is a Dynamic Island for Windows: media, files, devices, and calendar without switching windows.",
  primaryCta: { href: "/download", label: "Download for Windows" },
  secondaryCta: { href: "/#stations", label: "See features" },
};

export const stations = [
  {
    href: "/media",
    title: "Media",
    body: "Play, pause, skip, and seek via Windows media sessions. High-fidelity album art stays sticky between tracks.",
    image: "/scene/implementation-media-expanded.png",
  },
  {
    href: "/files",
    title: "Files & Tray",
    body: "Drop files on the notch for Shelf, Share, Open with, Zip, convert, OneDrive, or Music.",
    image: "/scene/implementation-tray-populated.png",
  },
  {
    href: "/control-center",
    title: "Control Center",
    body: "Wi-Fi, Bluetooth, Airplane Mode, volume, and brightness. Live sliders, real radios.",
    image: "/scene/implementation-call.png",
  },
  {
    href: "/calendar",
    title: "Calendar",
    body: "Week strip, day agenda, and event reminders with Join when a meeting link is present.",
    image: "/scene/implementation-timer.png",
  },
  {
    href: "/notes",
    title: "Notes",
    body: "Browse notes on the notch. Edit fully in a lightweight Halo Notes window. Local and yours.",
    image: "/scene/implementation-notification-reply.png",
  },
  {
    href: "/apps",
    title: "Apps",
    body: "Pin the apps you use. Real package logos and shell icons, high resolution.",
    image: "/scene/implementation-apps.png",
  },
];

export const faq = [
  {
    q: "Does Halo steal focus?",
    a: "No. The notch uses a non-activating layered window so your current app keeps keyboard focus.",
  },
  {
    q: "Where is my data?",
    a: "Settings, clipboard history (if enabled), and notes stay on this PC under your local app data folder.",
  },
  {
    q: "Does it work with Spotify and browser media?",
    a: "Yes, via Windows media sessions (GSMTC) for apps that publish them.",
  },
  {
    q: "Can I turn off expand on hover?",
    a: "Yes. Settings, then Appearance.",
  },
  {
    q: "Which languages are supported?",
    a: "Ten languages plus Match Windows: English, Chinese (Simplified), French, German, Greek, Indonesian, Japanese, Spanish, Korean, and Turkish.",
  },
];

/** Scaffold: replace with real quotes when available. */
export const testimonials = [
  {
    quote:
      "I keep Halo up all day for media and file drops. It stays out of the way until I need it.",
    name: "Your name here",
    role: "Windows power user",
    placeholder: true,
  },
  {
    quote:
      "Finally a notch utility that talks to real Windows media sessions instead of a web wrapper.",
    name: "Your name here",
    role: "Developer",
    placeholder: true,
  },
  {
    quote:
      "Calendar reminders in the notch mean I join meetings without hunting Outlook.",
    name: "Your name here",
    role: "Product manager",
    placeholder: true,
  },
];

export const changelog = [
  {
    date: "Aug 2026",
    version: "Halo marketing site",
    title: "Marketing site launch",
    body: "Public site for Halo: product story, feature pages, privacy, and download placeholder.",
    bullets: [
      "Landing page with real product screenshots",
      "Feature routes for media, files, control center, calendar, notes, apps, settings",
      "Privacy and download pages",
      "Updates timeline scaffold",
    ],
    image: "/scene/implementation-nook.png",
  },
  {
    date: "2026",
    version: "Halo core",
    title: "Native Windows notch surfaces",
    body: "Shipped stations and live activities backed by Windows integrations.",
    bullets: [
      "Home, Tray, Clips, Apps stations",
      "GSMTC media compact and expanded player",
      "Drop Actions and Files Tray",
      "Control Center, Calendar, Notes, Timer",
      "Ten languages and local-first privacy",
    ],
    image: "/scene/implementation-media-expanded.png",
  },
];

export type FeaturePage = {
  slug: string;
  title: string;
  headline: string;
  body: string;
  image: string;
  points: { title: string; body: string }[];
};

export const featurePages: FeaturePage[] = [
  {
    slug: "media",
    title: "Media",
    headline: "Your player, one glance up.",
    body: "Halo speaks Windows media sessions. Play, pause, skip, and seek without alt-tabbing. Album art renders in high fidelity with smooth scaling.",
    image: "/scene/implementation-media-expanded.png",
    points: [
      {
        title: "Compact live strip",
        body: "Title, art, EQ, and progress edge while music plays.",
      },
      {
        title: "Expanded player",
        body: "Artwork, transport, timeline seek, shuffle and favorite affordances.",
      },
      {
        title: "Sticky track change",
        body: "Avoids idle flash between tracks so the notch stays continuous.",
      },
    ],
  },
  {
    slug: "files",
    title: "Files & Tray",
    headline: "Drop it on the notch.",
    body: "Drag files from Explorer onto Halo to choose an action: hold them on the Shelf, Share, Open with, Zip, convert images, send to OneDrive, or open in Music.",
    image: "/scene/implementation-tray-populated.png",
    points: [
      {
        title: "Drop Actions",
        body: "Configurable actions in Settings. Up to eight favorites on the notch.",
      },
      {
        title: "Files Tray",
        body: "Temporary shelf for dragged files. Open, remove, clear, drag out to Explorer.",
      },
      {
        title: "Clips",
        body: "Clipboard history is opt-in and stored locally on this PC.",
      },
    ],
  },
  {
    slug: "control-center",
    title: "Control Center",
    headline: "Battery is a door.",
    body: "Click time and battery to open device quick settings: Wi-Fi, Bluetooth, Airplane Mode, volume, and brightness with live sliders and real radios.",
    image: "/scene/implementation-call.png",
    points: [
      {
        title: "Battery HUD",
        body: "Charging, low, and critical pulses when power state changes.",
      },
      {
        title: "Bluetooth devices",
        body: "Connected device strip with battery percent when the device reports it.",
      },
      {
        title: "Audio endpoint",
        body: "Responds to default audio device changes from Windows.",
      },
    ],
  },
  {
    slug: "calendar",
    title: "Calendar",
    headline: "What's next, without Outlook in the way.",
    body: "See the week, today's agenda, and event reminders with Join when a meeting link is present. Uses the Windows appointment store when permitted.",
    image: "/scene/implementation-timer.png",
    points: [
      {
        title: "Week strip",
        body: "Glance the week without opening a full calendar window.",
      },
      {
        title: "Event Reminder",
        body: "Live activity with Focus, Snooze, Dismiss, and Join meeting.",
      },
      {
        title: "Local appointments",
        body: "Windows appointment store. Not multi-account Microsoft Graph.",
      },
    ],
  },
  {
    slug: "notes",
    title: "Notes",
    headline: "Capture without leaving flow.",
    body: "Browse notes on the notch. Create new notes quickly. Edit fully in a lightweight Halo Notes window. Stored under local app data.",
    image: "/scene/implementation-notification-reply.png",
    points: [
      {
        title: "Notch list",
        body: "Scan and open notes without leaving your current app.",
      },
      {
        title: "Full editor",
        body: "WinUI Notes window for longer writing sessions.",
      },
      {
        title: "Local only",
        body: "No cloud account required. Notes stay on this PC.",
      },
    ],
  },
  {
    slug: "apps",
    title: "Apps",
    headline: "Real icons. Real launches.",
    body: "Pin the apps you actually use. Halo uses package logos and shell icons so tiles look like Windows, with transparency for non-square icons.",
    image: "/scene/implementation-apps.png",
    points: [
      {
        title: "Favorites",
        body: "Launch and pin apps from the Home station.",
      },
      {
        title: "High-resolution icons",
        body: "Shell and package logos scaled for the notch.",
      },
      {
        title: "Quick Controls",
        body: "Mute and favorites strip for common actions.",
      },
    ],
  },
  {
    slug: "settings",
    title: "Settings",
    headline: "Make Halo fit your desktop.",
    body: "Appearance, hover expand, drop actions, display target, fullscreen policy, shortcuts, language, and autostart. Full Settings window from the gear.",
    image: "/scene/implementation-nook.png",
    points: [
      {
        title: "Multi-monitor + DPI",
        body: "Sticky target display with DPI-aware geometry.",
      },
      {
        title: "Fullscreen policy",
        body: "Hide, always show, or process overrides.",
      },
      {
        title: "Languages",
        body: "Ten languages or Match Windows across stations and modules.",
      },
    ],
  },
];
