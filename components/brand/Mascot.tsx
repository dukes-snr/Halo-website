"use client";

import { useEffect, useRef } from "react";
import { createAvatar, type CloudeeAvatar } from "@/components/brand/cloudee-avatar.js";

type MascotProps = {
  size?: number;
  animation?: string;
  pokeAnimation?: string;
  hoverAnimation?: string;
  className?: string;
  ariaLabel?: string;
};

export function Mascot({
  size = 240,
  animation = "idle",
  pokeAnimation = "playful",
  hoverAnimation,
  className = "",
  ariaLabel = "Halo mascot",
}: MascotProps) {
  const host = useRef<HTMLDivElement>(null);
  const avatar = useRef<CloudeeAvatar>(null);

  useEffect(() => {
    if (!host.current) return;
    const instance = createAvatar(host.current, {
      animation,
      size,
      onAnimationEnd: () => {
        instance.play(animation);
      },
    });
      avatar.current = instance;
      return () => {
        instance.destroy();
        avatar.current = null;
      };
  }, [animation, size]);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Poke the ${ariaLabel}`}
      ref={host}
      onClick={() => avatar.current?.play(pokeAnimation)}
      onMouseEnter={() => {
        if (hoverAnimation) avatar.current?.play(hoverAnimation);
      }}
      onMouseLeave={() => {
        avatar.current?.play(animation);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          avatar.current?.play(pokeAnimation);
        }
      }}
      className={`cursor-pointer select-none outline-none focus-visible:ring-4 focus-visible:ring-ink/30 rounded-full ${className}`}
    />
  );
}
