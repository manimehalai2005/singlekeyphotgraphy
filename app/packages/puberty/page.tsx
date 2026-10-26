
import PubertyPackageClient from "@/src/packagess/puberty/PubertyPackageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Puberty Ceremony Photography Packages",
  description:
    "Explore traditional puberty ceremony photography packages with SingleKey Photography. Professional coverage for milestone celebrations, traditional rituals, and cherished family memories.",
  alternates: {
    canonical: "https://singlekey-eta.vercel.app/packages/puberty",
  },
  openGraph: {
    title: "Puberty Ceremony Photography Packages | SingleKey Photography",
    description:
      "Affordable and professional photography packages for traditional puberty ceremonies, family functions, and special cultural celebrations.",
    url: "https://singlekey-eta.vercel.app/packages/puberty",
    siteName: "SingleKey Photography",
    type: "website",
    locale: "en_IN",
  },
};

export default function Page() {
  return <PubertyPackageClient />;
}