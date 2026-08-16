import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  /** Intrinsic width of source asset */
  width: number;
  /** Intrinsic height of source asset */
  height: number;
  priority?: boolean;
  className?: string;
  /**
   * Screen size. The capture stays small at top-center;
   * the wrapper is the desktop around it.
   */
  size?: "hero" | "proof" | "card" | "fluid";
};

const imageWidth: Record<NonNullable<Props["size"]>, string> = {
  hero: "w-[min(68%,360px)] sm:w-[min(46%,380px)] md:w-[min(38%,400px)]",
  proof: "w-[min(64%,280px)] sm:w-[min(42%,300px)] md:w-[min(34%,320px)]",
  card: "w-[min(46%,156px)]",
  fluid: "w-[min(52%,220px)] sm:w-[min(36%,240px)]",
};

const stageClass: Record<NonNullable<Props["size"]>, string> = {
  hero: "w-full",
  proof: "min-h-[240px] w-full md:min-h-[300px]",
  card: "min-h-[120px] w-full sm:min-h-[132px]",
  fluid: "min-h-[160px] w-full md:min-h-[200px]",
};

/**
 * Implementation capture on a screen: scaled down, pinned top-center.
 */
export function ProductShot({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
  size = "fluid",
}: Props) {
  return (
    <div
      className={`relative flex items-start justify-center ${stageClass[size]} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={100}
        sizes="(max-width: 768px) 50vw, 360px"
        className={`product-shot-flush ${imageWidth[size]}`}
      />
    </div>
  );
}
