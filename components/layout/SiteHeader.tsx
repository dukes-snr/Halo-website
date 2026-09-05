"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { chrome } from "@/lib/landing-content";

const links = [
  { href: "/features", label: "Features" },
  { href: "/mascot", label: "Mascot" },
  { href: "/privacy", label: "Privacy" },
];

/**
 * Header for every route except `/`, in the landing idiom: the orange mark
 * instead of a wordmark tile, quiet grotesk links, a Fragment Mono download
 * pill, and the same full-bleed menu sheet the landing page uses.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-[60] bg-mist/85 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] w-full max-w-[1360px] items-center justify-between px-5 md:px-8">
          <Link
            href="/"
            aria-label="Halo home"
            onClick={() => setOpen(false)}
            className="transition-transform duration-300 hover:scale-[1.04]"
          >
            <Logo size={30} priority />
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[15px] transition-colors ${
                  pathname === item.href
                    ? "text-slate"
                    : "text-slate-soft hover:text-flare"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/download"
              className="landing-readout inline-flex h-10 items-center rounded-full bg-slate px-5 text-[11px] text-mist transition-colors hover:bg-flare hover:text-shell"
            >
              Download
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : chrome.menuLabel}
            className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-mist-deep/80 transition-colors hover:bg-slate hover:text-mist md:hidden"
          >
            {open ? (
              <X className="h-4 w-4" strokeWidth={1.75} />
            ) : (
              <span className="flex flex-col items-center gap-[3px]">
                <span className="block h-[3px] w-[3px] rounded-full bg-current" />
                <span className="block h-[3px] w-[3px] rounded-full bg-current" />
                <span className="block h-[3px] w-[3px] rounded-full bg-current" />
              </span>
            )}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-mist md:hidden"
          >
            <div
              data-native-scroll
              className="flex h-full flex-col overflow-y-auto overscroll-contain px-5 pb-10 pt-24"
            >
              <nav className="flex flex-1 flex-col justify-center gap-1">
                {chrome.links.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-1 text-[clamp(2rem,8vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.035em] transition-colors hover:text-flare"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Link
                href="/download"
                onClick={() => setOpen(false)}
                className="landing-readout inline-flex h-11 items-center justify-center rounded-full bg-slate px-6 text-[11px] text-mist"
              >
                Download for Windows
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
