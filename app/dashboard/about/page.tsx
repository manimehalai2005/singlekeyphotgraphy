
import AboutClient from "@/src/About/AboutClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn more about SingleKey Photography. Discover our passion, experience, and dedication to capturing unforgettable moments, weddings, and traditional celebrations with artistic excellence.",
  alternates: {
    canonical: "https://singlekey-eta.vercel.app/about",
  },
  openGraph: {
    title: "About Us | SingleKey Photography",
    description:
      "Discover the story, passion, and expertise behind SingleKey Photography.",
    url: "https://singlekey-eta.vercel.app/about",
    siteName: "SingleKey Photography",
    type: "website",
    locale: "en_IN",
  },
};

export default function Page() {
  return <AboutClient />;
}