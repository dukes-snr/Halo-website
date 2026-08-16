"use client";

/**
 * Coded Windows 11 taskbar (hero desktop chrome).
 * Matches the provided taskbar screenshot: deep blue acrylic,
 * centered app icons, system tray + clock on the right.
 */
export function WindowsTaskbar() {
  return (
    <div
      className="relative flex h-[42px] w-full shrink-0 items-center justify-center overflow-hidden sm:h-[46px]"
      style={{
        background:
          "linear-gradient(180deg, rgba(28, 48, 92, 0.94) 0%, rgba(18, 36, 78, 0.97) 100%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
        backdropFilter: "blur(40px) saturate(180%)",
        WebkitBackdropFilter: "blur(40px) saturate(180%)",
      }}
      aria-hidden
    >
      {/* Soft edge vignette like Win11 */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40"
        style={{
          background:
            "linear-gradient(90deg, rgba(8,16,40,0.55) 0%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40"
        style={{
          background:
            "linear-gradient(270deg, rgba(8,16,40,0.55) 0%, transparent 100%)",
        }}
      />

      {/* Centered taskbar icons */}
      <div className="relative z-10 flex items-center gap-0.5 sm:gap-1">
        <TaskIcon label="Start" active={false}>
          <WindowsStartIcon />
        </TaskIcon>
        <TaskIcon label="Search">
          <SearchIcon />
        </TaskIcon>
        <TaskIcon label="Task view">
          <TaskViewIcon />
        </TaskIcon>
        <TaskIcon label="Widgets">
          <WidgetsIcon />
        </TaskIcon>
        <TaskIcon label="Edge">
          <AppBlob color="#0078d4" letter="e" />
        </TaskIcon>
        <TaskIcon label="File Explorer">
          <FolderIcon />
        </TaskIcon>
        <TaskIcon label="Browser">
          <AppBlob color="#ea4335" letter="G" />
        </TaskIcon>
        <TaskIcon label="Browser">
          <AppBlob color="#fb542b" letter="B" />
        </TaskIcon>
        <TaskIcon label="Halo" active>
          <HaloTaskIcon />
        </TaskIcon>
        <TaskIcon label="VS Code" className="hidden sm:flex">
          <AppBlob color="#007acc" letter="<>" />
        </TaskIcon>
        <TaskIcon label="Terminal" className="hidden md:flex">
          <AppBlob color="#0c0c0c" letter=">_ " small />
        </TaskIcon>
        <TaskIcon label="Game" className="hidden md:flex">
          <AppBlob color="#107c10" letter="▶" />
        </TaskIcon>
        <TaskIcon label="Spotify" className="hidden lg:flex">
          <AppBlob color="#1db954" letter="♫" />
        </TaskIcon>
        <TaskIcon label="Cursor" className="hidden lg:flex">
          <AppBlob color="#000" letter="X" />
        </TaskIcon>
      </div>

      {/* System tray */}
      <div className="absolute top-0 right-0 bottom-0 z-10 flex items-center gap-2 pr-3 pl-2 sm:gap-2.5 sm:pr-4">
        <svg
          width="10"
          height="10"
          viewBox="0 0 12 12"
          fill="none"
          className="text-white/80"
        >
          <path
            d="M3 7.5L6 4.5L9 7.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <WifiIcon />
        <VolumeIcon />
        <BatteryIcon />
        <div className="ml-0.5 flex flex-col items-end leading-none text-white">
          <span className="text-[11px] font-medium tabular-nums tracking-tight sm:text-[12px]">
            5:44 PM
          </span>
          <span className="mt-0.5 text-[10px] text-white/85 tabular-nums sm:text-[11px]">
            8/12/2026
          </span>
        </div>
      </div>
    </div>
  );
}

function TaskIcon({
  children,
  label,
  active = false,
  className = "",
}: {
  children: React.ReactNode;
  label: string;
  active?: boolean;
  className?: string;
}) {
  return (
    <div
      title={label}
      className={`relative flex h-8 w-8 items-center justify-center rounded-md transition-colors sm:h-9 sm:w-9 ${
        active ? "bg-white/12" : "hover:bg-white/10"
      } ${className}`}
    >
      {children}
      {active ? (
        <span className="absolute bottom-0.5 left-1/2 h-[3px] w-4 -translate-x-1/2 rounded-full bg-white/90" />
      ) : null}
    </div>
  );
}

function WindowsStartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <rect x="1" y="1" width="7.2" height="7.2" rx="0.6" fill="#00a4ef" />
      <rect x="9.6" y="1" width="7.2" height="7.2" rx="0.6" fill="#7fba00" />
      <rect x="1" y="9.6" width="7.2" height="7.2" rx="0.6" fill="#f25022" />
      <rect x="9.6" y="9.6" width="7.2" height="7.2" rx="0.6" fill="#ffb900" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="4.5" stroke="white" strokeWidth="1.5" />
      <path
        d="M10.5 10.5L14 14"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TaskViewIcon() {
  return (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" aria-hidden>
      <rect x="0.75" y="0.75" width="6" height="5" rx="0.8" stroke="white" strokeWidth="1.3" />
      <rect x="9.25" y="0.75" width="6" height="5" rx="0.8" stroke="white" strokeWidth="1.3" />
      <rect x="0.75" y="8.25" width="6" height="5" rx="0.8" stroke="white" strokeWidth="1.3" />
      <rect x="9.25" y="8.25" width="6" height="5" rx="0.8" stroke="white" strokeWidth="1.3" />
    </svg>
  );
}

function WidgetsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="1" y="1" width="6" height="6" rx="1.2" fill="#60a5fa" />
      <rect x="9" y="1" width="6" height="6" rx="1.2" fill="#34d399" />
      <rect x="1" y="9" width="6" height="6" rx="1.2" fill="#f472b6" />
      <rect x="9" y="9" width="6" height="6" rx="1.2" fill="#fbbf24" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" aria-hidden>
      <path
        d="M1.5 3.5c0-.8.7-1.5 1.5-1.5h3.2c.4 0 .8.2 1 .5l.8 1.1c.2.3.6.5 1 .5H15c.8 0 1.5.7 1.5 1.5V12c0 .8-.7 1.5-1.5 1.5H3c-.8 0-1.5-.7-1.5-1.5V3.5z"
        fill="#fbbf24"
      />
      <path
        d="M1.5 6h15v6c0 .8-.7 1.5-1.5 1.5H3c-.8 0-1.5-.7-1.5-1.5V6z"
        fill="#fcd34d"
      />
    </svg>
  );
}

function AppBlob({
  color,
  letter,
  small = false,
}: {
  color: string;
  letter: string;
  small?: boolean;
}) {
  return (
    <span
      className={`flex items-center justify-center rounded-[6px] font-semibold text-white ${
        small ? "h-6 w-6 text-[8px]" : "h-7 w-7 text-[11px]"
      }`}
      style={{ background: color }}
    >
      {letter}
    </span>
  );
}

function HaloTaskIcon() {
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-neutral-950">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <circle cx="9" cy="11" r="3.2" fill="#0a0a0a" />
        <circle cx="15.5" cy="9.5" r="1.6" fill="#0a0a0a" />
        <circle cx="14.5" cy="15" r="2.2" fill="#0a0a0a" />
      </svg>
    </span>
  );
}

