export const site = {
  name: "Halo",
  tagline: "A living Dynamic Island for Windows",
  description:
    "Halo is a native Windows activity notch with a resident mascot, media, files, clipboard, devices, calendar, notes, apps, and optional on-device AI.",
};

export const nav = {
  primary: [
    { href: "/features", label: "Features" },
    { href: "/mascot", label: "Mascot" },
    { href: "/ai", label: "AI" },
    { href: "/media", label: "Media" },
    { href: "/files", label: "Files" },
    { href: "/privacy", label: "Privacy" },
  ],
  features: [
    { href: "/mascot", label: "Mascot" },
    { href: "/ai", label: "On-device AI" },
    { href: "/media", label: "Media" },
    { href: "/files", label: "Files & Tray" },
    { href: "/clips", label: "Clips" },
    { href: "/control-center", label: "Control Center" },
    { href: "/bluetooth", label: "Bluetooth" },
    { href: "/calendar", label: "Calendar" },
    { href: "/notes", label: "Notes" },
    { href: "/apps", label: "Apps" },
    { href: "/notifications", label: "Notifications" },
    { href: "/settings", label: "Settings" },
  ],
};

export const hero = {
  headline: "Your Windows desktop finally has a notch worth using.",
  subhead:
    "Hover, expand, drop files, control playback, open apps, check calendar, jot notes, or click the face to talk — without switching windows.",
  tagline: "A face in the notch. Nothing in the way.",
  line1: { plain: "Always available. ", accent: "Never in the way." },
  line2: { plain: "Native Windows. ", accent: "Local-first." },
  paragraphs: [
    "Halo sits at the top of your display as a thin black notch with a resident mascot. When you are idle, it barely exists. When something matters, it expands with the right controls and gets out of the way again.",
    "Media, files, clipboard, devices, calendar, notes, apps, and optional on-device AI use real Windows integrations rather than a web wrapper.",
    "The assistant is opt-in and never always-listening. Start it from a face click, Win + Alt + A, the AI station, or a typed command.",
  ],
  primaryCta: { href: "/download", label: "Download for Windows" },
  secondaryCta: { href: "/mascot", label: "Meet the mascot" },
};

export const stations = [
  {
    href: "/mascot",
    lane: "Mascot",
    title: "Mascot",
    body: "A resident face that blinks, gets curious, reacts to a poke, sleeps, wakes, and can start a private listen session.",
    video: "/videos/halo-dynamic-notch-demo.mp4",
    videoLabel: "Halo's dynamic notch and resident mascot in action",
  },
  {
    href: "/ai",
    lane: "AI",
    title: "On-device AI",
    body: "Whisper listens locally. Built-in actions need no model, and optional Gemma 3 1B answers free-form questions on this PC.",
    video: "/videos/halo-dynamic-notch-demo.mp4",
    videoLabel: "Halo's on-device assistant and dynamic notch workflow",
  },
  {
    href: "/media",
    lane: "Media",
    title: "Media",
    body: "Play, pause, skip, and seek through Windows media sessions. High-fidelity album art stays sticky between tracks.",
    video: "/videos/halo-media.mp4",
    videoLabel: "Halo media controls responding to Windows playback",
  },
  {
    href: "/files",
    lane: "Files",
    title: "Files & Tray",
    body: "Drop files for Shelf, Share, Open with, Zip, Unzip, Convert, Move, Copy, OneDrive, or Music.",
    video: "/videos/halo-tray.mp4",
    videoLabel: "Halo Files Tray workflow",
  },
  {
    href: "/clips",
    lane: "Clips",
    title: "Clips",
    body: "Keep an opt-in, local clipboard history close to the notch and paste previous text without reopening another app.",
    video: "/videos/halo-clips.mp4",
    videoLabel: "Halo Clips clipboard history workflow",
  },
  {
    href: "/control-center",
    lane: "Control",
    title: "Control Center",
    body: "Wi-Fi, Bluetooth, Airplane Mode, volume, brightness, battery, and connected-device status.",
    video: "/videos/halo-control-center.mp4",
    videoLabel: "Halo Control Center in action",
  },
  {
    href: "/bluetooth",
    lane: "Bluetooth",
    title: "Bluetooth",
    body: "See connected devices and open the real Windows Bluetooth surface without leaving the notch.",
    video: "/videos/halo-bluetooth.mp4",
    videoLabel: "Halo Bluetooth device workflow",
  },
  {
    href: "/calendar",
    lane: "Calendar",
    title: "Calendar",
    body: "Week strip, day agenda, and event reminders with Focus, Snooze, Dismiss, and Join.",
    video: "/videos/halo-calendar.mp4",
    videoLabel: "Halo Calendar station in action",
  },
  {
    href: "/notes",
    lane: "Notes",
    title: "Notes",
    body: "Browse, search, and write notes with an autosaving in-notch editor or the larger Halo Notes window.",
    video: "/videos/halo-notes.mp4",
    videoLabel: "Halo Notes workflow",
  },
  {
    href: "/apps",
    lane: "Apps",
    title: "Apps",
    body: "Pin and launch favorites with real package logos and high-resolution Windows shell icons.",
    video: "/videos/halo-apps.mp4",
    videoLabel: "Halo Apps station in action",
  },
];

