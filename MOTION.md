# Island motion

A portable spec for the interactive notch. Recreate this in any stack. The names below are the vocabulary. Map them onto whatever you already have; do not look for class names or file paths from the source demo.

The island is **one black rounded rectangle**, pinned to the **top center** of the screen. It never lifts off that edge. Width, height, and the two bottom corners change together. Content lives inside the silhouette and is clipped by it.

A port is successful when a user can:

1. Press the compact island, feel mass, then watch it unfurl from the top edge into the expanded player.
2. Watch the station pills ride the growing bottom edge, not teleport to a hardcoded Y.
3. Switch views and see one piece of black clay change size while the old UI dissolves into the new one from the same top-center origin.

---

## 1. Grammar

Keep these even if you change a duration. Break them and it will feel like a browser window, not an island.

1. **One container.** Compact, peek, player, tray, widgets, calendar, queue, and output are states of the same node. Never spawn a second island.
2. **Anchor at the top center.** Position the shell at the top of the screen, centered on X. Transform origin is always **50% 0**. Every scale, press, and content zoom originates there. The top edge never moves. A gap appearing above the island is a bug.
3. **Geometry is a spring. Content is a dissolve.** Width, height, and corner radius share one overshoot curve and one duration. Opacity, scale, and blur of inner panels share a slightly shorter cousin of that curve. Do not crossfade two full layouts at equal opacity.
4. **Outgoing is smaller than incoming is born.** Hidden rest is scale `0.86–0.90` plus blur `8–9px`. When a panel is *replaced* (player → tray), the outgoing panel only goes to scale `0.94` plus blur `8px`, so it feels covered by the growing shell, not popped out of existence. Incoming starts at scale `0.90` so it grows out of the blur.
5. **Press is mass, release is spring.** Pointer-down is a fast, heavy squash. Pointer-up is the long overshoot morph into the next size. Never start the size morph while the finger is still down.
6. **The lane rides the bottom edge.** Station pills sit just below the shell, parented to its live height. They are not independently tweened in Y except for their own enter/exit scale.
7. **Interruptible.** A second click mid-morph retargets from the current size to the new target. Use interruptible springs or CSS transitions. Do not use one-shot keyframe movies.
8. **Clip to the live silhouette.** Every inner view fills the shell and inherits its corner radius. During a morph, content that no longer fits is cropped by the shrinking or growing body. That crop is part of the motion.
9. **The desktop does not yield.** Icons, wallpaper, and the taskbar stay put. A wide calendar may cover them. That is correct.

---

## 2. Motion tokens

Name these. Reuse them. Do not invent a new curve per view.

| Token | Cubic bezier | Typical duration | Feel | Use on |
|---|---|---|---|---|
| **SpringOut** | `0.32, 1.22, 0.36, 1` | 560 ms geometry; 520 ms large panels; 380 ms opacity; 460 ms blur | Ease-out that overshoots (control Y > 1) then settles. This is the brand. | Shell width, height, radius, content scale |
| **SpringPop** | `0.3, 1.6, 0.4, 1` | 320–460 ms | Stronger overshoot. Playful, not chrome. | Press release (shell scale), checks popping in |
| **SpringPopPlus** | `0.3, 1.65, 0.4, 1` | 380–420 ms | Same family, a little more bounce | Album art hover, transport buttons |
| **PressIn** | `0.3, 0.7, 0.4, 1` | 100–130 ms | Fast, heavy, no overshoot. Finger-on-glass. | Press squash, widget press, compact-control press |
| **LinearHud** | `linear` | 110 ms | Mechanical | Brightness / volume fill |
| **SoftFade** | `ease` | 180–240 ms | Utility only | Icon opacity, hover fills, first-run hint |

Do not use CSS `ease`, `ease-in-out`, or Material standard curves for the shell. SpringOut is the identity of the morph.

### SpringOut

The Y control of `1.22` means the animated property travels past the target, then settles. On width and height that is a 2–4% overshoot — enough that the island feels like rubber, not a lerp. On opacity, use the same curve at a shorter duration (380 ms); CSS clamps opacity at 1, so you will not see a flash.

Approximate unit progress over 560 ms:

```
t = 0.00   0.00
t = 0.10  ~0.42     fast attack (why it feels instant after press)
t = 0.25  ~0.82
t = 0.40  ~1.04     first overshoot
t = 0.55  ~0.99
t = 0.70  ~1.01
t = 1.00   1.00
```

