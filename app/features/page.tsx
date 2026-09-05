import type { Metadata } from "next";
import Link from "next/link";
import { featurePages } from "@/lib/content";
import { RevealText } from "@/components/landing/RevealText";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Every station built into Halo: mascot, on-device AI, media, files, clips, control center, Bluetooth, calendar, notes, apps, notifications, and settings.",
};

export default function FeaturesPage() {
  return (
    <div>
      <section className="mx-auto max-w-[1360px] px-5 pb-16 pt-20 md:px-8 md:pb-20 md:pt-28">
        <p className="landing-readout text-[11px] text-slate-soft">
          Twelve stations
        </p>

        <RevealText
          as="h1"
          runs={[
            { text: "Everything the notch " },
            { text: "can do.", accent: true },
          ]}
          className="mt-6 max-w-[14ch] text-[clamp(2.25rem,7vw,5rem)] font-medium leading-[0.94] tracking-[-0.038em]"
        />

        <p className="mt-7 max-w-[54ch] text-[16px] leading-[1.6] text-slate md:text-[17px]">
          Twelve native Windows stations in one quiet presence at the top of
          your display.
        </p>
      </section>

      <section className="mx-auto max-w-[1360px] px-5 pb-28 md:px-8 md:pb-36">
        <ul className="grid border-t border-slate/12 sm:grid-cols-2 lg:grid-cols-3">
          {featurePages.map((page) => (
            <li key={page.slug}>
              <Link
                href={`/${page.slug}`}
                className="group flex h-full flex-col border-b border-slate/12 px-6 py-8 transition-colors hover:bg-mist-deep/60 sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:border-r lg:[&:nth-child(3n)]:border-r-0"
              >
                <h2 className="text-[20px] font-medium tracking-[-0.02em] transition-colors group-hover:text-flare">
                  {page.title}
                </h2>
                <p className="mt-2 text-[14px] leading-[1.55] text-slate-soft">
                  {page.headline}
                </p>
                <span className="landing-readout mt-6 text-[10px] text-slate-faint transition-colors group-hover:text-flare">
                  Explore →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
