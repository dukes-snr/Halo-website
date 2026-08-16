import puppeteer from "puppeteer-core";

const edge =
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const browser = await puppeteer.launch({
  executablePath: edge,
  headless: true,
  args: ["--hide-scrollbars"],
});

const page = await browser.newPage();
page.on("pageerror", (err) => console.log("PAGEERROR", err.message));
page.on("console", (msg) => {
  if (msg.type() === "error") console.log("CONSOLE", msg.text());
});
page.on("requestfailed", (req) => {
  console.log("FAIL", req.failure()?.errorText, req.url());
});
page.on("response", (res) => {
  if (res.status() >= 400) console.log("HTTP", res.status(), res.url());
});
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto("http://127.0.0.1:3000/", {
  waitUntil: "networkidle0",
  timeout: 60000,
});
await page.waitForSelector(".halo-hero .menu-toggle");
await new Promise((r) => setTimeout(r, 1500));
const before = await page.evaluate(() => {
  const btn = document.querySelector(".halo-hero .menu-toggle");
  return {
    exists: !!btn,
    expanded: btn?.getAttribute("aria-expanded"),
    display: btn ? getComputedStyle(btn).display : null,
    count: document.querySelectorAll(".menu-toggle").length,
  };
});
console.log("before", JSON.stringify(before));
await page.click(".halo-hero .menu-toggle");
await new Promise((r) => setTimeout(r, 500));
const after = await page.evaluate(() => {
  const btn = document.querySelector(".halo-hero .menu-toggle");
  return {
    header: document.querySelector(".halo-hero .header")?.className,
    expanded: btn?.getAttribute("aria-expanded"),
    actionsClass: document.querySelector(".header-actions")?.className,
    actionsVis: document.querySelector(".header-actions")
      ? getComputedStyle(document.querySelector(".header-actions")).visibility
      : null,
  };
});
console.log("after", JSON.stringify(after));
await page.screenshot({
  path: "E:/code/Github/Halo web/tmp/hero-mobile-menu.png",
});
await browser.close();
