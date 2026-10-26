
import WeddingPackageClient from "@/src/packagess/weddings/WeddingPackageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Photography Packages",
  description:
    "Explore comprehensive wedding photography packages with SingleKey Photography. Professional coverage for wedding ceremonies, receptions, pre-wedding, and candid moments with custom pricing.",
  alternates: {
    canonical: "https://singlekey-eta.vercel.app/packages/wedding",
  },
  openGraph: {
    title: "Wedding Photography Packages | SingleKey Photography",
    description:
      "Affordable and premium wedding photography packages to capture every unforgettable moment of your big day.",
    url: "https://singlekey-eta.vercel.app/packages/wedding",
    siteName: "SingleKey Photography",
    type: "website",
    locale: "en_IN",
  },
};

export default function Page() {
  return <WeddingPackageClient />;
}