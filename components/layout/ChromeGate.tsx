"use client";

import { usePathname } from "next/navigation";
import { BottomNav } from "@/components/layout/BottomNav";
import { CopyrightBar } from "@/components/layout/CopyrightBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export function ChromeGate({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  if (path === "/") return children;
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <CopyrightBar />
      <BottomNav />
    </>
  );
}
