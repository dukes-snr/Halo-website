import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Hero } from "@/components/marketing/Hero";
import { StationsSection } from "@/components/marketing/StationsSection";
import { PrinciplesBand } from "@/components/marketing/PrinciplesBand";
import { ChangelogTeaser } from "@/components/marketing/ChangelogTeaser";
import { PrivacyBand } from "@/components/marketing/PrivacyBand";
import { Faq } from "@/components/marketing/Faq";
import { CtaSection } from "@/components/marketing/CtaSection";

const droppyMockHtml = readFileSync(
  join(process.cwd(), "components/marketing/droppy/droppy-mock.html"),
  "utf8",
);

export default function HomePage() {
  return (
    <>
      <Hero droppyMockHtml={droppyMockHtml} />
      <StationsSection />
      <PrinciplesBand />
      <ChangelogTeaser />
      <PrivacyBand />
      <Faq />
      <CtaSection />
    </>
  );
}
