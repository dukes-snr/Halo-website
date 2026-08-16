"use client";

import Image from "next/image";
import { productAssets } from "@/lib/product-assets";

/**
 * Frosted-glass display on the hero's right side, with the live Halo
 * notch sitting at the top of the pane.
 */
export function HaloNotch() {
  const nook = productAssets.nook;

  return (
    <article className="notch-card" aria-label="Halo notch display">
      <div className="notch-card-stage" />
      <div className="notch-display">
        <Image
          src={nook.src}
          alt="Halo notch on Windows — Home with live media, favorites, and modules"
          width={nook.width}
          height={nook.height}
          priority
          sizes="(max-width: 619px) 46vw, (max-width: 1100px) 36vw, 540px"
        />
      </div>
    </article>
  );
}
