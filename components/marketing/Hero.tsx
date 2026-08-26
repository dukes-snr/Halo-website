"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { gsap } from "@/lib/gsap";
import { hero } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { DroppyMock } from "@/components/marketing/DroppyMock";
import { WindowsIcon } from "@/components/ui/WindowsIcon";

export function Hero({ droppyMockHtml }: { droppyMockHtml: string }) {
  const root = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo(
        "[data-hero-line]",
        { autoAlpha: 0, y: 28, filter: "blur(8px)" },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1, stagger: 0.1 },
        0.08,
      )
        .fromTo(
          "[data-hero-cta]",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.06 },
          0.5,
        )
        .fromTo(
          "[data-hero-device]",
          { autoAlpha: 0, y: 80, scale: 0.98 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 1.25, ease: "expo.out" },
          0.45,
        );

      gsap.to("[data-hero-device]", {
        yPercent: 12,
        scale: 0.97,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={root} className="relative overflow-hidden bg-paper">
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />

      <div className="relative mx-auto flex max-w-[820px] shrink-0 flex-col items-center px-5 pt-8 text-center md:pt-10">
        <h1 className="font-display text-[clamp(34px,5.2vw,64px)] font-semibold leading-[1.06] tracking-[-0.025em] text-ink">
          <span data-hero-line className="block">
            Your Windows desktop
          </span>
          <span data-hero-line className="block">
            finally has a notch
          </span>
          <span data-hero-line className="block italic">
            worth using.
          </span>
        </h1>

        <p
          data-hero-line
          className="mt-4 max-w-[46ch] text-[15px] leading-[1.55] text-ink/60 md:text-[16px]"
        >
          {hero.subhead}
        </p>

        <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row">
          <span data-hero-cta>
            <Button href={hero.primaryCta.href}>
              <WindowsIcon />
              {hero.primaryCta.label}
            </Button>
          </span>
          <span
            data-hero-cta
            className="inline-flex h-10 items-center rounded-full px-4 text-[13px] text-ink/55 ring-1 ring-ink/10"
          >
            Coming soon
          </span>
        </div>

        <p data-hero-line className="mt-4 text-[13px] text-ink/45">
          Windows · Native · Local-first ·{" "}
          <Link href={hero.secondaryCta.href} className="text-ink/70 underline decoration-ink/20 hover:text-ink">
            {hero.secondaryCta.label}
          </Link>
        </p>
      </div>

      <div className="relative mx-auto mt-6 w-full max-w-[1520px] px-3 pb-5 md:mt-8 md:px-5 md:pb-6">
        <div
          data-hero-device
          className="relative z-10 h-[clamp(300px,calc(100svh-19rem),740px)]"
        >
          <DroppyMock html={droppyMockHtml} />
        </div>
        <p className="mt-3 shrink-0 text-center text-[13px] text-ink/45">
          Interactive demo · Click or tap the black pill
        </p>
      </div>
    </section>
  );
}
