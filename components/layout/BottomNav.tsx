"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/content";
import { Button } from "@/components/ui/Button";

export function BottomNav() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(pathname !== "/");

  useEffect(() => {
    if (pathname !== "/") {
      setVisible(true);
      return;
    }
    const hero = document.querySelector("[data-hero]");
    if (!hero) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.15 },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      <div className="pointer-events-auto flex items-center gap-4 rounded-full bg-white px-4 py-2 shadow-nav md:px-8">
        <span className="font-display text-2xl font-semibold text-ink" aria-hidden>
          H
        </span>
        <span className="sr-only">{site.name}</span>
        <Button href="/download">Download Halo</Button>
      </div>
    </div>
  );
}
