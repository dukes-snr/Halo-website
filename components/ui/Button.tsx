import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "dark";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-600 shadow-soft active:scale-[0.98]",
  secondary:
    "bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-100 active:scale-[0.98]",
  ghost:
    "bg-transparent text-neutral-800 hover:bg-neutral-100/80 active:scale-[0.98]",
  dark: "bg-neutral-950 text-white hover:bg-neutral-800 active:scale-[0.98]",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: Props) {
  const classes = [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200",
    variants[variant],
    className,
  ].join(" ");

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