export const faq = [
  {
    q: "Does Halo steal focus?",
    a: "No. The notch uses a non-activating layered window, so your current app keeps keyboard focus.",
  },
  {
    q: "Is the assistant always listening?",
    a: "No. You start a session with a face click, Win + Alt + A, the AI station, or a typed command.",
  },
  {
    q: "Does talking to Halo send audio to the cloud?",
    a: "No. Speech uses a downloadable on-device Whisper model. Optional Gemma 3 1B handles free-form answers locally; built-in actions work without a model.",
  },
  {
    q: "Where is my data?",
    a: "Settings, opt-in clipboard history, notes, and downloaded models stay under your local Windows app-data folder.",
  },
  {
    q: "Does it work with Spotify and browser media?",
    a: "Yes. Halo controls apps that publish Windows media sessions. Optional Spotify Connect can start playback in Spotify with a user-supplied Client ID and Premium account; Halo does not stream audio.",
  },
  {
    q: "Can I turn off expand on hover?",
    a: "Yes. Open Settings, then Appearance. Reduce Motion is available there too.",
  },
  {
    q: "Can I change the face?",
    a: "Yes. Settings → Halo includes ten authored variants plus body and eye recoloring.",
  },
  {
    q: "Which languages are supported?",
    a: "English, Chinese (Simplified), French, German, Greek, Indonesian, Japanese, Spanish, Korean, Turkish, or Match Windows.",
  },
];

export const testimonials = [
  {
    quote: "Stay quiet at the top of the display until media, a file drop, a meeting, a device change, or the user asks for Halo.",
    name: "Quiet until relevant",
    role: "Product principle",
  },
  {
    quote: "Use native Windows media, audio, files, radios, notifications, Bluetooth, calendar, and local storage instead of wrapping a website.",
    name: "Native Windows",
    role: "Architecture principle",
  },
  {
    quote: "Keep clipboard, notes, settings, speech, and optional language-model answers on this PC and under the user's control.",
    name: "Local-first",
    role: "Privacy principle",
  },
];

