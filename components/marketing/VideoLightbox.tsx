"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

type VideoLightboxProps = {
  src: string;
  label: string;
  onClose: () => void;
};

function fmt(total: number) {
  if (!Number.isFinite(total)) return "0:00";
  const m = Math.floor(total / 60);
  const s = Math.floor(total % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function VideoLightbox({ src, label, onClose }: VideoLightboxProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [idle, setIdle] = useState(false);
  const idleTimer = useRef<number>(0);

  const bump = () => {
    setIdle(false);
    window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => setIdle(true), 2200);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const video = videoRef.current;
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (!video) return;
      if (e.key === " " || e.key === "k") {
        e.preventDefault();
        if (video.paused) void video.play().catch(() => undefined);
        else video.pause();
      } else if (e.key === "ArrowRight" || e.key === "l") {
        video.currentTime = Math.min(video.currentTime + 5, video.duration || 0);
      } else if (e.key === "ArrowLeft" || e.key === "j") {
        video.currentTime = Math.max(video.currentTime - 5, 0);
      } else if (e.key === "m") {
        video.muted = !video.muted;
        setMuted(video.muted);
      }
      bump();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    bump();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(idleTimer.current);
    };
  }, [onClose]);

  useEffect(() => {
    void videoRef.current?.play().catch(() => undefined);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => undefined);
    else video.pause();
  };

  const seek = (clientX: number, box: DOMRect) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    const ratio = Math.min(1, Math.max(0, (clientX - box.left) / box.width));
    video.currentTime = ratio * duration;
    setProgress(ratio * duration);
  };

  const pct = duration ? (progress / duration) * 100 : 0;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onMouseMove={bump}
      className="fixed inset-0 z-[100] flex flex-col bg-shell"
    >
      <header
        className={`flex shrink-0 items-center justify-between px-5 py-4 transition-opacity duration-500 md:px-8 ${
          idle && playing ? "opacity-0" : "opacity-100"
        }`}
      >
        <p className="text-[18px] font-medium tracking-[-0.02em] text-mist md:text-[22px]">{label}</p>
        <button
          ref={closeRef}
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="text-[13px] text-mist/70 transition-colors hover:text-mist"
        >
          Close
        </button>
      </header>

      <button
        type="button"
        aria-label={playing ? "Pause" : "Play"}
        onClick={togglePlay}
        className="relative flex min-h-0 flex-1 cursor-pointer items-center justify-center px-4 md:px-10"
      >
        <video
          ref={videoRef}
          src={src}
          aria-label={label}
          loop
          playsInline
          preload="auto"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          className="max-h-full max-w-full object-contain"
        />
      </button>

      <div
        className={`shrink-0 px-5 pb-5 pt-3 transition-opacity duration-500 md:px-8 ${
          idle && playing ? "opacity-0" : "opacity-100"
        }`}
      >
        <div
          ref={railRef}
          role="slider"
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round(progress)}
          tabIndex={0}
          onClick={(e) => seek(e.clientX, e.currentTarget.getBoundingClientRect())}
          onKeyDown={(e) => {
            const video = videoRef.current;
            if (!video) return;
            if (e.key === "ArrowRight") video.currentTime = Math.min(video.currentTime + 5, duration);
            if (e.key === "ArrowLeft") video.currentTime = Math.max(video.currentTime - 5, 0);
          }}
          className="group relative h-6 cursor-pointer"
        >
          <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-mist/25" />
          <span
            className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-mist"
            style={{ width: `${pct}%` }}
          />
          <span
            className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mist opacity-0 transition-opacity group-hover:opacity-100"
            style={{ left: `${pct}%` }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-mist">
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label={playing ? "Pause" : "Play"}
              onClick={togglePlay}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-mist text-shell"
            >
              {playing ? (
                <Pause className="h-3.5 w-3.5 fill-current" aria-hidden />
              ) : (
                <Play className="ml-0.5 h-3.5 w-3.5 fill-current" aria-hidden />
              )}
            </button>
            <span className="text-[12px] tabular-nums text-mist/60">
              {fmt(progress)} / {fmt(duration)}
            </span>
          </div>
          <button
            type="button"
            aria-label={muted ? "Unmute" : "Mute"}
            onClick={() => {
              const video = videoRef.current;
              if (!video) return;
              video.muted = !video.muted;
              setMuted(video.muted);
            }}
            className="text-mist/70 transition-colors hover:text-mist"
          >
            {muted ? <VolumeX className="h-4 w-4" aria-hidden /> : <Volume2 className="h-4 w-4" aria-hidden />}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