If the engine cannot overshoot, use an underdamped spring (response 0.56 s, damping ~0.82–0.88, one undershoot at most). Flattening to a no-overshoot 560 ms ease-out will look tired.

**CSS / WAAPI / GSAP / Motion**

```
SpringOut     duration 0.56    ease [0.32, 1.22, 0.36, 1]
PressIn       duration 0.13    ease [0.3,  0.7,  0.4,  1]
SpringPop     duration 0.46    ease [0.3,  1.6,  0.4,  1]
```

**Native springs** if cubic-bezier is not available:

- Width, height, and both bottom radii must share one clock. If height finishes before width, the silhouette shears.
- Content opacity may finish earlier (~0.38 s). Blur may finish ~0.46 s. Scale stays on the 0.56 s SpringOut so content unfurls with the shell, not ahead of it.

### Shell channels

The shell always interpolates these, and only these, when its state changes:

| Channel | Curve | Duration |
|---|---|---|
| Width | SpringOut | 560 ms |
| Height | SpringOut | 560 ms |
| Bottom-left and bottom-right radius | SpringOut | 560 ms |
| Background color | SoftFade | 400 ms |
| Scale (press and hover) | SpringPop | 460 ms |

Press overrides **only** the scale channel: 130 ms PressIn. On release, that override drops and scale returns to the 460 ms SpringPop, so 0.93 → 1.00 overshoots through ~1.04 while width and height are already growing on SpringOut.

Do not put scale on SpringOut. Scale wants the bouncier SpringPop; size wants the calmer SpringOut.

---

## 3. Anatomy

```
                    top of screen
                         │
        fillet ─── [████████████████] ─── fillet
                   │     SHELL      │     ← black, top radii 0,
                   │  (clips views) │       bottom radii animate
                   └────────────────┘
                          │
                     11 px gap
                          │
                   [ Home Tray Widgets ]  ○ Calendar
                         LANE
```

| Part | Role |
|---|---|
| **Shell** | The black silhouette. The only thing whose width and height morph. |
| **Fillets** | Two black corner bites that blend the shell into the top of the screen. They grow with the body. |
| **Compact HUD** | Album art + EQ wave. Visible only in Compact (and Peek). |
| **View** | Any expanded content: Player, Tray, Widgets, Calendar. All stacked in the same box, clipped by the shell. |
| **Lane** | Station pills sitting under the shell. Parented to the shell’s live bottom. |
| **Lane chip** | One sliding highlight inside the pill. It moves; icons do not crossfade. |

Views fill the shell (`inset 0`), clip to it, and share its live corner radius. They do not push each other in layout. Visibility is a dissolve, not a z-index fight.

---

## 4. States and sizes

All sizes are the **shell**. Top radii are always 0. Bottom radii are the only ones that animate. Content is clipped to that silhouette.

Idle-empty (no media) is `196 × 31`, radius 15. The usual rest is Compact, because media is playing.

| State | Width | Height | Bottom radius | Axes that change vs Compact |
|---|---|---|---|---|
| Idle (no media) | 196 | 31 | 15 | — |
| **Compact** | 252 | 34 | 16 | rest |
| **Peek** | 252 | 64 | 20 | height only |
| **Player** (expanded home) | 350 (cap 54% of stage) | 205 | 38 | both |
| **Queue** | 600 (cap 92%) | 205 | 38 | **width only** |
| **Output** | 350 | 322 | 38 | **height only** |
| **Tray** | 560 (cap 86%) | 136 | 38 | both (wider, shorter) |
| **Widgets** | 560 (cap 86%) | 136 | 38 | same footprint as Tray |
| **Calendar** | 600 (cap 92%) | 252 | 38 | both (largest regular view) |
| Quick actions | 480 (cap 74%) | 118 | 38 | drag-over drop tiles |
| Progress pill | 270 | 31 | 14 | compact progress |
| Progress success | 380 (cap 60%) | 88 | 32 | morph from the pill |
| Convert | 430 (cap 66%) | 128 | 32 | format picker |
| Convert go | 380 (cap 60%) | 88 | 32 | — |
| Convert mini | 270 | 31 | 14 | — |
| System HUD | 390 | 31 | 14 | brightness / volume |

Phone (stage ≤ 720 px): idle 128×25; compact 146×34; player 94% × 184; output height 296; queue 94% × 380 (queue stacks under the player, **lane hides**).

