"use client";

import { usePathname } from "next/navigation";

/**
 * Route-to-route transition: the incoming page rises in behind a short blur.
 *
 * React's `<ViewTransition>` would be the natural fit, but it is a canary-only
 * export and this project pins react 19.2.8, which does not ship it.
 *
 * Enter-only, and CSS rather than a JS animation driver. Two reasons:
 *
 *   - `AnimatePresence mode="wait"` deadlocks here. It holds the incoming
 *     child until the outgoing one finishes exiting, and because the App
 *     Router swaps `children` the instant the route resolves, that exit never
 *     completes and the new page sits at `opacity: 0`.
 *   - A JS-driven enter has the same failure shape whenever its rAF loop is
 *     starved — a throttled tab, an unpainted window — and the cost of that
 *     failing is an invisible page. The CSS keyframe has no fill mode, so if
 *     it never runs the element is simply visible.
 *
 * Keying on the pathname remounts the wrapper on every navigation, which
 * restarts the animation. The motion echoes the typing reveal rather than
 * inventing a second language.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
