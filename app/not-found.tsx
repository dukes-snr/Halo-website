import Link from "next/link";
import { LogoMark } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";

/**
 * 404, rendered inside the root layout — so it picks up the shared header and
 * the closing footer lockup without doing anything special.
 *
 * The mark stands in for the zero, which is why it is sized from CSS rather
 * than a fixed box: it has to track the digits at every breakpoint.
 */
export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[68svh] w-full max-w-[1360px] flex-col items-center justify-center px-5 py-24 text-center md:px-8 md:py-32">
      <p className="landing-readout text-[11px] text-slate-soft">Error 404</p>

      <div
        className="mt-8 flex items-center justify-center gap-2 md:gap-4"
        aria-hidden="true"
      >
        <span className="text-[clamp(5rem,17vw,13rem)] font-medium leading-none tracking-[-0.05em]">
          4
        </span>
        <LogoMark
          size={512}
          sizeClassName="h-auto w-[clamp(4rem,13.5vw,10.5rem)]"
        />
        <span className="text-[clamp(5rem,17vw,13rem)] font-medium leading-none tracking-[-0.05em]">
          4
        </span>
      </div>

      <h1 className="mt-10 text-[clamp(1.5rem,4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.035em]">
        Page <span className="text-flare">not</span> found
      </h1>

      <p className="mt-4 max-w-[46ch] text-[16px] leading-[1.6] text-slate-soft md:text-[17px]">
        This page does not exist. It may have moved, or the link that brought
        you here may be wrong.
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Button href="/" className="min-w-[190px]">
          Return to homepage
        </Button>
        <Button href="/features" variant="secondary" className="min-w-[150px]">
          See all features
        </Button>
      </div>

      <p className="mt-10 text-[14px] text-slate-faint">
        Looking for the{" "}
        <Link href="/download" className="text-slate underline underline-offset-4 transition-colors hover:text-flare">
          download
        </Link>{" "}
        or the{" "}
        <Link href="/changelog" className="text-slate underline underline-offset-4 transition-colors hover:text-flare">
          changelog
        </Link>
        ?
      </p>
    </section>
  );
}
