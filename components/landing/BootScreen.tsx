"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Full-bleed square-fill loader.
 *
 * The sheet opens near-black. Square tiles then land one at a time in a
 * scattered order until they have paved the whole viewport in mist — so the
 * screen runs dark to white as it loads. A counter rides along, hopping to
 * whichever square just landed and climbing 0 to 100. When the grid is full
 * the sheet clears and the site is underneath.
 *
 * The grid is measured on the client, so the server renders only the dark
 * field: nothing to mismatch on hydration, and the cover is up from the very
 * first paint either way.
 */
const FILL_MS = 1400;
const HOLD_MS = 180;
const CLEAR_MS = 320;
const SQUARE_MS = 240;

/**
 * How many times the counter repositions across the fill. Deliberately few:
 * it should read as a tile deciding where to sit next, not as a cursor
 * skittering around.
 */
const HOPS = 5;
const HOP_GLIDE_MS = 320;

/** Deterministic hash — keeps the scatter stable across re-renders. */
function noise(index: number) {
  const value = Math.sin(index * 12.9898 + 4.1414) * 43758.5453;
  return value - Math.floor(value);
}

type Grid = { cols: number; rows: number; cell: number };

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [grid, setGrid] = useState<Grid | null>(null);
  const [pct, setPct] = useState(0);
  const [hop, setHop] = useState(0);
  const [clearing, setClearing] = useState(false);
  const startedAt = useRef(0);

  // Measure after paint so the dark field is already covering, and so server
  // markup never has to agree with a viewport-derived grid.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onDone();
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const cell = Math.max(46, Math.round(window.innerWidth / 18));
      setGrid({
        cell,
        cols: Math.ceil(window.innerWidth / cell),
        rows: Math.ceil(window.innerHeight / cell),
      });
      startedAt.current = performance.now();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [onDone]);

  // Drive the counter and the hop off one loop, committing to React only when
  // a displayed value actually changes.
  useEffect(() => {
    if (!grid) return;
    let frame = 0;

    const tick = () => {
      const elapsed = performance.now() - startedAt.current;
      const progress = Math.min(elapsed / FILL_MS, 1);
      setPct((value) => {
        const next = Math.round(progress * 100);
        return value === next ? value : next;
      });
      setHop((value) => {
        const next = Math.min(HOPS - 1, Math.floor(progress * HOPS));
        return value === next ? value : next;
      });
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    const clear = window.setTimeout(() => setClearing(true), FILL_MS + HOLD_MS);
    const done = window.setTimeout(onDone, FILL_MS + HOLD_MS + CLEAR_MS);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(clear);
      window.clearTimeout(done);
    };
  }, [grid, onDone]);

  // Scattered landing order, and the colour each square lands in.
  const squares = useMemo(() => {
    if (!grid) return [];
    const total = grid.cols * grid.rows;
    return Array.from({ length: total }, (_, index) => ({ index, key: noise(index) }))
      .sort((a, b) => a.key - b.key)
      .map((square, position) => ({
        index: square.index,
        position,
        delay: (position / total) * FILL_MS,
        // Mostly mist, so the field resolves to the page's own ground, with
        // the occasional accent square.
        bg: noise(square.index + 977) > 0.94 ? "#FF611A" : "#EBEBEB",
      }));
  }, [grid]);

  /**
   * The counter's route.
   *
   * Each step moves along a single axis — same row or same column, never a
   * diagonal jump — and only ever onto a square that has not been paved yet at
   * that point in the fill. So it reads as one tile sliding into open ground
   * and waiting to be built over, rather than teleporting across the grid.
   */
  const path = useMemo(() => {
    if (!grid || !squares.length) return [];
    const total = grid.cols * grid.rows;

    // cell index -> when it gets paved, as a fraction of the fill
    const pavedAt = new Array<number>(total);
    squares.forEach((square) => {
      pavedAt[square.index] = square.position / total;
    });

    const steps: { col: number; row: number }[] = [];
    let col = Math.floor(grid.cols / 2);
    let row = Math.floor(grid.rows / 2);

    for (let step = 0; step < HOPS; step += 1) {
      const now = step / HOPS;
      const open: { col: number; row: number }[] = [];

      for (let c = 0; c < grid.cols; c += 1) {
        if (c !== col && pavedAt[row * grid.cols + c] > now) {
          open.push({ col: c, row });
        }
      }
      for (let r = 0; r < grid.rows; r += 1) {
        if (r !== row && pavedAt[r * grid.cols + col] > now) {
          open.push({ col, row: r });
        }
      }

      if (open.length) {
        const pick = open[Math.floor(noise(step * 31 + 7) * open.length)];
        col = pick.col;
        row = pick.row;
      }
      steps.push({ col, row });
    }

    return steps;
  }, [grid, squares]);

  const marker = path[Math.min(hop, path.length - 1)] ?? null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] overflow-hidden bg-shell ${
        clearing ? "boot-clear" : ""
      }`}
    >
      {grid ? (
        <>
          <div
            className="grid h-full w-full"
            style={{
              gridTemplateColumns: `repeat(${grid.cols}, 1fr)`,
              gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
            }}
          >
            {squares.map((square) => (
              <span
                key={square.index}
                className="boot-square block"
                style={{
                  gridColumn: (square.index % grid.cols) + 1,
                  gridRow: Math.floor(square.index / grid.cols) + 1,
                  backgroundColor: square.bg,
                  // Hairline outset closes sub-pixel seams between squares.
                  margin: "-0.5px",
                  animationDelay: `${Math.round(square.delay)}ms`,
                  animationDuration: `${SQUARE_MS}ms`,
                }}
              />
            ))}
          </div>

          {/* One of the squares, not a badge on top of them: same footprint as
              every other cell, filled flare, with the count in bold white. */}
          {marker ? (
            <div
              className="pointer-events-none absolute flex items-center justify-center"
              style={{
                left: `${(marker.col / grid.cols) * 100}%`,
                top: `${(marker.row / grid.rows) * 100}%`,
                width: `${100 / grid.cols}%`,
                height: `${100 / grid.rows}%`,
                backgroundColor: "#FF611A",
                transition: `left ${HOP_GLIDE_MS}ms cubic-bezier(.65,0,.35,1), top ${HOP_GLIDE_MS}ms cubic-bezier(.65,0,.35,1)`,
              }}
            >
              <span
                className="font-bold tabular-nums leading-none text-white"
                style={{ fontSize: Math.round(grid.cell * 0.24) }}
              >
                {pct}%
              </span>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
