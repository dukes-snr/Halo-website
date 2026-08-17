import type { FeaturePage } from "@/lib/content";
import { Button } from "@/components/ui/Button";

export function FeaturePageView({ page }: { page: FeaturePage }) {
  return (
    <div className="bg-page">
      <section className="mx-auto max-w-[720px] px-6 pt-8 pb-16 md:pt-10">
        <h1 className="text-[32px] leading-[1.15] tracking-tight text-ink-2 md:text-[40px] lg:text-[44px]">
          <span className="font-display font-semibold">{page.title}.</span>{" "}
          {page.headline}
        </h1>
        <p className="mt-5 max-w-[65ch] text-sm leading-relaxed text-ink md:text-base">
          {page.body}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href="/download">Download Halo</Button>
          <Button href="/#stations" variant="secondary">
            See features
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6">
        <div className="overflow-hidden rounded-2xl bg-[#071016] shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={page.image}
            alt={page.title}
            className="w-full object-contain"
          />
        </div>
      </section>

      <section className="mx-auto max-w-[720px] px-6 pt-16 pb-8">
        <ul className="flex flex-col gap-10">
          {page.points.map((point) => (
            <li key={point.title}>
              <h2 className="text-2xl font-medium tracking-tight text-ink md:text-3xl">
                {point.title}
              </h2>
              <p className="mt-2 text-sm text-ink/70 md:text-base">{point.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
