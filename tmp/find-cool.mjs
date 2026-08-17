import puppeteer from "puppeteer-core";

const edge =
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const browser = await puppeteer.launch({
  executablePath: edge,
  headless: true,
  args: ["--hide-scrollbars"],
});
const page = await browser.newPage();
await page.goto("http://localhost:3000/", {
  waitUntil: "domcontentloaded",
  timeout: 60000,
});
await page.waitForSelector(".halo-framer-root");
const hits = await page.evaluate(() => {
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const out = [];
  let n;
  while ((n = walk.nextNode())) {
    if (/cooldock|macos/i.test(n.textContent || "")) {
      out.push((n.textContent || "").trim().slice(0, 160));
    }
  }
  return out;
});
console.log(hits);
await browser.close();
