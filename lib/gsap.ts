import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  window.addEventListener("load", () => ScrollTrigger.refresh());
}

export { gsap, ScrollTrigger };
