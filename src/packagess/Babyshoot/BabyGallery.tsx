"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import StarfieldCursor from "@/src/StarFieldCursor";

interface PhotographyService {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
}

const photographyList: PhotographyService[] = [
  {
    id: "candid-moments",
    code: "#PH01",
    name: "CANDID MOMENTS",
    description: "Capture genuine reactions, laughter, and emotional embraces between the parents-to-be and guests without staged posing.",
    image: "https://tse2.mm.bing.net/th/id/OIP.FPyFYeVfaq4MmxY2jLVxFAHaLG?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: "natural-lighting",
    code: "#PH02",
    name: "NATURAL LIGHTING",
    description: "Utilize soft, diffused natural daylight near large windows or outdoor garden spaces to create warm, glowing portraits.",
    image: "https://i.pinimg.com/736x/d9/b0/45/d9b0457c731fa0cb1bc0d55f37934644.jpg",
  },
  {
    id: "details-decor",
    code: "#PH03",
    name: "DETAILS & DECOR",
    description: "Focus close-up shots on delicate nursery themes, custom cakes, gifts, table settings, and small commemorative details.",
    image: "https://i.pinimg.com/originals/59/1c/6e/591c6e35923012350907909ab8d8b5e6.jpg",
  },
  {
    id: "portraits-poses",
    code: "#PH04",
    name: "PORTRAITS & POSES",
    description: "Take artistic belly bump portraits and group photos with close family members using gentle, elegant framing angles.",
    image: "https://tse2.mm.bing.net/th/id/OIP.suSq4IVjWt_Jboi68LDH6wHaLH?r=0&w=735&h=1103&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
];

export default function BabyShowerPhotographyGallery() {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([
    "candid-moments",
    "natural-lighting",
  ]);

  // Array indices representing the positions of the 4 images in the center grid
  const [imageOrder, setImageOrder] = useState<number[]>([3, 2, 1, 0]);

  // Automatically and slowly interchange positions every 4 seconds with smooth animation
  useEffect(() => {
    const interval = setInterval(() => {
      setImageOrder((prev) => [prev[3], prev[0], prev[1], prev[2]]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const toggleStyle = (id: string) => {
    if (selectedStyles.includes(id)) {
      setSelectedStyles(selectedStyles.filter((item) => item !== id));
    } else {
      setSelectedStyles([...selectedStyles, id]);
    }
  };

  const centerImages = [
    {
      id: "portraits-poses",
      alt: "Portraits & Poses",
      img: "https://tse2.mm.bing.net/th/id/OIP.suSq4IVjWt_Jboi68LDH6wHaLH?r=0&w=735&h=1103&rs=1&pid=ImgDetMain&o=7&rm=3",
      height: "h-64",
      translate: "-translate-y-4",
    },
    {
      id: "details-decor",
      alt: "Details & Decor",
      img: "https://i.pinimg.com/originals/59/1c/6e/591c6e35923012350907909ab8d8b5e6.jpg",
      height: "h-52",
      translate: "translate-y-4",
    },
    {
      id: "natural-lighting",
      alt: "Natural Lighting",
      img: "https://i.pinimg.com/736x/d9/b0/45/d9b0457c731fa0cb1bc0d55f37934644.jpg",
      height: "h-52",
      translate: "-translate-y-4",
    },
    {
      id: "candid-moments",
      alt: "Candid Moments",
      img: "https://tse2.mm.bing.net/th/id/OIP.FPyFYeVfaq4MmxY2jLVxFAHaLG?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      height: "h-64",
      translate: "translate-y-4",
    },
  ];

  return (
    <>
      <section className="relative w-full bg-transparent text-[#C89B7B] flex flex-col justify-between py-12 px-6 lg:px-16 overflow-hidden">
        {/* Top Header info */}
        <div className="max-w-7xl w-full mx-auto flex justify-between items-center mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C89B7B] font-bold">
              Baby Shower Photography Guide
            </span>
            <h2 className="text-2xl lg:text-3xl font-serif font-bold text-[#C89B7B]">
              How to Capture Beautiful Memories
            </h2>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
          {/* Left Side: Photography Style 1 & Style 3 */}
          <div className="lg:col-span-4 flex flex-col gap-12">
            {/* Style 1: Candid Moments */}
            <div
              onClick={() => toggleStyle("candid-moments")}
              className="cursor-pointer transition-all p-4 rounded-2xl relative"
            >
              <h3 className="text-lg font-bold text-[#C89B7B] tracking-tight mb-2">
                CANDID MOMENTS
              </h3>
              <p className="text-xs text-[#C89B7B] leading-relaxed">
                Capture genuine reactions, laughter, and emotional embraces between the parents-to-be and guests without staged posing.
              </p>
            </div>

            {/* Style 3: Details & Decor */}
            <div
              onClick={() => toggleStyle("details-decor")}
              className="cursor-pointer transition-all p-4 rounded-2xl relative"
            >
              <h3 className="text-lg font-bold text-[#C89B7B] tracking-tight mb-2">
                DETAILS & DECOR
              </h3>
              <p className="text-xs text-[#C89B7B] leading-relaxed">
                Focus close-up shots on delicate nursery themes, custom cakes, gifts, table settings, and small commemorative details.
              </p>
            </div>
          </div>

          {/* Center Images Collage Grid with Slow Smooth Interchange Animation */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4 h-[480px] items-center">
            {imageOrder.map((itemIdx) => {
              const item = centerImages[itemIdx];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleStyle(item.id)}
                  className={`relative ${item.height} rounded-3xl overflow-hidden shadow-lg cursor-pointer transform ${item.translate} transition-all duration-1000 ease-in-out hover:scale-[1.02]`}
                >
                  <img
                    src={item.img}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-opacity duration-1000"
                  />
                </div>
              );
            })}
          </div>

          {/* Right Side: Photography Style 2 & Style 4 */}
          <div className="lg:col-span-4 flex flex-col gap-12">
            {/* Style 2: Natural Lighting */}
            <div
              onClick={() => toggleStyle("natural-lighting")}
              className="cursor-pointer transition-all p-4 rounded-2xl relative"
            >
              <h3 className="text-lg font-bold text-[#C89B7B] tracking-tight mb-2">
                NATURAL LIGHTING
              </h3>
              <p className="text-xs text-[#C89B7B] leading-relaxed">
                Utilize soft, diffused natural daylight near large windows or outdoor garden spaces to create warm, glowing portraits.
              </p>
            </div>

            {/* Style 4: Portraits & Poses */}
            <div
              onClick={() => toggleStyle("portraits-poses")}
              className={`cursor-pointer transition-all p-4 rounded-2xl relative ${
                selectedStyles.includes("portraits-poses")
                  ? "bg-[#C89B7B]/20 border border-[#C89B7B]"
                  : "border border-transparent hover:bg-neutral-900"
              }`}
            >
              <h3 className="text-lg font-bold text-[#C89B7B] tracking-tight mb-2">
                PORTRAITS & POSES
              </h3>
              <p className="text-xs text-[#C89B7B] leading-relaxed">
                Take artistic belly bump portraits and group photos with close family members using gentle, elegant framing angles.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}