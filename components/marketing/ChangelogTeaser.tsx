import Link from "next/link";
import feed from "@/lib/data/changelog.json";
import { releaseCards, type ChangelogFeed } from "@/lib/changelog";
import { FeatureVideo } from "@/components/marketing/FeatureVideo";
import { Reveal } from "@/components/ui/Reveal";

export function ChangelogTeaser() {
  const latest = releaseCards(feed as ChangelogFeed)[0];
  if (!latest) return null;
  const bullets = latest.sections[0]?.visible.slice(0, 4) ?? [];

  return (
    <section className="border-t border-line bg-paper">
      <div className="mx-auto max-w-[1120px] px-5 py-20 md:px-8 md:py-28">
        <Reveal className="grid items-center gap-12 md:grid-cols-[1fr_1.15fr] md:gap-16">
          <div>
            <p className="text-[13px] text-ink/45">
              {latest.date ?? "Pre-release"} · {latest.version}
            </p>
            <h2 className="mt-3 max-w-[16ch] font-display text-[clamp(30px,4vw,48px)] font-semibold leading-[1.08] tracking-[-0.025em] text-ink">
              {latest.headline}
            </h2>
            <p className="mt-5 max-w-[48ch] text-[15px] leading-[1.65] text-ink/55">{latest.summary}</p>
            <ul className="mt-6 space-y-2.5">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-[14px] leading-[1.55] text-ink/70">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink" />
                  {bullet}
                </li>
              ))}
            </ul>
            <Link
              href="/changelog"
              className="mt-8 inline-flex text-[14px] font-medium text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-ink"
            >
              All updates
            </Link>
          </div>

          <div className="overflow-hidden rounded-[24px] bg-haze shadow-card">
            <FeatureVideo
              src="/videos/halo-dynamic-notch-demo.mp4"
              label="Halo's dynamic notch in action"
              className="aspect-[8/5] w-full"
              eager
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
