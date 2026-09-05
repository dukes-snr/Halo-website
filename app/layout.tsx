import type { Metadata } from "next";
import localFont from "next/font/local";
import { Fragment_Mono, Geist_Mono, Source_Serif_4 } from "next/font/google";
import Script from "next/script";
import { ChromeGate } from "@/components/layout/ChromeGate";
import { site } from "@/lib/content";
import "./globals.css";

const satoshi = localFont({
  src: [
    { path: "../public/fonts/Satoshi-Regular.woff2", weight: "400" },
    { path: "../public/fonts/Satoshi-Medium.woff2", weight: "500" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

// Switzer stands in for the reference site's PP Neue Montreal, which is not
// licensed for redistribution. Same neo-grotesk skeleton, tight sidebearings.
const switzer = localFont({
  src: [
    { path: "../public/fonts/Switzer-Regular.woff2", weight: "400" },
    { path: "../public/fonts/Switzer-Medium.woff2", weight: "500" },
    { path: "../public/fonts/Switzer-Semibold.woff2", weight: "600" },
    { path: "../public/fonts/Switzer-Bold.woff2", weight: "700" },
  ],
  variable: "--font-switzer",
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fragment-mono",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  // Absolute base for OG and Twitter card URLs. Without it Next cannot resolve
  // the image file conventions to absolute URLs, and social scrapers — which
  // do not resolve relative paths — silently show no preview.
  metadataBase: new URL("https://halo-notch.vercel.app"),
  title: {
    default: `${site.name} - Dynamic Island for Windows`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  // `app/opengraph-image.png` and `app/twitter-image.png` are picked up by
  // file convention, so no explicit `images` entry is needed here.
  openGraph: {
    title: `${site.name} - Dynamic Island for Windows`,
    description: site.description,
    type: "website",
    siteName: site.name,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} - Dynamic Island for Windows`,
    description: site.description,
  },
  keywords: [
    "Dynamic Island Windows",
    "Windows notch",
    "Windows mascot notch",
    "on-device AI Windows",
    "Whisper desktop assistant",
    "Gemma local assistant",
    "media controller Windows",
    "file shelf",
    "Control Center Windows",
    "desktop notes",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${sourceSerif.variable} ${geistMono.variable} ${switzer.variable} ${fragmentMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-mist text-slate">
        <div
          dangerouslySetInnerHTML={{
            __html: [
              "<!-- DIRECTION CONTRACT",
              "THESIS: Halo is an editorial product catalog. A plain white field and a living desktop demo sell the notch; this page refuses the sun-yellow sticker shop and the SaaS metric-tile hero.",
              "OWN-WORLD: White paper #FFFFFF, ink #111111, hairline #E8E8E4, Source Serif 4 display (roman + italic) with Satoshi body, black pill CTAs, soft ambient shadows, Dia-style pastel stages only behind product footage.",
              "STORY: The visitor reads a calm offer, watches the notch work inside a framed desktop, pages through stations on pastel stages, and reaches Download.",
              "FIRST VIEWPORT: Flush white nav (wordmark, quiet links, black Download); centered serif headline with italic close; black CTA; large rounded interactive desktop.",
              "FORM: Brief-pinned editorial catalog from attached SaaS showcase + Dia LP; seed roll waived by pinned references.",
              "FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md.",
              "-->",
            ].join("\n"),
          }}
        />
        <ChromeGate>{children}</ChromeGate>
        {/* impeccable-live-start */}
        <Script
          src="http://localhost:8400/live.js?token=64636e39-1fa3-45cf-944d-e71ebfb95696"
          strategy="afterInteractive"
        />
        {/* impeccable-live-end */}
      </body>
    </html>
  );
}
