"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { testimonials } from "@/lib/content";
import { useInViewAnimation } from "@/lib/useInViewAnimation";

export function TestimonialCarousel() {
  const heading = useInViewAnimation<HTMLDivElement>();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const loop = useMemo(
    () => [...testimonials, ...testimonials, ...testimonials],
    [],
  );
  const count = testimonials.length;

  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, 3000);
    return () => window.clearInterval(id);
  }, [paused, reduce, count]);

  return (
    <section className="py-20">
      <div
        ref={heading.ref}
        className={`${heading.className} mx-auto mb-10 flex max-w-4xl flex-col gap-4 px-6 md:ml-auto md:flex-row md:items-end md:justify-between`}
      >
        <h2 className="text-[32px] leading-[1.15] tracking-tight text-ink-2 md:text-[40px] lg:text-[44px]">
          What{" "}
          <span className="font-display font-semibold">builders</span> say
        </h2>
        <p className="text-sm text-ink-muted">Sample quotes until we publish real ones</p>
      </div>

      <div
        className="relative overflow-hidden px-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex gap-6"
          style={{
            transform: `translateX(calc(-${index} * (min(100%, 427.5px) + 1.5rem)))`,
            transitionProperty: reduce ? "none" : "transform",
            transitionDuration: "0.8s",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {loop.map((item, i) => (
            <article
              key={`${item.quote}-${i}`}
              className="w-[calc(100%-48px)] shrink-0 rounded-[32px] bg-white px-6 py-8 shadow-card md:w-[427.5px] md:rounded-[40px] md:pl-10 md:pr-16"
            >
              <svg
                viewBox="0 0 32 24"
                className="h-6 w-8 text-ink"
                aria-hidden
              >
                <path
                  fill="currentColor"
                  d="M0 24V10.4C0 4.7 3.4 0.8 9.2 0v4.2C6.1 4.7 4.6 6.8 4.6 10.2H9V24H0Zm16 0V10.4c0-5.7 3.4-9.6 9.2-10.4v4.2c-3.1.5-4.6 2.6-4.6 6H25V24h-9Z"
                />
              </svg>
              <p className="mt-5 text-base leading-relaxed text-ink-2">
                {item.quote}
              </p>
              <div className="mt-8 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink font-display text-lg text-foam">
                  H
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{item.name}</p>
                  <p className="text-sm text-ink-muted">
                    <span aria-hidden>{"-> "}</span>
                    {item.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-ink-2/20 text-ink-2 transition-transform active:scale-[0.98]"
            aria-label="Previous quote"
            onClick={() => setIndex((current) => (current - 1 + count) % count)}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-ink-2/20 text-ink-2 transition-transform active:scale-[0.98]"
            aria-label="Next quote"
            onClick={() => setIndex((current) => (current + 1) % count)}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
