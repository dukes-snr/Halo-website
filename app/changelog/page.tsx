import type { Metadata } from "next";
import feed from "@/lib/data/changelog.json";
import { releaseCards, type ChangelogFeed } from "@/lib/changelog";
import { ChangelogReleaseCard } from "@/components/marketing/ChangelogReleaseCard";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Halo pre-1.0 release notes. Every gated push since 12 August 2026, newest first.",
};

export default function ChangelogPage() {
  const cards = releaseCards(feed as ChangelogFeed);

  return (
    <section className="mx-auto max-w-[1020px] px-5 pb-24 pt-16 sm:px-6 md:pb-32 md:pt-24">
      <h1 className="text-center font-display text-[44px] font-semibold leading-none tracking-[-0.025em] text-ink sm:text-[54px] md:text-[64px]">
        Changelog
      </h1>
      <p className="mx-auto mt-4 max-w-[52ch] text-center text-[16px] leading-[1.6] text-ink/60">
        Halo has not launched. These 0.x notes are every published gated push since August 2026, newest first. Unpublished work stays off this page.
      </p>

      <div className="relative mt-14 md:mt-20">
        <div aria-hidden className="absolute bottom-8 left-[7px] top-4 hidden w-[3px] rounded-full bg-ink/10 md:block" />
        <div id="changelog-root" className="flex flex-col gap-14 md:gap-20">
          {cards.map((card, index) => (
            <div key={card.version}>
              <ChangelogReleaseCard card={card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
