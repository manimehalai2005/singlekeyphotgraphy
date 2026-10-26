
import EarpiercingClient from "@/src/Event/Earpiercing/EarpiercingClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ear Piercing Ceremony Photography",
  description:
    "Capture the cherished moments of your child's ear piercing ceremony with SingleKey Photography. Preserve traditional rituals, family celebrations, and precious childhood memories with beautiful photography.",
  alternates: {
    canonical: "https://singlekey-eta.vercel.app/event/earpiercing",
  },
  openGraph: {
    title: "Ear Piercing Ceremony Photography | SingleKey Photography",
    description:
      "Beautiful photography for traditional ear piercing ceremonies, ear boring celebrations, and special family moments.",
    url: "https://singlekey-eta.vercel.app/event/earpiercing",
    siteName: "SingleKey Photography",
    type: "website",
    locale: "en_IN",
  },
};

export default function Page() {
  return <EarpiercingClient />;
}