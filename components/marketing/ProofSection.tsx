"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { SectionReveal } from "@/components/marketing/SectionReveal";
import { HaloActivityDock } from "@/components/marketing/HaloActivityDock";

/** Halo-backed capability chips (from product brief) */
const chips = [
  "Local first",
  "Privacy first",
  "Live media",
  "Drop actions",
  "Favorite apps",
  "Files tray",
  "Calendar",
  "Event reminders",
  "Notes",
  "Control Center",
  "Bluetooth",
  "Clipboard",
  "Multi-monitor",
  "10 languages",
  "No focus steal",
];

/**
 * CoolDock "Everything useful, one Dock away" section - Halo version.
 * Centered headline, feature chips, large rounded media stage with coded dock.
 */
export function ProofSection() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-[#edeced] px-4 pb-20 pt-16 sm:px-6 md:pb-28 md:pt-24">
      <div className="mx-auto max-w-[920px] text-center">
        <SectionReveal>
          <h2 className="text-balance text-[2.35rem] font-semibold leading-[1.08] tracking-[-0.035em] text-neutral-950 sm:text-5xl md:text-[3.25rem]">
            Everything useful, one notch away
          </h2>
          <p className="mx-auto mt-5 max-w-[36rem] text-pretty text-[15px] leading-relaxed text-neutral-500 md:text-[17px]">
            Add media, drop actions, apps, files, calendar, notes, devices, and
            more into a pure-black notch at the top of your Windows desktop.
          </p>
        </SectionReveal>

        <SectionReveal className="mt-8" delay={0.06}>
          <ul className="mx-auto flex max-w-[720px] flex-wrap items-center justify-center gap-2">
            {chips.map((label) => (
              <li key={label}>
                <span className="inline-flex rounded-full border border-neutral-200/80 bg-white px-3.5 py-1.5 text-[13px] font-medium text-neutral-600 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </SectionReveal>
      </div>

      {/* Large rounded demo stage - CoolDock proof video frame */}
      <SectionReveal className="mx-auto mt-12 max-w-[1040px] md:mt-16" delay={0.1}>
        <div className="relative overflow-hidden rounded-[28px] shadow-[0_24px_80px_-24px_rgba(0,0,0,0.28)] ring-1 ring-black/5 sm:rounded-[32px]">
          <div className="relative aspect-[16/10] w-full min-h-[280px] bg-neutral-200 sm:min-h-[360px] md:min-h-[420px]">
            {reduce ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/scene/hero-landscape.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/scene/hero-landscape.jpg"
                aria-hidden
              >
                <source src="/scene/bg-vid.mp4" type="video/mp4" />
              </video>
            )}

            {/* Implementation capture: small, top-center of the screen */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center">
              <Image
                src="/scene/implementation-media-expanded.png"
                alt="Halo media player"
                width={420}
                height={190}
                priority
                className="block h-auto w-[min(42%,280px)] object-contain object-top sm:w-[min(32%,300px)] md:w-[min(28%,320px)]"
              />
            </div>

            {/* Soft bottom fade so dock reads cleanly */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/25 to-transparent" />

            {/* Coded Halo dock floating over media (CoolDock proof layout) */}
            <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center px-4 sm:bottom-8 md:bottom-10">
              <div className="w-full max-w-[640px] scale-[0.92] sm:scale-100">
                <HaloActivityDock />
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
