import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-neutral-200 bg-[#edeced]">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] opacity-90">
        <Image
          src="/scene/hero-landscape.jpg"
          alt=""
          fill
          className="object-cover object-bottom"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-50/20 via-neutral-50/70 to-neutral-50" />
      </div>

      <Container className="relative z-10 pt-16 pb-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <Image src="/brand/halo-icon-64.png" alt="" width={28} height={28} />
              <span className="font-semibold text-neutral-950">Halo</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-neutral-600">
              {site.tagline}. Glanceable media, files, devices, and calendar for Windows 11.
            </p>
            <Button href="/download" className="mt-5 !text-[13px]">
              Download for Windows
            </Button>
          </div>

          <div>
            <p className="text-sm font-semibold text-neutral-950">Menu</p>
            <ul className="mt-3 space-y-2 text-sm text-neutral-600">
              <li>
                <Link href="/" className="hover:text-neutral-950">
                  Home
                </Link>
              </li>
              {nav.primary.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-neutral-950">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/privacy" className="hover:text-neutral-950">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-neutral-950">Features</p>
            <ul className="mt-3 space-y-2 text-sm text-neutral-600">
              {nav.features.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-neutral-950">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-neutral-950">Product</p>
            <ul className="mt-3 space-y-2 text-sm text-neutral-600">
              <li>Windows 11</li>
              <li>Native .NET 8</li>
              <li>Local-first</li>
              <li>10 languages</li>
            </ul>
          </div>
        </div>

        <div className="relative mt-20 flex min-h-[140px] items-end justify-center pb-2 md:min-h-[200px]">
          <p
            className="select-none text-[18vw] font-semibold leading-none tracking-tighter text-white/85 drop-shadow-sm md:text-[9rem]"
            aria-hidden
          >
            Halo
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-neutral-200/70 pt-6 text-xs text-neutral-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Halo. All rights reserved.</p>
          <p>Built for Windows 11</p>
        </div>
      </Container>
    </footer>
  );
}
