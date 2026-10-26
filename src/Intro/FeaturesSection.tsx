'use client';

import React from "react";
import { ArrowRight } from "lucide-react";
import CircularGallery from "./Circulargallery"; // Make sure file name casing matches (Circulargallery.tsx)

export default function FeaturedStoriesSection() {
  // Gallery items with image, text (title), and description
  const galleryItems = [
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC-y6yL6q5BKZg9VydGx3BkcQlZWB5v5-61bF0JfsHtA&s=10",
      text: "Rahul & Priya",
      description: "A gorgeous sunset wedding ceremony captured at the heart of the royal palace with vibrant traditional rituals."
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO3rLK3mlMyuNnW5DHjP1borIa6S6RD9LsONwFMtBMrCwdbjHbRapb1uI&s=10",
      text: "The Golden Hour Vows",
      description: "Intimate golden hour portraits capturing raw emotions, warm sunlight, and unforgettable romantic moments."
    },
    {
      image: "https://i.pinimg.com/736x/23/72/68/2372680876979fd7b634051233958ec2.jpg",
      text: "Royal Palace Reception",
      description: "Grand celebrations filled with majestic lighting, royal decor, and joyful celebrations with family and friends."
    },
    {
      image: "https://images.pexels.com/photos/38633696/pexels-photo-38633696/free-photo-of-traditional-indian-bridal-jewelry-and-henna.jpeg?cs=tinysrgb&dpr=1&w=500",
      text: "Traditional Heritage",
      description: "Detailed close-ups highlighting intricate bridal henna artwork, heirloom jewelry, and cultural elegance."
    },
  ];

  return (
    <section className="bg-transparent text-zinc-900 font-sans w-full  sm:px-8 lg:px-16 overflow-hidden flex items-center">
     
        
        {/* Left Side: Circular Gallery WebGL Component */}
        <div className="relative h-[550px] w-full">
          <CircularGallery
            items={galleryItems}
            bend={2}
            textColor="#ffffff"
            borderRadius={0.06}
            scrollSpeed={2}
            scrollEase={0.05}
            fontUrl="https://fonts.googleapis.com/css2?family=Figtree:wght@700&display=swap"
            font="bold 24px Figtree"
          />
        </div>

      
    
    </section>
  );
}