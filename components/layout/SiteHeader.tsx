import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { NavMenu } from "@/components/layout/NavMenu";

/**
 * Header for every route except `/`, which carries its own fixed chrome.
 *
 * Same navigation as the landing page: mark on the left, three-dot toggle on
 * the right, everything else in the sheet behind it. The inline link row and
 * Download pill are gone — with the sheet listing all twelve stations plus the
 * download CTA, a second nav beside it was two navigations, not one.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-[60] bg-mist/85 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] w-full max-w-[1360px] items-center justify-between px-5 md:px-8">
        <Link
          href="/"
          aria-label="Halo home"
          className="transition-transform duration-300 hover:scale-[1.04]"
        >
          <Logo size={30} priority />
        </Link>

        <NavMenu />
      </div>
    </header>
  );
}
