import puppeteer from "puppeteer-core";

const edge =
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const pages = [
  { path: "/", file: "E:/code/Github/Halo web/tmp/v-home.png" },
  { path: "/media", file: "E:/code/Github/Halo web/tmp/v-media.png" },
  { path: "/apps", file: "E:/code/Github/Halo web/tmp/v-apps.png" },
  { path: "/files", file: "E:/code/Github/Halo web/tmp/v-files.png" },
];

const browser = await puppeteer.launch({
  executablePath: edge,
  headless: true,
  args: ["--hide-scrollbars"],
  defaultViewport: { width: 1440, height: 1100, deviceScaleFactor: 1 },
});

for (const pageDef of pages) {
  const page = await browser.newPage();
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await page.goto(`http://127.0.0.1:3000${pageDef.path}`, {
    waitUntil: "networkidle0",
    timeout: 30000,
  });
  await page.addStyleTag({
    content: `
      [style*="opacity:0"], [style*="opacity: 0"] { opacity: 1 !important; transform: none !important; }
      [data-framer-appear-id], [data-projection-id] { opacity: 1 !important; transform: none !important; }
    `,
  });
  await page.evaluate(() => {
    document.querySelectorAll("*").forEach((el) => {
      const s = getComputedStyle(el);
      if (s.opacity === "0") {
        el.style.setProperty("opacity", "1", "important");
        el.style.setProperty("transform", "none", "important");
      }
    });
  });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: pageDef.file, fullPage: true });
  console.log("wrote", pageDef.file);
  await page.close();
}

// Mobile home crop of hero
const mobile = await browser.newPage();
await mobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await mobile.goto("http://127.0.0.1:3000/", {
  waitUntil: "networkidle0",
  timeout: 30000,
});
await mobile.addStyleTag({
  content: `[style*="opacity"] { opacity: 1 !important; transform: none !important; }`,
});
await mobile.evaluate(() => {
  document.querySelectorAll("*").forEach((el) => {
    if (getComputedStyle(el).opacity === "0") {
      el.style.setProperty("opacity", "1", "important");
      el.style.setProperty("transform", "none", "important");
    }
  });
});
await new Promise((r) => setTimeout(r, 400));
await mobile.screenshot({
  path: "E:/code/Github/Halo web/tmp/v-home-mobile.png",
});
console.log("wrote mobile");
await mobile.close();

await browser.close();
