import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Halo is local-first. Clipboard, notes, settings, speech, and optional AI models stay on your Windows PC.",
};

const points = [
  { title: "Clipboard is opt-in", body: "Clips stay local. Enable history during onboarding or later in Settings → Shelf & Clipboard." },
  { title: "Notes stay on disk", body: "Notes live under %LocalAppData%\\Halo\\notes. No cloud account or sync service is required." },
  { title: "Settings are local JSON", body: "Appearance, shortcuts, display targeting, fullscreen rules, and preferences remain on your machine." },
  { title: "The assistant starts off", body: "Halo is never always-listening. You explicitly enable Assistant and start each session by face click, hotkey, AI station, or typed command." },
  { title: "Speech stays on device", body: "Whisper models download to %LocalAppData%\\Halo\\models and process listen sessions locally." },
  { title: "Answers can stay local too", body: "Optional Gemma 3 1B handles free-form questions on device. It can be removed whenever you want." },
  { title: "Secrets use Windows storage", body: "Optional Spotify credentials and secret material use Windows Credential Manager rather than settings.json." },
  { title: "Permissions are requested when needed", body: "Notification and calendar access are requested only when you use those integrations." },
];

export default function PrivacyPage() {
  return (
    <div className="bg-paper">
      <section className="mx-auto max-w-[820px] px-5 pb-12 pt-16 text-center md:px-8 md:pb-16 md:pt-24">
        <h1 className="mx-auto max-w-[14ch] font-display text-[clamp(40px,6vw,72px)] font-semibold leading-[1.06] tracking-[-0.025em] text-ink">
          Local-first, including the{" "}
          <em className="italic font-medium">voice.</em>
        </h1>
        <p className="mx-auto mt-5 max-w-[54ch] text-[16px] leading-[1.6] text-ink/55 md:text-[17px]">
          Clipboard, notes, settings, speech models, and optional
          language-model answers stay on this PC. Halo needs no cloud account
          for the core product.
        </p>
      </section>

      <section className="mx-auto max-w-[920px] px-5 pb-24 md:px-8 md:pb-32">
        <ol className="divide-y divide-line border-y border-line">
          {points.map((point) => (
            <li key={point.title} className="grid gap-3 py-7 sm:grid-cols-[0.7fr_1.3fr] sm:gap-8 md:py-8">
              <h2 className="font-display text-[20px] font-semibold leading-tight tracking-[-0.02em] text-ink md:text-[22px]">
                {point.title}
              </h2>
              <p className="text-[15px] leading-[1.65] text-ink/55 md:text-[16px]">{point.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
