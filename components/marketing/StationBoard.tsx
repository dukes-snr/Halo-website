"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { FeatureVideo } from "@/components/marketing/FeatureVideo";
import { stations as catalog } from "@/lib/content";

type Station = (typeof catalog)[number];

const stageTones = [
  "bg-[linear-gradient(135deg,#eeeaf6_0%,#e7f0f5_54%,#f5efe5_100%)]",
  "bg-[linear-gradient(140deg,#e7f1ee_0%,#edf0f8_52%,#f5ece8_100%)]",
  "bg-[linear-gradient(135deg,#f3ece4_0%,#eceaf5_48%,#e6f0f2_100%)]",
] as const;

export function StationBoard({ stations }: { stations: Station[] }) {
  const mediaIndex = Math.max(
    0,
    stations.findIndex((station) => station.href === "/media"),
  );
  const scrollerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [index, setIndex] = useState(mediaIndex);

  const scrollToStation = (
    next: number,
    behavior: ScrollBehavior = "smooth",
    focusTab = false,
  ) => {
    const clamped = Math.min(Math.max(next, 0), stations.length - 1);
    const scroller = scrollerRef.current;
    const card = scroller?.children[clamped] as HTMLElement | undefined;

    if (scroller && card) {
      const left = card.offsetLeft - (scroller.clientWidth - card.offsetWidth) / 2;
      const resolvedBehavior =
        behavior === "smooth" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : behavior;
      scroller.scrollTo({ left, behavior: resolvedBehavior });
    }

    setIndex(clamped);

    if (focusTab) tabRefs.current[clamped]?.focus();
  };

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    const card = scroller?.children[mediaIndex] as HTMLElement | undefined;
    if (!scroller || !card) return;

    const left = card.offsetLeft - (scroller.clientWidth - card.offsetWidth) / 2;
    scroller.scrollTo({ left, behavior: "auto" });
  }, [mediaIndex]);

  const syncActiveCard = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const center = scroller.scrollLeft + scroller.clientWidth / 2;
    let closest = 0;
    let distance = Number.POSITIVE_INFINITY;

    Array.from(scroller.children).forEach((child, stationIndex) => {
      const card = child as HTMLElement;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const nextDistance = Math.abs(cardCenter - center);
      if (nextDistance < distance) {
        closest = stationIndex;
        distance = nextDistance;
      }
    });

    setIndex(closest);
  };

  if (!stations.length) return null;

  const active = stations[index] ?? stations[0];

  return (
    <div>
      <div
        ref={scrollerRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Halo station highlights"
        onScroll={syncActiveCard}
        className="scrollbar-none flex touch-pan-y snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden px-[var(--station-gutter)] py-6 [--station-card:clamp(340px,82vw,960px)] [--station-gutter:max(20px,calc((100vw-var(--station-card))/2))] sm:gap-6"
      >
        {stations.map((station, stationIndex) => {
          const selected = stationIndex === index;
          const nearby = Math.abs(stationIndex - index) <= 1;
          const tone = stageTones[stationIndex % stageTones.length];

          return (
            <article
              key={station.href}
              aria-roledescription="slide"
              aria-label={`${station.title}, ${stationIndex + 1} of ${stations.length}`}
              className={`relative flex w-[var(--station-card)] shrink-0 snap-center flex-col overflow-hidden rounded-[26px] bg-paper transition-shadow duration-300 md:rounded-[30px] ${
                selected
                  ? "shadow-pop"
                  : "shadow-card hover:shadow-pop"
              }`}
            >
              <div className="flex h-[240px] flex-col items-start p-7 sm:h-[220px] sm:p-8 md:h-[210px] md:p-9">
                <h3 className="font-display text-[clamp(30px,3.4vw,44px)] font-semibold leading-[1.08] tracking-[-0.025em] text-ink">
                  {station.title}
                </h3>
                <p className="mt-3 max-w-[60ch] text-[15px] leading-[1.6] text-ink/55 sm:text-[16px]">
                  {station.body}
                </p>
                <Link
                  href={station.href}
                  tabIndex={selected ? 0 : -1}
                  className="group mt-auto inline-flex items-center gap-2 text-[14px] font-medium text-ink underline decoration-ink/20 underline-offset-4 transition-colors hover:decoration-ink"
                >
                  Explore {station.lane}
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                    strokeWidth={2}
                    aria-hidden
                  />
                </Link>
              </div>

              <div className={`overflow-hidden ${tone}`}>
                {selected ? (
                  <FeatureVideo
                    src={station.video}
                    label={station.videoLabel}
                    className="aspect-[8/5] w-full bg-ink"
                    fit="contain"
                    loop={false}
                    onEnded={() =>
                      scrollToStation((stationIndex + 1) % stations.length)
                    }
                    openOnSurface={false}
                  />
                ) : nearby ? (
                  <video
                    aria-label={station.videoLabel}
                    className="pointer-events-none aspect-[8/5] w-full bg-ink object-contain"
                    controlsList="nodownload noremoteplayback"
                    disablePictureInPicture
                    disableRemotePlayback
                    muted
                    playsInline
                    preload="metadata"
                  >
                    <source src={`${station.video}#t=0.5`} type="video/mp4" />
                  </video>
                ) : (
                  <div className="aspect-[8/5] w-full bg-haze" aria-hidden />
                )}
              </div>

              {!selected ? (
                <button
                  type="button"
                  aria-label={`Show ${station.title} station`}
                  onClick={() => scrollToStation(stationIndex)}
                  className="absolute inset-0 z-10 cursor-pointer rounded-[26px] md:rounded-[30px]"
                />
              ) : null}
            </article>
          );
        })}
      </div>

      {stations.length > 1 ? (
        <div className="mx-auto mt-4 flex max-w-[1120px] items-center justify-center gap-3 px-5 md:mt-5 md:px-8">
          <button
            type="button"
            aria-label="Previous station"
            disabled={index === 0}
            onClick={() => scrollToStation(index - 1)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-haze text-ink transition-colors hover:bg-line disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>

          <div role="tablist" aria-label="Choose a Halo station" className="flex items-center">
            {stations.map((station, stationIndex) => {
              const selected = stationIndex === index;

              return (
                <button
                  key={station.href}
                  ref={(node) => {
                    tabRefs.current[stationIndex] = node;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-label={`Show ${station.title} station`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => scrollToStation(stationIndex)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowLeft") {
                      event.preventDefault();
                      scrollToStation(index - 1, "smooth", true);
                    }
                    if (event.key === "ArrowRight") {
                      event.preventDefault();
                      scrollToStation(index + 1, "smooth", true);
                    }
                  }}
                  className="group flex h-8 w-6 items-center justify-center rounded-full"
                >
                  <span
                    aria-hidden
                    className={`block rounded-full transition-[width,background-color] duration-200 ${
                      selected
                        ? "h-1.5 w-4 bg-ink"
                        : "h-1.5 w-1.5 bg-ink/20 group-hover:bg-ink/50"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            aria-label="Next station"
            disabled={index === stations.length - 1}
            onClick={() => scrollToStation(index + 1)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-haze text-ink transition-colors hover:bg-line disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      ) : null}

      <p className="sr-only" aria-live="polite">
        Showing {active.title}, station {index + 1} of {stations.length}.
      </p>
    </div>
  );
}