Caps (`min(px, % of stage)`) keep the island inside a laptop frame. In a real desktop app you can use the pixel sizes as-is.

### Why some morphs are one-axis

The clay reads as one object because **only the axis that needs to change, changes**.

- Peek, Output: height only. Width stays. No rubbery width wobble.
- Queue (desktop): width only. Height stays. The player column does not reflow vertically.
- Tray / Widgets: both axes, because the view is a short wide strip.
- Calendar: both axes, larger than Player in both.

When you add a view, pick the smallest delta that fits the content. Do not always grow both axes “for smoothness.” Extra motion is noise.

### Fillets

Two radial-gradient bites sitting just outside the top-left and top-right of the shell.

| | Compact | Expanded |
|---|---|---|
| Size | 15 × 15 | 22 × 22 |
| Offset outside the shell | 14 px | 21 px |

They share the 560 ms SpringOut on size and offset so the shoulder grows with the body. If fillets snap while the body springs, the island looks glued on.

Paint: a circle farthest-side radial, transparent until the last half-pixel, then solid black, anchored at the outer bottom of each bite.

---

## 5. Click to expand (Compact → Player)

This is the master gesture. Every other morph is a variation of it.

### Pointer

```
pointer down on the island
  → dismiss the first-run hint (opacity, 600 ms SoftFade)
  → if already expanded, or in a HUD / progress state: ignore
  → else enter Press

pointer up (still over the island)
  → leave Press
  → enter Player (drop Compact and Peek)
  → next frame: measure the Home segment and slide the lane chip

pointer leave while in Press
  → leave Press
  → do not expand          (cancel)

Enter / Space
  → toggle Compact ↔ Player
  → no press scale         (keyboard is not a finger)

pointer down outside an expanded island
  → return to Compact
```

Lane clicks must not count as “outside” and must not press the shell.

The state machine only flips flags. The renderer interpolates width, height, and transform. Do not write those properties by hand on pointer up.

### Press

A rubber block pinned to the bezel. The finger compresses it; the top stays glued.

| | Value |
|---|---|
| Scale | 0.93 |
| Origin | 50% 0 |
| Curve | PressIn |
| Duration | 130 ms |
| Width / height | unchanged |

Because origin is the top edge, scale 0.93 shrinks **downward**. Origin `50% 50%` would open a gap above the island — the most common porting bug.

Compact hover scale (1.045) is disabled while pressing. You never see hover and press fight.

### Release — three springs from the live computed style

On pointer-up, Press ends and Player begins in the **same turn**.

| Channel | From | To | Token | Duration |
|---|---|---|---|---|
| Scale | 0.93 | 1.00 | SpringPop | 460 ms |
| Width | 252 | 350 | SpringOut | 560 ms |
| Height | 34 | 205 | SpringOut | 560 ms |
| Bottom radius | 16 | 38 | SpringOut | 560 ms |
| Fillets | 15 / 14 | 22 / 21 | SpringOut | 560 ms |

Because scale overshoots (~1.04) while size is still growing, the island feels alive rather than like a rectangle lerp.

### Timeline from pointer-up

| t | Shell | Compact HUD | Player view | Lane |
|---|---|---|---|---|
| −130 ms | scale 1.045 → 0.93 | sharp, full size | hidden at 0.86 / blur 9 | hidden at 0.86 / −10 px / blur 7 |
| 0 | Press ends, Player starts; scale still 0.93 | starts dissolving | starts blooming | starts riding height |
| 80 ms | scale ~0.99, size ~30% | opacity ~0.55, blur ~5 | opacity ~0.45, still small | barely visible, being pushed down |
| 200 ms | scale overshoot ~1.03; size ~70% | opacity ~0.15, scale ~0.90, blur ~7 | opacity ~0.75, scale ~0.96, blur ~3 | opacity ~0.6, still slightly small |
| 380 ms | size ~95% | opacity 0 (opacity clock done) | opacity 1 | opacity 1 |
| 460 ms | scale settled; blur clocks done | blur 9, scale still settling | blur 0, scale settling | blur 0 |
| 560 ms | 350 × 205, radius 38 | rest hidden | rest visible | rest under the shell, 11 px gap |

For ~200 ms both Compact HUD and Player are partially visible. That overlap is not a 50/50 crossfade: incoming is larger and getting sharper, outgoing is shrinking toward the top. The eye reads one surface blooming.

### Compact HUD ↔ Player dissolve

