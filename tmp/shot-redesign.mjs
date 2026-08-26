import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const edge = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
].find((p) => fs.existsSync(p));

const out = path.resolve("tmp/redesign");
fs.mkdirSync(out, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: edge,
  headless: true,
  args: ["--no-sandbox"],
});

const pause = (ms) => new Promise((r) => setTimeout(r, ms));

async function shot(name, url, width, height, scrollSel = null) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
  await pause(1200);
  if (scrollSel) {
    await page.evaluate((sel) => {
      document.querySelector(sel)?.scrollIntoView({ block: "start" });
    }, scrollSel);
    await pause(400);
  }
  await page.screenshot({ path: path.join(out, name), fullPage: false });
  await page.close();
  console.log("wrote", name);
}

const base = "http://localhost:3000";
await shot("home-desktop.png", base, 1440, 900);
await shot("home-hero-tight.png", base, 1280, 900);
await shot("home-stations.png", base, 1440, 900, "#stations");
await shot("home-stations-2.png", base, 1440, 900, "#stations article:last-of-type");
await shot("home-mobile.png", base, 390, 844);
await shot("features-desktop.png", `${base}/features`, 1440, 900);
await shot("download-desktop.png", `${base}/download`, 1440, 900);
await shot("privacy-desktop.png", `${base}/privacy`, 1440, 900);
await shot("media-desktop.png", `${base}/media`, 1440, 900);

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(base, { waitUntil: "domcontentloaded", timeout: 30000 });
await pause(1200);
const height = await page.evaluate(() => document.body.scrollHeight);
await page.setViewport({ width: 1440, height: Math.min(height, 4200), deviceScaleFactor: 1 });
await page.screenshot({ path: path.join(out, "home-full.png"), fullPage: true });
await page.close();

await browser.close();
console.log("done");
