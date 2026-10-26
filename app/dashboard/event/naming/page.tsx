
import DashboardNamingPage from "@/src/dashboard/event/naming/page";
import NamingClient from "@/src/Event/NamingCeremony/NamingClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Naming Ceremony Photography",
  description:
    "Capture the cherished moments of your baby's naming ceremony with SingleKey Photography. Preserve traditional rituals, family celebrations, and precious baby memories with beautiful photography.",
  alternates: {
    canonical: "https://singlekey-eta.vercel.app/event/naming",
  },
  openGraph: {
    title: "Naming Ceremony Photography | SingleKey Photography",
    description:
      "Beautiful photography for traditional naming ceremonies, baby welcomes, and meaningful family moments.",
    url: "https://singlekey-eta.vercel.app/event/naming",
    siteName: "SingleKey Photography",
    type: "website",
    locale: "en_IN",
  },
};

export default function Page() {
  return <DashboardNamingPage/>;
}