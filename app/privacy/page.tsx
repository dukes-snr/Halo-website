import type { Metadata } from "next";
import { RevealText } from "@/components/landing/RevealText";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Halo is local-first. Clipboard, notes, settings, speech, and optional AI models stay on your Windows PC.",
};

const points = [
  {
    title: "Clipboard is opt-in",
    body: "Clips stay local. Enable history during onboarding or later in Settings → Shelf & Clipboard.",
  },
  {
    title: "Notes stay on disk",
    body: "Notes live under %LocalAppData%\\Halo\\notes. No cloud account or sync service is required.",
  },
  {
    title: "Settings are local JSON",
    body: "Appearance, shortcuts, display targeting, fullscreen rules, and preferences remain on your machine.",
  },
  {
    title: "The assistant starts off",
    body: "Halo is never always-listening. You explicitly enable Assistant and start each session by face click, hotkey, AI station, or typed command.",
  },
  {
    title: "Speech stays on device",
    body: "Whisper models download to %LocalAppData%\\Halo\\models and process listen sessions locally.",
  },
  {
    title: "Answers can stay local too",
    body: "Optional Gemma 3 1B handles free-form questions on device. It can be removed whenever you want.",
  },
  {
    title: "Secrets use Windows storage",
    body: "Optional Spotify credentials and secret material use Windows Credential Manager rather than settings.json.",
  },
  {
    title: "Permissions are requested when needed",
    body: "Notification and calendar access are requested only when you use those integrations.",
  },
];

export default function PrivacyPage() {
  return (
    <div>
      <section className="mx-auto max-w-[1360px] px-5 pb-16 pt-20 md:px-8 md:pb-20 md:pt-28">
        <p className="landing-readout text-[11px] text-slate-soft">Privacy</p>

        <RevealText
          as="h1"
          runs={[
            { text: "Local-first, including the " },
            { text: "voice.", accent: true },
          ]}
          className="mt-6 max-w-[14ch] text-[clamp(2.25rem,7vw,5rem)] font-medium leading-[0.94] tracking-[-0.038em]"
        />

        <p className="mt-7 max-w-[56ch] text-[16px] leading-[1.6] text-slate md:text-[17px]">
          Clipboard, notes, settings, speech models, and optional
          language-model answers stay on this PC. Halo needs no cloud account
          for the core product.
        </p>
      </section>

      <section className="mx-auto max-w-[1360px] px-5 pb-28 md:px-8 md:pb-36">
        <ol className="grid gap-x-16 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((point) => (
            <li key={point.title}>
              <h2 className="text-[15px] font-normal text-slate-faint">
                {point.title}
              </h2>
              <p className="mt-2 max-w-[38ch] text-[15px] leading-[1.6] text-slate">
                {point.body}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
