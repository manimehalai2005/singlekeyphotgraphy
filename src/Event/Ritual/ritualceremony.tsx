"use client";

import { motion, Variants } from "framer-motion";
import RitualCeremonyCollageSection from "./ritualCeremonycardCollection";
import InfinitePhotoSlider from "../Photogallerytemplate";
import StarfieldCursor from "@/src/StarFieldCursor";
import WeddingDriftGallery from "../Prewedd";

export default function RitualCeremonyCard() {
  const subHeadingText = "Sacred Tradition";
  const paragraphText =
    "Traditional morning rituals, sacred offerings, and cherished moments shared with family have been the true highlights of this celebration. Tamil Nadu features a rich tapestry of traditional rituals and ceremonies that mark key life stages, spiritual devotion, and community events.";

  // Smooth Fade-Up Animation Variant for Text Content
  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  // 3D Flip Animation Variant
  const flipVariants: Variants = {
    animate: {
      rotateY: [0, 180, 360],
      transition: {
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
    
      
      <RitualCeremonyCollageSection />
      <WeddingDriftGallery />
    </>
  );
}