Two layers, both filling the shell, both origin 50% 0, both clipped by it.

| Layer | In Compact | In Player |
|---|---|---|
| Compact HUD | opacity 1, scale 1, blur 0, hits on | opacity 0, scale 0.86, blur 9 px, hits off |
| Player view | opacity 0, scale 0.86, blur 9 px, hits off | opacity 1, scale 1, blur 0, hits on |

Shared clocks, all SpringOut:

| Channel | Duration |
|---|---|
| Opacity | 380 ms |
| Scale | 560 ms |
| Blur | 460 ms |

The compact HUD does not slide sideways. It shrinks and blurs toward the top-center while the player grows out of that same point.

Hits flip on the state change, immediately. You cannot click a dissolving control.

### Why blur is mandatory

Without blur, for ~200 ms you see two distinct UIs overlapping. `blur(8–9px)` blends them into one transforming object. Keep blur under 20 px. Never blur the shell; only inner content and the lane.

Opacity, scale, and blur must not share one duration. Opacity finishes first (the old UI is gone to the eye), blur second (the smear clears), scale last (the new UI finishes unfurling with the shell). If all three are 560 ms, the ghost of the old UI hangs around too long.

### Close (Player → Compact)

Strip every expanded view flag, reset the lane chip to Home, return to Compact.

The same transitions run **in reverse**. Collapse must not use a shorter duration than expand in this language. Enter and exit share 560 ms so the island feels like one piece of rubber.

Outgoing player: back to scale 0.86 + blur 9. Incoming compact HUD: from that same rest pose to identity. Lane: reverse of §6, riding the shrinking height back up.

Outside click is the close gesture. There is no close button on the island.

---

## 6. What gives way

This is the part that is easy to get wrong.

### The lane — the only surrounding chrome that moves

The lane is **outside** the black shell, still a child of the island, attached to its bottom:

- `top = 100% of the shell + 11 px`
- horizontally centered on the shell
- origin 50% 0

`100%` is the **live animated height**. While the shell grows 34 → 205, the lane is physically carried downward. While the shell shrinks 205 → 136 (Player → Tray), the lane is carried **upward**. While the shell widens, centering keeps the lane on the body’s midline, so it also moves **outward**.

That is how surrounding chrome “makes room”: it is parented to the morphing edge, not tweened to a hardcoded screen Y.

| | Hidden (not expanded) | Visible (expanded) |
|---|---|---|
| Opacity | 0 | 1 |
| Transform | translateY(−10 px) scale(0.86), still centered | centered, no extra Y, no scale |
| Blur | 7 px | 0 |
| Hits | off | on |
| Clocks | opacity 380 / transform 560 / blur 460, SpringOut | same |

It starts 10 px higher than the rest gap and 14% smaller, already slightly above where the growing shell will push it, then settles 11 px under the finished island. The 11 px gap is constant in *shell space*.

On a phone-sized queue (tall sheet), hide the lane. It would sit on the sheet.

### Fillets grow; they do not slide the wallpaper

The two shoulders enlarge in place. Wallpaper is not displaced. The black bite simply covers more of the desktop at the two top corners.

### Inner content yields by dissolving, not by layout

Player, Tray, Widgets, Calendar are stacked in the same box. They do not push each other. The outgoing one scales down slightly and blurs; the incoming one scales up from 0.90.

Two exceptions, because content size drives chrome size:

**Output.** The device list lives *inside* the Player view. It animates max-height `0 → 160 px` on the same 560 ms SpringOut, with opacity 360 and blur 440. The shell grows because that inner block is unfolding. A port with measured layout should animate the shell to the content height instead of a magic 160.

**Queue (desktop).** The player column stays a fixed 350 px. The queue column is the leftover width and fades in **60 ms late**. The shell widening creates the column. If queue content is visible on frame 0 of a width morph, the column stretches. The delay exists so the eye sees black clay widening first, then content.

### What does not move

| Element | Behavior |
|---|---|
| Desktop icons | Stay. May be covered by a wide calendar or queue. Their own hover/press (scale 1.06 / 0.9) is unrelated to the island. |
| Taskbar | Stays. |
| Wallpaper | Stays. |
| First-run hint | Opacity only, 600 ms SoftFade, then gone. |
| The page around the stage | Does not reflow. |

Do not shove other UI when the island expands unless a later spec says so. “Give way” is the **lane**, **fillets**, and **inner content**, not the desktop.

### Paint order

