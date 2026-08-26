import Link from "next/link";
import { Lock } from "lucide-react";

export function PrivacyBand() {
  return (
    <section className="border-t border-line bg-paper px-5 py-20 text-center md:py-28">
      <Lock className="mx-auto h-6 w-6 text-ink/40" strokeWidth={1.6} aria-hidden />
      <h2 className="mx-auto mt-5 max-w-[16ch] font-display text-[clamp(28px,4vw,44px)] font-semibold leading-[1.12] tracking-[-0.025em] text-ink">
        Local-first.{" "}
        <em className="italic font-medium">You&apos;re in control.</em>
      </h2>
      <p className="mx-auto mt-4 max-w-[46ch] text-[15px] leading-[1.65] text-ink/55">
        Notes, clips, speech, and optional models stay on this PC. Halo exists
        to keep Windows work local, not to ship it to a cloud.{" "}
        <Link href="/privacy" className="text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-ink">
          Learn more about privacy in Halo.
        </Link>
      </p>
    </section>
  );
}
