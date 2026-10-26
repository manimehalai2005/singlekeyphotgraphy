
import DashboardHouseWarmingControl from "@/src/dashboard/event/housewarming/page";
import HouseWarmingClient from "@/src/Event/HouseWarming/HouseWarmingClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Housewarming Photography",
  description:
    "Capture the cherished moments of your new home celebration with SingleKey Photography. Preserve traditional griha pravesam rituals, family blessings, and milestone memories with beautiful photography.",
  alternates: {
    canonical: "https://singlekey-eta.vercel.app/event/housewarming",
  },
  openGraph: {
    title: "Housewarming Photography | SingleKey Photography",
    description:
      "Beautiful photography for traditional housewarming ceremonies, Griha Pravesam, and special family celebrations.",
    url: "https://singlekey-eta.vercel.app/event/housewarming",
    siteName: "SingleKey Photography",
    type: "website",
    locale: "en_IN",
  },
};

export default function Page() {
  return <DashboardHouseWarmingControl />;
}