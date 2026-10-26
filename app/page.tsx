
import HomeClient from "@/src/Intro/HomeClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SingleKey Photography | Best Wedding & Event Photographers in Madurai",
  description:
    "Top-rated photography studio in Madurai. SingleKey Photography specializes in wedding, engagement, puberties, baby shower, housewarming, and traditional event photography across Madurai and Tamil Nadu.",
  keywords: [
    "SingleKey Photography Madurai",
    "Best Wedding Photography Madurai",
    "Photographers in Madurai",
    "Candid Wedding Photography Madurai",
    "Pre-wedding Shoot Madurai",
    "Baby Shower Photography Madurai",
    "Puberty Ceremony Photography Madurai",
    "Traditional Event Photographers Madurai",
    "Budget Photography Services Madurai",
  ],
  authors: [{ name: "SingleKey Photography" }],
  creator: "SingleKey Photography",
  publisher: "SingleKey Photography",
  alternates: {
    canonical: "https://singlekey-eta.vercel.app",
  },
  openGraph: {
    title: "SingleKey Photography | Best Wedding & Event Photographers in Madurai",
    description:
      "Preserving Madurai's rich traditions, joyous celebrations, and timeless memories with premium photography and cinematic videography.",
    url: "https://singlekey-eta.vercel.app",
    siteName: "SingleKey Photography Madurai",
    images: [
      {
        url: "https://singlekey-eta.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SingleKey Photography Madurai Portfolio Showcase",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SingleKey Photography | Best Wedding & Event Photographers in Madurai",
    description:
      "Preserving Madurai's rich traditions, joyous celebrations, and timeless memories with premium photography.",
    images: ["https://singlekey-eta.vercel.app/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Page() {
  // Rich Snippet Structured Data for Madurai Local Business
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://singlekey-eta.vercel.app/#organization",
        name: "SingleKey Photography",
        url: "https://singlekey-eta.vercel.app",
        logo: "https://singlekey-eta.vercel.app/logo.png",
        image: "https://singlekey-eta.vercel.app/og-image.jpg",
        description:
          "Professional photography studio in Madurai specializing in weddings, traditional ceremonies, baby shoots, and cultural events.",
        priceRange: "₹₹",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Madurai",
          addressRegion: "Tamil Nadu",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "9.9252",
          longitude: "78.1198",
        },
        areaServed: [
          {
            "@type": "City",
            name: "Madurai",
          },
          {
            "@type": "State",
            name: "Tamil Nadu",
          },
        ],
        sameAs: [
          "https://www.instagram.com/singlekey_photography",
          "https://www.facebook.com/singlekeyphotography",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://singlekey-eta.vercel.app/#website",
        url: "https://singlekey-eta.vercel.app",
        name: "SingleKey Photography Madurai",
        publisher: {
          "@id": "https://singlekey-eta.vercel.app/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://singlekey-eta.vercel.app/gallery?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <>
      {/* Interactive Madurai Local Business Structured Data for Google Map & Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}