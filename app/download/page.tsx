import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { RevealText } from "@/components/landing/RevealText";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Download Halo, the native Windows activity notch with a resident mascot and optional on-device AI.",
};

const technicalPoints = [
  "Native .NET 8 app with WinUI 3 Settings and a layered HWND surface",
  "Windows integrations for GSMTC media, Core Audio, power, brightness, radios, notifications, Bluetooth, calendar, files, and notes",
  "Optional on-device Whisper speech models and Gemma 3 1B answers through llama.cpp",
  "Optional MSIX packaging, sign-in autostart, multi-monitor calibration, and fullscreen rules",
];

const counts = [
  { value: "10", label: "languages" },
  { value: "3", label: "rebindable shortcuts" },
  { value: "0", label: "cloud accounts required" },
];

export default function DownloadPage() {
  return (
    <div>
      <section className="mx-auto max-w-[1360px] px-5 pb-16 pt-20 md:px-8 md:pb-20 md:pt-28">
        <p className="landing-readout text-[11px] text-slate-soft">
          Installer coming soon
        </p>

        <RevealText
          as="h1"
          runs={[
            { text: "Download Halo " },
            { text: "for Windows.", accent: true },
          ]}
          className="mt-6 max-w-[13ch] text-[clamp(2.25rem,7vw,5rem)] font-medium leading-[0.94] tracking-[-0.038em]"
        />

        <p className="mt-7 max-w-[56ch] text-[16px] leading-[1.6] text-slate md:text-[17px]">
          The public installer is coming soon. Halo is a native Windows app —
          not a web wrapper — with optional on-device models you control and can
          remove anytime.
        </p>
      </section>

      <section className="mx-auto max-w-[1360px] px-5 md:px-8">
        <div className="grid gap-10 border-y border-slate/12 py-12 md:grid-cols-[1.1fr_0.9fr] md:items-end md:py-16">
          <div>
            <RevealText
              as="h2"
              text="Public installer coming soon."
              className="text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-[1.14] tracking-[-0.032em]"
            />
            <p className="mt-4 max-w-[48ch] text-[15px] leading-[1.6] text-slate-soft">
              This page is ready for the Microsoft Store or a direct MSIX URL
              the moment the public package ships.
            </p>
          </div>

          <dl className="grid grid-cols-3 gap-6">
            {counts.map((count) => (
              <div key={count.label}>
                <dt className="sr-only">{count.label}</dt>
                <dd>
                  <span className="block text-[clamp(1.75rem,3.4vw,2.6rem)] font-medium leading-none tracking-[-0.04em]">
                    {count.value}
                  </span>
                  <span className="mt-2 block text-[13px] text-slate-faint">
                    {count.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-[1360px] px-5 py-24 md:px-8 md:py-32">
        <div className="grid gap-x-16 gap-y-10 md:grid-cols-[0.62fr_1.38fr]">
          <RevealText
            as="h2"
            text="Built as Windows software."
            className="text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-[1.14] tracking-[-0.032em]"
          />

          <ul className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
            {technicalPoints.map((point) => (
              <li
                key={point}
                className="max-w-[38ch] text-[15px] leading-[1.6] text-slate"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
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