The shell (and everything in it, plus the lane) paints above the desktop. Inner views are stacked in document order; visibility is opacity, not z-index. Do not raise the incoming view’s z-index to “win” the crossfade. The dissolve does the work.

---

## 7. Hover and peek (no click)

### Compact hover

Scale `1.045` around top-center, 460 ms SpringPop. Subtle breathe toward the user. Disabled when expanded — an open island should not wobble under the cursor. Also disabled during Press, Quick actions, and progress pills.

### Peek

Hovering the compact album art grows the pill **downward only**. Leaving the island (not just the art) collapses it, so the user can move down onto the revealed title.

| | Compact | Peek |
|---|---|---|
| Width | 252 | 252 (unchanged) |
| Height | 34 | 64 |
| Radius | 16 | 20 |
| Hover scale | 1.045 | cancelled (scale 1) |

Peek is a downward unfold, not a 3D pop. If hover scale stays on during peek, the extra 6 px of height fights the 1.045 scale and the title shimmers.

Track title sits just under the 34 px compact row (`top: 35 px`):

| | Hidden | Peek |
|---|---|---|
| Opacity | 0 | 1 |
| Transform | translateY(−5 px) | identity |
| Blur | 5 px | 0 |
| Clocks | opacity 320 / transform 420 / blur 380, SpringOut | same |

The title slides **down 5 px** into the new space — the only compact content allowed a Y translation, because it is revealing into newly opened height.

EQ bars fade out (220 ms SoftFade); pause/play glyph fades in (220 ms SoftFade).

Peek is the only compact morph that is height-only. Recreate it as a one-axis spring or you will get a rubbery width wobble.

### Press on compact controls

Album and EQ use a **force** on the control, not Press on the shell (so the island does not squash when you hit pause):

- Art: scale 0.88, brightness 0.92, 110 ms PressIn
- EQ hit-target: scale 0.8, 100 ms PressIn
- Release returns on SpringPopPlus (380 ms)

---

## 8. Switching views

Tabs are the three lane segments (Home, Tray, Widgets) plus the calendar circle. Queue and Output are toggles on the player, not lane tabs, but they use the same morph rules.

This is the second master gesture, after click-to-expand.

### State machine

Only **one** view at a time.

1. Clear Tray, Widgets, Queue, Output, Calendar.
2. Set the new view. Home is the absence of a view flag: expanded Player only.
3. Move the active mark on the lane. Calendar is a separate circle, not a pill segment.
4. Clear Queue / Output active marks when leaving Home.

Never stack Tray and Widgets. The size table is not additive.

Lane clicks must not close the island.

### Shell morph

Because width, height, and radius are always interpolating with SpringOut 560 ms, **any state change is automatically a morph**. There is no extra tween, no FLIP, no shared-layout id.

| From | To | Width | Height | Axes |
|---|---|---|---|---|
| Player | Tray | 350 → 560 | 205 → 136 | both (wider, shorter) |
| Player | Widgets | 350 → 560 | 205 → 136 | both |
| Tray | Widgets | 560 → 560 | 136 → 136 | **none** (content only) |
| Player | Calendar | 350 → 600 | 205 → 252 | both (wider, taller) |
| Tray / Widgets | Calendar | 560 → 600 | 136 → 252 | both |
| Calendar | Player | 600 → 350 | 252 → 205 | both |
| Player | Queue | 350 → 600 | 205 → 205 | width only |
| Player | Output | 350 → 350 | 205 → 322 | height only |
| Any | Compact | * → 252 | * → 34 | both |

The island should look like one piece of black clay being squeezed. If width and height use different eases, or are staggered, it will look like a browser window.

Lane during these morphs:

- Player → Tray: shell gets shorter, lane moves **up** and **out**.
- Player → Calendar: shell gets taller and wider, lane moves **down and out**.
- Tray → Widgets: lane Y does not move. Only the indicator chip slides.

### Content handoff

Every view uses the same two poses.

**Hidden rest**

```
opacity        0
scale          0.86 … 0.90
origin         50% 0
blur           8–9 px
hits           off
clipped        to the live shell
```

**Visible**

```
opacity        1
scale          1
blur           0
hits           on
```

Exact hidden rests:

| View | Hidden scale | Hidden blur | Opacity / scale / blur |
|---|---|---|---|
| Compact HUD / Player | 0.86 | 9 px | 380 / 560 / 460 |
| Tray / Widgets / Calendar / Quick actions | 0.90 | 8 px | 360 / 520 / 440 |
| Progress-success / convert body | 0.92 | 8 px | 360 / 520 / 440 |
| Queue column | *(no scale)* | 7 px | 360 **+ 60 ms delay** / — / 440 **+ 60 ms delay** |
| System HUD | *(no scale)* | 6 px | 300 / — / 340 |

**Outgoing Player**, when another view is selected, does **not** go all the way to the compact rest (0.86). That would look like a close.

```
outgoing Player (covered by Tray / Widgets / Calendar)
  opacity   0
  scale     0.94     ← not 0.86
  blur      8 px
  hits      off
```

That 0.94 vs 0.86 is the whole trick.

| Rest | Meaning |
|---|---|
| 0.86 | this island is shutting |
| 0.94 | this view is being covered |
| 0.90 | this view is being born |

If you reuse 0.86 for tab swaps, every tab click feels like a close.

Tray / Widgets / Calendar do not need a special 0.94 outgoing: when they lose the view they go to their hidden rest (0.90). Player is special because it is the expanded default, and 0.86 is reserved for returning to Compact.

### Recipe (any engine)

1. Keep **all** view trees mounted, or keep a snapshot of the outgoing view as a bitmap. Do not unmount at frame 0.
2. Clip everything to the live silhouette.
3. On view change, in the **same frame**:
   - Change the shell’s target width / height / radius.
   - Outgoing → `{ opacity: 0, scale: 0.94, blur: 8 }`. Disable hits immediately.
   - Incoming starts at `{ opacity: 0, scale: 0.90, blur: 8 }`, animates to identity. Enable hits at opacity ≈ 0.8, not at t=0.
4. Do not run incoming and outgoing as a 50/50 mix. Incoming blooms *through* the outgoing blur. The smaller start scale on incoming (0.90 vs outgoing 0.94) makes the new view grow *out of* the old one.
5. Do not wait for outgoing to finish before starting incoming. They overlap. The stagger is in the *scales*, not the clocks.
6. Optional inner stagger: a row of peers (tray files) does not appear as a group. Each item starts at `translateY(10px) scale(0.85) blur(8px)` and is released with delay **70 ms × index + 60 ms**.

Engine-shaped examples of the same recipe:

**Motion / Framer-style**

```
shell:   { width, height, radius }     560 ms SpringOut    origin (0.5, 0)
panel:   visible → identity
         hidden  → scale 0.94 if it is the covered Player, else 0.90
                   opacity 360 ms, scale 520 ms, blur 440 ms, all SpringOut
```

**CSS-style** (interruptible, retargets from computed style)

Drive the shell with one state on the container. Each view’s hidden/visible pose is a selector. Do not keyframe the morph.

**Native / bitmap snapshot** (tighter product timing)

1. Freeze the last frame of the outgoing tree.
2. Clip that bitmap to the morphing silhouette; fade it with ease-out so it is gone by progress ~0.42.
3. Paint the incoming tree only in the live bounds; start its opacity at progress ~0.36.
4. Never let both trees sit at equal opacity.

The marketing dialect uses overlapping dissolve + blur (no frozen bitmap). A product dialect can use a sequential dissolve and a frozen frame. **Same grammar, different masking.** A web recreation should follow this file (blur + 0.94 / 0.90). A 60 fps HUD used a hundred times a day should shorten the clocks (see §11).

### Lane chip

One pill that **slides**. It does not fade between icons.

On view change, set `left` and `width` in pixels from the active segment’s layout box. Interpolate both with SpringOut, 380 ms. Opacity of the chip itself is 200 ms SoftFade (used when Calendar takes over and the chip hides).

Re-measure whenever a segment’s width changes (a count badge appearing on Tray). Do not hardcode X positions.

Active icon opacity 0.85 → 1, 220 ms SoftFade. The calendar circle uses an inner chip (inset 4 px, opacity 220 ms), not a color swap of the whole disc, so it matches the sliding chip’s fill language.

When Home is selected, the chip sits on the house segment. When Calendar is selected, the chip hides and the circle’s inner chip fades in. Two indicators never show at once.

### Walkthrough: Home → Tray

