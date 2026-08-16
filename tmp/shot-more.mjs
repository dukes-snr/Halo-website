import puppeteer from "puppeteer-core";

const edge =
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const browser = await puppeteer.launch({
  executablePath: edge,
  headless: true,
  args: ["--hide-scrollbars"],
  defaultViewport: { width: 1440, height: 1100, deviceScaleFactor: 1 },
});

async function snap(path, file) {
  const page = await browser.newPage();
  await page.goto(`http://127.0.0.1:3000${path}`, {
    waitUntil: "networkidle0",
    timeout: 30000,
  });
  await page.addStyleTag({
    content: `[style*="opacity"] { opacity: 1 !important; transform: none !important; }`,
  });
  await page.evaluate(() => {
    document.querySelectorAll("*").forEach((el) => {
      if (getComputedStyle(el).opacity === "0") {
        el.style.setProperty("opacity", "1", "important");
        el.style.setProperty("transform", "none", "important");
      }
    });
  });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: file, fullPage: true });
  console.log(file);
  await page.close();
}

await snap("/changelog", "E:/code/Github/Halo web/tmp/v-changelog.png");
await snap("/settings", "E:/code/Github/Halo web/tmp/v-settings.png");
await snap("/control-center", "E:/code/Github/Halo web/tmp/v-cc.png");

await browser.close();
