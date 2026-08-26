"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger direct children instead of treating the node as one unit. */
  stagger?: boolean;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "ul" | "ol";
};

export function Reveal({
  children,
  className = "",
  stagger = false,
  delay = 0,
  y = 36,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(stagger ? node.children : node, {
        y,
        filter: "blur(6px)",
        duration: 0.9,
        delay,
        ease: "expo.out",
        stagger: stagger ? 0.09 : 0,
        scrollTrigger: { trigger: node, start: "top 82%", once: true },
      });
    }, node);
    return () => ctx.revert();
  }, [stagger, delay, y]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
}
