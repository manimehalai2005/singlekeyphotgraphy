"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const photographyPoints = [
  {
    id: "point-1",
    title: "Cradle & Floral Decor",
    text: "Focus on the intricate flower arrangements and traditional gold cradle setup where the newborn rests.",
    image: "https://tse1.mm.bing.net/th/id/OIP.ZdvWBrCcdc_r-DJUxUF3NQHaE8?r=0&w=1620&h=1080&rs=1&pid=ImgDetMain&o=7&rm=3",
    height: "h-[340px]",
  },
  {
    id: "point-2",
    title: "Sacred Rituals",
    text: "Capture close-up shots of elders whispering the sacred name into the baby's ear and applying kumkum.",
    image: "https://i.ytimg.com/vi/8SRYnlKWCCQ/maxresdefault.jpg",
    height: "h-[350px]",
  },
  {
    id: "point-3",
    title: "Generational Portraits",
    text: "Preserve timeless moments featuring grandparents, parents, and the newborn sharing warm emotional bonds.",
    image: "https://i.ytimg.com/vi/LWHQjPOZSQU/maxresdefault.jpg",
    height: "h-[280px]",
  },
  {
    id: "point-4",
    title: "Festive Ambiance",
    text: "Frame the joyful celebrations, traditional feasts, brass oil lamps, and glowing familial smiles.",
    image: "https://phometo.com/images/gallery/NamingCeremony/13.jpg",
    height: "h-[360px]",
  },
];

export default function NamingCeremonyGallery() {
  const [photoOrder, setPhotoOrder] = useState<number[]>([0, 1, 2, 3]);

  // Photo Swap Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setPhotoOrder((prev) => [prev[3], prev[0], prev[1], prev[2]]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full bg-transparent text-[#C89B7B] py-16 px-6 lg:px-20 overflow-hidden font-serif">
      
      {/* Top Header */}
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-16 pb-6">
        <div className="w-16 h-[1px] bg-[#C89B7B]/40 hidden sm:block"></div>
        <h1 className="text-3xl lg:text-5xl font-light tracking-widest text-center text-[#C89B7B] uppercase">
          Naming Ceremony Photography
        </h1>
        <div className="w-16 h-[1px] bg-[#C89B7B]/40 hidden sm:block"></div>
      </div>

      {/* Main Editorial Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
        
        {/* Column 1 (Left): Swapping Photo 1 + List of all 4 Texts */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-4 flex flex-col gap-10"
        >
          
          {/* Swapping Photo Div 1 */}
          <div className={`relative w-full ${photographyPoints[photoOrder[0]].height} rounded-lg overflow-hidden transition-all duration-1000 ease-in-out`}>
            <img
              src={photographyPoints[photoOrder[0]].image}
              alt="Naming Ceremony Photography 1"
              className="w-full h-full object-cover hover:grayscale-0 transition-all duration-700"
            />
          </div>

          {/* All 4 Text Items Listed Here */}
          <div className="flex flex-col gap-6">
            <h3 className="italic text-2xl font-normal text-[#C89B7B] tracking-wide">
              photography highlights
            </h3>
            <ul className="flex flex-col gap-4 text-sm text-[#C89B7B] font-sans leading-relaxed">
              {photographyPoints.map((point) => (
                <li key={point.id} className="flex flex-col gap-1 border-l-2 border-[#C89B7B] pl-3">
                  <span className="text-[#C89B7B] font-serif font-bold uppercase tracking-wide text-xs">
                    {point.title}
                  </span>
                  <span className="text-[#C89B7B]">{point.text}</span>
                </li>
              ))}
            </ul>
          </div>

        </motion.div>

        {/* Column 2 (Middle): Swapping Photo 2 & Swapping Photo 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-4 flex flex-col gap-10"
        >
          
          <div className="flex flex-col gap-4">
            <div className={`relative w-full ${photographyPoints[photoOrder[1]].height} mt-20 mx-auto rounded-lg overflow-hidden transition-all duration-1000 ease-in-out`}>
              <img
                src={photographyPoints[photoOrder[1]].image}
                alt="Naming Ceremony Photography 2"
                className="w-full h-full object-cover hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <p className="text-xs font-sans text-[#C89B7B] tracking-wide text-center">
              Capturing authentic ritual moments with natural lighting.
            </p>
          </div>

          {/* Swapping Photo Div 3 */}
          <div className={`relative w-full ${photographyPoints[photoOrder[2]].height} rounded-lg overflow-hidden transition-all duration-1000 ease-in-out`}>
            <img
              src={photographyPoints[photoOrder[2]].image}
              alt="Naming Ceremony Photography 3"
              className="w-full h-full object-cover hover:grayscale-0 transition-all duration-700"
            />
          </div>

        </motion.div>

        {/* Column 3 (Right): Swapping Photo Div 4 + Paragraphs */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="lg:col-span-4 flex flex-col gap-10"
        >
          
          {/* Swapping Photo Div 4 */}
          <div className={`relative w-full ${photographyPoints[photoOrder[3]].height} rounded-lg overflow-hidden transition-all duration-1000 ease-in-out`}>
            <img
              src={photographyPoints[photoOrder[3]].image}
              alt="Naming Ceremony Photography 4"
              className="w-full h-full object-cover hover:grayscale-0 transition-all duration-700"
            />
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="italic text-2xl font-normal text-[#C89B7B] tracking-wide">
              timeless memories
            </h3>
            
            <p className="text-sm text-[#C89B7B] font-sans leading-relaxed">
              Every single frame is thoughtfully curated to preserve the warmth, traditions, and emotional essence of your child's sacred naming ceremony for generations to come.
            </p>
            
            <p className="text-sm text-[#C89B7B] font-sans leading-relaxed">
              From the delicate first whispers of the ancestral name to the joyous gathering of loved ones, we document the unspoken love woven into every traditional ritual.
            </p>
            
            <p className="text-sm text-[#C89B7B] font-sans leading-relaxed">
              Let us turn your family's treasured milestones into cinematic stories filled with heritage, cultural depth, and heartfelt emotion that you can relive forever.
            </p>
          </div>

        </motion.div>

      </div>


    </section>
  );
}