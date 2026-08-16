import puppeteer from "puppeteer-core";

const edge =
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const browser = await puppeteer.launch({
  executablePath: edge,
  headless: true,
  args: ["--hide-scrollbars"],
  defaultViewport: { width: 1440, height: 1100, deviceScaleFactor: 1 },
});

const page = await browser.newPage();
await page.goto("http://127.0.0.1:3000/", {
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

// Force lazy images to load
await page.evaluate(() => {
  document.querySelectorAll("img").forEach((img) => {
    img.loading = "eager";
    if (img.dataset.src) img.src = img.dataset.src;
  });
});
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await new Promise((r) => setTimeout(r, 1200));
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise((r) => setTimeout(r, 400));

const hero = await page.$("section.relative.isolate");
if (hero) {
  await hero.screenshot({ path: "E:/code/Github/Halo web/tmp/v-hero.png" });
  console.log("hero");
}

const stations = await page.$("#stations");
if (stations) {
  await stations.screenshot({
    path: "E:/code/Github/Halo web/tmp/v-stations.png",
  });
  console.log("stations");
}

const showcase = await page.$("section.bg-neutral-950");
if (showcase) {
  await showcase.screenshot({
    path: "E:/code/Github/Halo web/tmp/v-showcase.png",
  });
  console.log("showcase");
}

await browser.close();
