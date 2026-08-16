import puppeteer from "puppeteer-core";

const edge =
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const browser = await puppeteer.launch({
  executablePath: edge,
  headless: true,
  args: ["--hide-scrollbars"],
});

async function shot(name, viewport) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await page.goto("http://127.0.0.1:3000/", {
    waitUntil: "networkidle0",
    timeout: 60000,
  });
  await page.addStyleTag({
    content: `
      .halo-hero.motion-pending .brand,
      .halo-hero.motion-pending .nav a,
      .halo-hero.motion-pending .time-panel,
      .halo-hero.motion-pending .sign-up,
      .halo-hero.motion-pending .hero-copy,
      .halo-hero.motion-pending .primary-cta,
      .halo-hero.motion-pending .notch-card,
      .halo-hero.motion-pending .line-reveal {
        opacity: 1 !important;
        transform: none !important;
      }
      .halo-hero.motion-pending .line { overflow: visible !important; }
    `,
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({
    path: `E:/code/Github/Halo web/tmp/${name}.png`,
  });
  console.log("wrote", name);
  await page.close();
}

await shot("hero-desktop", { width: 1440, height: 900, deviceScaleFactor: 1 });
await shot("hero-laptop", { width: 1280, height: 800, deviceScaleFactor: 1 });
await shot("hero-tablet", { width: 768, height: 1024, deviceScaleFactor: 1 });
await shot("hero-mobile", { width: 390, height: 844, deviceScaleFactor: 2 });

const menu = await browser.newPage();
await menu.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await menu.emulateMediaFeatures([
  { name: "prefers-reduced-motion", value: "reduce" },
]);
await menu.goto("http://127.0.0.1:3000/", {
  waitUntil: "networkidle0",
  timeout: 60000,
});
await menu.click(".menu-toggle");
await new Promise((r) => setTimeout(r, 400));
await menu.screenshot({
  path: "E:/code/Github/Halo web/tmp/hero-mobile-menu.png",
});
console.log("wrote hero-mobile-menu");
await menu.close();

const inner = await browser.newPage();
await inner.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await inner.goto("http://127.0.0.1:3000/media", {
  waitUntil: "networkidle0",
  timeout: 60000,
});
await inner.screenshot({
  path: "E:/code/Github/Halo web/tmp/v-media-header.png",
});
console.log("wrote v-media-header");
await inner.close();

await browser.close();
