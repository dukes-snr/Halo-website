"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { LogoMark } from "@/components/brand/Logo";
import { chrome } from "@/lib/landing-content";

/**
 * Fixed page furniture: the orange mark, the standing tagline and the menu
 * toggle. The reference site carries these three through the whole scroll
 * instead of a conventional nav bar, so the mega type never fights a header.
 */
export function LandingChrome() {
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
      {/* Above the menu sheet so the toggle stays reachable while it is open. */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex items-start justify-between px-5 py-5 md:px-8 md:py-7">
        <Link
          href="/"
          aria-label="Halo home"
          className="pointer-events-auto block transition-transform duration-300 hover:scale-110"
        >
          <LogoMark size={38} priority className="md:hidden" />
          <LogoMark size={46} priority className="hidden md:block" />
        </Link>

        <p
          className={`hidden max-w-[15rem] whitespace-pre-line text-center text-[15px] font-medium leading-[1.35] text-slate transition-opacity duration-200 md:text-[17px] ${
            open ? "sm:hidden" : "sm:block"
          }`}
        >
          {chrome.tagline}
        </p>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : chrome.menuLabel}
          className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-[10px] bg-mist-deep/80 backdrop-blur-sm transition-colors hover:bg-slate hover:text-mist md:h-10 md:w-10"
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

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-mist"
          >
            <div
              data-native-scroll
              className="flex h-full flex-col overflow-y-auto overscroll-contain px-5 pb-10 pt-24 md:px-8"
            >
              <nav className="flex flex-1 flex-col justify-center gap-1">
                {chrome.links.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.04 * index,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block py-1 text-[clamp(2rem,7vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.035em] text-slate transition-colors hover:text-flare"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-8">
                <Link
                  href="/download"
                  onClick={() => setOpen(false)}
                  className="landing-readout inline-flex h-11 items-center rounded-full bg-slate px-6 text-[11px] text-mist transition-colors hover:bg-flare hover:text-shell"
                >
                  Download for Windows
                </Link>
                <p className="landing-readout text-[11px] text-slate-soft">
                  {chrome.copyright}
                </p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
