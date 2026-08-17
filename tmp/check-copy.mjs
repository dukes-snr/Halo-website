import { readFileSync } from "node:fs";
const html = readFileSync("code.html", "utf8");
const body = html.slice(html.indexOf("<body>"));
const leftover = [
  "Mac Dock",
  "macOS",
  "Cooldock",
  "CoolDock",
  "second Dock",
  "widgets into",
  "live widgets",
  "original Mac",
  "your Mac",
];
for (const s of leftover) {
  const n = (body.match(new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length;
  if (n) console.log(n, JSON.stringify(s));
}

const css = html.slice(0, html.indexOf("<body>"));
for (const cls of ["hidden-5rnrfi", "hidden-rk0du6", "hidden-72rtr7", "ssr-variant"]) {
  console.log("css", cls, (css.match(new RegExp(cls, "g")) || []).length);
  console.log("body", cls, (body.match(new RegExp(cls, "g")) || []).length);
}
