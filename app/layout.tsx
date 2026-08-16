import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { site } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} - Dynamic Island for Windows`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} - Dynamic Island for Windows`,
    description: site.description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[#edeced] text-neutral-900">
        {/*
          THESIS: Halo is a Windows notch that stays quiet until work needs it; refuse generic SaaS hero grids in favor of a full-bleed cinematic first viewport with the real notch on glass.
          OWN-WORLD: Dark Vantage-spec hero (Geist as Reference Sans/Display, white pill CTAs, teal-charcoal frosted glass) over a cinematic video, then the existing light CoolDock marketing body.
          STORY: Visitor understands Halo is a native Dynamic Island for Windows, sees the notch living on a frosted display, and reaches Get Started / Download.
          FIRST VIEWPORT: Left type stack (Stop Switching / Through Windows.), white Get Started, right frosted-glass container with the Halo notch attached at the top.
          FORM: User-pinned Vantage prompt for the hero only; remainder inherits CoolDock marketing (seed: brief-pinned).
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
        */}
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
