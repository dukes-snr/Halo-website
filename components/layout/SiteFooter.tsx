"use client";

import Link from "next/link";
import { useState } from "react";
import { nav, site } from "@/lib/content";
import { Logo } from "@/components/brand/Logo";
import { Mascot } from "@/components/brand/Mascot";

function FooterMascot() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <div
      className="flex shrink-0 items-center justify-center"
      onMouseMove={(event) => {
        const box = event.currentTarget.getBoundingClientRect();
        const px = (event.clientX - box.left) / box.width - 0.5;
        const py = (event.clientY - box.top) / box.height - 0.5;
        setTilt({ x: py * -10, y: px * 12 });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <div
        className="transition-transform duration-150 ease-out will-change-transform"
        style={{
          transform: `perspective(560px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        <Mascot
          size={108}
          animation="idle"
          hoverAnimation="curious"
          pokeAnimation="playful"
          ariaLabel="Halo mascot"
        />
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-16 md:px-8 md:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between md:gap-16">
          <div className="flex max-w-[380px] items-start gap-5">
            <FooterMascot />
            <div className="pt-2">
              <Link href="/" className="inline-flex">
                <Logo />
              </Link>
              <p className="mt-3 text-[14px] leading-relaxed text-ink/55">
                {site.tagline}. Native Windows, local-first, assistant off by
                default.
              </p>
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-10 gap-y-2.5 sm:grid-cols-3 md:max-w-[520px]"
          >
            {nav.features.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[14px] text-ink/50 transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/features" className="text-[14px] text-ink/50 transition-colors hover:text-ink">
              All features
            </Link>
            <Link href="/changelog" className="text-[14px] text-ink/50 transition-colors hover:text-ink">
              Updates
            </Link>
            <Link href="/download" className="text-[14px] text-ink/50 transition-colors hover:text-ink">
              Download
            </Link>
          </nav>
        </div>

        <p className="mt-14 text-[13px] text-ink/40">© 2026 Halo</p>
      </div>
    </footer>
  );
}
