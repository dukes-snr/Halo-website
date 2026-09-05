"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Full-bleed marquee band. The reference drives these off scroll rather than a
 * timer, so the giant type slides only while you are moving — the page feels
 * mechanical rather than animated at you.
 */
export function Band({ text, glyph }: { text: string; glyph: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        track,
        { xPercent: 0 },
        {
          xPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      );
    }, section);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  // Two identical halves so the -50% travel lands seamlessly.
  const cell = (key: string) => (
    <span key={key} className="flex shrink-0 items-center gap-[0.35em] pr-[0.35em]">
      <span className="landing-mega">{text}</span>
      <span className="landing-mega text-flare">{glyph}</span>
    </span>
  );

  return (
    <section ref={sectionRef} className="relative z-10 overflow-hidden py-[9vh]">
      {/* The line is read once; the repetition is visual rhythm only. */}
      <h2 className="sr-only">{text}</h2>
      <div
        ref={trackRef}
        aria-hidden="true"
        className="flex w-max flex-nowrap items-center"
      >
        {[0, 1, 2, 3].map((index) => cell(`cell-${index}`))}
      </div>
    </section>
  );
}
