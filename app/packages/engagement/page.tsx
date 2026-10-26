
import EngagementClient from "@/src/packagess/engagement/EngagementClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engagement Photography Packages",
  description:
    "Explore customized engagement photography packages with SingleKey Photography. Professional coverage for ring exchange ceremonies, couple portraits, and family celebrations.",
  alternates: {
    canonical: "https://singlekey-eta.vercel.app/packages/engagement",
  },
  openGraph: {
    title: "Engagement Photography Packages | SingleKey Photography",
    description:
      "Affordable and elegant engagement photography packages to capture your special ring ceremony and traditional rituals.",
    url: "https://singlekey-eta.vercel.app/packages/engagement",
    siteName: "SingleKey Photography",
    type: "website",
    locale: "en_IN",
  },
};

export default function Page() {
  return <EngagementClient />;
}