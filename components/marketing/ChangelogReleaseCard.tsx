"use client";

import { useState } from "react";
import type { ReleaseCard, SectionView } from "@/lib/changelog";

function Item({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2.5 text-[14px] leading-[1.6] text-slate">
      <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-flare" />
      {text}
    </li>
  );
}

function Section({ section }: { section: SectionView }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="cl-section mt-6">
      <h4 className="landing-readout text-[10px] text-slate-faint">
        {section.title}
      </h4>
      <ul className="mt-2.5 space-y-2">
        {section.visible.map((item) => (
          <Item key={item} text={item} />
        ))}
      </ul>
      {section.hasMore ? (
        <>
          {open ? (
            <ul className="cl-section__list--more mt-2 space-y-2">
              {section.overflow.map((item) => (
                <Item key={item} text={item} />
              ))}
            </ul>
          ) : null}
          <button
            type="button"
            className="cl-more landing-readout mt-3 text-[10px] text-slate-soft transition-colors hover:text-flare"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Show less" : `Show more (${section.overflow.length})`}
          </button>
        </>
      ) : null}
    </div>
  );
}

/**
 * One release, in the landing idiom: hairline rules instead of a ringed card,
 * Fragment Mono for the version and section labels, flare on the bullets.
 */
export function ChangelogReleaseCard({ card }: { card: ReleaseCard }) {
  return (
    <article
      className="cl-card relative grid gap-6 border-t border-slate/12 pt-10 md:grid-cols-[220px_minmax(0,1fr)] md:gap-12"
      data-version={card.version}
    >
      <header className="relative md:pt-1">
        <p className="landing-readout text-[10px] text-slate-faint">
          {card.date ?? "Pre-release"}
        </p>
        <h2 className="mt-2 text-[26px] font-medium leading-tight tracking-[-0.03em] md:text-[30px]">
          {card.version}
        </h2>
      </header>

      <div>
        <h3 className="text-[clamp(1.25rem,2.4vw,1.75rem)] font-medium leading-[1.2] tracking-[-0.028em]">
          {card.headline}
        </h3>
        {card.summary ? (
          <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.6] text-slate-soft">
            {card.summary}
          </p>
        ) : null}
        {card.sections.map((section) => (
          <Section key={section.title} section={section} />
        ))}
      </div>
    </article>
  );
}
