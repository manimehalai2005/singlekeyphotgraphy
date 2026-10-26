
import ContactClient from "@/src/Contact/ContactClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with SingleKey Photography for booking wedding, event, and portrait photography services. Contact us today to capture your unforgettable moments.",
  alternates: {
    canonical: "https://singlekey-eta.vercel.app/contact",
  },
  openGraph: {
    title: "Contact Us | SingleKey Photography",
    description:
      "Get in touch with SingleKey Photography for inquiries, quotes, and event bookings.",
    url: "https://singlekey-eta.vercel.app/contact",
    siteName: "SingleKey Photography",
    type: "website",
    locale: "en_IN",
  },
};

export default function Page() {
  return <ContactClient />;
}