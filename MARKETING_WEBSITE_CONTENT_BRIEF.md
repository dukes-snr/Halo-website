# Halo — Marketing Website Content Brief

**Product:** Halo  
**Platform:** Windows 11 (native .NET 8 + WinUI 3 settings; GDI+ layered notch)  
**Date:** 2026-08-16  
**Screenshots:** `docs/marketing-site/screenshots/` (white-background PNG + BMP)  
**Audience:** Windows power users who want a living top-of-screen presence — glanceable media, files, device status, calendar, notes, apps, and an optional on-device assistant — without leaving the current window.

---

## 1. Positioning

### One-liner
**Halo** is a Dynamic Island–style activity notch for Windows — a living mascot, media, files, clipboard, devices, calendar, notes, apps, and optional on-device AI, always one hover, drop, or face-click away.

### Elevator pitch
Halo lives at the top center of your display as a pure-black attached notch with a small mascot peeking from the left. It stays quiet until something matters: music starts, a file is dragged, battery is critical, a meeting is soon, or you expand Home for favorites and modules. Click the face to talk, or drop files on the notch. Everything is native Windows — GSMTC media, Core Audio, notifications, Bluetooth, calendar appointments, and local notes — plus optional on-device speech and a local language model. Not a web wrapper.

### Brand attributes
- Quiet until relevant  
- A face in the notch (playful, not chatty)  
- Native, not electron-bloated  
- Glanceable craft (black silhouette, soft pills, real app icons)  
- Local-first privacy; on-device AI you can delete  
- Fast morphs, no focus steal  

### Competitive frame
Like Apple’s Dynamic Island / Mac notch utilities (MacNotch, Notchkin), purpose-built for **Windows** with real OS integrations (GSMTC, tray files, Control Center, Windows Calendar) **and** a resident mascot that can listen and run Halo actions on-device.

---

## 2. Hero section (homepage)

**Headline options**
1. Your Windows desktop finally has a notch worth using.  
2. A face in the notch. Everything active. Nothing in the way.  
3. Media, files, status, and a mascot that lives at the top of your screen.  

**Subhead**  
Halo is a resident Dynamic Island for Windows. Hover, expand, drop files, control playback, open apps, check calendar, jot notes, or click the face to talk — without switching windows.

**Primary CTA:** Download for Windows / Get Halo  
**Secondary CTA:** See features / Watch overview / Meet the mascot  

**Hero visual:** idle notch with mascot peek (`docs/visual-captures/avatar-idle-100pct.png` or live recapture) plus `feature-home-dashboard.png`  
**Supporting strip:** media expanded + drop actions + control center + AI station  

---

## 3. Feature inventory (shipped / code-backed)

Use only claims that match the codebase. Group for site IA.

### 3.1 Core surface
| Feature | Description | Screenshot |
|---------|-------------|------------|
| Attached notch | Pure-black silhouette, inverted scoop shoulders, top-center of target monitor | any `feature-*.png` |
| Idle / Compact / Expanded | Three chrome levels; spring-like morphs | home + compact media |
| Idle mascot peek | Authored 3D-to-2D face on the left of idle chrome; blinks, idles, reacts | `docs/visual-captures/avatar-idle-100pct.png` |
| Hover expand | Optional expand-on-hover (Settings → Appearance). Face keeps hover for itself; empty bar opens Home | — |
| Multi-monitor + DPI | Sticky target display, DPI-aware geometry | Settings Display |
| Session lock | Hides on lock, restores on unlock | — |
| Fullscreen policy | Hide / Always show / process overrides | Settings Fullscreen |
| Presentation Mode | Suppress the notch during presentations | Settings Fullscreen |
| Hidden foreground apps | Hide Halo whenever a chosen app is in front, even windowed | Settings Fullscreen |

### 3.2 Navigation stations
| Station | Description | Screenshot |
|---------|-------------|------------|
| **Home** | Dashboard: live media, favorite apps, Calendar / Notes / Bluetooth modules, time + battery | `feature-home-dashboard.png` |
| **Tray** | Files Tray — temporary shelf for dragged files; open, remove, clear, drag out | `implementation-tray-populated.png` |
| **Clips** | Clipboard history (opt-in, local) | `implementation-clipboard.png` |
| **Apps** | Favorite apps with real icons; launch + pin | `implementation-apps.png` |
| **AI** | Talk to the mascot, run Halo actions, pick a suggestion | live recapture (AI station) |
| **Settings** | Gear → full Settings window | — |

