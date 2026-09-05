import type { FeaturePage } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { FeatureVideo } from "@/components/marketing/FeatureVideo";
import { RevealText } from "@/components/landing/RevealText";
import { WindowsIcon } from "@/components/ui/WindowsIcon";

/**
 * The template behind all twelve station pages, in the landing system: mist
 * ground, grotesk mega headline, the scroll reveal on every block of copy, and
 * the product footage on the same bare rounded screen the landing page pins —
 * no pastel gradient stage, no serif display.
 */
export function FeaturePageView({ page }: { page: FeaturePage }) {
  return (
    <div>
      <section className="mx-auto max-w-[1360px] px-5 pb-14 pt-20 md:px-8 md:pb-20 md:pt-28">
        <p className="landing-readout text-[11px] text-slate-soft">{page.title}</p>

        <RevealText
          as="h1"
          text={page.headline}
          className="mt-6 max-w-[16ch] text-[clamp(2.25rem,7vw,5rem)] font-medium leading-[0.94] tracking-[-0.038em]"
        />

        <p className="mt-7 max-w-[62ch] text-[16px] leading-[1.6] text-slate md:text-[17px]">
          {page.body}
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href="/download" className="min-w-[190px]">
            <WindowsIcon />
            Download for Windows
          </Button>
          <Button href="/features" variant="secondary" className="min-w-[150px]">
            See all features
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-[1360px] px-5 md:px-8">
        <div className="shell-shadow overflow-hidden rounded-[14px] md:rounded-[20px]">
          <FeatureVideo
            src={page.video}
            label={page.videoLabel}
            eager
            className="aspect-[8/5] w-full"
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1360px] px-5 py-24 md:px-8 md:py-32">
        <div className="grid gap-x-16 gap-y-12 md:grid-cols-[0.62fr_1.38fr]">
          <RevealText
            as="h2"
            runs={[
              { text: "Native where it " },
              { text: "matters.", accent: true },
            ]}
            className="text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-[1.14] tracking-[-0.032em]"
          />

          <ol className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {page.points.map((point) => (
              <li key={point.title}>
                <h3 className="text-[15px] font-normal text-slate-faint">
                  {point.title}
                </h3>
                <p className="mt-2 max-w-[38ch] text-[15px] leading-[1.55] text-slate">
                  {point.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