1. Island is Player (350 × 205), lane under it.
2. User clicks Tray.
3. View becomes Tray. Home loses active; Tray gains it; chip target updates.
4. Shell interpolates 350 × 205 → 560 × 136 over 560 ms SpringOut. Lane moves **up** (shell got shorter) and **out** (centered on the wider body).
5. Player: 1.0 / scale 1 / blur 0 → 0 / scale 0.94 / blur 8, 360–560 ms.
6. Tray: 0 / scale 0.90 / blur 8 → identity, 360–520 ms.
7. File tiles stagger in (`70i + 60` ms) from `translateY(10px) scale(0.85) blur(8)`.
8. Lane chip slides to Tray, widening if a count badge is showing.

**Widgets is the same footprint as Tray**, so the shell barely moves; only the inner dissolve runs. That is a good test: **content handoff must look complete even when width and height deltas are zero.** If a port only animates content when the shell moves, Tray ↔ Widgets will pop.

### Walkthrough: Player → Calendar

1. View becomes Calendar. Circle active, lane chip hides.
2. Shell 350 × 205 → 600 × 252. Lane moves down and out.
3. Player out 0.94 / blur 8. Calendar in 0.90 / blur 8 → identity.
4. Desktop icons on the right may be covered. They do not move.

### Walkthrough: Player → Queue (width only)

Toggle. Width 350 → 600. Height stays 205. **Player stays visible** (no outgoing dissolve). Queue column goes from blur 7 / opacity 0 to clear, **60 ms late**.

On a narrow stage, do not widen: grow **down** to 380 px, stack the queue under the player (divider moves from the left edge to the top edge), and hide the lane.

### Walkthrough: Player → Output (height only)

Toggle. Width unchanged. Height 205 → 322. The list is not a separate view: it lives inside Player, collapsed, and unfolds on the same 560 ms SpringOut.

Device-row checks: scale 0.3 → 1, 320 ms SpringPop. Switching the current device may stagger row translateY at 460 ms SpringOut.

---

## 9. Micro-interactions

Stay in the same family. Do not introduce a second dialect for small controls.

| Event | Motion |
|---|---|
| Compact hover | scale 1.045, 460 ms SpringPop, origin 50% 0 |
| Compact art hover | scale 1.07 + brightness 1.1, 380 ms SpringPopPlus |
| Expanded art hover | scale 1.06 + brightness 1.12, 420 ms SpringPopPlus |
| Transport press | scale 0.8, 100 ms PressIn |
| Tray tile appear | Y 10 px + scale 0.85 + blur 8 → identity, 340 / 460 / 400 ms SpringOut, stagger `70i + 60` |
| Tray tile delete | scale 0.8 + blur 9 + width 0 + margin −24 px, then remove from the tree at 420 ms |
| Tray selection check | scale 0.4 → 1, 320 ms SpringPop; plate shadow 240 ms |
| Widget press | scale 0.87 + blur 1.2 + brightness 0.9, 110 ms PressIn |
| Calendar day press | inner glyph scale 0.85, 240 ms SpringPop |
| Calendar task complete | check scale-in 280 ms SpringPop, then leave: opacity 0, blur 7, scale 0.9, **translateX(14 px)** — the only content that exits sideways |
| Queue row promoted | title/artist pulse 750 ms ease-in-out × 2 (opacity 1 → 0.42 → 1) |
| EQ bars | 900 ms ease-in-out infinite, height 18% ↔ 95%, staggered delays. Pause freezes at 20% height. Pause the animation when the stage is offscreen. |
| System HUD fill | width follows the value, 110 ms linear |
| System HUD value | 360 ms SpringPop, scale 1.3 + blur 2.2 → rest |
| Convert thumb pop | 750 ms, scale 1 → 1.22 → 0.97 → 1 with a brief glow |
| Desktop icon press | scale 0.9, 120 ms PressIn; hover 1.06, 380 ms SpringPop |
| Add-to-queue popover | origin at the + button, scale 0.86 + blur 6, 260 / 380 / 300 ms |

Calendar’s `translateX(14 px)` on completed tasks is a nudge off-stage, not a view transition. Do not reuse it for tab swaps.

Scroll edges on Tray / Widgets: 48 px black gradients, opacity 240 ms SoftFade, shown only on the side that still has overflow. Not springs.

---

## 10. Choreography