### 3.3 Mascot
| Feature | Description | Screenshot |
|---------|-------------|------------|
| Resident face | Idle peek on the left; click the empty bar for Home, click the face to poke or talk | avatar idle / hover |
| 10 authored variants | Halo, Citrus, Cubee, Cloudee, Freddy, Grok bot, Kirby, Nova, Onee, Sunee | Settings → Halo |
| Recolor | Override body and eye colors; reset restores the variant palette | Settings → Halo |
| Life of the notch | Idle, hover-curious, poke reactions, ambient surprises, sleep / wake, boot greetings | `avatar-happy-*.png`, `avatar-sleeping-*.png` |
| Assistant clips | Listening, thinking, searching, working, proud, confused while a session runs | `avatar-listening-*.png` |
| Reduce motion | Shorter morphs; mascot motion respects the setting | Settings → Appearance |

### 3.4 On-device AI
| Feature | Description | Screenshot |
|---------|-------------|------------|
| Opt-in assistant | Off by default. Settings → AI | — |
| Click face to talk | Starts a listen session on the idle mascot (toggleable; off keeps poke) | — |
| Talk to Halo hotkey | Default **Win + Alt + A** (rebindable) | Settings → Shortcuts |
| AI station | Expanded Home-sized chrome: face, status, Listen, suggestions, last reply | live recapture |
| Actions without a model | Timers, media transport, next meeting, clipboard, open / close / minimize apps, volume, brightness, Wi‑Fi / Bluetooth / Airplane, time / date / status | — |
| On-device listen | Downloadable Whisper models (Tiny → Large v3 / Distil). Nothing uploaded for speech | Settings → AI |
| On-device answers | Optional **Gemma 3 1B** (~720 MB) for free-form questions after Halo checks it is not an action | Settings → AI |
| Typed commands | Settings → AI “Ask Halo” plus suggestion chips | Settings AI |
| Spotify Connect (optional) | User-supplied Client ID + PKCE; tokens in Windows credential vault. Voice “play …” uses Spotify’s player API (Premium). Halo does not stream audio | Settings → Media |
| Context toggle | Clipboard context opt-in when you ask “what did I copy?” | Settings → AI |

**Do not market as always-listening.** Sessions start from face click, hotkey, AI station Listen, or a typed command. Face stays on the idle peek while it listens.

### 3.5 Media
| Feature | Description | Screenshot |
|---------|-------------|------------|
| Compact live strip | Title, art, EQ, progress edge while playing | (live run) |
| Expanded player | Art, transport, timeline/seek, shuffle/favorite affordances | `implementation-media-expanded.png` |
| GSMTC control | Play/pause/next/prev via Windows media sessions | same |
| Sticky track change | Avoids idle flash between tracks | — |
| High-quality artwork | HD decode + bicubic scale for album art | media shot |
| Media exclusions | Ignore an app’s sessions so its videos never expand Halo | Settings → Media |
| Settings media page | Live session, transport, artwork, Spotify Connect card | Settings Media |

### 3.6 Device & power
| Feature | Description | Screenshot |
|---------|-------------|------------|
| Control Center | Wi‑Fi, Bluetooth radio, Airplane, Volume, Brightness | `feature-control-center.png` |
| Battery HUD | Charging / low / critical pulses | — |
| Brightness HUD | Compact brightness pulse when the display level changes | — |
| Volume HUD | Core Audio volume/mute pulse | — |
| Device endpoint | Default audio device changes | — |
| Bluetooth devices | Connected device strip with battery % when available | `feature-bluetooth.png` |

### 3.7 Files & drop
| Feature | Description | Screenshot |
|---------|-------------|------------|
| Drop Actions | Drag files onto notch → Shelf, Share, Open with, Zip, Unzip, Convert, Move to, Copy to, OneDrive, Music | `feature-drop-actions.png` |
| Configurable actions | Settings → Appearance → Drop Actions (up to 8) | — |
| Files Tray | Hold references, open, clear, drag-out to Explorer | tray shot |

### 3.8 Productivity modules
| Feature | Description | Screenshot |
|---------|-------------|------------|
| Calendar | Week strip + day agenda (Windows appointments when permitted) | `feature-calendar.png` |
| Event Reminder | Live activity: Focus / Snooze / Dismiss / Join meeting (lead time default 15 min) | `feature-event-reminder.png` |
| Notes list | Notch list + New + search | `feature-notes-list.png` |
| In-notch editor | Title, body, checklist, autosave; back returns to the list | `feature-notes-editor.png` |
| Notes window | Full WinUI editor when you want a larger surface | — |
| Timer | Presets + custom minutes; running / complete with pause/resume/cancel | `implementation-timer.png` |

