"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import {
  SCREEN_H,
  SCREEN_W,
  screenBeats,
  screens,
  type ScreenKey,
} from "@/lib/landing-content";

/**
 * The persistent object, borrowed from the reference site's fixed synth: one
 * artefact pinned to the viewport for the entire page, drifting, tilting and
 * rescaling on scroll while the content flows underneath it.
 *
 * Here the artefact is a Windows display running at the captures' native
 * 16:10 — a rounded screen and nothing else, no bezel or chassis furniture.
 */

/**
 * Where the screen sits at each beat, as fractions of the viewport.
 *
 * Traced off the reference by sampling its own fixed element's transform at
 * 1440x900. Two things that matter and are easy to get wrong:
 *
 *   1. It is a pure translate + scale. There is no CSS rotation anywhere —
 *      the tilt people read on that site is painted into the artwork.
 *   2. It never gets small. Its rendered width stays between 79% and 108% of
 *      the viewport for the whole page; the scale range is 0.80 to 1.09.
 *
 * The path: raised in the hero, slide hard right past the manifesto, snap back
 * to centre above the media copy, swing left then right for the two sections
 * whose copy is laid out beside it, then settle centred and high for the back
 * half. Every edge beat is paired with a `Proof.align` that puts the copy on
 * the opposite half of the viewport, so the screen never sits on the words.
 *
 * The y offsets are pulled in from the reference's, because a 16:10 desktop is
 * about 1.4x taller than that site's wide instrument. Two constraints bound
 * them: the top edge must never leave the viewport, or the crop eats the notch
 * that is the whole point of the shot; and the bottom must clear the copy.
 * That fixes the scale floor at 0.86 rather than the reference's 0.80.
 *
 * Keyframes come in pairs: one to arrive at a position before a section
 * reaches the middle of the viewport, one to hold it there while that section
 * is read. Without the hold the timeline interpolates straight through and the
 * screen is always mid-drift. These are transform keyframes only — the image
 * swaps are driven separately by `screenBeats`.
 *
 * Edge beats scale up rather than down: with the copy moved to the other half
 * of the viewport there is nothing to collide with, so the screen can push
 * past the frame the way the reference's does at its own 1.09 peak.
 */
const beats = [
  { at: 0, x: 0, y: -0.11, scale: 1, edge: false },
  // manifesto (centre 0.12): hard right, copy takes the left half
  { at: 0.06, x: 0.46, y: -0.06, scale: 1, edge: true },
  { at: 0.15, x: 0.46, y: -0.06, scale: 1, edge: true },
  // media (centre 0.29): centred directly above the copy
  { at: 0.24, x: 0, y: -0.2, scale: 0.9, edge: false },
  { at: 0.33, x: 0, y: -0.2, scale: 0.9, edge: false },
  // files (centre 0.42): left edge, copy takes the right half
  { at: 0.38, x: -0.36, y: -0.06, scale: 1, edge: true },
  { at: 0.45, x: -0.36, y: -0.06, scale: 1, edge: true },
  // ai (centre 0.54): right edge, copy takes the left half
  { at: 0.51, x: 0.36, y: -0.06, scale: 1, edge: true },
  { at: 0.58, x: 0.36, y: -0.06, scale: 1, edge: true },
  // native (centre 0.66): centred above the copy again
  { at: 0.62, x: 0, y: -0.2, scale: 0.9, edge: false },
  { at: 0.71, x: 0, y: -0.2, scale: 0.9, edge: false },
  // specs (centre 0.83): parked high and centred over the card row
  { at: 0.79, x: 0, y: -0.2, scale: 0.86, edge: false },
  { at: 0.88, x: 0, y: -0.2, scale: 0.86, edge: false },
  // closing lockup
  { at: 0.95, x: 0, y: -0.11, scale: 1, edge: false },
];

/**
 * Per-resolution tuning for the two things that do not survive being expressed
 * in viewport units.
 *
 * On a wide display an `x` given in viewport widths throws the screen much
 * further out than the same number does at 1440, leaving a dead gap between it
 * and the copy — so the excursion is damped. There is also room to spare, so
 * the edge beats scale up past the frame the way the reference's peak does.
 * Narrower viewports keep the plain, undamped 1:1 treatment.
 */
const LARGE_VIEWPORT = 1600;

function tuning(width: number) {
  const large = width >= LARGE_VIEWPORT;
  return { edgeScale: large ? 1.12 : 1, xDamp: large ? 0.6 : 1 };
}

const screenKeys = Object.keys(screens) as ScreenKey[];

const frameClass =
  "shell-shadow relative overflow-hidden rounded-[14px] md:rounded-[20px]";

