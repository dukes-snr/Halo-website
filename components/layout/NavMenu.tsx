"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { chrome } from "@/lib/landing-content";

/** False during SSR, true once hydrated — without a setState round trip. */
function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

/**
 * The three-dot toggle and the full-bleed menu sheet behind it.
 *
 * Shared by the landing chrome and the header on every other route, so the
 * site has one navigation rather than two that drift apart. Owns its own open
 * state — nothing above it needs to care.
 *
 * The sheet is portalled to `document.body`. It has to be: `SiteHeader` uses
 * `backdrop-blur`, and a backdrop-filter ancestor becomes the containing block
 * for `position: fixed` descendants — so an in-place sheet resolved `inset-0`
 * against the header's 72px bar instead of the viewport and collapsed into a
 * strip behind it. The portal puts it out of reach of any ancestor filter or
 * transform, wherever this component is used.
 *
 * It sits at `z-50`, under the `z-[60]` chrome that holds the toggle, so the
 * button stays reachable while the sheet is open. Both grounds are mist, so a
 * translucent header bar over the sheet is invisible.
 */
export function NavMenu() {
  const [open, setOpen] = useState(false);
  const mounted = useMounted();

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

      {mounted
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="landing fixed inset-0 z-50 bg-mist"
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
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
