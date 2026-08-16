import { productAssets } from "@/lib/product-assets";
import { Container } from "@/components/ui/Container";
import { ProductShot } from "@/components/ui/ProductShot";
import { SectionReveal } from "@/components/marketing/SectionReveal";
import { Button } from "@/components/ui/Button";

export function MakeYours() {
  const apps = productAssets.apps;

  return (
    <section className="section-y bg-[#edeced]">
      <Container>
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl">
            Make Halo truly yours
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-neutral-600">
            Appearance, hover expand, drop actions, display target, fullscreen
            policy, shortcuts, and language. Full Settings from the gear.
          </p>
        </SectionReveal>

        <SectionReveal className="mt-12" delay={0.06}>
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-white shadow-card">
            <div className="bg-[#f3f2f3]">
              <ProductShot
                src={apps.src}
                alt="Halo Apps station with favorite app icons"
                width={apps.width}
                height={apps.height}
                size="fluid"
              />
            </div>
            <div className="p-6 md:p-10">
              <h3 className="text-2xl font-semibold tracking-tight text-neutral-950">
                Multi-monitor, DPI, and languages
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-neutral-600">
                <li>Sticky target display with DPI-aware geometry</li>
                <li>Fullscreen hide, always show, or process overrides</li>
                <li>Ten languages or Match Windows</li>
                <li>Configurable global hotkeys</li>
              </ul>
              <Button href="/settings" variant="secondary" className="mt-7">
                Settings overview
              </Button>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
