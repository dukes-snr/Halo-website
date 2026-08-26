"use client";

import { useState } from "react";
import type { ReleaseCard, SectionView } from "@/lib/changelog";

function Section({ section }: { section: SectionView }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="cl-section mt-5">
      <h4 className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-ink/45">{section.title}</h4>
      <ul className="mt-2 space-y-2">
        {section.visible.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[13.5px] leading-[1.55] text-ink/75 md:text-[14px]">
            <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink" />
            {item}
          </li>
        ))}
      </ul>
      {section.hasMore ? (
        <>
          {open ? (
            <ul className="cl-section__list--more mt-2 space-y-2">
              {section.overflow.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[13.5px] leading-[1.55] text-ink/75 md:text-[14px]">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink" />
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
          <button
            type="button"
            className="cl-more mt-3 text-[13px] font-bold text-ink underline decoration-2 underline-offset-4"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Show less" : `Show more (${section.overflow.length})`}
          </button>
        </>
      ) : null}
    </div>
  );
}

export function ChangelogReleaseCard({ card }: { card: ReleaseCard }) {
  return (
    <article className="cl-card relative grid gap-5 md:grid-cols-[230px_minmax(0,1fr)] md:gap-10" data-version={card.version}>
      <header className="relative md:pl-12 md:pt-1">
        <span aria-hidden className="absolute left-0 top-2 hidden h-2 w-2 rounded-full bg-ink md:block" />
        <p className="text-[12px] text-ink/45">{card.date ?? "Pre-release"}</p>
        <h2 className="mt-1 font-display text-[24px] font-semibold leading-tight tracking-[-0.02em] text-ink md:text-[27px]">
          {card.version}
        </h2>
      </header>
      <div className="overflow-hidden rounded-[24px] ring-1 ring-line">
        <div className="border-b border-line bg-haze px-6 py-5 md:px-8">
          <h3 className="font-display text-[24px] font-semibold leading-tight tracking-[-0.02em] text-ink md:text-[28px]">
            {card.headline}
          </h3>
        </div>
        <div className="p-6 md:p-8">
          {card.summary ? <p className="text-[14px] leading-[1.6] text-ink/70 md:text-[15px]">{card.summary}</p> : null}
          {card.sections.map((section) => (
            <Section key={section.title} section={section} />
          ))}
        </div>
      </div>
    </article>
  );
}
