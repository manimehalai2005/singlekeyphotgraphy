
import DashboardNamingSliderPage from "@/src/dashboard/packages/naming/page";
import NamingPackageClient from "@/src/packagess/Naming/NamingPackageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Naming Ceremony Photography Packages",
  description:
    "Explore customized naming ceremony photography packages with SingleKey Photography. Professional coverage for baby welcoming rituals, family celebrations, and precious early moments.",
  alternates: {
    canonical: "https://singlekey-eta.vercel.app/packages/naming",
  },
  openGraph: {
    title: "Naming Ceremony Photography Packages | SingleKey Photography",
    description:
      "Affordable and professional photography packages for baby naming ceremonies, traditional rituals, and milestone family celebrations.",
    url: "https://singlekey-eta.vercel.app/packages/naming",
    siteName: "SingleKey Photography",
    type: "website",
    locale: "en_IN",
  },
};

export default function Page() {
  return <DashboardNamingSliderPage />;
}