/**
 * One capture, in the document flow. Used on small screens where the pinned
 * unit does not travel — each section carries the shot that the desktop
 * choreography would have parked here.
 *
 * These are screenshots of UI: 8px system type and 1px hairlines. The default
 * quality 75 re-encode smears both, so ask for the full-quality variant
 * (allowed by `images.qualities` in the config).
 */
export function UnitChassis({
  screen,
  className = "",
  priority = false,
}: {
  screen: ScreenKey;
  className?: string;
  priority?: boolean;
}) {
  const shot = screens[screen];

  return (
    <div
      className={`${frameClass} ${className}`}
      style={{ aspectRatio: `${SCREEN_W} / ${SCREEN_H}` }}
    >
      <Image
        src={shot.src}
        alt={shot.alt}
        width={SCREEN_W}
        height={SCREEN_H}
        priority={priority}
        quality={100}
        sizes="(max-width: 768px) 92vw, 70vw"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

/** Interpolate the beat table at a normalised scroll position. */
function sample(progress: number) {
  let i = beats.length - 1;
  while (i > 0 && beats[i].at > progress) i -= 1;
  const from = beats[i];
  const to = beats[Math.min(i + 1, beats.length - 1)];
  const span = to.at - from.at;
  const t = span > 0 ? Math.min(Math.max((progress - from.at) / span, 0), 1) : 0;

  const { edgeScale, xDamp } = tuning(window.innerWidth);
  const scaleOf = (beat: (typeof beats)[number]) =>
    beat.scale * (beat.edge ? edgeScale : 1);

  return {
    x: (from.x + (to.x - from.x) * t) * window.innerWidth * xDamp,
    y: (from.y + (to.y - from.y) * t) * window.innerHeight,
    scale: scaleOf(from) + (scaleOf(to) - scaleOf(from)) * t,
  };
}

function PinnedStack({ beat }: { beat: number }) {
  const active = screenBeats[beat] ?? screenBeats[0];

  return (
    <div
      className={frameClass}
      style={{ aspectRatio: `${SCREEN_W} / ${SCREEN_H}` }}
    >
      {screenKeys.map((key) => {
        const shot = screens[key];
        return (
          <Image
            key={key}
            src={shot.src}
            alt=""
            width={SCREEN_W}
            height={SCREEN_H}
            priority={key === "home"}
            quality={100}
            sizes="70vw"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out"
            style={{ opacity: active.screen === key ? 1 : 0 }}
          />
        );
      })}
    </div>
  );
}

/**
 * Viewport-pinned screen for `md` and up. Below that breakpoint there is no
 * room to park a 16:10 desktop beside copy, so each section renders its own
 * `UnitChassis` in the flow instead of trying to scale this choreography down.
 */
export function HaloUnit() {
  const shellRef = useRef<HTMLDivElement>(null);
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    const node = shellRef.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 768px)");

    // The transform is interpolated by hand from the beat table rather than by
    // a chained GSAP timeline: the table holds a position across a section by
    // repeating it, and a timeline of many short back-to-back tweens does not
    // re-render those holds reliably when the scrub jumps around.
    //
    // The loop reads scroll position itself every frame instead of waking on a
    // ScrollTrigger callback. An event-driven version that stopped once it
    // converged missed later updates and left the screen a section behind.
    // Browsers already park rAF on hidden tabs, so a resident loop moving one
    // element's transform costs nothing worth reclaiming. It does not run
    // below `md`, where this node is `display: none`.
    let current = 0;
    let frame = 0;
    let shown = -1;
    let running = false;

    const progress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
    };

    const loop = () => {
      const target = progress();
      current = reduced ? target : current + (target - current) * 0.12;
      if (Math.abs(target - current) < 0.0004) current = target;

      gsap.set(node, sample(current));

      // Snap the capture to the nearest passed beat, and only commit to React
      // when the index changes so a 60fps scroll doesn't re-render the tree.
      let next = 0;
      for (let i = 0; i < screenBeats.length; i += 1) {
        if (target >= screenBeats[i].at) next = i;
      }
      if (next !== shown) {
        shown = next;
        setBeat(next);
      }

      frame = window.requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      running = true;
      current = progress();
      frame = window.requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(frame);
    };

    const sync = () => {
      if (wide.matches) start();
      else stop();
    };

    sync();
    wide.addEventListener("change", sync);
    return () => {
      stop();
      wide.removeEventListener("change", sync);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 hidden items-center justify-center overflow-hidden md:flex"
    >
      {/* Width is capped by height as well as by width: a 16:10 panel sized
          purely off `vw` overflows the top of a short viewport, and the notch
          lives in the top of the capture. `92vh` keeps the panel at roughly
          0.58 of the viewport height whatever the aspect ratio. */}
      <div
        ref={shellRef}
        className="w-[min(1200px,62vw,92vh)] shrink-0"
        style={{ willChange: "transform" }}
      >
        <PinnedStack beat={beat} />
      </div>
    </div>
  );
}
