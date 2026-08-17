import puppeteer from "puppeteer-core";

const edge =
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const browser = await puppeteer.launch({
  executablePath: edge,
  headless: true,
  args: ["--hide-scrollbars"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000/", {
  waitUntil: "domcontentloaded",
  timeout: 60000,
});
await page.waitForSelector(".halo-framer-root", { timeout: 30000 });
await new Promise((r) => setTimeout(r, 4000));

const texts = await page.evaluate(() => {
  const body = document.body.innerText;
  return {
    halo: (body.match(/Halo/g) || []).length,
    cooldock: (body.match(/Cooldock|CoolDock|macOS/g) || []).length,
    macDock: (body.match(/Mac Dock/g) || []).length,
    download: [...document.querySelectorAll("a")].filter((a) =>
      (a.textContent || "").includes("Download for Windows"),
    ).map((a) => a.getAttribute("href")),
  };
});
console.log(JSON.stringify(texts, null, 2));

await page.screenshot({ path: "tmp/r-home-hero.png" });

const cta = await page.$('a[href="/download"]');
if (!cta) throw new Error("no /download link");
await Promise.all([
  page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 30000 }),
  cta.click(),
]);
console.log("navigated", page.url());
await new Promise((r) => setTimeout(r, 800));
await page.screenshot({ path: "tmp/r-download.png" });

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto("http://localhost:3000/", {
  waitUntil: "domcontentloaded",
  timeout: 60000,
});
await page.waitForSelector(".halo-framer-root");
await new Promise((r) => setTimeout(r, 3000));
await page.screenshot({ path: "tmp/r-home-mobile.png" });

await page.setViewport({ width: 810, height: 1024, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000/", {
  waitUntil: "domcontentloaded",
  timeout: 60000,
});
await page.waitForSelector(".halo-framer-root");
await new Promise((r) => setTimeout(r, 3000));
await page.screenshot({ path: "tmp/r-home-tablet.png" });

await browser.close();
console.log("done");
