import type { Metadata } from "next";
import Link from "next/link";
import { featurePages } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Every station built into Halo: mascot, on-device AI, media, files, clips, control center, Bluetooth, calendar, notes, apps, notifications, and settings.",
};

export default function FeaturesPage() {
  return (
    <div className="bg-paper">
      <section className="mx-auto max-w-[860px] px-5 pb-12 pt-16 text-center md:px-8 md:pb-16 md:pt-24">
        <h1 className="mx-auto max-w-[16ch] font-display text-[clamp(40px,6vw,72px)] font-semibold leading-[1.06] tracking-[-0.025em] text-ink">
          Everything the notch{" "}
          <em className="italic font-medium">can do.</em>
        </h1>
        <p className="mx-auto mt-5 max-w-[54ch] text-[16px] leading-[1.6] text-ink/55 md:text-[17px]">
          Twelve native Windows stations in one quiet presence at the top of
          your display.
        </p>
      </section>

      <section className="mx-auto max-w-[1120px] px-5 pb-24 md:px-8 md:pb-32">
        <Reveal stagger className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {featurePages.map((page) => (
            <Link
              key={page.slug}
              href={`/${page.slug}`}
              className="group flex flex-col border-b border-line p-6 sm:border-r sm:odd:[&:nth-last-child(1)]:border-r-0 lg:border-r lg:[&:nth-child(3n)]:border-r-0"
            >
              <h2 className="font-display text-[22px] font-semibold tracking-[-0.02em] text-ink">
                {page.title}
              </h2>
              <p className="mt-2 text-[14px] leading-[1.55] text-ink/55">{page.headline}</p>
              <span className="mt-5 text-[13px] font-medium text-ink/45 transition-colors group-hover:text-ink">
                Explore
              </span>
            </Link>
          ))}
        </Reveal>
      </section>
    </div>
  );
}
