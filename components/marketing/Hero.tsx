"use client";

import { hero, site } from "@/lib/content";
import { useInViewAnimation } from "@/lib/useInViewAnimation";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const logo = useInViewAnimation<HTMLParagraphElement>();
  const tag = useInViewAnimation<HTMLParagraphElement>();
  const heading = useInViewAnimation<HTMLHeadingElement>();
  const copy = useInViewAnimation<HTMLDivElement>();
  const actions = useInViewAnimation<HTMLDivElement>();

  return (
    <section
      data-hero
      className="mx-auto w-full max-w-[440px] px-6 pt-12 md:pt-16"
    >
      <p
        ref={logo.ref}
        className={`${logo.className} mb-4 font-display text-[32px] font-semibold tracking-tight text-ink md:text-[40px] lg:text-[44px]`}
        style={{ animationDelay: "0.1s" }}
      >
        {site.name}
      </p>
      <p
        ref={tag.ref}
        className={`${tag.className} mb-2 font-mono text-xs text-ink md:text-sm`}
        style={{ animationDelay: "0.2s" }}
      >
        {hero.tagline}
      </p>
      <h1
        ref={heading.ref}
        className={`${heading.className} text-[32px] leading-[1.15] tracking-tight text-ink-2 md:text-[40px] lg:text-[44px]`}
        style={{ animationDelay: "0.3s" }}
      >
        <span className="block">
          {hero.line1.plain}
          <span className="font-display font-semibold">{hero.line1.accent}</span>
        </span>
        <span className="block pb-1">
          {hero.line2.plain}
          <span className="font-display font-semibold">{hero.line2.accent}</span>
        </span>
      </h1>
      <div
        ref={copy.ref}
        className={`${copy.className} mt-5 flex flex-col gap-6 text-sm leading-relaxed text-ink md:mt-6 md:text-base`}
        style={{ animationDelay: "0.4s" }}
      >
        {hero.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <div
        ref={actions.ref}
        className={`${actions.className} mt-5 flex flex-col gap-3 sm:flex-row md:mt-6 md:gap-4`}
        style={{ animationDelay: "0.5s" }}
      >
        <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
        <Button href={hero.secondaryCta.href} variant="secondary">
          {hero.secondaryCta.label}
        </Button>
      </div>
    </section>
  );
}
