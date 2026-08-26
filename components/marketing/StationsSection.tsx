"use client";

import { stations } from "@/lib/content";
import { StationBoard } from "@/components/marketing/StationBoard";

export function StationsSection() {
  return (
    <section id="stations" className="relative scroll-mt-16 overflow-x-clip border-t border-line bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-[1120px] px-5 md:px-8">
        <h2 className="max-w-[16ch] font-display text-[clamp(36px,5vw,56px)] font-semibold leading-[1.08] tracking-[-0.025em] text-ink">
          One notch.{" "}
          <em className="italic font-medium">Every station.</em>
        </h2>
        <p className="mt-4 max-w-[48ch] text-[16px] leading-[1.6] text-ink/55">
          Pick a station. The island changes size. The desktop stays put.
        </p>
      </div>

      <div className="mt-8 md:mt-10">
        <StationBoard stations={stations} />
      </div>
    </section>
  );
}
