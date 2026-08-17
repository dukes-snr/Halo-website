"use client";

import { useInViewAnimation } from "@/lib/useInViewAnimation";
import { Button } from "@/components/ui/Button";

export function GetHaloSection() {
  const dark = useInViewAnimation<HTMLElement>();
  const light = useInViewAnimation<HTMLElement>();

  return (
    <section className="px-6 py-12">
      <div className="mx-auto grid grid-cols-1 gap-8 md:max-w-4xl md:grid-cols-2 md:ml-auto">
        <article
          ref={dark.ref}
          className={`${dark.className} rounded-[40px] bg-ink px-10 pt-8 pb-10 text-foam shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]`}
          style={{ animationDelay: "0.1s" }}
        >
          <h2 className="text-[22px] font-medium text-foam">Download Halo</h2>
          <p className="mt-3 text-sm leading-relaxed text-mist">
            A native activity notch for Windows 11.
            <br />
            Media, files, devices, and calendar in one glance.
          </p>
          <p className="mt-8 text-2xl text-foam">Windows 11</p>
          <p className="text-sm text-mist">Coming soon</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href="/download" variant="tertiary">
              Download Halo
            </Button>
            <Button href="/#faq" variant="secondary">
              How it works
            </Button>
          </div>
        </article>

        <article
          ref={light.ref}
          className={`${light.className} rounded-[40px] bg-white px-10 pt-8 pb-10 text-ink shadow-card`}
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="text-[22px] font-medium">See it work</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/80">
            Seven stations, real Windows integrations.
            <br />
            Same notch, local data, no account required.
          </p>
          <p className="mt-8 text-2xl text-ink-2">Seven stations</p>
          <p className="text-sm text-ink-muted">Media to settings</p>
          <div className="mt-6">
            <Button href="/media" variant="tertiary">
              Open Media
            </Button>
          </div>
        </article>
      </div>
    </section>
  );
}
