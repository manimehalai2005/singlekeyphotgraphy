
import DashboardEarPiercingControl from "@/src/dashboard/event/earpiercing/page";
import EarPiercingPackageClient from "@/src/packagess/EarPiercingCermony/EarPiercingPackage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ear Piercing Photography Packages",
  description:
    "Explore traditional ear piercing ceremony photography packages with SingleKey Photography. Professional coverage and custom packages for Kadhanukozhi, ear boring rituals, and family celebrations.",
  alternates: {
    canonical: "https://singlekey-eta.vercel.app/packages/earpiercing",
  },
  openGraph: {
    title: "Ear Piercing Photography Packages | SingleKey Photography",
    description:
      "Affordable and professional photography packages for ear piercing ceremonies, traditional rituals, and family moments.",
    url: "https://singlekey-eta.vercel.app/packages/earpiercing",
    siteName: "SingleKey Photography",
    type: "website",
    locale: "en_IN",
  },
};

export default function Page() {
  return <DashboardEarPiercingControl/>;
}