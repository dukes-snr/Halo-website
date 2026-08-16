import type { Metadata } from "next";
import { changelog } from "@/lib/content";
import { productAssets } from "@/lib/product-assets";
import { Container } from "@/components/ui/Container";
import { ProductShot } from "@/components/ui/ProductShot";
import { SectionReveal } from "@/components/marketing/SectionReveal";
import { Button } from "@/components/ui/Button";

const changelogAssets = [
  productAssets.nook,
  productAssets.mediaExpanded,
] as const;

export const metadata: Metadata = {
  title: "Updates",
  description: "Halo product and marketing updates timeline.",
};

export default function ChangelogPage() {
  return (
    <section className="section-y bg-neutral-50">
      <Container>
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-neutral-950 md:text-5xl">
            Updates
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-neutral-600">
            Release notes for Halo. Expand this timeline as you ship builds.
          </p>
        </SectionReveal>

        <div className="relative mx-auto mt-16 max-w-4xl">
          <div
            className="absolute top-2 bottom-2 left-[7px] w-px bg-neutral-200 md:left-1/2 md:-translate-x-px"
            aria-hidden
          />

          <ol className="space-y-16">
            {changelog.map((entry, i) => (
              <li key={entry.version} className="relative">
                <SectionReveal>
                  <div className="grid gap-6 md:grid-cols-2 md:gap-12">
                    <div
                      className={`md:text-right ${i % 2 === 1 ? "md:order-2 md:text-left" : ""}`}
                    >
                      <div className="mb-3 flex items-center gap-3 md:justify-end">
                        {i % 2 === 0 ? (
                          <>
                            <span className="text-sm text-neutral-500 md:order-1">
                              {entry.date}
                            </span>
                            <span className="relative z-10 h-3.5 w-3.5 shrink-0 rounded-full bg-primary-500 ring-4 ring-neutral-50 md:absolute md:left-1/2 md:-translate-x-1/2" />
                          </>
                        ) : (
                          <>
                            <span className="relative z-10 h-3.5 w-3.5 shrink-0 rounded-full bg-primary-500 ring-4 ring-neutral-50 md:absolute md:left-1/2 md:-translate-x-1/2" />
                            <span className="text-sm text-neutral-500">
                              {entry.date}
                            </span>
                          </>
                        )}
                      </div>
                      <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
                        {entry.version}
                      </h2>
                      <p className="mt-1 text-sm font-medium text-neutral-700">
                        {entry.title}
                      </p>
                    </div>

                    <div className={i % 2 === 1 ? "md:order-1" : ""}>
                      <div className="overflow-hidden rounded-[var(--radius-lg)] border border-neutral-200 bg-[#f3f2f3] shadow-soft">
                        <ProductShot
                          src={changelogAssets[i % changelogAssets.length].src}
                          alt=""
                          width={changelogAssets[i % changelogAssets.length].width}
                          height={
                            changelogAssets[i % changelogAssets.length].height
                          }
                          size="card"
                        />
                      </div>
                      <p className="mt-4 text-sm text-neutral-600">{entry.body}</p>
                      <ul className="mt-3 space-y-1.5 text-sm text-neutral-600">
                        {entry.bullets.map((b) => (
                          <li key={b} className="flex gap-2">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </SectionReveal>
              </li>
            ))}
          </ol>
        </div>

        <SectionReveal className="mt-16 text-center">
          <Button href="/download">Download for Windows</Button>
        </SectionReveal>
      </Container>
    </section>
  );
}
