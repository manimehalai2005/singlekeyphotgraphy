import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/src/Navbar/Navbar";
import Footer from "@/src/Footer/Footer";
import { Toaster } from "sonner";
import { GalleryProvider } from "@/src/context/GalleryContext";
import { WeddingProvider } from "@/src/context/WeddingContenxt";
import { PreWeddingProvider } from "@/src/context/pre-weddingContext";

import { EngagementProvider } from "@/src/context/EngagementContext";
import { FamilyProvider } from "@/src/context/BirthdayFamilyContext";
import { NamingProvider } from "@/src/context/NamingContext";
import { HouseWarmingProvider } from "@/src/context/HousewarmingContext";
import { RitualProvider } from "@/src/context/RitualContext";
import { PubertyProvider } from "@/src/context/PubertyContext";
import { EarPiercingProvider } from "@/src/context/EarpiercingContenxt";
import { BabyInfiniteProvider } from "@/src/context/BabyInfinteContext";
import { BirthdayInfiniteProvider } from "@/src/context/BirthdayInfinteContext";
import { EngageInfiniteProvider } from "@/src/context/EngageInfiniteContext";
import { HouseInfiniteProvider } from "@/src/context/HouseInfiniteContext";
import { NamingInfiniteProvider } from "@/src/context/NamingInfiniteContext";
import { PubertyInfiniteProvider } from "@/src/context/PubertyInfinteContext";
import { RitualInfiniteProvider } from "@/src/context/RitualInfinteContext";
import { WeddingInfiniteProvider } from "@/src/context/WeddingInfinteContext";
import { EarInfiniteProvider } from "@/src/context/EarinfinteContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SingleKey Photography ",
    template: "%s | SingleKey Photography",
  },
  description:
    "Discover SingleKey Photography for wedding photography, candid moments, special events, portraits, and timeless memories.",
  applicationName: "SingleKey Photography",
  icons: {
    icon: [
      {
        url: 'https://cdn.photomall.in/photomall/d0bade31-0828-4442-a034-25a0a58c6bb90nhCITc9',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: 'https://cdn.photomall.in/photomall/d0bade31-0828-4442-a034-25a0a58c6bb90nhCITc9',
        sizes: '192x192', // Periya screen / mobile shortcuts-kaaga
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: 'https://cdn.photomall.in/photomall/d0bade31-0828-4442-a034-25a0a58c6bb90nhCITc9',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  openGraph: {
    title: "SingleKey Photography ",
    description:
      "Capturing beautiful weddings, special events, and unforgettable moments through photography.",
      
    siteName: "SingleKey Photography",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* 2. GalleryProvider-a body ku ulla wrap panrom */}
        <GalleryProvider>
          <WeddingProvider>
            <PreWeddingProvider>
              <EngagementProvider>
                <FamilyProvider>
                  <NamingProvider>
                    <HouseWarmingProvider>
                      <RitualProvider>
                        <PubertyProvider>
                          <EarPiercingProvider>
                            <BabyInfiniteProvider>
                              <BirthdayInfiniteProvider>
                                <EngageInfiniteProvider>
                                  <EarInfiniteProvider>
                                  <HouseInfiniteProvider>
                                    <NamingInfiniteProvider>
                                      <PubertyInfiniteProvider>
                                        <RitualInfiniteProvider>
                                          <WeddingInfiniteProvider>
                                    <Toaster richColors position="top-right" />
                                    <Navbar />
                                    {children}
                                    <div className="relative z-20 bg-black">
                                      <Footer />
                                    </div>
                                    </WeddingInfiniteProvider>
                                    </RitualInfiniteProvider>
                                    </PubertyInfiniteProvider>
                                    </NamingInfiniteProvider>
                                  </HouseInfiniteProvider>
                                  </EarInfiniteProvider>
                                </EngageInfiniteProvider>
                              </BirthdayInfiniteProvider>
                            </BabyInfiniteProvider>
                          </EarPiercingProvider>
                        </PubertyProvider>
                      </RitualProvider>
                    </HouseWarmingProvider>
                  </NamingProvider>
                </FamilyProvider>
              </EngagementProvider>
            </PreWeddingProvider>
          </WeddingProvider>
        </GalleryProvider>
      </body>
    </html>
  );
}
