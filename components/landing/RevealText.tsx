"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { RevealRun } from "@/lib/landing-content";

/**
 * The reference site's signature move: text whose glyphs walk from washed-out
 * to solid as the block crosses the viewport, scrubbed to scroll.
 *
 * Measured off the reference at 1440x900 rather than guessed:
 *
 *   - Un-revealed glyphs sit at `opacity: 0.1`, with their colour already
 *     final. So an ink glyph reads pale grey on the mist ground and an accent
 *     glyph reads pale orange — one animated property, two-tone result.
 *   - The sweep runs from the block's top at 88% of the viewport to its top at
 *     42%, near enough linear. Keying both ends off the top (rather than the
 *     bottom) keeps short and tall blocks feeling the same.
 *
 * `by` trades fidelity for DOM weight. The reference only ever splits its
 * display statements, so `char` matches it exactly there; `word` gives body
 * copy and labels the same sweep at a fraction of the node count, which at
 * 15px is indistinguishable.
 */
type Tag = "p" | "h1" | "h2" | "h3" | "span" | "div";

/**
 * Where the sweep runs, as ScrollTrigger start/end pairs.
 *
 * `default` is the reference's own window, measured: block top at 88% of the
 * viewport through block top at 42%.
 *
 * `early` is for copy that sits directly beneath the pinned screen. That copy
 * slides under the screen once its top passes roughly 58% of the viewport, so
 * a sweep ending at 42% finishes out of sight and the tail of the sentence is
 * never seen revealing. Ending at 66% puts the whole sweep above the hand-off.
 */
const ranges = {
  default: { start: "top 88%", end: "top 42%" },
  early: { start: "top 105%", end: "top 66%" },
} as const;

export function RevealText({
  runs,
  text,
  by = "char",
  range = "default",
  className = "",
  as: Tag = "p",
}: {
  runs?: RevealRun[];
  text?: string;
  by?: "char" | "word";
  range?: keyof typeof ranges;
  className?: string;
  as?: Tag;
}) {
  const ref = useRef<HTMLElement>(null);
  const parts = useMemo<RevealRun[]>(
    () => runs ?? (text ? [{ text }] : []),
    [runs, text],
  );

  // Split once per content change. Each word stays an inline-block so it never
  // breaks mid-word; `char` mode then gives every glyph its own alpha.
  const words = useMemo(
    () =>
      parts.flatMap((run, runIndex) =>
        run.text.split(/(\s+)/).map((chunk, chunkIndex) => ({
          key: `${runIndex}-${chunkIndex}`,
          chunk,
          accent: Boolean(run.accent),
        })),
      ),
    [parts],
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const glyphs = node.querySelectorAll<HTMLElement>(".reveal-char");
    if (!glyphs.length) return;

    const ctx = gsap.context(() => {
      gsap.to(glyphs, {
        opacity: 1,
        ease: "none",
        // The flip is deliberately near-instant against a stagger that spans
        // the whole sweep. Measured on the reference, no glyph is ever caught
        // part-way: every one reads either 0.1 or 1, so the boundary travels
        // like a typing cursor. Give each glyph a real fade instead and dozens
        // are mid-transition at once, which reads as lines resolving in blocks.
        duration: 0.01,
        stagger: { amount: 1 },
        scrollTrigger: {
          trigger: node,
          start: ranges[range].start,
          end: ranges[range].end,
          scrub: true,
        },
      });
    }, node);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [words, range]);

  if (!parts.length) return null;

  return (
    <Tag ref={ref as React.Ref<never>} className={className}>
      {/* The split markup is decorative geometry; screen readers get the
          unbroken sentence so words aren't spelled out letter by letter. */}
      <span className="sr-only">{parts.map((run) => run.text).join("")}</span>
      <span aria-hidden="true">
        {words.map(({ key, chunk, accent }) => {
          if (/^\s+$/.test(chunk)) return <span key={key}> </span>;
          const style = accent ? { color: "var(--flare)" } : undefined;

          if (by === "word") {
            return (
              <span
                key={key}
                className="reveal-char inline-block whitespace-pre"
                style={style}
              >
                {chunk}
              </span>
            );
          }

          return (
            <span key={key} className="inline-block whitespace-pre" style={style}>
              {[...chunk].map((char, index) => (
                <span key={`${key}-${index}`} className="reveal-char inline-block">
                  {char}
                </span>
              ))}
            </span>
          );
        })}
      </span>
    </Tag>
  );
}
