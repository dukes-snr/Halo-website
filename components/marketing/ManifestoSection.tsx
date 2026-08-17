"use client";

import { useRef } from "react";
import { Quote } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useInViewAnimation } from "@/lib/useInViewAnimation";

const marks = [
  { label: "Windows 11", width: 110 },
  { label: ".NET 8", width: 78 },
  { label: "Local-first", width: 118 },
];

export function ManifestoSection() {
  const icon = useInViewAnimation<HTMLDivElement>();
  const quote = useInViewAnimation<HTMLQuoteElement>();
  const author = useInViewAnimation<HTMLParagraphElement>();
  const logos = useInViewAnimation<HTMLUListElement>();
  const frame = useInViewAnimation<HTMLDivElement>();
  const parallaxRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-36, 36]);

  return (
    <section className="mx-auto max-w-2xl px-6 py-12 text-center">
      <div
        ref={icon.ref}
        className={`${icon.className} flex justify-center`}
        style={{ animationDelay: "0.1s" }}
      >
        <Quote className="h-6 w-6 text-ink" aria-hidden />
      </div>
      <blockquote
        ref={quote.ref}
        className={`${quote.className} mt-5 text-[32px] leading-[1.15] tracking-tight text-ink-2 md:text-[40px] lg:text-[44px]`}
        style={{ animationDelay: "0.2s" }}
      >
        <span className="font-display font-semibold">Windows</span> deserves a
        notch that actually does the work
      </blockquote>
      <p
        ref={author.ref}
        className={`${author.className} mt-4 text-sm text-ink-muted italic`}
        style={{ animationDelay: "0.3s" }}
      >
        Halo
      </p>
      <ul
        ref={logos.ref}
        className={`${logos.className} mt-8 flex flex-wrap items-center justify-center gap-8`}
        style={{ animationDelay: "0.4s" }}
      >
        {marks.map((mark) => (
          <li
            key={mark.label}
            className="text-2xl font-medium text-ink"
            style={{ minWidth: mark.width }}
          >
            {mark.label}
          </li>
        ))}
      </ul>
      <div
        ref={frame.ref}
        className={`${frame.className} mx-auto mt-10 w-full max-w-md`}
        style={{ animationDelay: "0.5s" }}
      >
        <div
          ref={parallaxRef}
          className="overflow-hidden rounded-2xl bg-[#071016] shadow-lg"
        >
          <motion.div style={{ y }} className="will-change-transform">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/product/feature-home-dashboard.png"
              alt="Halo home station with media, apps, calendar, and notes"
              className="w-full object-contain p-3"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
