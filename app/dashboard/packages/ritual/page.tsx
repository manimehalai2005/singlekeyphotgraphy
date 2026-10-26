
import DashboardRitualSliderPage from "@/src/dashboard/packages/ritual/page";
import RitualPackageClient from "@/src/packagess/Ritualcermony/RitualPackageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ritual & Traditional Ceremony Photography Packages",
  description:
    "Explore traditional ritual and pooja photography packages with SingleKey Photography. Professional coverage for cultural ceremonies, temple functions, and auspicious family rituals.",
  alternates: {
    canonical: "https://singlekey-eta.vercel.app/packages/ritual",
  },
  openGraph: {
    title: "Ritual Photography Packages | SingleKey Photography",
    description:
      "Affordable and respectful photography packages for traditional rituals, poojas, cultural functions, and sacred family celebrations.",
    url: "https://singlekey-eta.vercel.app/packages/ritual",
    siteName: "SingleKey Photography",
    type: "website",
    locale: "en_IN",
  },
};

export default function Page() {
  return <DashboardRitualSliderPage />;
}