"use client";

import { usePathname } from "next/navigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

/**
 * The landing route carries its own fixed chrome (orange mark, standing
 * tagline, menu sheet) and its own closing lockup, so the header and footer
 * stand down there. Every other route gets them, wrapped in the same
 * `.landing` theme so the whole site reads as one system.
 */
export function ChromeGate({ children }: { children: React.ReactNode }) {
  if (usePathname() === "/") return <main className="flex-1">{children}</main>;

  return (
    <div className="landing flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <SiteFooter />
    </div>
  );
}
