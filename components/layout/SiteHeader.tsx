"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/lib/content";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname === "/") return null;

  return (
    <header className="relative mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 pt-10 pb-4">
      <Link
        href="/"
        className="font-display text-[28px] font-semibold tracking-tight text-ink"
      >
        {site.name}
      </Link>
      <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
        {nav.primary.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm text-ink transition-opacity hover:opacity-70"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 lg:hidden"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>
      {open ? (
        <div className="absolute top-20 right-6 left-6 z-40 rounded-[24px] bg-white p-4 shadow-card lg:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {nav.primary.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2.5 text-[15px] text-ink"
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
