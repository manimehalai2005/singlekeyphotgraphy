
import EngagementClient from "@/src/Event/Engagement/EngagementClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engagement Photography",
  description:
    "Capture the cherished moments of your ring ceremony with SingleKey Photography. Preserve traditional engagement rituals, romantic celebrations, and milestone memories with beautiful photography.",
  alternates: {
    canonical: "https://singlekey-eta.vercel.app/event/engagement",
  },
  openGraph: {
    title: "Engagement Photography | SingleKey Photography",
    description:
      "Beautiful photography for traditional engagement ceremonies, ring exchanges, and special family celebrations.",
    url: "https://singlekey-eta.vercel.app/event/engagement",
    siteName: "SingleKey Photography",
    type: "website",
    locale: "en_IN",
  },
};

export default function Page() {
  return <EngagementClient />;
}