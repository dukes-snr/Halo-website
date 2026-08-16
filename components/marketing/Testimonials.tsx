import { Star } from "@phosphor-icons/react/dist/ssr";
import { testimonials } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionReveal } from "@/components/marketing/SectionReveal";

export function Testimonials() {
  return (
    <section className="section-y bg-[#edeced]">
      <Container>
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl">
            Loved by Windows users
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-neutral-600">
            Quote slots ready for real feedback. Replace these placeholders when
            you have reviews to publish.
          </p>
        </SectionReveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <SectionReveal key={i} delay={i * 0.05}>
              <figure
                className="flex h-full flex-col rounded-[var(--radius-lg)] border border-dashed border-neutral-300 bg-white p-6 shadow-soft"
                data-placeholder={item.placeholder ? "true" : undefined}
              >
                <div className="flex gap-0.5 text-accent-500" aria-hidden>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={16} weight="fill" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-neutral-800">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-5 border-t border-neutral-100 pt-4">
                  <p className="text-sm font-semibold text-neutral-950">
                    {item.name}
                  </p>
                  <p className="text-xs text-neutral-500">{item.role}</p>
                  {item.placeholder ? (
                    <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-neutral-400">
                      Placeholder - replace with real quote
                    </p>
                  ) : null}
                </figcaption>
              </figure>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
