import { UnitChassis } from "@/components/landing/HaloUnit";
import { chrome, heroBlock, screens } from "@/lib/landing-content";

/**
 * Hero lockup. The mega wordmark is deliberately set below the pinned unit's
 * z-index so the hardware crops into the type, exactly as the reference's
 * synth sits over its own name.
 */
export function HeroBlock() {
  return (
    <section className="relative z-10 flex min-h-svh flex-col justify-end px-5 pb-5 md:px-8 md:pb-7">
      {/* The pinned unit is desktop-only; small screens get it in the flow.
          The in-flow shot carries its own alt. On `md+` the pinned copy is
          aria-hidden, so the hero states in text what it shows. */}
      <p className="sr-only max-md:hidden">{screens.home.alt}.</p>

      <div className="mb-10 mt-28 md:hidden">
        <UnitChassis screen="home" priority />
      </div>

      <h1 className="landing-mega">
        <span className="sr-only">
          Halo — a Dynamic Island for Windows 11. {heroBlock.eyebrow}.
        </span>
        <span aria-hidden="true" className="block">
          {heroBlock.top}
        </span>
        <span aria-hidden="true" className="block">
          {heroBlock.bottom}
        </span>
      </h1>

      <div className="mt-5 flex items-end justify-between gap-6 text-[13px] text-slate md:text-[14px]">
        <p>{chrome.strap}</p>
        <p className="text-right text-slate-soft">{chrome.copyright}</p>
      </div>
    </section>
  );
}
