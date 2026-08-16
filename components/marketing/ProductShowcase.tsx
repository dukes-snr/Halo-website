import { productAssets } from "@/lib/product-assets";
import { Container } from "@/components/ui/Container";
import { ProductShot } from "@/components/ui/ProductShot";
import { SectionReveal } from "@/components/marketing/SectionReveal";

const shots = [
  { asset: productAssets.clipboard, alt: "Halo clipboard history" },
  { asset: productAssets.callConnected, alt: "Halo connected call" },
  { asset: productAssets.timer, alt: "Halo timer" },
  { asset: productAssets.notificationList, alt: "Halo notification list" },
  { asset: productAssets.notificationReactions, alt: "Halo notification reactions" },
  { asset: productAssets.tray, alt: "Halo Files Tray" },
] as const;

export function ProductShowcase() {
  return (
    <section className="section-y bg-neutral-950 text-white">
      <Container>
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Live surfaces for real work
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-neutral-400">
            Drop files, control devices, check calendar, and keep clips local.
            Each surface is a real capture of Halo on Windows.
          </p>
        </SectionReveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shots.map((shot, i) => (
            <SectionReveal key={shot.asset.src} delay={i * 0.04}>
              <div className="overflow-hidden rounded-[1.25rem] bg-[#2a2a2a]">
                <ProductShot
                  src={shot.asset.src}
                  alt={shot.alt}
                  width={shot.asset.width}
                  height={shot.asset.height}
                  size="card"
                />
              </div>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
