import type { Metadata } from "next";
import { FeaturePageView } from "@/components/marketing/FeaturePageView";
import { featurePages } from "@/lib/content";

const page = featurePages.find((item) => item.slug === "ai")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.body,
};

export default function AiPage() {
  return <FeaturePageView page={page} />;
}
