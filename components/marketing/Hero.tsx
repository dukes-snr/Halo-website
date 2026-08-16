"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HaloNotch } from "@/components/marketing/HaloNotch";
import "./hero.css";

const NAV = [
  { href: "/", label: "Home", active: true },
  { href: "/#stations", label: "Features" },
  { href: "/media", label: "Media" },
  { href: "/changelog", label: "Updates" },
] as const;

/**
 * Full-viewport cinematic hero: bleed video, left type stack, right
 * frosted-glass notch display. Structure, tokens, glass, and entrance
 * follow the Vantage brief; product copy and the notch are Halo.
 */
export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [compactNav, setCompactNav] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      root.classList.add("motion-off");
      root.classList.remove("motion-pending");
      return;
    }

    root.classList.add("motion-pending");
    video?.play().catch(() => {
      /* poster / first frame still paints */
    });

    fallbackRef.current = window.setTimeout(() => {
      root.classList.remove("motion-pending");
    }, 3500);

    return () => {
      if (fallbackRef.current) window.clearTimeout(fallbackRef.current);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(
      "(max-width: 619px), (min-width: 620px) and (max-width: 790px), (min-width: 620px) and (max-width: 1100px) and (orientation: portrait)",
    );
    const sync = () => {
      const compact = mq.matches;
      setCompactNav(compact);
      if (!compact) setMenuOpen(false);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      const header = rootRef.current?.querySelector(".header");
      if (header && !header.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    navRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen]);

  const finishMotion = () => {
    const root = rootRef.current;
    if (!root) return;
    root.classList.remove("motion-pending");
    if (fallbackRef.current) {
      window.clearTimeout(fallbackRef.current);
      fallbackRef.current = null;
    }
  };

  return (
    <section
      ref={rootRef}
      className="halo-hero"
      data-menu={menuOpen ? "open" : "closed"}
    >
      <div className="screen" id="screen">
        <video
          ref={videoRef}
          className="background"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          aria-hidden="true"
          poster="/scene/hero-landscape.jpg"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_064556_051587f1-74a1-4336-8c05-4dde3594ed05.mp4"
            type="video/mp4"
          />
          <source src="/scene/bg-vid.mp4" type="video/mp4" />
        </video>

        <header className={`header${menuOpen ? " menu-open" : ""}`}>
          <Link href="/" className="brand" aria-label="Halo home">
            <Image
              src="/brand/halo-icon-64.png"
              alt=""
              width={25}
              height={25}
              priority
            />
          </Link>

          <div
            ref={navRef}
            className="header-actions"
            id="tablet-navigation"
            inert={compactNav && !menuOpen ? true : undefined}
          >
            <nav className="nav" aria-label="Primary">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={item.active ? "is-active" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="time-panel">
              <span className="label">Timezone</span>
              <span className="value">
                9:47 PM&nbsp; • &nbsp;14 July 2026
              </span>
            </div>

            <Link href="/download" className="sign-up">
              Download
            </Link>
          </div>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="tablet-navigation"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg
              className="icon-open"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden
            >
              <path
                d="M3 6h12M3 12h12"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <svg
              className="icon-close"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden
            >
              <path
                d="M5 5l8 8M13 5l-8 8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="line line-one">
                <span className="line-reveal">Stop Switching</span>
              </span>
              <span className="line line-two">
                <span className="line-reveal">Through Windows.</span>
              </span>
            </h1>
            <p className="hero-copy">
              Your controls are scattered across a dozen windows.{" "}
              <br />
              Halo brings them into one clear notch, so every{" "}
              <br />
              glance stays on the desktop you already trust.
            </p>
            <Link href="/download" className="primary-cta">
              <span className="label">Get Started</span>
              <span className="arrow-box" aria-hidden>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2.5 7h9M7.5 3.5 11.5 7l-4 3.5"
                    stroke="#fff"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </div>

          <div onAnimationEnd={finishMotion}>
            <HaloNotch />
          </div>
        </section>
      </div>
    </section>
  );
}
