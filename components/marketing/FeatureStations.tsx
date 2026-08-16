import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { stations } from "@/lib/content";
import { productAssets } from "@/lib/product-assets";
import { Container } from "@/components/ui/Container";
import { ProductShot } from "@/components/ui/ProductShot";
import { SectionReveal } from "@/components/marketing/SectionReveal";

const stationAssets = [
  productAssets.mediaExpanded,
  productAssets.tray,
  productAssets.call,
  productAssets.timer,
  productAssets.notificationReply,
  productAssets.apps,
] as const;

export function FeatureStations() {
  return (
    <section id="stations" className="section-y scroll-mt-20 bg-[#edeced]">
      <Container>
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl">
            Everything useful, one notch away
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-neutral-600">
            Stations for media, files, devices, calendar, notes, and apps. Built
            on real Windows integrations, not a web wrapper.
          </p>
        </SectionReveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {stations.map((station, i) => {
            const asset = stationAssets[i] ?? productAssets.nook;
            return (
              <SectionReveal key={station.href} delay={i * 0.04}>
                <Link
                  href={station.href}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-neutral-200/80 bg-white shadow-soft transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <div className="bg-[#f3f2f3]">
                    <ProductShot
                      src={asset.src}
                      alt=""
                      width={asset.width}
                      height={asset.height}
                      size="card"
                    />
                  </div>
                  <div className="flex flex-1 flex-col border-t border-neutral-100 p-5">
                    <h3 className="text-lg font-semibold text-neutral-950">
                      {station.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-neutral-600">
                      {station.body}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600">
                      Explore
                      <ArrowRight
                        size={16}
                        weight="bold"
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </SectionReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
