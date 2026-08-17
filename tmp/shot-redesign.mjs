import puppeteer from "puppeteer-core";

const edge =
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const pages = [
  { path: "/", file: "tmp/r-home.png", height: 1100 },
  { path: "/media", file: "tmp/r-media.png", height: 1100 },
  { path: "/changelog", file: "tmp/r-changelog.png", height: 1100 },
  { path: "/download", file: "tmp/r-download.png", height: 1100 },
  { path: "/privacy", file: "tmp/r-privacy.png", height: 900 },
  { path: "/files", file: "tmp/r-files.png", height: 900 },
];

const browser = await puppeteer.launch({
  executablePath: edge,
  headless: true,
  args: ["--hide-scrollbars"],
  defaultViewport: { width: 1440, height: 1100, deviceScaleFactor: 1 },
});

async function reveal(page) {
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await page.addStyleTag({
    content: `
      .opacity-0 { opacity: 1 !important; transform: none !important; }
      .animate-fade-in-up { animation: none !important; opacity: 1 !important; }
    `,
  });
  await page.evaluate(() => {
    document.querySelectorAll("*").forEach((el) => {
      if (getComputedStyle(el).opacity === "0") {
        el.style.setProperty("opacity", "1", "important");
        el.style.setProperty("transform", "none", "important");
      }
    });
  });
}

for (const pageDef of pages) {
  const page = await browser.newPage();
  await page.setViewport({
    width: 1440,
    height: pageDef.height,
    deviceScaleFactor: 1,
  });
  await page.goto(`http://localhost:3000${pageDef.path}`, {
    waitUntil: "networkidle0",
    timeout: 45000,
  });
  await reveal(page);
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: pageDef.file, fullPage: true });
  console.log("wrote", pageDef.file);
  await page.close();
}

const mobile = await browser.newPage();
await mobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await mobile.goto("http://localhost:3000/", {
  waitUntil: "networkidle0",
  timeout: 45000,
});
await reveal(mobile);
await new Promise((r) => setTimeout(r, 400));
await mobile.screenshot({ path: "tmp/r-home-mobile.png" });
console.log("wrote mobile");
await mobile.close();

const tablet = await browser.newPage();
await tablet.setViewport({ width: 768, height: 1024, deviceScaleFactor: 1 });
await tablet.goto("http://localhost:3000/", {
  waitUntil: "networkidle0",
  timeout: 45000,
});
await reveal(tablet);
await new Promise((r) => setTimeout(r, 400));
await tablet.screenshot({ path: "tmp/r-home-tablet.png" });
console.log("wrote tablet");
await tablet.close();

await browser.close();
