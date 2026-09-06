import Link from "next/link";
import { LogoMark } from "@/components/brand/Logo";
import { NavMenu } from "@/components/layout/NavMenu";
import { WaitlistCta } from "@/components/layout/WaitlistCta";
import { chrome } from "@/lib/landing-content";

/**
 * Fixed page furniture: the mark, the standing tagline and the menu toggle.
 * The reference site carries these three through the whole scroll instead of a
 * conventional nav bar, so the mega type never fights a header.
 *
 * Sits above the menu sheet so the toggle stays reachable while it is open.
 */
export function LandingChrome() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex items-start justify-between px-5 py-5 md:px-8 md:py-7">
      <Link
        href="/"
        aria-label="Halo home"
        className="pointer-events-auto block transition-transform duration-300 hover:scale-110"
      >
        <LogoMark size={38} priority className="md:hidden" />
        <LogoMark size={46} priority className="hidden md:block" />
      </Link>

      <p className="hidden max-w-[15rem] whitespace-pre-line text-center text-[15px] font-medium leading-[1.35] text-slate sm:block md:text-[17px]">
        {chrome.tagline}
      </p>

      <div className="flex items-center gap-2.5 md:gap-3">
        <WaitlistCta />
        <NavMenu />
      </div>
    </div>
  );
}
