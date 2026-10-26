
import RitualClient from "@/src/Event/Ritual/RitualClient";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Traditional Ritual Photography",
  description:
    "Capture meaningful traditional rituals, cultural ceremonies, and precious family moments with SingleKey Photography.",
  alternates: {
    canonical: "https://singlekey-eta.vercel.app/event/ritual",
  },
  openGraph: {
    title: "Traditional Ritual Photography | SingleKey Photography",
    description:
      "Preserve your traditional rituals and cultural celebrations with beautiful photography by SingleKey Photography.",
    url: "https://singlekey-eta.vercel.app/event/ritual",
    siteName: "SingleKey Photography",
    type: "website",
    locale: "en_IN",
  },
};

export default function Page() {
  return <RitualClient />;
}
