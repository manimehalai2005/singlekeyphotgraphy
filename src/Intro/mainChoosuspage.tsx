"use client";

import dynamic from "next/dynamic";

const CircleGalleryPage = dynamic(
  () => import("./Chooseus"),
  {
    ssr: false,
  }
);

export default function ClientGallery() {
  return <CircleGalleryPage />;
}