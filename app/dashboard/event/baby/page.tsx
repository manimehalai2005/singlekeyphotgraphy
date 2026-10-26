
import BabyShowerClient from "@/src/Event/BabyShower/BabyShowerClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Baby Shower Photography",
  description:
    "Capture the cherished moments of your baby shower celebration with SingleKey Photography. Preserve traditional Seemantham rituals, Valaikaappu ceremonies, and precious family memories with beautiful photography.",
  alternates: {
    canonical: "https://singlekey-eta.vercel.app/event/babyshower",
  },
  openGraph: {
    title: "Baby Shower Photography | SingleKey Photography",
    description:
      "Beautiful photography for traditional baby shower ceremonies, Seemantham, Valaikaappu, and special family celebrations.",
    url: "https://singlekey-eta.vercel.app/event/babyshower",
    siteName: "SingleKey Photography",
    type: "website",
    locale: "en_IN",
  },
};

export default function Page() {
  return <BabyShowerClient />;
}