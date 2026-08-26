import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const OUT = "E:\\code\\Github\\Halo web\\.impeccable\\critique\\_tmp-b";
const URL = "http://localhost:3000/";

fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function attachCollectors(page) {
  const consoleMessages = [];
  const pageErrors = [];
  const failedRequests = [];
  page.on("console", (msg) => {
    consoleMessages.push({
      type: msg.type(),
      text: msg.text(),
      location: msg.location(),
    });
  });
  page.on("pageerror", (err) => {
    pageErrors.push(String(err && err.message ? err.message : err));
  });
  page.on("requestfailed", (req) => {
    failedRequests.push({
      url: req.url(),
      method: req.method(),
      failure: req.failure()?.errorText || "unknown",
      resourceType: req.resourceType(),
    });
  });
  page.on("response", (res) => {
    const status = res.status();
    if (status >= 400) {
      failedRequests.push({
        url: res.url(),
        method: res.request().method(),
        failure: `HTTP ${status}`,
        resourceType: res.request().resourceType(),
        status,
      });
    }
  });
  return { consoleMessages, pageErrors, failedRequests };
}

async function collectDomFacts(page) {
  return page.evaluate(() => {
    const docEl = document.documentElement;
    const body = document.body;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const overflowX = Math.max(docEl.scrollWidth, body.scrollWidth) - vw;
    const overflowY = Math.max(docEl.scrollHeight, body.scrollHeight) - vh;
    const overflowing = [];
    for (const el of document.querySelectorAll("body *")) {
      const r = el.getBoundingClientRect();
      if (r.width < 2 && r.height < 2) continue;
      if (r.right > vw + 2 || r.left < -2) {
        const cs = getComputedStyle(el);
        overflowing.push({
          tag: el.tagName.toLowerCase(),
          id: el.id || null,
          className: typeof el.className === "string" ? el.className.slice(0, 120) : "",
          left: Math.round(r.left),
          right: Math.round(r.right),
          width: Math.round(r.width),
          overflow: cs.overflow,
        });
        if (overflowing.length >= 20) break;
      }
    }
    const images = [...document.images].map((img) => ({
      src: img.currentSrc || img.src,
      alt: img.alt,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      broken: img.complete && img.naturalWidth === 0,
      width: img.width,
      height: img.height,
    }));
    const brokenImages = images.filter((i) => i.broken);
    return {
      title: document.title,
      url: location.href,
      viewport: { width: vw, height: vh },
      scroll: {
        scrollWidth: docEl.scrollWidth,
        clientWidth: docEl.clientWidth,
        bodyScrollWidth: body.scrollWidth,
        overflowXPx: overflowX,
        overflowYPx: overflowY,
        documentOverflowX: overflowX > 1,
      },
      overflowingSample: overflowing,
      imageCount: images.length,
      brokenImages,
      h1: document.querySelector("h1")?.textContent?.trim() || null,
    };
  });
}

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
});

const evidence = {
  url: URL,
  nativeOverlay: false,
  injection: "skipped",
  liveServer: "not started",
  fallbackSignal: "no user-visible overlay; CLI detector + headless screenshots",
  consoleImpeccable: [],
  desktop: null,
  mobile: null,
  screenshots: [],
};

try {
  const desktop = await browser.newPage();
  const dCol = attachCollectors(desktop);
  await desktop.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await desktop.goto(URL, { waitUntil: "networkidle2", timeout: 30000 });
  await desktop.waitForSelector("h1", { timeout: 20000 });
  await sleep(1600);

  const dHero = path.join(OUT, "desktop-1440x900.png");
  await desktop.screenshot({ path: dHero, type: "png" });
  evidence.screenshots.push(dHero);

  const stations = await desktop.$("#stations");
  if (stations) {
    await stations.scrollIntoView();
    await sleep(700);
    const p = path.join(OUT, "desktop-stations.png");
    await desktop.screenshot({ path: p, type: "png" });
    evidence.screenshots.push(p);
  }

  await desktop.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await sleep(800);
  const dFoot = path.join(OUT, "desktop-footer.png");
  await desktop.screenshot({ path: dFoot, type: "png" });
  evidence.screenshots.push(dFoot);

  await desktop.evaluate(() => window.scrollTo(0, 0));
  await sleep(300);
  const notch = await desktop.$("#dmk-notch");
  if (notch) {
    await notch.scrollIntoView({ block: "center" });
    await sleep(400);
    await notch.click({ delay: 40 });
    await sleep(1100);
    const p = path.join(OUT, "desktop-notch-open.png");
    await desktop.screenshot({ path: p, type: "png" });
    evidence.screenshots.push(p);
    evidence.notchClicked = true;
  } else {
    evidence.notchClicked = false;
  }

  evidence.desktop = {
    facts: await collectDomFacts(desktop),
    consoleMessages: dCol.consoleMessages,
    pageErrors: dCol.pageErrors,
    failedRequests: dCol.failedRequests,
  };

  const mobile = await browser.newPage();
  const mCol = attachCollectors(mobile);
  await mobile.setViewport({
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  await mobile.goto(URL, { waitUntil: "networkidle2", timeout: 30000 });
  await mobile.waitForSelector("h1", { timeout: 20000 });
  await sleep(1600);
  const mHero = path.join(OUT, "mobile-390x844.png");
  await mobile.screenshot({ path: mHero, type: "png" });
  evidence.screenshots.push(mHero);

  await mobile.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await sleep(800);
  const mFoot = path.join(OUT, "mobile-footer.png");
  await mobile.screenshot({ path: mFoot, type: "png" });
  evidence.screenshots.push(mFoot);

  evidence.mobile = {
    facts: await collectDomFacts(mobile),
    consoleMessages: mCol.consoleMessages,
    pageErrors: mCol.pageErrors,
    failedRequests: mCol.failedRequests,
  };

  const allConsole = [
    ...(evidence.desktop.consoleMessages || []),
    ...(evidence.mobile.consoleMessages || []),
  ];
  evidence.consoleImpeccable = allConsole.filter((m) =>
    /impeccable/i.test(m.text || ""),
  );
} finally {
  await browser.close();
}

fs.writeFileSync(path.join(OUT, "browser-evidence.json"), JSON.stringify(evidence, null, 2));
console.log(JSON.stringify({
  screenshots: evidence.screenshots,
  desktopOverflowX: evidence.desktop?.facts?.scroll,
  mobileOverflowX: evidence.mobile?.facts?.scroll,
  desktopBroken: evidence.desktop?.facts?.brokenImages,
  mobileBroken: evidence.mobile?.facts?.brokenImages,
  desktopErrors: evidence.desktop?.pageErrors,
  mobileErrors: evidence.mobile?.pageErrors,
  desktopFailed: evidence.desktop?.failedRequests,
  mobileFailed: evidence.mobile?.failedRequests,
  desktopConsoleTypes: (evidence.desktop?.consoleMessages || []).map((m) => `${m.type}:${m.text.slice(0, 160)}`),
  mobileConsoleTypes: (evidence.mobile?.consoleMessages || []).map((m) => `${m.type}:${m.text.slice(0, 160)}`),
  impeccable: evidence.consoleImpeccable,
  notchClicked: evidence.notchClicked,
}, null, 2));
