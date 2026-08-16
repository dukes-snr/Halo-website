import { DownloadCta } from "@/components/marketing/DownloadCta";
import { Faq } from "@/components/marketing/Faq";
import { FeatureStations } from "@/components/marketing/FeatureStations";
import { Hero } from "@/components/marketing/Hero";
import { MakeYours } from "@/components/marketing/MakeYours";
import { ProductShowcase } from "@/components/marketing/ProductShowcase";
import { ProofSection } from "@/components/marketing/ProofSection";
import { Testimonials } from "@/components/marketing/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofSection />
      <FeatureStations />
      <MakeYours />
      <Testimonials />
      <ProductShowcase />
      <DownloadCta />
      <Faq />
    </>
  );
}
