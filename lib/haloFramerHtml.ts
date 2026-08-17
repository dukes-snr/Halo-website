import { readFileSync } from "node:fs";
import { join } from "node:path";

// ponytail: Framer SSR HTML is the design. We swap copy and keep the DOM.

const COPY: [string, string][] = [
  [
    "Cooldock brings music, todos, events, weather, search, stats, quick actions, and more useful widgets into one beautiful live dock beside your original Mac Dock.",
    "Halo brings media, files, devices, calendar, notes, and apps into one resident activity notch at the top of your Windows desktop.",
  ],
  [
    "Add live widgets, quick actions, apps, folders, search, stats, weather, calendars, reminders, and more into a beautiful second Dock beside your original Mac Dock.",
    "Add media, files, tray, control center, calendar, notes, and favorite apps into a resident notch on Windows 11.",
  ],
  [
    "Add live widgets, quick actions, search, stats, weather, music, todos, and more to a beautiful second Dock built for your daily workflow.",
    "Add media, files, devices, calendar, notes, and apps to a native Windows notch built for your daily workflow.",
  ],
  [
    "Customize every detail with beautiful wallpapers from",
    "Tune appearance, hover expand, drop actions, display target, and language in",
  ],
  [
    ", useful widgets, multiple Dock profiles, floating layouts, and flexible styling options. Build a Dock that perfectly fits the way you use your Mac.",
    ". Settings stay local. The notch stays out of the way until you need it.",
  ],
  [
    "Everything you need to know about CoolDock, your useful second Dock for live widgets, apps, folders, and quick actions.",
    "Everything you need to know about Halo, the Dynamic Island for Windows.",
  ],
  [
    "Try it risk-free. If Cooldock doesn’t fit your workflow, email us within 14 days and we’ll refund your purchase.",
    "Public installer coming soon. Halo is a native Windows 11 app, not a web wrapper.",
  ],
  [
    "Get lifetime access to Cooldock on your Mac.",
    "Download Halo for Windows 11.",
  ],
  [
    "Open your favorite apps, organize folders, save bookmarks, search files, hold temporary files in File Shelf, access downloads, switch apps, and keep everything important one Dock away.",
    "Play, pause, skip, and seek via Windows media sessions. Drop files on the notch for Shelf, Share, Open with, Zip, convert, or OneDrive.",
  ],
  [
    "Includes: Apps &amp; Folders, Bookmarks, File Shelf, Files &amp; Downloads, Search, App Switcher, Dropbox.",
    "Includes: Media player, Files Tray, Drop Actions, Clips, Apps.",
  ],
  [
    "Stay on top of your day with todos, reminders, Pomodoro timers, hydration reminders, calendar events, meetings, progress trackers, clocks, and quick notes.",
    "See the week, today’s agenda, and event reminders with Join when a meeting link is present. Browse notes on the notch.",
  ],
  [
    "Includes: Pomodoro, Drink Water, Calendar &amp; Meetings, Reminders &amp; Todos, Progress, Time Widgets, Notes, Mail.",
    "Includes: Calendar, Event Reminder, Notes, Timer.",
  ],
  [
    "Control your Mac faster with live system stats, quick toggles, audio controls, clipboard access, screenshots, voice memos, emoji, weather, photos, and media controls.",
    "Wi-Fi, Bluetooth, Airplane Mode, volume, and brightness. Live sliders, real radios, battery HUD.",
  ],
  [
    "Includes: System Stats, Quick Toggles, Audio Controls, Clipboard, Screenshots, Voice Memo, Emoji, Weather, Photos, Now Playing.",
    "Includes: Control Center, Battery HUD, Bluetooth strip, Audio endpoint.",
  ],
  [
    "Pick colors, convert currencies and units, calculate values, save useful links, capture ideas, and reuse everyday tools without opening extra apps.",
    "Clipboard history is opt-in and stored locally. Notifications and replies stay on the notch.",
  ],
  [
    "Includes: Color Picker, Converter, Bookmarks, Notes, Clipboard, Screenshots.",
    "Includes: Clips, Notifications, Notes.",
  ],
  [
    "Track revenue, sales, followers, website analytics, link performance, email activity, payments, and ecommerce metrics from one beautiful Dock.",
    "Incoming calls, connected call chrome, and event reminders with Focus, Snooze, Dismiss, and Join.",
  ],
  [
    "Includes: Revenue, Social Followers, Website Analytics, Shopify, Resend, Dub, Dodo Payments, Polar, Plausible, DataFast.",
    "Includes: Calls, Event Reminder, Calendar.",
  ],
  [
    "Monitor your tools, projects, databases, issues, deployments, and backend services with live widgets built for makers and developers.",
    "Appearance, hover expand, drop actions, display target, fullscreen policy, shortcuts, language, and autostart.",
  ],
  [
    "Includes: GitHub, Linear, Supabase, Dropbox, Resend, Dub, Website Analytics.",
    "Includes: Multi-monitor, DPI, ten languages, Match Windows.",
  ],
  [
    "Supaste saves your clipboard and screenshots in a beautiful visual history, automatically grouped by type, app, and custom categories, so you can search, find, and paste anything back in seconds.",
    "Clips keeps opt-in clipboard history on this PC. Notes stay local under your app data folder.",
  ],
  [
    "Amazing. Great job! I’ve replaced my default dock entirely already. This is the kind of dock Apple should have built!",
    "I keep Halo up all day for media and file drops. It stays out of the way until I need it.",
  ],
  [
    '""Such a cool app! So many useful widgets. The profiles is a nice touch too!""',
    "Finally a notch utility that talks to real Windows media sessions instead of a web wrapper.",
  ],
  [
    '"Usually you have to choose between functional, fast, or sexy.',
    '"Native Windows 11. Real media sessions, real file drops, real calendar.',
  ],
  [
    "With CoolDock, it's all three — AND customizable.",
    "Halo talks to the OS, not a web wrapper.",
  ],
  [
    "I've tried every productivity and dock replacement app out there, and none of them ever felt right. But I always believed someone could get it right — and this is it.",
    "Calendar reminders in the notch mean I join meetings without hunting Outlook.",
  ],
  [
    "I've been looking for something that's beautiful, functional, and gives me superpowers on my Mac. CoolDock is the trifecta.\"",
    'Glance up. Stay in the window you are in."',
  ],
  [
    '"Amazing. Great job! I’ve replaced my default dock entirely already. This is the kind of dock Apple should have built!"',
    '"I keep Halo up all day for media and file drops. It stays out of the way until I need it."',
  ],
  [
    '"…Also, you should seriously charge more for this. Once all the rough edges get smoothened out, this is easily a $50 product."',
    '"Album art stays sticky between tracks. The notch never flashes idle."',
  ],
  [
    '"Love. Purchased both of these. I’m really impressed with widgets. I wish to have widget for Structured and I’ll be the happiest person"',
    '"Drop files on the notch. Shelf, Share, Zip, convert. No Explorer detour."',
  ],
  [
    "Real feedback from people using Cooldock every day.",
    "Halo stays out of the way until you need it.",
  ],
  ["A useful Dock for live widgets.", "A useful notch for Windows."],
  ["Everything useful, one Dock away", "Everything useful, one glance away"],
  ["Widgets for everything you do", "Stations for everything you do"],
  [
    "From apps and folders to weather, music, todos, files, stats, search, and quick actions.",
    "From media and files to devices, calendar, notes, apps, and control center.",
  ],
  ["Make your Dock truly yours", "Make your notch truly yours"],
  ["Make your Mac Dock more useful", "Make your Windows desktop more useful"],
  ["Loved by Mac Users", "Built for Windows users"],
  ["Your smart second Dock", "Your Windows island"],
  ["Customizable second Dock", "Customizable notch"],
  ["macOS Sonoma 14.0 or later", "Windows 11 or later"],
  ["Download for macOS", "Download for Windows"],
  ["Cooldock app for macOS", "Halo app for Windows"],
  ["Native macOS app", "Native Windows 11 app"],
  ["Apps, Files &amp; Quick Access", "Media, Files &amp; Tray"],
  ["Productivity &amp; Daily Focus", "Calendar, Notes &amp; Timer"],
  ["Mac Controls &amp; System Tools", "Control Center &amp; Devices"],
  ["Creator &amp; Utility Widgets", "Clips &amp; Notifications"],
  ["Founder &amp; Business Widgets", "Calls &amp; Reminders"],
  ["Developer &amp; Startup Widgets", "Settings &amp; Languages"],
  ["Does CoolDock replace my original Mac Dock?", "Does Halo steal focus?"],
  ["What can I add to CoolDock?", "What lives in Halo?"],
  ["Which macOS versions are supported?", "Which Windows versions are supported?"],
  ["Is CoolDock private?", "Where is my data?"],
  ["Is CoolDock a one-time purchase?", "Can I turn off expand on hover?"],
  ["Does CoolDock need permissions?", "Does it work with Spotify?"],
  ["Can I customize CoolDock?", "Can I customize Halo?"],
  ["Does CoolDock work on multiple displays?", "Does Halo work on multiple displays?"],
  ["Can I use CoolDock with my original Dock hidden?", "Which languages are supported?"],
  ["Will more widgets be added?", "Will more stations be added?"],
  ["What is CoolDock?", "What is Halo?"],
  ["What does a 1 Device license mean?", "Does Halo steal keyboard focus?"],
  ["Can I add my favorite apps and folders?", "Can I pin favorite apps?"],
  ["Limited offer for early users", "Public installer coming soon"],
  ["6 spots left", "Coming soon"],
  ["14-day money-back guarantee", "Local-first, on this PC"],
  ["Lifetime updates included", "Notes stay on this PC"],
  ["All features unlocked from day one", "All stations included"],
  ["1 device license", "Windows 11 native"],
  ["One-time purchase", "Coming soon"],
  ["One-time payment", "Coming soon"],
  ["Live widgets", "Live stations"],
  ["Quick acctions", "Drop actions"],
  ["App folders", "Apps"],
  ["Reminders &amp; todos", "Calendar"],
  ["Weather", "Devices"],
  ["System", "Battery"],
  ["Controls", "Volume"],
  ["Screenshots", "Notes"],
  ["Clipboard manager", "Files &amp; Tray"],
  ["Screen Movie", "Media"],
  ["Copy once.", "Drop once."],
  ["Reuse anytime.", "Stay in flow."],
  ["© 2026 Dock.Cool - All rights reserved", "© 2026 Halo — All rights reserved"],
  [
    "Secure checkout by Polar.sh, powered by Stripe. Prices are in USD, excluding VAT and may vary by location.",
    "Download is a placeholder until a Store or installer URL ships.",
  ],
  ["Background.Supply", "Halo Settings"],
  ["Backgrounds.Supply", "Settings"],
  ["Cooldock", "Halo"],
  ["CoolDock", "Halo"],
  ["$29", "Soon"],
];