### 3.9 Communication
| Feature | Description | Screenshot |
|---------|-------------|------------|
| Incoming call surface | Caller, accept/decline (desktop call control path) | `implementation-call.png` |
| Connected call | Ongoing call chrome | `implementation-call-connected.png` |
| Notifications | Compact notification activity | Settings / QA |
| Notification center | Dedicated Halo notifications window | `docs/visual-captures/notification-list-screen.png` |
| Reply + reactions | Compose a reply or pick a reaction; Halo stages a draft (clipboard / compose URI) | `implementation-notification-reply.png`, `implementation-notification-reactions.png` |

### 3.10 System UX
| Feature | Description |
|---------|-------------|
| Caps Lock indicator | Compact keyboard indicator |
| Quick Controls | Mute + favorites strip |
| Global hotkeys | Open Settings, toggle media expand, Talk to Halo — all rebindable (Settings → Shortcuts) |
| Tray icon | Settings / Exit without quitting surface accidentally |
| Autostart | Sign-in start (registry / packaged startup task) |
| Onboarding | First-run mascot intro, theme, start-at-sign-in, clipboard opt-in |
| Surface & Preview | Push Home / Media / Timer / Call / Notification / Tray onto the live notch from Settings |
| Settings theme | Light, Dark, or Match Windows |
| Accent | Blue, Violet (default), Pink, Red, Orange, Yellow, Green |
| Languages | Ten languages or Match Windows (Settings → Appearance) |

### 3.11 Settings map (WinUI)
Overview · Surface & Preview · Display & Calibration · Appearance · Halo · AI · Activities · Notifications · Media · Shelf & Clipboard · Shortcuts · Fullscreen Rules · Privacy & Permissions · Performance · About & Updates

### 3.12 Localization
**10 languages:** English, Chinese (Simplified), French, German, Greek, Indonesian, Japanese, Spanish, Korean, Turkish.  
Settings → Appearance → Language (or Match Windows). Station labels, modules, and settings update together.

### 3.13 Privacy & trust
- Clipboard history **opt-in**, local only  
- Notes stored under `%LocalAppData%\Halo\notes`  
- Settings in local JSON  
- Assistant **off** until enabled  
- Speech (Whisper) and chat (Gemma 3 1B) download to `%LocalAppData%\Halo\models` and can be removed anytime  
- Optional xAI key field exists in Settings; **cloud answers are not the shipped path** — free-form replies use the on-device model  
- Spotify and secret material use the Windows credential vault, not `settings.json`  
- Notification access requested when needed  
- Calendar access via Windows appointment store  
- No cloud account required for core product  

---

## 4. Feature pages (suggested site map)

1. **Home / Landing** — hero (mascot + notch), social proof, feature grid, CTAs  
2. **Mascot** — variants, poke / ambient life, click-face-to-talk  
3. **AI** — on-device listen + actions + optional Gemma  
4. **Media** — GSMTC player story + exclusions + Spotify Connect  
5. **Files & Tray** — drop actions + shelf  
6. **Control Center** — device quick settings  
7. **Calendar & Reminders**  
8. **Notes** — list + in-notch editor  
9. **Apps & Favorites**  
10. **Settings & Personalization**  
11. **Privacy**  
12. **Download / Install**  
13. **Changelog / Blog** (optional)  

---

## 5. Section copy blocks (ready to paste)

### Home — “Always available. Never in the way.”
Halo sits at the top of your display as a thin black notch with a small face on the left. When you’re idle, it barely exists. When music plays, a file is mid-drag, or a meeting is starting, it expands with the right controls — then gets out of the way.

### Mascot — “A face that lives in the notch.”
Halo is not an empty pill. An authored mascot peeks from the idle chrome: it blinks, gets curious on hover, reacts when you poke it, and occasionally surprises you. Pick from ten looks, recolor body and eyes, and preview official clips in Settings. Click the face to talk, or the empty bar to open Home.

### AI — “Talk to the notch. It stays on this PC.”
Enable Assistant and click the face, press **Win + Alt + A**, or open the AI station. Halo listens with an on-device Whisper model and runs real actions: timers, playback, volume, brightness, radios, calendar, clipboard, and apps. Ask a free-form question after you download Gemma 3 1B — answers stay local. No model is required for the built-in actions.

