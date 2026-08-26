"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { WindowsIcon } from "@/components/ui/WindowsIcon";

const links = [
  { href: "/features", label: "Features" },
  { href: "/mascot", label: "Mascot" },
  { href: "/privacy", label: "Privacy" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] w-full max-w-[1120px] items-center justify-between px-5 md:px-8">
        <Link href="/" aria-label="Halo home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[14px] transition-colors ${
                  active ? "text-ink" : "text-ink/55 hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/download"
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-ink px-4 text-[13px] font-medium text-paper transition-colors hover:bg-ink/90"
          >
            <WindowsIcon className="h-3.5 w-3.5" />
            Download for Windows
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-line bg-paper px-5 py-4 md:hidden"
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="py-3 font-display text-[22px] text-ink/70 hover:text-ink"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/download"
                className="mt-3 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-ink text-[14px] font-medium text-paper"
                onClick={() => setOpen(false)}
              >
                <WindowsIcon />
                Download for Windows
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
