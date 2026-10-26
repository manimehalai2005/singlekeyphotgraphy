
import DashboardBirthdaySliderPage from "@/src/dashboard/packages/birthday/page";
import BirthdayPackageClient from "@/src/packagess/birthday/BirthdayPackageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Birthday Photography Packages",
  description:
    "Explore customized birthday photography packages with SingleKey Photography. Affordable pricing and professional coverage for kids' birthday parties, milestone celebrations, and family events.",
  alternates: {
    canonical: "https://singlekey-eta.vercel.app/packages/birthday",
  },
  openGraph: {
    title: "Birthday Photography Packages | SingleKey Photography",
    description:
      "Affordable and creative birthday party photography packages to capture every joyful celebration and special moment.",
    url: "https://singlekey-eta.vercel.app/packages/birthday",
    siteName: "SingleKey Photography",
    type: "website",
    locale: "en_IN",
  },
};

export default function Page() {
  return <DashboardBirthdaySliderPage/>;
}