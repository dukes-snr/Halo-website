import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Download",
  description: "Download Halo, the native Windows activity notch with a resident mascot and optional on-device AI.",
};

const technicalPoints = [
  "Native .NET 8 app with WinUI 3 Settings and a layered HWND surface",
  "Windows integrations for GSMTC media, Core Audio, power, brightness, radios, notifications, Bluetooth, calendar, files, and notes",
  "Optional on-device Whisper speech models and Gemma 3 1B answers through llama.cpp",
  "Optional MSIX packaging, sign-in autostart, multi-monitor calibration, and fullscreen rules",
];

export default function DownloadPage() {
  return (
    <div className="bg-paper">
      <section className="mx-auto max-w-[820px] px-5 pb-12 pt-16 text-center md:px-8 md:pb-16 md:pt-24">
        <h1 className="mx-auto max-w-[16ch] font-display text-[clamp(40px,6vw,72px)] font-semibold leading-[1.06] tracking-[-0.025em] text-ink">
          Download Halo{" "}
          <em className="italic font-medium">for Windows.</em>
        </h1>
        <p className="mx-auto mt-5 max-w-[52ch] text-[16px] leading-[1.6] text-ink/55 md:text-[17px]">
          The public installer is coming soon. Halo is a native Windows app —
          not a web wrapper — with optional on-device models you control and can
          remove anytime.
        </p>
      </section>

      <section className="mx-auto max-w-[980px] px-5 md:px-8">
        <article className="grid gap-10 rounded-[28px] bg-haze px-6 py-10 md:grid-cols-[0.9fr_1.1fr] md:items-end md:px-12 md:py-14">
          <div>
            <h2 className="font-display text-[clamp(28px,4vw,44px)] font-semibold leading-[1.1] tracking-[-0.025em]">
              Public installer coming soon.
            </h2>
            <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-ink/55">
              This page is ready for the Microsoft Store or direct MSIX URL
              when the public package ships.
            </p>
          </div>
          <div className="grid gap-6 border-t border-ink/10 pt-6 sm:grid-cols-3 sm:border-t-0 sm:pt-0 md:border-l md:pl-10">
            <div>
              <p className="font-display text-[32px] font-semibold">10</p>
              <p className="text-[12px] text-ink/45">languages</p>
            </div>
            <div>
              <p className="font-display text-[32px] font-semibold">3</p>
              <p className="text-[12px] text-ink/45">rebindable shortcuts</p>
            </div>
            <div>
              <p className="font-display text-[32px] font-semibold">0</p>
              <p className="text-[12px] text-ink/45">cloud accounts required</p>
            </div>
          </div>
        </article>
      </section>

      <section className="mx-auto max-w-[980px] px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div>
            <h2 className="font-display text-[clamp(28px,4vw,44px)] font-semibold leading-[1.1] tracking-[-0.025em] text-ink">
              Built as Windows software.
            </h2>
          </div>
          <ul className="divide-y divide-line border-y border-line">
            {technicalPoints.map((point) => (
              <li
                key={point}
                className="py-5 text-[15px] leading-relaxed text-ink/60 first:pt-5 md:text-[16px]"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/changelog" variant="secondary">
            View updates
          </Button>
          <Button href="/privacy" variant="ghost">
            Privacy
          </Button>
        </div>
      </section>
    </div>
  );
}
