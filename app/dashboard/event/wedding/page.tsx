import DashboardWeddingControl from "@/src/dashboard/event/wedding/weddingEvent";

import { WeddingProvider } from "@/src/context/WeddingContenxt";
import { PreWeddingProvider } from "@/src/context/pre-weddingContext";
import type { Metadata } from "next";
import Prewedding from "@/src/dashboard/event/wedding/pre-wedding";

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
  return (
    <WeddingProvider>
      <PreWeddingProvider>
        <main className="w-full bg-[#0a0a0a] min-h-screen py-6 space-y-4">
          {/* 1. Wedding Dashboard Controls */}
          <DashboardWeddingControl />

          {/* Divider Line */}
          <div className="max-w-7xl mx-auto px-6">
            <div className="border-b border-neutral-800" />
          </div>

        </main>
      </PreWeddingProvider>
    </WeddingProvider>
  );
}