import type { Metadata } from "next";
import { changelog } from "@/lib/content";

export const metadata: Metadata = {
  title: "Updates",
  description: "Halo product and marketing updates timeline.",
};

export default function ChangelogPage() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pt-8 pb-16 md:pt-10">
      <div className="max-w-[720px]">
        <h1 className="text-[32px] leading-[1.15] tracking-tight text-ink-2 md:text-[40px] lg:text-[44px]">
          Product <span className="font-display font-semibold">updates</span>
        </h1>
        <p className="mt-5 max-w-[65ch] text-sm leading-relaxed text-ink md:text-base">
          Release notes for Halo. Expand this list as you ship builds.
        </p>
      </div>

      <div className="mt-16 flex flex-col gap-16 md:gap-20">
        {changelog.map((entry) => (
          <article key={entry.version}>
            <div className="ml-8 md:ml-28">
              <p className="text-sm text-ink-muted">{entry.date}</p>
              <h2 className="mt-2 text-2xl font-medium tracking-tight text-ink md:text-3xl">
                {entry.title}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-ink/70 md:text-base">
                {entry.body}
              </p>
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl bg-[#071016] shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={entry.image} alt="" className="w-full object-contain" />
            </div>
            <ul className="ml-8 mt-4 space-y-1.5 text-sm text-ink/70 md:ml-28">
              {entry.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>


    </section>
  );
}
