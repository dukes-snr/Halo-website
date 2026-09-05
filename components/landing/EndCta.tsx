import Link from "next/link";
import { chrome, endCta } from "@/lib/landing-content";

/**
 * Closing lockup, bookending the hero: the same mega two-liner, this time as
 * the download link. Copy stays honest — there is no installer URL yet, so the
 * note says so instead of pretending.
 */
export function EndCta() {
  return (
    <footer className="relative z-10 flex min-h-svh flex-col justify-end px-5 pb-5 md:px-8 md:pb-7">
      <Link
        href={endCta.href}
        className="landing-mega group block transition-colors duration-300 hover:text-flare"
      >
        <span className="sr-only">Download Halo for Windows</span>
        <span aria-hidden="true" className="block">
          {endCta.top}
        </span>
        <span aria-hidden="true" className="block">
          {endCta.bottom}
        </span>
      </Link>

      <p className="landing-readout mt-4 text-[11px] text-slate-soft">
        {endCta.note}
      </p>

      <div className="mt-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-t border-slate/10 pt-5 text-[13px] md:text-[14px]">
        <p>{chrome.strap}</p>

        <nav aria-label="Footer" className="flex items-center gap-5">
          {endCta.social.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-slate-soft transition-colors hover:text-slate"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <p className="text-slate-soft">{chrome.copyright}</p>
      </div>
    </footer>
  );
}
