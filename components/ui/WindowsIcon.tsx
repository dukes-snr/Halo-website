type WindowsIconProps = {
  className?: string;
};

export function WindowsIcon({ className = "h-4 w-4" }: WindowsIconProps) {
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        WebkitMask: "url('/windows-svg.svg') center / contain no-repeat",
        mask: "url('/windows-svg.svg') center / contain no-repeat",
      }}
    />
  );
}
