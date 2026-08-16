import type { Metadata } from "next";
import Image from "next/image";
import { DownloadSimple, WindowsLogo } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionReveal } from "@/components/marketing/SectionReveal";

export const metadata: Metadata = {
  title: "Download",
  description: "Download Halo for Windows 11. Public installer coming soon.",
};

export default function DownloadPage() {
  return (
    <section className="section-y bg-neutral-50">
      <Container>
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-950">
            <Image
              src="/brand/halo-icon-64.png"
              alt=""
              width={36}
              height={36}
              className="invert"
            />
          </div>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-neutral-950 md:text-5xl">
            Download Halo
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-neutral-600">
            The public installer is not live yet. This page is ready for your
            Microsoft Store or direct MSIX/.exe link when you have it.
          </p>
        </SectionReveal>

        <SectionReveal className="mx-auto mt-10 max-w-lg" delay={0.06}>
          <div className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-8 text-center shadow-card">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-600">
              <DownloadSimple size={24} weight="bold" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-neutral-950">
              Coming soon
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Placeholder CTA until a real download URL is configured.
            </p>
            <Button href="#coming-soon" className="mt-6 pointer-events-none opacity-80">
              <WindowsLogo size={18} weight="fill" />
              Download for Windows
            </Button>
            <p className="mt-4 text-xs text-neutral-500">
              Requires Windows 11 · Native .NET 8 app
            </p>
          </div>
        </SectionReveal>

        <SectionReveal className="mx-auto mt-12 max-w-2xl" delay={0.1}>
          <div className="rounded-[var(--radius-lg)] border border-neutral-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-neutral-950">
              Technical credibility
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-neutral-600">
              <li>Native Windows 11 app</li>
              <li>WinUI 3 Settings + layered HWND surface</li>
              <li>
                Integrations: Media (GSMTC), Audio, Power/Brightness, Radios,
                Notifications, Bluetooth, Calendar, Shelf, Notes
              </li>
              <li>Optional MSIX packaging and autostart</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/changelog" variant="secondary">
                View updates
              </Button>
              <Button href="/privacy" variant="ghost">
                Privacy
              </Button>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
