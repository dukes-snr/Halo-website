import { RevealText } from "@/components/landing/RevealText";
import { specs } from "@/lib/landing-content";

/**
 * Where the reference runs a testimonial carousel, Halo runs numbers. The
 * product has no customer quotes yet and inventing them is off the table, so
 * the same card rhythm carries code-backed facts instead.
 */
export function SpecMarquee() {
  return (
    // Sits low in the viewport so the pinned unit, which parks across the top
    // band on this stretch of the page, never lands on the cards.
    <section className="marquee-cards-track relative z-10 flex min-h-svh flex-col justify-end overflow-hidden pb-[18vh]">
      <h2 className="sr-only">Halo by the numbers</h2>
      <div className="animate-marquee-cards flex w-max">
        {[0, 1].map((pass) => (
          <ul key={pass} className="flex shrink-0" aria-hidden={pass === 1}>
            {specs.map((spec) => (
              <li
                key={`${pass}-${spec.source}`}
                className="w-[300px] shrink-0 px-5 md:w-[380px] md:px-8"
              >
                <p className="flex items-baseline gap-2">
                  <span className="text-[clamp(2rem,3.4vw,2.6rem)] font-medium leading-none tracking-[-0.04em]">
                    {spec.value}
                  </span>
                  <span className="text-[15px] text-slate-faint">{spec.unit}</span>
                </p>
                <RevealText
                  by="word"
                  range="early"
                  text={spec.body}
                  className="mt-4 text-[16px] leading-[1.45]"
                />
                <p className="mt-5 flex items-center gap-2">
                  <span className="block h-6 w-6 rounded-full bg-slate/10 ring-1 ring-inset ring-slate/15" />
                  <span className="text-[14px] text-slate-soft">{spec.source}</span>
                </p>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
