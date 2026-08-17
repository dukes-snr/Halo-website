import type { Metadata } from "next";

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
    <section className="mx-auto max-w-[720px] px-6 pt-8 pb-16 md:pt-10">
      <h1 className="text-[32px] leading-[1.15] tracking-tight text-ink-2 md:text-[40px] lg:text-[44px]">
        Local-first <span className="font-display font-semibold">privacy</span>
      </h1>
      <p className="mt-5 max-w-[65ch] text-sm leading-relaxed text-ink md:text-base">
        Halo keeps your data on this PC. No cloud account is required for the
        core product.
      </p>

      <ul className="mt-14 flex flex-col gap-10">
        {points.map((point) => (
          <li key={point.title}>
            <h2 className="text-2xl font-medium tracking-tight text-ink md:text-3xl">
              {point.title}
            </h2>
            <p className="mt-2 text-sm text-ink/70 md:text-base">{point.body}</p>
          </li>
        ))}
      </ul>


    </section>
  );
}
