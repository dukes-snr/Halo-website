"use client";

import { useState } from "react";

type State =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "done" }
  | { kind: "closed" }
  | { kind: "error"; message: string };

/**
 * Waitlist capture for the download page.
 *
 * Every outcome is reported honestly, including the one where the server has
 * no configured destination: telling someone they are on a list that does not
 * exist is the one failure that cannot be recovered from at launch.
 */
export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state.kind === "sending") return;
    setState({ kind: "sending" });

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, company }),
      });

      if (response.ok) {
        setState({ kind: "done" });
        setEmail("");
        return;
      }

      const reason = await response
        .json()
        .then((data: { reason?: string }) => data?.reason)
        .catch(() => undefined);

      if (reason === "closed") return setState({ kind: "closed" });
      if (reason === "invalid") {
        return setState({
          kind: "error",
          message: "That address does not look right. Check it and try again.",
        });
      }
      setState({
        kind: "error",
        message: "Could not reach the list. Try again in a moment.",
      });
    } catch {
      setState({
        kind: "error",
        message: "Could not reach the list. Check your connection and retry.",
      });
    }
  }

  if (state.kind === "done") {
    return (
      <div className="rounded-[14px] bg-mist-deep/70 px-6 py-5">
        <p className="text-[16px] font-medium">You are on the list.</p>
        <p className="mt-1.5 text-[15px] leading-[1.6] text-slate-soft">
          We will email you once when the installer is ready. Nothing else.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      <label htmlFor="waitlist-email" className="landing-readout text-[11px] text-slate-soft">
        Get notified at launch
      </label>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          id="waitlist-email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          enterKeyHint="send"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-describedby="waitlist-status"
          className="h-12 w-full min-w-0 shrink-0 appearance-none rounded-full bg-mist-deep/70 px-5 text-[16px] leading-none text-slate ring-1 ring-inset ring-slate/12 transition-shadow placeholder:text-slate-faint focus-visible:outline-none! focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-flare sm:flex-1 sm:text-[15px]"
        />

        {/* Honeypot — hidden from people, irresistible to bots. */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          className="pointer-events-none absolute h-0 w-0 opacity-0"
        />

        <button
          type="submit"
          disabled={state.kind === "sending"}
          className="h-12 shrink-0 rounded-full bg-slate px-7 text-[14px] font-medium text-mist transition-colors hover:bg-flare hover:text-shell disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state.kind === "sending" ? "Adding…" : "Join the waitlist"}
        </button>
      </div>

      <p
        id="waitlist-status"
        role="status"
        aria-live="polite"
        className="mt-3 min-h-[20px] text-[14px] leading-[1.5]"
      >
        {state.kind === "error" ? (
          <span className="text-flare">{state.message}</span>
        ) : state.kind === "closed" ? (
          <span className="text-slate-soft">
            Signups are not open yet. Check back shortly.
          </span>
        ) : (
          <span className="text-slate-faint">
            One email at launch. No newsletter, no sharing.
          </span>
        )}
      </p>
    </form>
  );
}
