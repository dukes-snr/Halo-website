export function LogoMark({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      fill="none"
      aria-hidden
      className={className}
    >
      <rect width="96" height="96" rx="24" fill="var(--ink, #111111)" />
      <clipPath id="halo-mark-clip">
        <rect width="96" height="96" rx="24" />
      </clipPath>
      <g clipPath="url(#halo-mark-clip)">
        <g fill="#FFFFFF">
          <circle cx="38" cy="44" r="19" />
          <circle cx="57" cy="37" r="22" />
          <circle cx="71" cy="49" r="17" />
          <rect x="21" y="43" width="58" height="28" rx="14" />
          <circle cx="88" cy="90" r="14" />
        </g>
        <ellipse cx="45" cy="54" rx="4.2" ry="9" fill="var(--ink, #111111)" />
        <path
          d="M55 56 L67 53"
          stroke="var(--ink, #111111)"
          strokeWidth="5.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={28} className="rounded-[8px]" />
      <span className="font-display text-[18px] font-semibold tracking-[-0.02em] text-ink">
        Halo
      </span>
    </span>
  );
}
