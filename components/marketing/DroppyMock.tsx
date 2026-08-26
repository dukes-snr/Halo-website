"use client";

import { useEffect, useRef } from "react";
import { initDroppyMock } from "@/components/marketing/droppy/droppy-mock.js";
import "@/components/marketing/droppy/dmk.css";

type DroppyMockProps = {
  html: string;
};

export function DroppyMock({ html }: DroppyMockProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let frame = 0;
    document.documentElement.removeAttribute("data-dmk-ready");
    const boot = () => {
      if (cancelled) return;
      if (!document.getElementById("dmk-notch") || !document.getElementById("droppy-mock")) {
        frame = requestAnimationFrame(boot);
        return;
      }
      initDroppyMock();
    };
    frame = requestAnimationFrame(boot);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      document.documentElement.removeAttribute("data-dmk-ready");
    };
  }, [html]);

  return (
    <div className="halo-droppy-well h-full" id="hero-tryout">
      <div
        ref={hostRef}
        className="media-block media-block--glow h-full"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
