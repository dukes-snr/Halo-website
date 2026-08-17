import puppeteer from "puppeteer-core";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const edge =
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const ref = pathToFileURL(resolve("code.html")).href;

const browser = await puppeteer.launch({
  executablePath: edge,
  headless: true,
  args: ["--hide-scrollbars", "--allow-file-access-from-files"],
  defaultViewport: { width: 1440, height: 1100, deviceScaleFactor: 1 },
});

async function shot(url, file, width = 1440, height = 1100) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: file, fullPage: false });
  console.log("wrote", file);
  await page.close();
}

await shot("http://localhost:3000/", "tmp/cmp-live.png");
await shot(ref, "tmp/cmp-ref.png");
await shot("http://localhost:3000/", "tmp/cmp-live-mobile.png", 390, 844);
await shot(ref, "tmp/cmp-ref-mobile.png", 390, 844);

await browser.close();
