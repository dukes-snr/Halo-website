"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { List, X, WindowsLogo } from "@phosphor-icons/react";

/** CoolDock-style floating glass pill nav, adapted for Halo */
const links = [
  { href: "/#stations", label: "Features" },
  { href: "/#faq", label: "FAQ" },
  { href: "/changelog", label: "Updates" },
  { href: "/files", label: "Files & Tray" },
  { href: "/media", label: "Media" },
  { href: "/privacy", label: "Privacy" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [pastHero, setPastHero] = useState(pathname !== "/");

  useEffect(() => {
    if (pathname !== "/") {
      setPastHero(true);
      return;
    }

    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight - 72);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (!pastHero) return null;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-4 md:pt-5">
      {/* Floating pill - matches CoolDock screenshot */}
      <div className="pointer-events-auto relative flex w-full max-w-[920px] items-center justify-between gap-2 rounded-full border border-white/70 bg-white/75 px-2 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-2xl sm:px-2.5 md:gap-1">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 rounded-full py-1 pr-2 pl-1"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-neutral-950">
            <Image
              src="/brand/halo-icon-64.png"
              alt=""
              width={18}
              height={18}
              className="invert"
              priority
            />
          </span>
          <span className="text-[14px] font-semibold tracking-tight text-neutral-950">
            Halo
          </span>
        </Link>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex"
          aria-label="Primary"
        >
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full px-2.5 py-1.5 text-[13px] font-medium text-neutral-600 transition-colors hover:bg-black/5 hover:text-neutral-950 xl:px-3"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5">
          <Link
            href="/download"
            className="inline-flex items-center gap-1.5 rounded-full bg-neutral-950 px-3.5 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-neutral-800 active:scale-[0.98]"
          >
            <WindowsLogo size={15} weight="fill" />
            <span className="hidden sm:inline">Download</span>
          </Link>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200/80 bg-white/80 lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="pointer-events-auto absolute top-full right-3 left-3 mt-2 rounded-2xl border border-white/70 bg-white/95 p-3 shadow-xl backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-0.5" aria-label="Mobile">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2.5 text-[15px] font-medium text-neutral-800"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
