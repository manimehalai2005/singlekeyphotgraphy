
import BirthdayClient from "@/src/Event/BirthdayEvent/BirthdayClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Birthday Photography",
  description:
    "Capture the joyous moments of your birthday celebration with SingleKey Photography. Preserve fun parties, milestone birthdays, and precious family memories with beautiful photography.",
  alternates: {
    canonical: "https://singlekey-eta.vercel.app/event/birthday",
  },
  openGraph: {
    title: "Birthday Photography | SingleKey Photography",
    description:
      "Beautiful photography for birthday parties, milestone celebrations, and special family moments.",
    url: "https://singlekey-eta.vercel.app/event/birthday",
    siteName: "SingleKey Photography",
    type: "website",
    locale: "en_IN",
  },
};

export default function Page() {
  return <BirthdayClient />;
}