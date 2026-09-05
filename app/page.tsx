import { Band } from "@/components/landing/Band";
import { EndCta } from "@/components/landing/EndCta";
import { HeroBlock } from "@/components/landing/HeroBlock";
import { LandingShell } from "@/components/landing/LandingShell";
import { Manifesto } from "@/components/landing/Manifesto";
import { ProofSection } from "@/components/landing/ProofSection";
import { SpecMarquee } from "@/components/landing/SpecMarquee";
import { bands, proofs } from "@/lib/landing-content";

export default function HomePage() {
  return (
    <LandingShell>
      <HeroBlock />
      <Manifesto />

      <Band {...bands.proof} />
      {proofs.map((proof) => (
        <ProofSection key={proof.id} proof={proof} />
      ))}

      <Band {...bands.specs} />
      <SpecMarquee />

      <Band {...bands.close} />
      <EndCta />
    </LandingShell>
  );
}
