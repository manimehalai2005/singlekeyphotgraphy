"use client";

import EarPiercingGallery from "@/src/packagess/EarPiercingCermony/EarpiercingGallery";
import { motion, Variants } from "framer-motion";
import InfinitePhotoSlider from "../Photogallerytemplate";
import StarfieldCursor from "@/src/StarFieldCursor";
import WeddingDriftGallery from "../Prewedd";

export default function EarPiercingCeremonySection() {
  const headingText = "Ear Piercing Ceremony";

  // Smooth Fade-Up Animation Variant for Sections/Headings
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

  return (
    <>
      
      <section className="relative w-full bg-transparent text-white flex flex-col justify-center items-center overflow-hidden py-16 px-4">
        {/* Main Container Layout */}
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-10">
          
          {/* Left Side: Title & Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 text-left flex flex-col justify-center"
          >
            <span className="text-xs sm:text-sm uppercase tracking-[0.4em] font-bold text-[#C89B7B] block mb-2">
              Traditional Milestone
            </span>

            {/* Heading with Smooth Fade-Up Animation */}
            <motion.h2
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="italic font-bold text-4xl sm:text-5xl lg:text-4xl text-[#C89B7B] tracking-wide mb-6 leading-tight"
            >
              {headingText}
            </motion.h2>

            <p className="text-sm sm:text-base text-[#c89B7B] font-medium leading-relaxed mb-4">
              A cherished sacred tradition marking an auspicious milestone in our child's life. Surrounded by family prayers, joyful celebrations, and abundant blessings.
            </p>

           
           

          </motion.div>

          {/* Right Side: 3-Image Collage Layout with Framer Motion */}
          <div className="lg:col-span-6 relative flex flex-col gap-4 items-end">
            
            {/* Top Right Photo */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full sm:w-[420px] h-48 sm:h-56 overflow-hidden rounded-lg shadow-xl"
            >
              <img
                src="https://3.bp.blogspot.com/-UbVLLm_3vOY/Va4fv1PjiBI/AAAAAAAASWI/WvBWGwGZLRQ/s1600/DSC_0323.JPG"
                alt="Traditional Family Gathering"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            {/* Bottom Row: Two Photos side-by-side */}
            <div className="w-full flex flex-col sm:flex-row gap-4 justify-end">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="w-full sm:w-[200px] h-48 overflow-hidden rounded-lg shadow-xl"
              >
                <img
                  src="https://i.pinimg.com/originals/58/7b/36/587b36522e2c9a11981a44b12187b492.jpg"
                  alt="Baby Celebration Moments"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="w-full sm:w-[200px] h-48 overflow-hidden rounded-lg shadow-xl"
              >
                <img
                  src="https://th.bing.com/th/id/R.ba75e18b19775501a8f6ce0b18dff1bd?rik=9%2bpL4%2fdexgNV0w&riu=http%3a%2f%2fwww.sensephotoz.com%2fblog%2fwp-content%2fuploads%2f2010%2f05%2f40.jpg&ehk=9GAxIn%2fSDpL8Cm9xrdFlWsQCzbo69hK3E18zwgiObgw%3d&risl=&pid=ImgRaw&r=0"
                  alt="Ceremony Blessings"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            </div>

          </div>

        </div>

      </section>

      <EarPiercingGallery />
      <WeddingDriftGallery />
    </>
  );
}