const LINKS: [string, string][] = [
  ["https://buy.polar.sh/polar_cl_ph8ofm6WJryWTXFykEQrdnh7iqr57PZSKwgIx2vTDoQ", "/download"],
  ["https://supaste.com", "/files"],
  ["https://screen.movie", "/media"],
  ["https://www.backgrounds.supply/", "/settings"],
  ["./updates", "/changelog"],
  ["./privacy", "/privacy"],
  ["./contact", "/#faq"],
  ["./feedback", "/#faq"],
  ["./roadmap", "/changelog"],
  ["./terms", "/privacy"],
  ['href="./"', 'href="/#pricing"'],
];

let cache: { css: string; html: string } | null = null;

function replaceLoose(html: string, from: string, to: string) {
  const pattern = from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+");
  return html.replace(new RegExp(pattern, "g"), to);
}

function applyCopy(html: string) {
  html = html.replace(
    /(<h1 dir="auto"[\s\S]*?class="framer-text">)<span style="white-space:nowrap">[\s\S]*?<\/h1>/,
    "$1Your Windows notch</h1>",
  );
  for (const [from, to] of COPY) html = replaceLoose(html, from, to);
  for (const [from, to] of LINKS) html = html.split(from).join(to);
  html = html.replaceAll(' target="_blank"', "");
  html = html.replaceAll('target="_blank"', "");
  return html;
}

export function getHaloFramerPage() {
  if (cache) return cache;
  const raw = readFileSync(join(process.cwd(), "code.html"), "utf8");
  const styled = applyCopy(raw);
  const css = [...styled.matchAll(/<style\b[\s\S]*?<\/style>/gi)]
    .map((m) => m[0])
    .join("\n");
  const body = styled.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? "";
  const html = body
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<link rel="modulepreload"[\s\S]*?>/gi, "")
    .replace(/\sdata-framer-hydrate-v2="[^"]*"/, "")
    .replace(/<iframe id="__framer-editorbar"[\s\S]*?<\/iframe>/, "");
  cache = { css, html };
  return cache;
}