export const changelog = [
  {
    date: "Aug 2026",
    version: "Halo assistant",
    title: "A face you can talk to — on device",
    body: "The resident mascot now starts opt-in listen sessions and runs real Halo actions without requiring a language model.",
    bullets: [
      "On-device Whisper models from Tiny through Large v3 and Distil",
      "Optional Gemma 3 1B for local free-form answers",
      "AI station, typed Ask Halo, suggestions, and Win + Alt + A",
      "Timers, media, calendar, clipboard, apps, radios, volume, and brightness actions",
    ],
    video: "/videos/halo-dynamic-notch-demo.mp4",
    videoLabel: "Halo's dynamic notch and assistant workflow",
  },
  {
    date: "Aug 2026",
    version: "Halo personality",
    title: "The mascot moves into the notch",
    body: "Halo is now a living top-of-screen presence instead of an empty pill.",
    bullets: [
      "Ten authored mascot variants with body and eye recoloring",
      "Idle, hover, poke, sleep, wake, boot, and assistant reactions",
      "Face click to poke or talk; empty-bar click opens Home",
      "Reduced-motion support",
    ],
    video: "/videos/halo-home.mp4",
    videoLabel: "Halo Home and resident notch interaction",
  },
  {
    date: "2026",
    version: "Halo core",
    title: "Native Windows notch surfaces",
    body: "Stations and live activities backed by Windows integrations, with no cloud account required for the core product.",
    bullets: [
      "Home, Tray, Clips, Apps, AI, and Settings stations",
      "GSMTC media, Drop Actions, Control Center, Calendar, Notes, Timer, calls, and notifications",
      "Multi-monitor, DPI, fullscreen rules, presentation mode, and rebindable shortcuts",
      "Ten languages and local-first storage",
    ],
    video: "/videos/halo-control-center.mp4",
    videoLabel: "Halo's native Windows Control Center surface",
  },
];

export type FeaturePage = {
  slug: string;
  title: string;
  headline: string;
  body: string;
  video: string;
  videoLabel: string;
  points: { title: string; body: string }[];
};

