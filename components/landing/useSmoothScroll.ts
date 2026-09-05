"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Eased scroll, matching the reference site's weighted feel.
 *
 * Wheel and keyboard input move a target offset; a rAF loop lerps the real
 * `window.scrollY` toward it. Deliberately drives native scroll rather than
 * transforming a wrapper, because a transformed ancestor would break the
 * `position: fixed` hardware unit that rides the whole page.
 *
 * Opts out entirely for reduced motion and for touch/coarse pointers, where
 * the platform's own inertia is already better than anything we'd fake.
 */
export function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    if (reduced.matches || coarse.matches) return;

    let target = window.scrollY;
    let current = target;
    let frame = 0;
    let running = false;
    // Last position we wrote, so an external scroll (scrollbar drag, anchor
    // jump, devtools) can be told apart from our own writes and resynced.
    let written = target;

    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const clamp = (value: number) => Math.min(Math.max(value, 0), maxScroll());

    const tick = () => {
      const delta = target - current;

      if (Math.abs(delta) < 0.4) {
        current = target;
        window.scrollTo(0, current);
        written = window.scrollY;
        running = false;
        return;
      }

      current += delta * 0.11;
      window.scrollTo(0, current);
      written = window.scrollY;
      frame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = window.requestAnimationFrame(tick);
    };

    const nudge = (amount: number) => {
      target = clamp(target + amount);
      start();
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.defaultPrevented) return;
      // Let genuinely scrollable inner panes (the menu sheet) keep their own
      // scrolling instead of stealing it for the page.
      if ((event.target as Element | null)?.closest?.("[data-native-scroll]")) {
        return;
      }
      // deltaMode 1 is lines, 2 is pages; normalise both to pixels.
      const scale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      event.preventDefault();
      nudge(event.deltaY * scale);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const el = event.target as HTMLElement | null;
      if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) {
        return;
      }

      const page = window.innerHeight * 0.9;
      switch (event.key) {
        case "ArrowDown":
          nudge(90);
          break;
        case "ArrowUp":
          nudge(-90);
          break;
        case "PageDown":
          nudge(page);
          break;
        case "PageUp":
          nudge(-page);
          break;
        case " ":
          nudge(event.shiftKey ? -page : page);
          break;
        case "Home":
          target = 0;
          start();
          break;
        case "End":
          target = maxScroll();
          start();
          break;
        default:
          return;
      }
      event.preventDefault();
    };

    // Scrollbar drags and programmatic jumps bypass the loop; resync so the
    // next wheel tick doesn't yank the page back to a stale target.
    const onScroll = () => {
      if (running && Math.abs(window.scrollY - written) < 2) return;
      target = window.scrollY;
      current = window.scrollY;
    };

    const onResize = () => {
      target = clamp(target);
      current = window.scrollY;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    ScrollTrigger.refresh();

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [enabled]);
}
