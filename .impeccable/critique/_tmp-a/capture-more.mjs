import path from "node:path";
import puppeteer from "puppeteer-core";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const OUT = "E:\\code\\Github\\Halo web\\.impeccable\\critique\\_tmp-a";
const URL = "http://localhost:3000/";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
});

try {
  const page = await browser.newPage();
  page.setDefaultTimeout(25000);
  await page.goto(URL, { waitUntil: "networkidle2", timeout: 30000 });
  await page.waitForSelector("h1");
  await sleep(1400);

  async function shotHeading(substr, filename) {
    await page.evaluate((s) => {
      const h = [...document.querySelectorAll("h2")].find((el) =>
        (el.textContent || "").includes(s),
      );
      (h?.closest("section") || h)?.scrollIntoView();
    }, substr);
    await sleep(700);
    await page.screenshot({ path: path.join(OUT, filename), type: "png" });
    console.log("saved", filename);
  }

  await shotHeading("Built like Windows", "07-desktop-principles.png");
  await shotHeading("Live Activities", "09-desktop-changelog.png");
  await shotHeading("Questions", "08-desktop-faq.png");
  await shotHeading("Get Halo", "10-desktop-cta-only.png");

  // closer notch: scroll device into view, click, clip
  const notch = await page.$("#dmk-notch");
  const well = await page.$("#hero-tryout");
  if (well) {
    await well.scrollIntoView({ block: "center" });
    await sleep(500);
    if (notch) {
      await notch.click({ delay: 40 });
      await sleep(1200);
    }
    const box = await well.boundingBox();
    if (box) {
      await page.screenshot({
        path: path.join(OUT, "11-desktop-notch-close.png"),
        clip: {
          x: Math.max(0, box.x),
          y: Math.max(0, box.y),
          width: Math.min(box.width, 1440),
          height: Math.min(box.height, 900),
        },
      });
      console.log("saved 11-desktop-notch-close");
    }
  }

  // mascot peek
  await page.evaluate(() => {
    document.querySelector("[data-hero-peek]")?.scrollIntoView({ block: "center" });
  });
  await sleep(400);
  await page.screenshot({ path: path.join(OUT, "12-desktop-mascot-peek.png"), type: "png" });
  console.log("saved 12-desktop-mascot-peek");

  const mobile = await browser.newPage();
  await mobile.setViewport({
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  await mobile.goto(URL, { waitUntil: "networkidle2", timeout: 30000 });
  await mobile.waitForSelector("h1");
  await sleep(1400);

  await mobile.evaluate(() => document.querySelector("#stations")?.scrollIntoView());
  await sleep(800);
  await mobile.screenshot({ path: path.join(OUT, "13-mobile-stations.png"), type: "png" });
  console.log("saved 13-mobile-stations");

  // open hamburger
  const menu = await mobile.$('button[aria-label="Open menu"]');
  if (menu) {
    await menu.click();
    await sleep(500);
    await mobile.screenshot({ path: path.join(OUT, "14-mobile-menu.png"), type: "png" });
    console.log("saved 14-mobile-menu");
  }

  await mobile.evaluate(() => {
    const h = [...document.querySelectorAll("h2")].find((el) =>
      (el.textContent || "").includes("Get Halo"),
    );
    h?.closest("section")?.scrollIntoView();
  });
  await sleep(700);
  await mobile.screenshot({ path: path.join(OUT, "15-mobile-cta-panel.png"), type: "png" });
  console.log("saved 15-mobile-cta-panel");
} finally {
  await browser.close();
}
console.log("done");
