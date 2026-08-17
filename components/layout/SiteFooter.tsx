import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-[1200px] px-6 py-12">
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <Button href="/download">Download Halo</Button>
        <div className="flex gap-10">
          <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-ink" aria-hidden />
          <div className="grid grid-cols-2 gap-x-16 gap-y-3">
            <Link href="/#stations" className="text-base text-ink hover:opacity-70">
              Features
            </Link>
            <Link href="/media" className="text-base text-ink hover:opacity-70">
              Media
            </Link>
            <Link href="/changelog" className="text-base text-ink hover:opacity-70">
              Updates
            </Link>
            <Link href="/files" className="text-base text-ink hover:opacity-70">
              Files
            </Link>
            <Link href="/privacy" className="text-base text-ink hover:opacity-70">
              Privacy
            </Link>
            <Link href="/notes" className="text-base text-ink hover:opacity-70">
              Notes
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
