

import InteriorGallery from "@/src/dashboard/gallery/introgallery";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "Explore our extensive photography portfolio at SingleKey Photography. View our finest collections of weddings, pre-wedding shoots, events, portraits, and traditional celebrations.",
  alternates: {
    canonical: "https://singlekey-eta.vercel.app/gallery",
  },
  openGraph: {
    title: "Photo Gallery | SingleKey Photography",
    description:
      "Explore high-quality photography portfolios covering weddings, traditional events, portraits, and special celebrations.",
    url: "https://singlekey-eta.vercel.app/gallery",
    siteName: "SingleKey Photography",
    type: "website",
    locale: "en_IN",
  },
};

export default function Page() {
  return <InteriorGallery/>;
}