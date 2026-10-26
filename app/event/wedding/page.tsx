
import WeddingClient from "@/src/Event/wedding/WeddingClient";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Wedding Event Photography",
  description:
    "Capture your wedding celebrations, beautiful rituals, and unforgettable moments with SingleKey Photography.",
  alternates: {
    canonical: "https://singlekey-eta.vercel.app/event/wedding",
  },
  openGraph: {
    title: "Wedding Event Photography | SingleKey Photography",
    description:
      "Discover wedding photography that captures meaningful rituals, candid emotions, and timeless memories.",
    url: "https://singlekey-eta.vercel.app/event/wedding",
    siteName: "SingleKey Photography",
    type: "website",
    locale: "en_IN",
  },
};

export default function Page() {
  return <WeddingClient />;
}
