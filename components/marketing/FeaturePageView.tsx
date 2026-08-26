import type { FeaturePage } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { FeatureVideo } from "@/components/marketing/FeatureVideo";
import { WindowsIcon } from "@/components/ui/WindowsIcon";

export function FeaturePageView({ page }: { page: FeaturePage }) {
  return (
    <div className="bg-paper">
      <section className="mx-auto max-w-[860px] px-5 pb-12 pt-16 text-center md:px-8 md:pb-16 md:pt-24">
        <h1 className="mx-auto max-w-[18ch] font-display text-[clamp(40px,6vw,72px)] font-semibold leading-[1.06] tracking-[-0.025em] text-ink">
          {page.headline}
        </h1>
        <p className="mx-auto mt-5 max-w-[58ch] text-[16px] leading-[1.6] text-ink/55 md:text-[17px]">
          {page.body}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/download" className="min-w-[190px]">
            <WindowsIcon />
            Download for Windows
          </Button>
          <Button href="/features" variant="secondary" className="min-w-[150px]">
            See all features
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] px-5 md:px-8">
        <div
          className="overflow-hidden rounded-[28px] px-4 py-8 md:rounded-[36px] md:px-10 md:py-12"
          style={{
            background: "linear-gradient(135deg, #dbe6f4 0%, #f4eee3 52%, #f3d8c8 100%)",
          }}
        >
          <div className="overflow-hidden rounded-[18px] bg-paper shadow-pop">
            <FeatureVideo src={page.video} label={page.videoLabel} eager className="aspect-[8/5] w-full" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[980px] px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-10 md:grid-cols-[0.78fr_1.22fr] md:gap-16">
          <div>
            <h2 className="font-display text-[clamp(28px,4vw,44px)] font-semibold leading-[1.1] tracking-[-0.025em] text-ink">
              Native where it <em className="italic font-medium">matters.</em>
            </h2>
          </div>
          <ol className="divide-y divide-line border-y border-line">
            {page.points.map((point) => (
              <li key={point.title} className="py-6 first:pt-5 last:pb-5">
                <h3 className="font-display text-[20px] font-semibold tracking-[-0.02em] text-ink md:text-[22px]">
                  {point.title}
                </h3>
                <p className="mt-2 max-w-[58ch] text-[15px] leading-[1.6] text-ink/55">
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
