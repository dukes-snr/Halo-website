"use client";

import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { WindowsIcon } from "@/components/ui/WindowsIcon";

export function CtaSection() {
  return (
    <section className="border-t border-line bg-paper px-5 py-24 text-center md:py-32">
      <Reveal>
        <h2 className="mx-auto max-w-[16ch] font-display text-[clamp(36px,5.4vw,64px)] font-semibold leading-[1.08] tracking-[-0.025em] text-ink">
          Get Halo{" "}
          <em className="italic font-medium">for Windows</em>
        </h2>
        <p className="mx-auto mt-5 max-w-[42ch] text-[16px] leading-[1.6] text-ink/55">
          Public installer coming soon. Native Windows, assistant off by
          default, and every model removable.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/download">
            <WindowsIcon />
            Download for Windows
          </Button>
          <Button href="/changelog" variant="secondary">
            Watch it evolve
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
