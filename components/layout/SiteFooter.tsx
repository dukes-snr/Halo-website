"use client";

import Link from "next/link";
import { useState } from "react";
import { nav, site } from "@/lib/content";
import { Mascot } from "@/components/brand/Mascot";
import { LogoMark } from "@/components/brand/Logo";
import { chrome } from "@/lib/landing-content";

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
          size={96}
          animation="idle"
          hoverAnimation="curious"
          pokeAnimation="playful"
          ariaLabel="Halo mascot"
        />
      </div>
    </div>
  );
}

/**
 * Footer for every route except `/`, which closes with its own mega lockup.
 * Same parts as that lockup — big wordmark, strap, copyright — one step down
 * in scale so it reads as the quiet version of the same idea.
 */
export function SiteFooter() {
  return (
    <footer className="mt-24 px-5 pb-6 md:px-8 md:pb-8">
      <div className="mx-auto w-full max-w-[1360px]">
        <Link
          href="/download"
          className="block text-[clamp(2.5rem,11vw,8rem)] font-medium leading-[0.86] tracking-[-0.035em] transition-colors duration-300 hover:text-flare"
        >
          <span className="sr-only">Download Halo for Windows</span>
          <span aria-hidden="true" className="block">
            download
          </span>
          <span aria-hidden="true" className="block">
            for windows
          </span>
        </Link>

        <div className="mt-10 flex flex-col gap-10 border-t border-slate/10 pt-8 md:flex-row md:justify-between">
          <div className="flex max-w-[400px] items-start gap-5">
            {/* The mark, then the pokeable mascot beside it — the logo is the
                brand, the mascot is the product feature. */}
            <Link href="/" aria-label="Halo home" className="shrink-0 pt-1">
              <LogoMark size={44} />
            </Link>
            <FooterMascot />
            <p className="pt-2 text-[14px] leading-relaxed text-slate-soft">
              {site.tagline}. Native Windows, local-first, assistant off by
              default.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-10 gap-y-2.5 sm:grid-cols-3 md:max-w-[520px]"
          >
            {nav.features.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[14px] text-slate-soft transition-colors hover:text-flare"
              >
                {item.label}
              </Link>
            ))}
            {[
              { href: "/features", label: "All features" },
              { href: "/changelog", label: "Updates" },
              { href: "/download", label: "Download" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[14px] text-slate-soft transition-colors hover:text-flare"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-4 text-[13px]">
          <p>{chrome.strap}</p>
          <p className="text-slate-soft">{chrome.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
