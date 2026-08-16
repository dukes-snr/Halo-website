"use client";

import Image from "next/image";
import { DownloadSimple } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionReveal } from "@/components/marketing/SectionReveal";

export function DownloadCta() {
  return (
    <section id="download" className="section-y scroll-mt-20 bg-[#edeced]">
      <Container>
        <SectionReveal className="relative mx-auto max-w-4xl">
          <div className="relative overflow-visible rounded-[1.75rem] border border-neutral-200/80 bg-white px-6 py-14 text-center shadow-card sm:px-12 sm:py-16">
            {/* CoolDock pricing rocks: large, true alpha PNGs */}
            <div className="pointer-events-none absolute -bottom-10 -left-14 z-0 hidden w-[260px] sm:block md:-left-24 md:w-[340px] lg:w-[400px]">
              <Image
                src="/scene/rock-left.png"
                alt=""
                width={1764}
                height={2560}
                unoptimized
                className="h-auto w-full select-none object-contain"
              />
            </div>
            <div className="pointer-events-none absolute -bottom-12 -right-14 z-0 hidden w-[260px] sm:block md:-right-24 md:w-[340px] lg:w-[400px]">
              <Image
                src="/scene/rock-right.png"
                alt=""
                width={1764}
                height={2560}
                unoptimized
                className="h-auto w-full select-none object-contain"
              />
            </div>

            <div className="relative z-10 mx-auto max-w-lg">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-950">
                <Image
                  src="/brand/halo-icon-64.png"
                  alt=""
                  width={32}
                  height={32}
                  className="invert"
                />
              </div>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl">
                Make Windows more glanceable
              </h2>
              <p className="mt-4 text-neutral-600">
                Download for Windows is coming soon. Leave this page bookmarked
                or check Updates for the first public build.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <Button href="/download">
                  <DownloadSimple size={18} weight="bold" />
                  Coming soon
                </Button>
                <Button href="/changelog" variant="secondary">
                  View updates
                </Button>
              </div>
              <p className="mt-4 text-xs text-neutral-500">
                Windows 11 · Native app · No account required for core features
              </p>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