### Media — “Your player, one glance up.”
Halo speaks Windows media sessions. Play, pause, skip, and seek without alt-tabbing. Album art renders in high fidelity with smooth scaling. Track changes stay sticky so the notch doesn’t blink empty. Hide noisy apps so a background video never steals the notch.

### Files — “Drop it on the notch.”
Drag files from Explorer onto Halo to choose an action: hold them on the **Shelf**, **Share**, **Open with**, **Zip** or **Unzip**, convert images, **Move to** / **Copy to**, send to **OneDrive**, or open in Music. Pin favorites and clear when done.

### Control Center — “Battery is a door.”
Click time and battery to open device quick settings: Wi‑Fi, Bluetooth, Airplane Mode, volume, and brightness — live sliders, real radios.

### Calendar — “What’s next, without Outlook in the way.”
See the week, today’s agenda, and event reminders with Join when a meeting link is present.

### Notes — “Capture without leaving flow.”
Browse notes on the notch; write in the in-notch editor with title, body, and checklists that autosave. Open the larger Halo Notes window when you want more room. Local, fast, yours.

### Apps — “Real icons. Real launches.”
Pin the apps you actually use. Halo uses package logos and shell icons so tiles look like Windows — high-resolution, with transparency for non-square icons.

### Languages — “Feels native everywhere.”
Switch among ten languages or follow Windows. Station labels, modules, and settings update together.

### Privacy — “Local-first, including the voice.”
Clipboard, notes, and settings stay on this PC. Speech and the optional language model download to your user folder and can be deleted. Halo does not require a cloud account.

---

## 6. Screenshot catalog (white background)

Directory: **`E:\code\HaloWindow\docs\marketing-site\screenshots\`**

| File | Use on site |
|------|-------------|
| `feature-home-dashboard.png` | Hero / Home feature |
| `feature-drop-actions.png` | Files / Drop section |
| `feature-calendar.png` | Calendar page |
| `feature-event-reminder.png` | Reminders / live activities |
| `feature-bluetooth.png` | Devices / Bluetooth |
| `feature-notes-list.png` | Notes page |
| `feature-notes-editor.png` | In-notch notes editor |
| `feature-control-center.png` | Control Center |
| `implementation-media-expanded.png` | Media page |
| `implementation-nook.png` | Alternate home |
| `implementation-tray-populated.png` | Tray / shelf |
| `implementation-clipboard.png` | Clips |
| `implementation-apps.png` | Apps / favorites |
| `implementation-timer.png` | Timer |
| `implementation-call.png` | Calls |
| `implementation-call-connected.png` | Connected call |

All shots are composited on **opaque white** with padding for clean marketing layouts.

### Supporting visual-captures (not yet white-staged)

Use for mascot / AI / notification pages until recaptured into `screenshots/`:

| File | Use on site |
|------|-------------|
| `docs/visual-captures/avatar-idle-100pct.png` | Idle mascot peek |
| `docs/visual-captures/avatar-idle-hover-100pct.png` | Hover / curious |
| `docs/visual-captures/avatar-happy-100pct.png` | Poke / greeting |
| `docs/visual-captures/avatar-listening-100pct.png` | Listening session |
| `docs/visual-captures/avatar-sleeping-100pct.png` | Sleeping |
| `docs/visual-captures/notification-list-screen.png` | Notification center |
| `docs/visual-captures/implementation-notification-reply.png` | Reply composer |
| `docs/visual-captures/implementation-notification-reactions.png` | Reactions |
| `docs/visual-captures/settings-redesign-full.png` | Settings shell |
| `docs/visual-captures/settings-redesign-compact.png` | Settings compact |

**Still needed (white-stage):** AI station, idle mascot on the live notch, Settings → Halo variant grid, Settings → AI.

### Recapture command
```powershell
$env:HALO_CAPTURE_VISUALS = "E:\code\HaloWindow\docs\marketing-site\screenshots"
dotnet test tests/Halo.Surface.Tests/Halo.Surface.Tests.csproj -c Debug -p:Platform=x64 `
  --filter "FullyQualifiedName~VisualQa_CapturesReferenceSurfacesWhenRequested"
# Convert BMP → PNG with Pillow if needed
```

---

## 7. Visual design guidance for the website

