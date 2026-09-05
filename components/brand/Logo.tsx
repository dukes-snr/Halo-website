import Image from "next/image";

/**
 * The Halo mark: the product's own icon, cut out of its render onto
 * transparency. It carries its own rounded-square silhouette, so it is never
 * clipped or plated — it sits directly on whatever ground it lands on.
 */
export function LogoMark({
  size = 32,
  className = "",
  priority = false,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/assets/brand/halo-mark.png"
      alt=""
      aria-hidden
      width={size}
      height={size}
      priority={priority}
      // Retina: the source is 512px square, so small renders have headroom.
      quality={100}
      className={className}
      style={{ width: size, height: size }}
    />
  );
}

export function Logo({
  className = "",
  size = 30,
  priority = false,
}: {
  className?: string;
  size?: number;
  priority?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} priority={priority} />
      <span className="text-[17px] font-medium tracking-[-0.02em]">Halo</span>
    </span>
  );
}
