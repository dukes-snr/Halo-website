"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { VideoLightbox } from "@/components/marketing/VideoLightbox";

type FeatureVideoProps = {
  src: string;
  label: string;
  className?: string;
  eager?: boolean;
  fit?: "cover" | "contain";
  openOnSurface?: boolean;
  playWhenVisible?: boolean;
  loop?: boolean;
  onEnded?: () => void;
};

export function FeatureVideo({
  src,
  label,
  className = "",
  eager = false,
  fit = "cover",
  openOnSurface = true,
  playWhenVisible = true,
  loop = true,
  onEnded,
}: FeatureVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [theater, setTheater] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const primeFirstFrame = () => {
      if (video.currentTime === 0) video.currentTime = Math.min(0.5, video.duration || 0.5);
    };
    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) primeFirstFrame();
    else video.addEventListener("loadedmetadata", primeFirstFrame, { once: true });

    if (
      !playWhenVisible ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return () => video.removeEventListener("loadedmetadata", primeFirstFrame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(video);
    return () => {
      video.removeEventListener("loadedmetadata", primeFirstFrame);
      observer.disconnect();
    };
  }, [playWhenVisible, src]);

  useEffect(() => {
    if (theater) videoRef.current?.pause();
  }, [theater]);

  const togglePlayback = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => undefined);
    else video.pause();
  };

  return (
    <>
      <div
        role={openOnSurface ? "button" : undefined}
        tabIndex={openOnSurface ? 0 : undefined}
        aria-label={openOnSurface ? `Open ${label} in theater view` : undefined}
        onClick={openOnSurface ? (e) => {
          e.preventDefault();
          e.stopPropagation();
          setTheater(true);
        } : undefined}
        onKeyDown={openOnSurface ? (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.stopPropagation();
            setTheater(true);
          }
        } : undefined}
        className={`group relative overflow-hidden bg-shell outline-none focus-visible:ring-2 focus-visible:ring-flare ${openOnSurface ? "cursor-pointer" : ""} ${className}`}
      >
        <video
          ref={videoRef}
          aria-label={label}
          className={`pointer-events-none block h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
          controlsList="nodownload noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          loop={loop}
          muted
          playsInline
          preload={eager ? "auto" : "metadata"}
          onEnded={onEnded}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support embedded videos.
        </video>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-shell/80 to-transparent px-4 pb-3 pt-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 md:px-5 md:pb-4">
          <div className="flex items-end justify-between">
            <button
              type="button"
              aria-label={playing ? "Pause" : "Play"}
              onClick={togglePlayback}
              className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-mist text-shell"
            >
              {playing ? <Pause className="h-3.5 w-3.5 fill-current" aria-hidden /> : <Play className="ml-0.5 h-3.5 w-3.5 fill-current" aria-hidden />}
            </button>
            <button
              type="button"
              aria-label={`Open ${label} in theater view`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setTheater(true);
              }}
              className="pointer-events-auto text-[11px] font-medium tracking-[0.08em] text-mist/80 uppercase hover:text-mist"
            >
              Focus
            </button>
          </div>
        </div>
      </div>

      {theater ? <VideoLightbox src={src} label={label} onClose={() => setTheater(false)} /> : null}
    </>
  );
}
