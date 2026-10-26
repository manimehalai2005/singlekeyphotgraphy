'use client';

import React, { useEffect } from "react";
import { ArrowRight, Heart, Sparkles, Eye } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function FeaturedStoriesSection() {
  const items = [
    {
      id: 1,
      title: "Rahul & Priya",
      category: "Couple / Event",
      story: "A breathtaking traditional celebration filled with vibrant colors and eternal vows.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC-y6yL6q5BKZg9VydGx3BkcQlZWB5v5-61bF0JfsHtA&s=10",
    },
    {
      id: 2,
      title: "The Golden Hour Vows",
      category: "Short Story",
      story: "An intimate beachside exchange of rings under a glowing sunset horizon.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO3rLK3mlMyuNnW5DHjP1borIa6S6RD9LsONwFMtBMrCwdbjHbRapb1uI&s=10",
    },
    {
      id: 3,
      title: "Royal Palace Reception",
      category: "Couple / Event",
      story: "Majestic architecture paired with timeless elegance and joyful moments.",
      image: "https://i.pinimg.com/736x/23/72/68/2372680876979fd7b634051233958ec2.jpg",
    },
    {
      id: 4,
      title: "Traditional Heritage",
      category: "Short Story",
      story: "Capturing intricate bridal jewelry and rich cultural nuances close-up.",
      image: "https://images.pexels.com/photos/38633696/pexels-photo-38633696/free-photo-of-traditional-indian-bridal-jewelry-and-henna.jpeg?cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 5,
      title: "Aditya & Sneha",
      category: "Couple / Event",
      story: "A joyous sangeet night filled with explosive dance performances and smiles.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTsCgslbsSk7Rf6zMJ6Pk8yMuvXP6yqPkum8K1oU9dBuIMizBZdkqJRw4&s=10",
    },
    {
      id: 6,
      title: "Whispers of Love",
      category: "Short Story",
      story: "Candid pre-wedding cinematic moments shot in the misty hills.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaJ7-4tQxBSUcMhTqmpN5RmcVGE5pqdV88YQ_Sio1Q8_uyFJm49BMjtl8&s=10",
    },
  ];

  const rotation = useMotionValue(0);

  const smoothRotation = useSpring(rotation, {
    damping: 40,
    stiffness: 80,
    mass: 1,
  });

  // FAST ROTATION
  useEffect(() => {
    let frame: number;
    let last = performance.now();
    const speed = 0.25;

    const animate = (time: number) => {
      const delta = time - last;
      last = time;
      rotation.set(rotation.get() + speed * (delta / 16.67));
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [rotation]);

  return (
    <section className="bg-transparent text-[#C89B7B] font-sans w-full py-12 px-4 sm:px-8 lg:px-16 overflow-hidden flex items-center">
      <div className="w-full sm:mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
{/* right */}
         <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center text-center lg:text-left"
        >
          <span className="text-xs font-bold tracking-widest text-[#C89B7B] uppercase mb-3">
            BEHIND THE LENS
          </span>
          
          <h2 className="text-2xl md:text-5xl font-sans italic text-[#C89B7B] font-black tracking-tight leading-tight mb-6">
            Every Moment Has a Story. <br />
          </h2>
          <p className="text-sm md:text-base text-[#C89B7B] leading-relaxed mb-6 font-medium font-sans italic text-center lg:text-left max-w-sm lg:max-w-none mx-auto lg:mx-0 px-4 sm:px-0">
  At SingleKey Photography, we believe that the most beautiful memories are found in genuine emotions and unforgettable moments. From the excitement of a wedding day to the quiet connection between two people, we capture every moment with creativity, care, and attention to detail.
</p>
        </motion.div>
        {/* 3D Rotating Carousel for both Mobile and Desktop (Centered & Scaled for Mobile) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative flex h-[320px] sm:h-[550px] w-full items-center justify-center [perspective:1400px] mx-auto scale-90 sm:scale-100"
        >
          <motion.div
            className="relative flex h-full w-full items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {items.map((item, index) => {
              const angle = index * (360 / items.length);

              const itemRotation = useTransform(
                smoothRotation,
                (r) => r + angle
              );

              // Smaller radius for mobile (180px) and standard for desktop (300px)
              const radius = 240;

              const x = useTransform(
                itemRotation,
                (r) => Math.sin((r * Math.PI) / 180) * radius
              );

              const z = useTransform(
                itemRotation,
                (r) => Math.cos((r * Math.PI) / 180) * radius
              );

              const rotateY = useTransform(itemRotation, (r) => r);

              return (
                <motion.div
                  key={item.id}
                  className="absolute h-[280px] sm:h-[340px] w-[190px] sm:w-[240px] overflow-hidden rounded-3xl border border-[#C89B7B]/20 bg-zinc-900 shadow-2xl flex flex-col justify-between"
                  initial={{ x: 0, z: 0, scale: 0.5, opacity: 0.5 }}
                  animate={{
                    x: [0, Math.sin((angle * Math.PI) / 180) * radius],
                    z: [0, Math.cos((angle * Math.PI) / 180) * radius],
                    scale: [0.5, 1],
                    opacity: [0.5, 1],
                  }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                  style={{ x, z, rotateY, transformStyle: "preserve-3d" }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      draggable={false}
                      className="pointer-events-none h-full w-full object-cover brightness-125 contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Right Side: Content & Story */}

      </div>
    </section>
  );
}