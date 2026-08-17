import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Download",
  description: "Download Halo for Windows 11. Public installer coming soon.",
};

export default function DownloadPage() {
  return (
    <section className="mx-auto max-w-[720px] px-6 pt-8 pb-16 md:pt-10">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-ink">
        <Image
          src="/brand/halo-icon-64.png"
          alt=""
          width={32}
          height={32}
          className="invert"
        />
      </div>
      <h1 className="text-[32px] leading-[1.15] tracking-tight text-ink-2 md:text-[40px] lg:text-[44px]">
        Download <span className="font-display font-semibold">Halo</span>
      </h1>
      <p className="mt-5 max-w-[65ch] text-sm leading-relaxed text-ink md:text-base">
        The public installer is not live yet. This page is ready for a Microsoft
        Store or direct MSIX link when you have it.
      </p>

      <article className="mt-10 rounded-[40px] bg-ink px-10 pt-8 pb-10 text-foam">
        <h2 className="text-[22px] font-medium">Coming soon</h2>
        <p className="mt-3 text-sm leading-relaxed text-mist">
          Placeholder until a real download URL is configured.
        </p>
        <p className="mt-8 text-2xl text-foam">Windows 11</p>
        <p className="text-sm text-mist">Native .NET 8 app</p>
        <div className="mt-6">
          <Button href="/download" disabled>
            Download Halo
          </Button>
        </div>
      </article>

      <div className="mt-12">
        <h2 className="text-2xl font-medium tracking-tight text-ink">
          Technical credibility
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-ink/70">
          <li>Native Windows 11 app</li>
          <li>WinUI 3 Settings plus layered HWND surface</li>
          <li>
            Integrations: Media (GSMTC), Audio, Power, Radios, Notifications,
            Bluetooth, Calendar, Shelf, Notes
          </li>
          <li>Optional MSIX packaging and autostart</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/changelog" variant="secondary">
            View updates
          </Button>
          <Button href="/privacy" variant="tertiary">
            Privacy
          </Button>
        </div>
      </div>
    </section>
  );
}
