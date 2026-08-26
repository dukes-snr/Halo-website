import type { Metadata } from "next";
import { FeaturePageView } from "@/components/marketing/FeaturePageView";
import { featurePages } from "@/lib/content";

const page = featurePages.find((item) => item.slug === "bluetooth")!;

export const metadata: Metadata = {
  title: `${page.title} · Halo`,
  description: page.body,
};

export default function BluetoothPage() {
  return <FeaturePageView page={page} />;
}
