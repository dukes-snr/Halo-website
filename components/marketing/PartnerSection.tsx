"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useInViewAnimation } from "@/lib/useInViewAnimation";
import { Button } from "@/components/ui/Button";

const trail = [
  "/product/feature-home-dashboard.png",
  "/product/feature-calendar.png",
  "/product/feature-notes-editor.png",
  "/product/feature-control-center.png",
  "/product/feature-bluetooth.png",
  "/product/feature-drop-actions.png",
];

type Stamp = {
  id: number;
  src: string;
  x: number;
  y: number;
  rotate: number;
};

export function PartnerSection() {
  const heading = useInViewAnimation<HTMLHeadingElement>();
  const cta = useInViewAnimation<HTMLDivElement>();
  const area = useRef<HTMLDivElement>(null);
  const last = useRef(0);
  const [stamps, setStamps] = useState<Stamp[]>([]);

  function spawn(event: React.MouseEvent<HTMLDivElement>) {
    const now = performance.now();
    if (now - last.current < 80) return;
    last.current = now;
    const box = area.current?.getBoundingClientRect();
    if (!box) return;
    const id = now;
    const next: Stamp = {
      id,
      src: trail[Math.floor(Math.random() * trail.length)],
      x: event.clientX - box.left,
      y: event.clientY - box.top,
      rotate: Math.random() * 20 - 10,
    };
    setStamps((current) => [...current.slice(-18), next]);
    window.setTimeout(() => {
      setStamps((current) => current.filter((item) => item.id !== id));
    }, 1000);
  }

  return (
    <section className="px-6 py-12">
      <div
        ref={area}
        onMouseMove={spawn}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-white py-32 shadow-card md:py-48"
      >
        {stamps.map((stamp) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={stamp.id}
            src={stamp.src}
            alt=""
            className="stamp-trail pointer-events-none absolute h-24 w-36 rounded-xl object-cover shadow-lg"
            style={{
              left: stamp.x,
              top: stamp.y,
              ["--stamp-rot" as string]: `${stamp.rotate}deg`,
            }}
          />
        ))}
        <h2
          ref={heading.ref}
          className={`${heading.className} relative z-10 mb-12 text-center font-display text-[48px] leading-[1.1] text-ink-2 md:text-[64px] lg:text-[80px]`}
        >
          Get Halo for Windows
        </h2>
        <div
          ref={cta.ref}
          className={`${cta.className} relative z-10 flex justify-center`}
        >
          <Button href="/download" className="pl-3">
            <Image
              src="/brand/halo-icon-64.png"
              alt=""
              width={40}
              height={40}
              className="rounded-full bg-foam p-1"
            />
            Download Halo
          </Button>
        </div>
      </div>
    </section>
  );
}
