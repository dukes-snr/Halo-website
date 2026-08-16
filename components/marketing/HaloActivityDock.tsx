"use client";

/**
 * Coded multi-module strip under the hero rocks (CoolDock bottom dock analogue).
 * Halo stations: time, weather/status, apps, media - pure UI code.
 */
export function HaloActivityDock() {
  return (
    <div
      className="mx-auto flex w-full max-w-[640px] items-stretch gap-1.5 overflow-hidden rounded-[22px] bg-neutral-950/95 p-1.5 text-white shadow-[0_20px_50px_rgba(0,0,0,0.4)] sm:gap-2 sm:p-2"
      style={{ backdropFilter: "blur(20px)" }}
    >
      {/* Time */}
      <div className="flex min-w-[72px] flex-col justify-center rounded-[16px] bg-white/8 px-3 py-2 sm:min-w-[84px]">
        <span className="text-[18px] font-semibold leading-none tracking-tight tabular-nums sm:text-[20px]">
          10:42
        </span>
        <span className="mt-1 text-[10px] text-white/50">Wed, Jun 17</span>
      </div>

      {/* Status / battery-like */}
      <div className="flex min-w-[70px] flex-col justify-center rounded-[16px] bg-white/8 px-2.5 py-2 sm:min-w-[88px]">
        <div className="flex items-baseline gap-1">
          <span className="text-[18px] font-semibold leading-none tabular-nums sm:text-[20px]">
            86
          </span>
          <span className="text-[11px] text-white/50">%</span>
        </div>
        <span className="mt-1 text-[10px] text-white/50">Battery</span>
      </div>

      {/* App favorites */}
      <div className="hidden items-center gap-1 rounded-[16px] bg-white/8 px-2 py-1.5 sm:flex">
        {["#3b82f6", "#22c55e", "#a855f7", "#f59e0b"].map((c, i) => (
          <span
            key={i}
            className="flex h-8 w-8 items-center justify-center rounded-[10px]"
            style={{ background: c }}
          >
            <span className="h-3 w-3 rounded-sm bg-white/90" />
          </span>
        ))}
      </div>

      {/* Timer ring */}
      <div className="flex items-center justify-center rounded-[16px] bg-white/8 px-2.5 py-1.5">
        <div className="relative flex h-10 w-10 items-center justify-center">
          <svg className="absolute inset-0" viewBox="0 0 40 40" aria-hidden>
            <circle
              cx="20"
              cy="20"
              r="15"
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="3"
            />
            <circle
              cx="20"
              cy="20"
              r="15"
              fill="none"
              stroke="#22c55e"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${0.57 * 94} 94`}
              transform="rotate(-90 20 20)"
            />
          </svg>
          <span className="text-[11px] font-semibold tabular-nums">57</span>
        </div>
      </div>

      {/* Media */}
      <div className="flex min-w-0 flex-1 items-center gap-2 rounded-[16px] bg-white/8 px-2 py-1.5 sm:px-2.5">
        <div
          className="h-9 w-9 shrink-0 rounded-lg"
          style={{
            background:
              "linear-gradient(145deg, #1e1b4b 0%, #4c1d95 50%, #7c3aed 100%)",
          }}
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12px] font-semibold leading-tight">
            God is a woman
          </p>
          <p className="truncate text-[10px] text-white/50">Ariana Grande</p>
        </div>
        <div className="flex shrink-0 items-center gap-0.5 pr-0.5 text-white/85">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
            <path d="M9 3.5v7L4.5 7 9 3.5zM3.5 3.2h1.2v7.6H3.5V3.2z" />
          </svg>
          <span className="flex h-7 w-7 items-center justify-center">
            <span className="flex gap-[3px]">
              <span className="h-2.5 w-[3px] rounded-sm bg-current" />
              <span className="h-2.5 w-[3px] rounded-sm bg-current" />
            </span>
          </span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
            <path d="M5 3.5v7L9.5 7 5 3.5zM9.3 3.2h1.2v7.6H9.3V3.2z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
