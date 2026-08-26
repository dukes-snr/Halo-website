import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const OUT = "E:\\code\\Github\\Halo web\\.impeccable\\critique\\_tmp-a";
const URL = "http://localhost:3000/";

fs.mkdirSync(OUT, { recursive: true });

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

  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(URL, { waitUntil: "networkidle2", timeout: 30000 });
  await page.waitForSelector("h1", { timeout: 20000 });
  await sleep(1600);
  await page.screenshot({ path: path.join(OUT, "01-desktop-hero.png"), type: "png" });
  console.log("saved 01-desktop-hero");

  const stations = await page.$("#stations");
  if (stations) {
    await stations.scrollIntoView();
    await sleep(800);
  } else {
    await page.evaluate(() => window.scrollTo(0, 1100));
    await sleep(800);
  }
  await page.screenshot({ path: path.join(OUT, "02-desktop-stations.png"), type: "png" });
  console.log("saved 02-desktop-stations");

  const principles = await page.$("section.bg-ink");
  if (principles) {
    await principles.scrollIntoView();
    await sleep(700);
    await page.screenshot({ path: path.join(OUT, "07-desktop-principles.png"), type: "png" });
    console.log("saved 07-desktop-principles");
  }

  await page.evaluate(() => {
    const h = [...document.querySelectorAll("h2")].find((el) =>
      el.textContent?.includes("Questions"),
    );
    h?.closest("section")?.scrollIntoView();
  });
  await sleep(700);
  await page.screenshot({ path: path.join(OUT, "08-desktop-faq.png"), type: "png" });
  console.log("saved 08-desktop-faq");

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await sleep(900);
  await page.screenshot({ path: path.join(OUT, "03-desktop-cta-footer.png"), type: "png" });
  console.log("saved 03-desktop-cta-footer");

  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(400);
  const notch = await page.$("#dmk-notch");
  if (notch) {
    await notch.scrollIntoView({ block: "center" });
    await sleep(500);
    await notch.click({ delay: 40 });
    await sleep(1100);
    console.log("clicked notch");
  } else {
    console.log("NO NOTCH FOUND");
  }
  await page.screenshot({ path: path.join(OUT, "06-desktop-notch-open.png"), type: "png" });
  console.log("saved 06-desktop-notch-open");

  const mobile = await browser.newPage();
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
  await mobile.screenshot({ path: path.join(OUT, "04-mobile-hero.png"), type: "png" });
  console.log("saved 04-mobile-hero");

  await mobile.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await sleep(900);
  await mobile.screenshot({ path: path.join(OUT, "05-mobile-cta.png"), type: "png" });
  console.log("saved 05-mobile-cta");
} finally {
  await browser.close();
}

console.log("done");
