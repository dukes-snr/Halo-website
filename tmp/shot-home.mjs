import puppeteer from "puppeteer-core";

const edge =
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const browser = await puppeteer.launch({
  executablePath: edge,
  headless: true,
  args: ["--hide-scrollbars"],
});

async function shot(width, height, file, fullPage = false) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3000/", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForSelector(".halo-framer-root", { timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2500));
  await page.screenshot({ path: file, fullPage });
  console.log("wrote", file);
  await page.close();
}

await shot(1440, 1100, "tmp/r-home-hero.png");
await shot(1440, 1100, "tmp/r-home.png", true);
await shot(390, 844, "tmp/r-home-mobile.png");
await shot(810, 1024, "tmp/r-home-tablet.png");
await browser.close();
