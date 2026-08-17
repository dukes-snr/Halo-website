"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

export function useInViewAnimation<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const reduce = useReducedMotion();
  const [inView, setInView] = useState(Boolean(reduce));

  useEffect(() => {
    if (reduce) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return {
    ref,
    inView,
    className: reduce || inView ? "animate-fade-in-up" : "opacity-0",
  };
}
