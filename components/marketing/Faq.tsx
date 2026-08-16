"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { faq } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionReveal } from "@/components/marketing/SectionReveal";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-y scroll-mt-20 bg-[#edeced]">
      <Container>
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-neutral-600">
            Straight answers about focus, privacy, media, and languages.
          </p>
        </SectionReveal>

        <div className="mx-auto mt-10 max-w-2xl space-y-3">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <SectionReveal key={item.q} delay={i * 0.03}>
                <div className="overflow-hidden rounded-[var(--radius-md)] border border-neutral-200 bg-white">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="font-medium text-neutral-950">{item.q}</span>
                    <CaretDown
                      size={18}
                      className={`shrink-0 text-neutral-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen ? (
                    <div className="border-t border-neutral-100 px-5 py-4 text-sm leading-relaxed text-neutral-600">
                      {item.a}
                    </div>
                  ) : null}
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
