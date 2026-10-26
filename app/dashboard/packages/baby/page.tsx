
import DashboardBabySliderPage from "@/src/dashboard/packages/baby/page";
import BabyPackageClient from "@/src/packagess/Babyshoot/BabyPackageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Baby Photography Packages",
  description:
    "Explore photography packages for newborn, infant, and milestone baby shoots with SingleKey Photography. Transparent pricing for preserving your little one's precious early memories.",
  alternates: {
    canonical: "https://singlekey-eta.vercel.app/packages/baby",
  },
  openGraph: {
    title: "Baby Photography Packages | SingleKey Photography",
    description:
      "Affordable and customized photography packages for baby milestones, newborn sessions, and infant portraits.",
    url: "https://singlekey-eta.vercel.app/packages/baby",
    siteName: "SingleKey Photography",
    type: "website",
    locale: "en_IN",
  },
};

export default function Page() {
  return <DashboardBabySliderPage/>;
}