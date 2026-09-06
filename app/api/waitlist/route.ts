/**
 * Waitlist signup.
 *
 * Deliberately vendor-neutral: a signup is forwarded as JSON to whatever
 * `WAITLIST_WEBHOOK_URL` points at. That works with Zapier, Make, Google Apps
 * Script, Formspree, Airtable automations, a Slack or Discord webhook, or your
 * own endpoint — without this repo taking a dependency on any of them.
 *
 * If the variable is unset the route reports that signups are closed. It never
 * reports success for an address it did not manage to store: a form that
 * silently drops addresses is worse than no form, because you cannot tell the
 * difference until launch day.
 */

/** Permissive on purpose — over-strict email regexes reject valid addresses. */
function looksLikeEmail(value: string) {
  if (value.length < 3 || value.length > 254) return false;
  const at = value.indexOf("@");
  if (at < 1 || at !== value.lastIndexOf("@")) return false;
  const domain = value.slice(at + 1);
  return domain.length > 2 && domain.includes(".") && !/\s/.test(value);
}

export async function POST(request: Request) {
  const endpoint = process.env.WAITLIST_WEBHOOK_URL;
  if (!endpoint) {
    return Response.json(
      { ok: false, reason: "closed" },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  const { email, company } = (body ?? {}) as {
    email?: unknown;
    company?: unknown;
  };

  // Honeypot: a real person never sees or fills this field. Answer 200 so bots
  // get no signal about why nothing happened.
  if (typeof company === "string" && company.trim() !== "") {
    return Response.json({ ok: true });
  }

  if (typeof email !== "string" || !looksLikeEmail(email.trim())) {
    return Response.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  try {
    const forwarded = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        source: "halo-website/download",
        submittedAt: new Date().toISOString(),
      }),
      // Do not chase the redirect. Google Apps Script answers a POST with a
      // 302 to a separate result page, and the handler has *already run* by
      // the time that redirect is issued. Following it turns the request into
      // a GET whose status says nothing about whether the row was written —
      // and can report a failure for a signup that was in fact stored.
      redirect: "manual",
      signal: AbortSignal.timeout(8000),
    });

    // 2xx means stored; 3xx means stored and pointing at the result. Only a
    // real error status is a failure.
    if (forwarded.status >= 400) {
      return Response.json({ ok: false, reason: "upstream" }, { status: 502 });
    }
  } catch {
    return Response.json({ ok: false, reason: "upstream" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