- **Product UI** is pure black notch on light desktop → white stage screenshots work for light marketing pages.  
- For dark marketing themes, re-export with a charcoal stage if needed (same capture path; change compositor).  
- Prefer **PNG** with white background; avoid busy desktop photos unless doing lifestyle shots.  
- Don’t upscale screenshots; they are 1× native DIP captures.  
- Pair real product chrome with short captions, not fake mockup chrome.  
- Logo assets: `packaging/Assets/` (StoreLogo, Square44/150, Halo.ico) and `packaging/Assets/brand/`.  
- Mascot is the second brand mark after the wordmark — use official variants, not invented faces.  

### Site aesthetic suggestions
- Clean, product-led, generous whitespace  
- Accent: Halo violet `#7357FF` (also blue / pink / red / orange / yellow / green in-product)  
- Typography: modern sans (Segoe UI Variable / Inter)  
- Motion: short morph loops, idle blink, face-click-to-listen, expand GIF if filmed live  

---

## 8. SEO / messaging keywords

Dynamic Island Windows, Windows notch, Windows mascot notch, on-device AI Windows, Whisper desktop assistant, Gemma local assistant, media controller Windows, clipboard history, file shelf, drop zone, Control Center Windows, Bluetooth battery notch, calendar live activity, desktop notes, Windows Dynamic Island alternative, GSMTC player UI, top-of-screen HUD, click face to talk  

---

## 9. Claims to avoid (not fully shipped)

- Always-listening / wake-word (“Hey Halo”)  
- Spoken replies (Settings toggle is reserved; off for now)  
- Notification-context recaps (toggle reserved)  
- Cloud / xAI answers as the default assistant (key field exists; shipped answers are on-device Gemma)  
- Cloud sync for notes  
- True AirDrop / Continuity Camera  
- Native toast reply APIs for every app (Halo stages a draft)  
- Pomodoro / Quotes / News widgets as full products  
- User-facing Home widget picker (dashboard modules ship; no Settings picker UI)  
- Microsoft Graph multi-account calendar (uses local/Windows appointment store)  
- Perfect battery % for all Bluetooth devices (best-effort)  
- Mobile apps / macOS  
- Halo streaming audio itself (Spotify Connect starts playback in Spotify)  

---

## 10. Technical credibility (About / Download)

- Native Windows 11 app  
- WinUI 3 Settings + layered HWND surface  
- Integrations: Media (GSMTC), Audio, Power/Brightness, Radios, Notifications, Bluetooth, Calendar, Shelf, Notes, optional Spotify Connect  
- On-device Whisper (downloadable sizes) + optional Gemma 3 1B (llama.cpp)  
- Optional MSIX packaging / autostart  
- Open development architecture (local repo)  

---

## 11. FAQ starters

**Does Halo steal focus?**  
No. The notch uses a non-activating layered window so your current app keeps keyboard focus.

**Where is my data?**  
Settings, clipboard history (if enabled), notes, and downloaded models stay on this PC under your local app data folder.

**Does it work with Spotify / browser media?**  
Yes, via Windows media sessions (GSMTC) for apps that publish them. Optional Spotify Connect lets voice “play …” start a track if you connect a Spotify app (Premium).

**Is the assistant always listening?**  
No. You start a session with a face click, **Win + Alt + A**, the AI station, or a typed command.

**Does talking to Halo send audio to the cloud?**  
Listen and answers are on-device after you download the models. Built-in actions (timer, media, calendar, apps) work without a model.

**Can I turn off expand on hover?**  
Yes — Settings → Appearance.

**Can I change the face?**  
Yes — Settings → Halo. Ten variants, plus body and eye color.

**Languages?**  
Ten languages plus “Match Windows.”

---

## 12. Default shortcuts

| Action | Default |
|--------|---------|
| Open Settings | Win + Alt + H |
| Toggle media expand | Win + Alt + E |
| Talk to Halo | Win + Alt + A |

All three are rebindable in Settings → Shortcuts.

---

## 13. Next assets to film live (optional)

Live desktop captures (beyond deterministic GDI QA):

1. Idle mascot blink → hover curious → poke  
2. Click face → listening clip → “set a 5 minute timer” → timer compact  
3. AI station suggestions + typed Ask Halo  
4. Settings → Halo variant switch live on the notch  
5. Drag file → drop actions → Shelf  
6. Playing Spotify → compact → expand → seek  
7. Battery click → Control Center sliders  
8. Home → Calendar → Back  
9. Notes New → in-notch editor → checklist → back  
10. Language switch live on station bar  
11. Notification → reply composer  

---

*Generated from codebase inventory + white-stage visual captures. Update this brief when shipping new modules.*
