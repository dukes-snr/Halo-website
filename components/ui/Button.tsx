"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "motion/react";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-ink/90",
  secondary: "bg-paper text-ink ring-1 ring-ink/15 hover:ring-ink/40",
  ghost: "bg-transparent text-ink/70 hover:text-ink",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  disabled?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-[14px] font-medium tracking-[-0.01em] transition-colors duration-200";

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
  disabled = false,
}: Props) {
  const classes = [
    base,
    variants[variant],
    disabled ? "pointer-events-none cursor-not-allowed opacity-50" : "",
    className,
  ].join(" ");

  if (disabled) {
    return (
      <span className={classes} aria-disabled="true">
        {children}
      </span>
    );
  }

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <motion.span whileHover={disabled ? undefined : { y: -1 }} whileTap={{ y: 1 }} className="inline-flex rounded-full">
      <Link href={href} className={classes}>
        {children}
      </Link>
    </motion.span>
  );
}
