
import type { MetadataRoute } from "next";

const BASE_URL = "https://singlekey-eta.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/about",
    "/contact",
    "/gallery",
    "/event/baby",
    "/event/birthday",
    "/event/earpiercing",
    "/event/engagement",
    "/event/housewarming",
    "/event/naming",
    "/event/puberty",
    "/event/ritual",
    "/event/wedding",
    "/packages/baby",
    "/packages/birthday",
    "/packages/earpiercing",
    "/packages/engagement",
    "/packages/housewarming",
    "/packages/naming",
    "/packages/puberty",
    "/packages/ritual",
    "/packages/weddings",
  ];

  return staticPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));
}
