import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const scratch = process.argv[2];
if (!scratch) {
  console.error("usage: node tests/browser-verify.mjs <scratch-dir>");
  process.exit(1);
}

const edgeCandidates = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
];

function edgePath() {
  return edgeCandidates.find((candidate) => fs.existsSync(candidate));
}

function waitForOutput(child, needle, timeoutMs) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("timed out waiting for " + needle)), timeoutMs);
    const onData = (buf) => {
      const text = String(buf);
      process.stdout.write(text);
      if (text.includes(needle)) {
        clearTimeout(timer);
        child.stdout?.off("data", onData);
        child.stderr?.off("data", onData);
        resolve();
      }
    };
    child.stdout?.on("data", onData);
    child.stderr?.on("data", onData);
  });
}

async function runOnce(browser, origin, pass) {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (err) => errors.push(String(err)));

  await page.goto(origin + "/", { waitUntil: "load", timeout: 60000 });
  await page.waitForSelector("#dmk-notch", { timeout: 20000 });
  const home = await page.evaluate(() => {
    const video = document.getElementById("hero-promo-video");
    const mock = document.getElementById("droppy-mock");
    const notch = document.getElementById("dmk-notch");
    return {
      hasVideo: !!video,
      hasMock: !!mock,
      hasNotch: !!notch,
      mini: notch ? notch.classList.contains("is-mini") : false,
      open: notch ? notch.classList.contains("is-open") : false,
    };
  });
  if (home.hasVideo || !home.hasMock || !home.hasNotch) {
    throw new Error("home structure failed " + JSON.stringify(home));
  }
  await page.waitForFunction(() => document.documentElement.getAttribute("data-dmk-ready") === "1", {
    timeout: 10000,
  });
  await page.evaluate(() => {
    const notch = document.getElementById("dmk-notch");
    if (!notch) return;
    notch.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, pointerId: 1 }));
    notch.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, pointerId: 1 }));
  });
  await new Promise((r) => setTimeout(r, 600));
  const after = await page.evaluate(() => {
    const notch = document.getElementById("dmk-notch");
    return {
      mini: notch.classList.contains("is-mini"),
      open: notch.classList.contains("is-open"),
    };
  });
  if (!after.open || after.mini) throw new Error("notch did not open " + JSON.stringify(after));
  await page.screenshot({ path: path.join(scratch, `hero-notch-${pass}.png`), fullPage: true });

  await page.goto(origin + "/changelog", { waitUntil: "load", timeout: 60000 });
  await page.waitForSelector(".cl-card[data-version='0.10.0']");
  const changelog = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll(".cl-card")).map((el) => el.getAttribute("data-version"));
    const sectionVisible = Array.from(document.querySelectorAll(".cl-section, .cl-card")).flatMap((card) =>
      Array.from(card.querySelectorAll("h4")).map((h4) => {
        const list = h4.parentElement?.querySelector("ul");
        return list ? list.querySelectorAll("li").length : 0;
      }),
    );
    const moreBtns = document.querySelectorAll(".cl-more").length;
    const text = document.body.innerText;
    return { cards, sectionVisible, moreBtns, hasUnreleased: /\bunreleased\b/i.test(text) };
  });
  if (changelog.cards[0] !== "0.10.0") throw new Error("newest first failed " + changelog.cards[0]);
  if (!changelog.cards.includes("0.1.0")) throw new Error("missing 0.1.0");
  if (changelog.hasUnreleased) throw new Error("unreleased copy visible");
  if (changelog.sectionVisible.some((n) => n > 5)) {
    throw new Error("visible bullets exceeded 5 " + changelog.sectionVisible);
  }
  if (changelog.moreBtns < 1) throw new Error("missing show more");
  await page.screenshot({ path: path.join(scratch, `changelog-${pass}.png`), fullPage: true });
  await page.close();
  if (errors.length) throw new Error("page errors: " + errors.join(" | "));
  return { home, after, changelog };
}

const exe = edgePath();
if (!exe) {
  fs.writeFileSync(path.join(scratch, "browser-unavailable.log"), "no Edge/Chrome executable");
  process.exit(1);
}

let child = null;
let origin = process.env.HALO_WEB_ORIGIN || "";
if (!origin) {
  try {
    const probe = await fetch("http://127.0.0.1:3000/");
    if (probe.ok) origin = "http://127.0.0.1:3000";
  } catch {
    origin = "";
  }
}
if (!origin) {
  child = spawn("npx", ["next", "start", "--port", "3457", "--hostname", "127.0.0.1"], {
    cwd: root,
    shell: true,
    stdio: ["ignore", "pipe", "pipe"],
  });
  await waitForOutput(child, "3457", 90000);
  origin = "http://127.0.0.1:3457";
}

let browser;
try {
  browser = await puppeteer.launch({
    executablePath: exe,
    headless: true,
    args: ["--no-sandbox", "--disable-gpu"],
  });
  const a = await runOnce(browser, origin, 1);
  const b = await runOnce(browser, origin, 2);
  fs.copyFileSync(path.join(scratch, "hero-notch-2.png"), path.join(scratch, "hero-notch.png"));
  fs.copyFileSync(path.join(scratch, "changelog-2.png"), path.join(scratch, "changelog.png"));
  const summary = {
    origin,
    pass1: a,
    pass2: b,
    consistent: a.after.open === b.after.open && a.changelog.cards[0] === b.changelog.cards[0],
  };
  fs.writeFileSync(path.join(scratch, "browser-verify.json"), JSON.stringify(summary, null, 2));
  if (!summary.consistent) throw new Error("inconsistent launches");
  console.log(JSON.stringify(summary, null, 2));
} catch (err) {
  fs.writeFileSync(path.join(scratch, "browser-unavailable.log"), String(err && err.stack ? err.stack : err));
  throw err;
} finally {
  if (browser) await browser.close();
  if (child) child.kill("SIGTERM");
}
