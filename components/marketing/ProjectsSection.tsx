"use client";

import Link from "next/link";
import { stations } from "@/lib/content";
import { useInViewAnimation } from "@/lib/useInViewAnimation";

function ProjectItem({
  href,
  title,
  body,
  image,
}: {
  href: string;
  title: string;
  body: string;
  image: string;
}) {
  const block = useInViewAnimation<HTMLElement>();

  return (
    <article ref={block.ref} className={block.className}>
      <div className="ml-8 md:ml-28">
        <h3 className="font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          <Link href={href} className="hover:opacity-70">
            {title}
          </Link>
        </h3>
        <p className="mt-2 max-w-xl text-sm text-ink/70 md:text-base">{body}</p>
      </div>
      <Link href={href} className="mt-6 block">
        <div className="overflow-hidden rounded-2xl bg-[#071016] shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" className="w-full object-contain" />
        </div>
      </Link>
    </article>
  );
}

export function ProjectsSection() {
  const featured = [
    {
      ...stations[0],
      image: "/product/feature-home-dashboard.png",
    },
    {
      ...stations[1],
      image: "/product/feature-drop-actions.png",
    },
    {
      ...stations[2],
      image: "/product/feature-control-center.png",
    },
  ];

  return (
    <section id="stations" className="mx-auto max-w-[1200px] scroll-mt-24 px-6 py-12">
      <div className="flex flex-col gap-16 md:gap-20">
        {featured.map((item) => (
          <ProjectItem key={item.href} {...item} />
        ))}
      </div>
    </section>
  );
}
