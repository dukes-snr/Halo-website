"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faq } from "@/lib/content";
import { useInViewAnimation } from "@/lib/useInViewAnimation";

function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-ink/10">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span className="text-base font-medium text-ink">{q}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-ink-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? (
        <p className="pb-5 text-sm leading-relaxed text-ink-muted">{a}</p>
      ) : null}
    </div>
  );
}

export function Faq() {
  const head = useInViewAnimation<HTMLHeadingElement>();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <h2
          ref={head.ref}
          className={`${head.className} text-[32px] leading-[1.15] tracking-tight text-ink-2 md:text-[40px]`}
        >
          Questions,{" "}
          <span className="font-display font-semibold">answered</span>
        </h2>
        <div className="mt-8">
          {faq.map((item, i) => (
            <FaqItem
              key={item.q}
              q={item.q}
              a={item.a}
              open={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
