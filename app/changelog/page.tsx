import type { Metadata } from "next";
import feed from "@/lib/data/changelog.json";
import { releaseCards, type ChangelogFeed } from "@/lib/changelog";
import { ChangelogReleaseCard } from "@/components/marketing/ChangelogReleaseCard";
import { RevealText } from "@/components/landing/RevealText";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Halo pre-1.0 release notes. Every gated push since 12 August 2026, newest first.",
};

export default function ChangelogPage() {
  const cards = releaseCards(feed as ChangelogFeed);

  return (
    <div>
      <section className="mx-auto max-w-[1360px] px-5 pb-16 pt-20 md:px-8 md:pb-20 md:pt-28">
        <p className="landing-readout text-[11px] text-slate-soft">
          Pre-1.0 · newest first
        </p>

        <RevealText
          as="h1"
          text="Changelog"
          className="mt-6 text-[clamp(2.25rem,7vw,5rem)] font-medium leading-[0.94] tracking-[-0.038em]"
        />

        <p className="mt-7 max-w-[58ch] text-[16px] leading-[1.6] text-slate md:text-[17px]">
          Halo has not launched. These 0.x notes are every published gated push
          since August 2026, newest first. Unpublished work stays off this page.
        </p>
      </section>

      <section className="mx-auto max-w-[1360px] px-5 pb-28 md:px-8 md:pb-36">
        <div id="changelog-root" className="flex flex-col gap-14 md:gap-20">
          {cards.map((card) => (
            <ChangelogReleaseCard key={card.version} card={card} />
          ))}
        </div>
      </section>
    </div>
  );
}
