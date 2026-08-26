import { testimonials } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

export function PrinciplesBand() {
  return (
    <section className="border-t border-line bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-[1120px] px-5 md:px-8">
        <Reveal>
          <h2 className="mx-auto max-w-[18ch] text-center font-display text-[clamp(28px,3.8vw,44px)] font-semibold leading-[1.15] tracking-[-0.025em] text-ink">
            Quiet until relevant.{" "}
            <em className="italic font-medium">Native where it counts.</em>
          </h2>
        </Reveal>

        <Reveal
          stagger
          className="mt-14 grid gap-10 border-t border-line pt-12 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line"
        >
          {testimonials.map((item) => (
            <article key={item.name} className="md:px-8 first:md:pl-0 last:md:pr-0">
              <h3 className="font-display text-[22px] font-semibold leading-[1.25] tracking-[-0.02em] text-ink md:text-[24px]">
                {item.name}
              </h3>
              <p className="mt-4 text-[14px] leading-[1.65] text-ink/55 md:text-[15px]">
                {item.quote}
              </p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