function WifiIcon() {
  return (
    <svg width="14" height="12" viewBox="0 0 16 14" fill="white" aria-hidden>
      <path
        d="M8 11.5a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4zm0-3.6c1.4 0 2.7.5 3.7 1.4l-1.1 1.1A3.7 3.7 0 0 0 8 9.3c-.9 0-1.7.3-2.4.7L4.5 9c1-.9 2.3-1.4 3.5-1.4zm0-3.5c2.3 0 4.4.9 6 2.3l-1.1 1.1A7.1 7.1 0 0 0 8 5.8c-1.8 0-3.5.6-4.9 1.7L2 6.4A8.7 8.7 0 0 1 8 4.4z"
        opacity="0.9"
      />
    </svg>
  );
}

function VolumeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="white" aria-hidden>
      <path d="M2.5 6h2.2L8 3.5v9L4.7 10H2.5V6z" opacity="0.9" />
      <path
        d="M10 6.2a2.4 2.4 0 0 1 0 3.6M11.6 4.6a4.4 4.4 0 0 1 0 6.8"
        stroke="white"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <div className="flex items-center gap-1 text-white">
      <svg width="18" height="10" viewBox="0 0 22 12" fill="none" aria-hidden>
        <rect
          x="0.6"
          y="1"
          width="17.5"
          height="10"
          rx="2"
          stroke="white"
          strokeWidth="1.2"
          opacity="0.85"
        />
        <rect x="2.2" y="2.6" width="12" height="6.8" rx="1" fill="white" opacity="0.9" />
        <path d="M19.2 4v4a1.4 1.4 0 0 0 0-4z" fill="white" opacity="0.7" />
      </svg>
      <span className="text-[10px] font-medium tabular-nums opacity-90 sm:text-[11px]">
        79%
      </span>
    </div>
  );
}