export const featurePages: FeaturePage[] = [
  {
    slug: "mascot",
    title: "Mascot",
    headline: "A face that lives in the notch.",
    body: "Halo is not an empty pill. A resident mascot peeks from the idle chrome, blinks, gets curious on hover, reacts when you poke it, and occasionally surprises you. Click the face to poke or talk; click the empty bar to open Home.",
    video: "/videos/halo-dynamic-notch-demo.mp4",
    videoLabel: "Halo's resident mascot moving through the dynamic notch",
    points: [
      {
        title: "Ten authored looks",
        body: "Choose Halo, Citrus, Cubee, Cloudee, Freddy, Grok bot, Kirby, Nova, Onee, or Sunee in Settings → Halo.",
      },
      {
        title: "Make the face yours",
        body: "Override body and eye colors, preview official clips, and reset to each variant's authored palette.",
      },
      {
        title: "Alive, not distracting",
        body: "Idle, curious, poke, ambient, sleep, wake, boot, and assistant reactions stay quiet until they are relevant.",
      },
      {
        title: "Motion on your terms",
        body: "Reduce Motion shortens notch morphs and mascot animation throughout the app.",
      },
    ],
  },
  {
    slug: "ai",
    title: "On-device AI",
    headline: "Talk to the notch. It stays on this PC.",
    body: "Enable Assistant and click the face, press Win + Alt + A, open the AI station, or type a command in Settings. Halo listens with an on-device Whisper model, runs built-in actions without a model, and can answer free-form questions with optional Gemma 3 1B.",
    video: "/videos/halo-dynamic-notch-demo.mp4",
    videoLabel: "Halo's on-device assistant and dynamic notch workflow",
    points: [
      {
        title: "Never always-listening",
        body: "A session starts only from a face click, the rebindable hotkey, AI station Listen, or a typed command.",
      },
      {
        title: "Actions without a model",
        body: "Timers, playback, next meeting, clipboard, apps, volume, brightness, Wi-Fi, Bluetooth, Airplane Mode, time, date, and status work directly.",
      },
      {
        title: "Private speech and answers",
        body: "Download a Whisper model for speech and optional Gemma 3 1B for local answers. Models live under local app data and can be removed anytime.",
      },
      {
        title: "Optional Spotify Connect",
        body: "Supply your own Client ID to let voice commands start playback in Spotify. Tokens live in Windows Credential Manager; Halo never streams the audio.",
      },
    ],
  },
  {
    slug: "media",
    title: "Media",
    headline: "Your player, one glance up.",
    body: "Halo speaks Windows media sessions. Play, pause, skip, and seek without alt-tabbing. Album art renders in high fidelity, and track changes stay sticky so the notch never flashes idle between songs.",
    video: "/videos/halo-media.mp4",
    videoLabel: "Halo media controls responding to Windows playback",
    points: [
      { title: "Compact live strip", body: "Title, artwork, equalizer, and progress edge appear while music plays." },
      { title: "Expanded player", body: "Artwork, transport, timeline seek, shuffle, and favorite affordances in the larger surface." },
      { title: "Media exclusions", body: "Ignore selected apps so browser videos or noisy sessions never take over the notch." },
      { title: "Spotify Connect", body: "Optionally start playback in Spotify through its player API; Halo controls playback but does not stream audio." },
    ],
  },
  {
    slug: "files",
    title: "Files & Tray",
    headline: "Drop it on the notch.",
    body: "Drag files from Explorer onto Halo and choose Shelf, Share, Open with, Zip, Unzip, Convert, Move to, Copy to, OneDrive, or Music. Keep temporary references in the Files Tray and drag them back out when needed.",
    video: "/videos/halo-tray.mp4",
    videoLabel: "Halo Files Tray and drop workflow",
    points: [
      { title: "Configurable Drop Actions", body: "Choose up to eight favorite actions in Settings → Appearance." },
      { title: "Files Tray", body: "Open, remove, clear, or drag temporary file references back into Explorer." },
      { title: "Clips", body: "Clipboard history is opt-in and stored locally on this PC." },
      { title: "Real file operations", body: "Halo delegates to native Windows share, shell, archive, conversion, and OneDrive paths." },
    ],
  },
  {
    slug: "control-center",
    title: "Control Center",
    headline: "Battery is a door.",
    body: "Click time and battery to open Wi-Fi, Bluetooth, Airplane Mode, volume, and brightness — live sliders and real Windows radios in one glanceable surface.",
    video: "/videos/halo-control-center.mp4",
    videoLabel: "Halo Control Center with native Windows controls",
    points: [
      { title: "Power HUD", body: "Charging, low, and critical pulses appear when battery state changes." },
      { title: "Volume and brightness", body: "Compact HUDs follow Core Audio and display-level changes." },
      { title: "Bluetooth devices", body: "See connected devices and best-effort battery percentage when hardware reports it." },
      { title: "Audio endpoint", body: "Halo responds when Windows changes the default output device." },
    ],
  },
  {
    slug: "bluetooth",
    title: "Bluetooth",
    headline: "Your devices, right above the window.",
    body: "Open Bluetooth from Halo, see the current radio state and connected devices, then jump into the native Windows device surface when you need deeper controls.",
    video: "/videos/halo-bluetooth.mp4",
    videoLabel: "Halo Bluetooth device workflow",
    points: [
      { title: "Real Windows radio", body: "Halo reads and changes the native Bluetooth radio instead of simulating a toggle." },
      { title: "Connected devices", body: "See paired hardware that Windows currently reports as connected." },
      { title: "Best-effort battery", body: "Battery percentage appears only when the device and Windows expose trustworthy data." },
      { title: "Native handoff", body: "Open the Windows Bluetooth surface for pairing, removal, and advanced device management." },
    ],
  },
  {
    slug: "calendar",
    title: "Calendar",
    headline: "What's next, without Outlook in the way.",
    body: "See the week, today's agenda, and event reminders using the Windows appointment store when permission is available. Join appears when a meeting link is present.",
    video: "/videos/halo-calendar.mp4",
    videoLabel: "Halo Calendar week and agenda workflow",
    points: [
      { title: "Week strip", body: "Glance across the week without opening a full calendar window." },
      { title: "Event Reminder", body: "Focus, Snooze, Dismiss, and Join appear in a live activity before the meeting." },
      { title: "Fifteen-minute lead", body: "The default reminder lead time is fifteen minutes and can be tuned in Settings." },
      { title: "Windows appointments", body: "Halo uses the local appointment store, not a Microsoft Graph multi-account service." },
    ],
  },
  {
    slug: "notes",
    title: "Notes",
    headline: "Capture without leaving flow.",
    body: "Browse and search notes on the notch, then write in an in-notch editor with title, body, checklist, and autosave. Open Halo Notes when you want a larger WinUI surface.",
    video: "/videos/halo-notes.mp4",
    videoLabel: "Halo Notes editor workflow",
    points: [
      { title: "Notch list", body: "Search, scan, create, and reopen notes without leaving the current app." },
      { title: "In-notch editor", body: "Title, body, checklists, autosave, and a back action that returns to the list." },
      { title: "Larger Notes window", body: "Continue longer writing sessions in the dedicated WinUI editor." },
      { title: "Local by default", body: "Notes stay under %LocalAppData%\\Halo\\notes with no cloud account required." },
    ],
  },
  {
    slug: "clips",
    title: "Clips",
    headline: "Copy now. Find it again later.",
    body: "Enable clipboard history when you want it. Halo keeps recent text clips on this PC, makes them searchable from the notch, and lets you place an earlier value back on the Windows clipboard in one click.",
    video: "/videos/halo-clips.mp4",
    videoLabel: "Halo Clips clipboard history workflow",
    points: [
      { title: "Opt-in by design", body: "Clipboard history remains off until you explicitly enable it in Settings." },
      { title: "Local storage", body: "Clip history stays under Halo's local app data and is never synced to a cloud account." },
      { title: "Fast reuse", body: "Search recent text, choose a previous value, and place it back on the system clipboard." },
      { title: "Clear control", body: "Remove individual items or clear the stored history whenever you want." },
    ],
  },
  {
    slug: "apps",
    title: "Apps",
    headline: "Real icons. Real launches.",
    body: "Pin the apps you actually use. Halo reads package logos and Windows shell icons so favorite tiles remain sharp, transparent, and recognizable in the notch.",
    video: "/videos/halo-apps.mp4",
    videoLabel: "Halo Apps station launching Windows apps",
    points: [
      { title: "Favorites", body: "Pin and launch the apps you use most from Home or the Apps station." },
      { title: "High-resolution icons", body: "Package logos and shell artwork scale cleanly, including transparent non-square icons." },
      { title: "Quick Controls", body: "Keep mute and favorite actions close without opening another window." },
      { title: "Assistant actions", body: "Ask Halo to open, close, or minimize applications from a listen or typed session." },
    ],
  },
  {
    slug: "notifications",
    title: "Notifications",
    headline: "Respond without losing the window.",
    body: "Halo presents compact notification activity and a dedicated notification center. Compose a reply or choose a reaction; Halo stages the draft through the clipboard or a supported compose URI.",
    video: "/videos/halo-dynamic-notch-demo.mp4",
    videoLabel: "Halo's dynamic notch presenting live Windows activity",
    points: [
      { title: "Compact activity", body: "Important notifications appear in the notch without taking keyboard focus." },
      { title: "Notification center", body: "Review recent activity in a dedicated Halo window." },
      { title: "Reply composer", body: "Write a response and hand the draft to the target app's supported compose path." },
      { title: "Reactions", body: "Choose a reaction quickly while keeping the final send behavior honest and app-dependent." },
    ],
  },
  {
    slug: "settings",
    title: "Settings",
    headline: "Make Halo fit your desktop.",
    body: "Tune the surface, target display, appearance, mascot, AI, activities, notifications, media, shelf, shortcuts, fullscreen rules, privacy, performance, updates, and ten-language interface in a native WinUI 3 window.",
    video: "/videos/halo-dynamic-notch-demo.mp4",
    videoLabel: "Halo's dynamic notch and native Windows surfaces",
    points: [
      { title: "Display and calibration", body: "Choose a sticky target monitor with DPI-aware geometry and calibration." },
      { title: "Fullscreen rules", body: "Hide, always show, suppress presentations, or define foreground-app overrides." },
      { title: "Themes and accents", body: "Light, Dark, or Match Windows with violet plus blue, pink, red, orange, yellow, and green accents." },
      { title: "Shortcuts and languages", body: "Rebind Settings, media expand, and Talk to Halo. Choose ten languages or Match Windows." },
    ],
  },
];
