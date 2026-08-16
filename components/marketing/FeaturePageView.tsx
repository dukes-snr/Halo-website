import type { FeaturePage } from "@/lib/content";
import { productAssets } from "@/lib/product-assets";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ProductShot } from "@/components/ui/ProductShot";
import { SectionReveal } from "@/components/marketing/SectionReveal";

const byPath: Record<string, (typeof productAssets)[keyof typeof productAssets]> =
  {
    "/scene/implementation-media-expanded.png": productAssets.mediaExpanded,
    "/scene/implementation-tray-populated.png": productAssets.tray,
    "/scene/implementation-call.png": productAssets.call,
    "/scene/implementation-timer.png": productAssets.timer,
    "/scene/implementation-notification-reply.png":
      productAssets.notificationReply,
    "/scene/implementation-apps.png": productAssets.apps,
    "/scene/implementation-nook.png": productAssets.nook,
  };

export function FeaturePageView({ page }: { page: FeaturePage }) {
  const asset = byPath[page.image] ?? productAssets.nook;

  return (
    <div className="bg-[#edeced]">
      <section className="section-y pt-16 md:pt-20">
        <Container>
          <SectionReveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-primary-600">{page.title}</p>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-neutral-950 md:text-5xl">
              {page.headline}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-neutral-600">{page.body}</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button href="/download">Download for Windows</Button>
              <Button href="/#stations" variant="secondary">
                All features
              </Button>
            </div>
          </SectionReveal>

          <SectionReveal className="mt-12" delay={0.06}>
            <div className="mx-auto max-w-[1000px] overflow-hidden rounded-[1.5rem] bg-[#f6f5f6] shadow-card ring-1 ring-neutral-200/80">
              <ProductShot
                src={asset.src}
                alt={page.title}
                width={asset.width}
                height={asset.height}
                size="proof"
                priority
              />
            </div>
          </SectionReveal>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            {page.points.map((point, i) => (
              <SectionReveal key={point.title} delay={i * 0.05}>
                <div className="h-full rounded-[var(--radius-lg)] border border-neutral-200 bg-white p-6 shadow-soft">
                  <h2 className="text-lg font-semibold text-neutral-950">
                    {point.title}
                  </h2>
                  <p className="mt-2 text-sm text-neutral-600">{point.body}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
