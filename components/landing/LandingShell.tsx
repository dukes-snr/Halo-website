"use client";

import { useCallback, useEffect, useState } from "react";
import { BootScreen } from "@/components/landing/BootScreen";
import { HaloUnit } from "@/components/landing/HaloUnit";
import { LandingChrome } from "@/components/landing/LandingChrome";
import { useSmoothScroll } from "@/components/landing/useSmoothScroll";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Client shell for the landing route: owns the boot sheet, the eased scroll
 * engine and the two fixed layers (chrome above, hardware unit below).
 * Everything it wraps stays a server component.
 */
export function LandingShell({ children }: { children: React.ReactNode }) {
  const [booting, setBooting] = useState(true);

  useSmoothScroll(!booting);

  const finishBoot = useCallback(() => setBooting(false), []);

  // Hold the page still under the boot sheet, and start every visit at the
  // top so the pinned unit's scroll choreography begins on beat one.
  useEffect(() => {
    if (!booting) return;
    window.scrollTo(0, 0);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      ScrollTrigger.refresh();
    };
  }, [booting]);

  return (
    <div className="landing relative">
      {booting ? <BootScreen onDone={finishBoot} /> : null}
      <LandingChrome />
      <HaloUnit />
      {children}
    </div>
  );
}
