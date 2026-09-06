import Link from "next/link";

/**
 * The one standing call to action, shared by both headers so they cannot drift.
 *
 * It says "waitlist" rather than "download" because there is no installer yet.
 * A Download button that leads to a page saying "coming soon" spends the click
 * and returns nothing; asking for the email is the honest version of the same
 * intent, and it is the only thing on the site that compounds before launch.
 */
export function WaitlistCta({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/download"
      className={`pointer-events-auto inline-flex h-9 shrink-0 items-center rounded-full bg-slate px-4 text-[13px] font-medium whitespace-nowrap text-mist transition-colors hover:bg-flare hover:text-shell md:h-10 md:px-5 md:text-[14px] ${className}`}
    >
      <span className="md:hidden">Waitlist</span>
      <span className="hidden md:inline">Join the waitlist</span>
    </Link>
  );
}