```
COMPACT 252×34
  hover art ──► PEEK 252×64 (height only)
                title from Y−5 + blur 5
                EQ → pause glyph
  pointer leave ──► back to COMPACT
  pointer down ──► PRESS scale 0.93 @ 130 ms PressIn
  pointer up   ──► PLAYER 350×205 @ 560 ms SpringOut
                   scale 0.93 → 1.00 @ 460 ms SpringPop
                   compact HUD ──dissolve──► player   (0.86 / blur 9)
                   lane ──rides height, unblurs from scale 0.86 / Y−10
                   fillets 15 → 22

PLAYER 350×205
  Home      ── stay 350×205, player visible
  Tray      ── 560×136; player out 0.94; tray in 0.90; lane moves up+out
  Widgets   ── 560×136; player out 0.94; widgets in 0.90; shell may not move
  Calendar  ── 600×252; player out 0.94; calendar in 0.90; lane moves down+out
  Queue     ── width 600, height 205; player stays; queue fades in +60 ms
  Output    ── height 322, width 350; max-height unfold inside player

anywhere expanded + outside click
  ──► COMPACT 252×34, reverse dissolve, lane collapses up, same 560 ms
```

---

## 11. Product vs demo clocks

This language is a **marketing object**: slower and bouncier so it reads at a large stage size. A real always-on HUD used many times a day should keep the grammar and shorten the clocks.

| Concern | This spec (demo) | Quieter product |
|---|---|---|
| Expand | 560 ms SpringOut (overshoot) | ~0.28 s, critically damped |
| Collapse | 560 ms (same as expand) | ~0.24 s (faster exit) |
| Press | 0.93 @ 130 ms PressIn | ~0.97 @ 100–140 ms |
| View content | overlapping dissolve + blur, 360–520 ms | sequential dissolve ~220 ms; outgoing gone by ~0.42; incoming starts ~0.36; freeze the outgoing frame if you can |
| Compact hover | scale 1.045, 460 ms SpringPop | hover in ~0.20 s / out ~0.16 s |
| Reduced motion | drop overshoot, skip press scale, skip blur, keep the size morph (~120 ms ease-in-out) | same |

Keep: origin 50% 0, one-axis morphs when only one axis needs to change, lane riding the bottom, 0.94 vs 0.90, interruptibility.

Do not copy 560 ms into always-on chrome.

---

## 12. Recreation checklist

A port is the same motion when all of these are true:

- [ ] Top edge of the island never translates. Origin is always 50% 0.
- [ ] Width, height, and both bottom radii share one 560 ms SpringOut (`cubic-bezier(0.32, 1.22, 0.36, 1)`).
- [ ] Press is a separate 130 ms PressIn scale 0.93 that ends before (or is interrupted by) the size morph. Press does not change width or height.
- [ ] Compact content and expanded content both zoom from the top-center with blur; they are not faded as flat bitmaps.
- [ ] View changes do not unmount the outgoing tree on frame 0. Outgoing rest is scale **0.94**. Incoming birth is scale **0.90**.
- [ ] Opacity / scale / blur use **different** durations (shorter → longer), same SpringOut curve.
- [ ] Queue content is delayed ~60 ms behind the width morph.
- [ ] The station lane is positioned in **shell-bottom space** (`100% + 11 px`), not screen space, so it is carried by height.
- [ ] The active lane chip **slides** (`left` / `width`); it does not crossfade.
- [ ] Desktop icons and the taskbar do not tween out of the way.
- [ ] Peek is height-only; hover scale is cancelled during peek.
- [ ] Interruptions retarget. Rapid view clicks do not queue a movie; they spring from the current size to the new target.
- [ ] Reduced motion: drop overshoot, skip press scale, skip blur, keep the size morph.

### Anti-patterns

| Don’t | Do |
|---|---|
| One `all 300ms ease` transition | List width, height, radius, transform, opacity, filter with their own times |
| Origin at the center of the shell | Origin at 50% 0 |
| Incoming from scale 0 | Incoming from scale 0.86–0.90 plus blur |
| Unmount outgoing on click | Keep it mounted (or freeze a bitmap) through the dissolve |
| Fade two layouts at 50/50 | Outgoing 0.94, incoming 0.90, blur both |
| Tween lane `top` in screen pixels | Parent it to `100% + 11 px` of the shell |
| Width on SpringOut, height on ease | One clock for the silhouette |
| Morph on pointer-down | Morph on pointer-up, after the squash |
| Slide content sideways on view change | Scale + blur from top-center (completed tasks may nudge X; views may not) |
| Copy 560 ms into always-on chrome | Shorten toward §11 |

The tokens are the dialect. The rules in §1 and the view recipe in §8 are the grammar. Recreate the grammar first.
