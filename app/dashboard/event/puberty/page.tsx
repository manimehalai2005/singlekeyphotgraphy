
import DashboardPubertyControl from "@/src/dashboard/event/puberty/page";
import PubertyClient from "@/src/Event/puberty/PubertyClient";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Puberty Ceremony Photography",
  description:
    "Capture the special moments of puberty ceremonies with SingleKey Photography. Preserve traditional rituals, family celebrations, and precious memories with beautiful photography.",
  alternates: {
    canonical: "https://singlekey-eta.vercel.app/event/puberty",
  },
  openGraph: {
    title: "Puberty Ceremony Photography | SingleKey Photography",
    description:
      "Beautiful photography for traditional puberty ceremonies, family celebrations, and meaningful cultural moments.",
    url: "https://singlekey-eta.vercel.app/event/puberty",
    siteName: "SingleKey Photography",
    type: "website",
    locale: "en_IN",
  },
};

export default function Page() {
  return <DashboardPubertyControl />;
}
