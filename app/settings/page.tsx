import type { Metadata } from "next";
import { FeaturePageView } from "@/components/marketing/FeaturePageView";
import { featurePages } from "@/lib/content";

const page = featurePages.find((p) => p.slug === "settings")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.body,
};

export default function SettingsPage() {
  return <FeaturePageView page={page} />;
}
