import type { Metadata } from "next";
import { FeaturePageView } from "@/components/marketing/FeaturePageView";
import { featurePages } from "@/lib/content";

const page = featurePages.find((p) => p.slug === "control-center")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.body,
};

export default function ControlCenterPage() {
  return <FeaturePageView page={page} />;
}
