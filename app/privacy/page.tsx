import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionReveal } from "@/components/marketing/SectionReveal";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Halo is local-first. Clipboard history is opt-in. Notes and settings stay on your PC.",
};

const points = [
  {
    title: "Clipboard history is opt-in",
    body: "Clips stay local on this PC. You choose whether history is enabled during onboarding or in Settings.",
  },
  {
    title: "Notes stay on disk",
    body: "Notes live under %LocalAppData%\\Halo\\notes. No cloud account is required for core features.",
  },
  {
    title: "Settings are local JSON",
    body: "Appearance, shortcuts, and preferences stay on your machine.",
  },
  {
    title: "Permissions when needed",
    body: "Notification and calendar access are requested only when those features need them.",
  },
];

export default function PrivacyPage() {
  return (
    <section className="section-y bg-neutral-50">
      <Container>
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-neutral-950 md:text-5xl">
            Local-first privacy
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-neutral-600">
            Halo keeps your data on this PC. No cloud account is required for
            the core product.
          </p>
        </SectionReveal>

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-2">
          {points.map((point, i) => (
            <SectionReveal key={point.title} delay={i * 0.04}>
              <div className="h-full rounded-[var(--radius-lg)] border border-neutral-200 bg-white p-6 shadow-soft">
                <h2 className="text-lg font-semibold text-neutral-950">
                  {point.title}
                </h2>
                <p className="mt-2 text-sm text-neutral-600">{point.body}</p>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal className="mt-12 text-center">
          <Button href="/download">Download for Windows</Button>
        </SectionReveal>
      </Container>
    </section>
  );
}
