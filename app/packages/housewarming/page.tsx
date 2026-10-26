
import HouseWarmingPackageClient from "@/src/packagess/HouseWarming/HouseWarmingPackageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Housewarming Photography Packages",
  description:
    "Explore traditional housewarming photography packages with SingleKey Photography. Professional coverage for Griha Pravesam, pooja rituals, and new home celebrations.",
  alternates: {
    canonical: "https://singlekey-eta.vercel.app/packages/housewarming",
  },
  openGraph: {
    title: "Housewarming Photography Packages | SingleKey Photography",
    description:
      "Affordable and professional photography packages for Griha Pravesam, housewarming pooja, and special family blessings.",
    url: "https://singlekey-eta.vercel.app/packages/housewarming",
    siteName: "SingleKey Photography",
    type: "website",
    locale: "en_IN",
  },
};

export default function Page() {
  return <HouseWarmingPackageClient />;
}