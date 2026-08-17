import type { Metadata } from "next";
import localFont from "next/font/local";
import { Bitcount_Prop_Single, Geist_Mono } from "next/font/google";
import { ChromeGate } from "@/components/layout/ChromeGate";
import { site } from "@/lib/content";
import "./globals.css";

const montreal = localFont({
  src: [
    { path: "../public/fonts/Satoshi-Regular.woff2", weight: "400" },
    { path: "../public/fonts/Satoshi-Medium.woff2", weight: "500" },
  ],
  variable: "--font-montreal",
  display: "swap",
});

const mondwest = Bitcount_Prop_Single({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-mondwest",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
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
    <html
      lang="en"
      className={`${montreal.variable} ${mondwest.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-page text-ink">
        <ChromeGate>{children}</ChromeGate>
      </body>
    </html>
  );
}
