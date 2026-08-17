import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "tertiary";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-foam shadow-primary hover:bg-ink-2 active:scale-[0.98]",
  secondary:
    "bg-white text-ink shadow-secondary hover:bg-foam active:scale-[0.98]",
  tertiary:
    "bg-white text-ink shadow-primary hover:bg-foam active:scale-[0.98]",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  disabled?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
  disabled = false,
}: Props) {
  const classes = [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 py-3 text-sm font-medium transition-[transform,background-color] duration-200",
    variants[variant],
    disabled ? "pointer-events-none cursor-not-allowed opacity-70" : "",
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
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
