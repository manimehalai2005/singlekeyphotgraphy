"use client";

import { motion, Variants } from "framer-motion";
import InfinitePhotoSlider from "../Photogallerytemplate";
import StarfieldCursor from "@/src/StarFieldCursor";
import WeddingDriftGallery from "../Prewedd";

export default function PubertyCeremonyTemplateSection() {
  const line2 = "MANJAL NEERATTU VIZHA";
  const subText =
    "Celebrating a graceful milestone into womanhood, surrounded by family blessings, traditional rituals, and abundant love.";

  // Smooth Fade-Up Animation Variant for Text
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

  // Image Motion & Floating Animation Variants
  const bannerImageVariants: Variants = {
    hidden: { opacity: 0, x: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <>
      <StarfieldCursor />
      <section className="relative w-full bg-transparent text-white flex flex-col justify-center items-center py-20 px-6 sm:px-12 overflow-hidden">
        
        {/* Background Subtle Gradient Glow */}
        <div className="absolute inset-0 opacity-60 pointer-events-none" />

        {/* Main Container mirroring template layout */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-10">
          
          {/* Top Row: Left Content & Right Large Banner Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Side: Typography & Decorative Flower Icon */}
            <div className="lg:col-span-5 flex flex-col justify-start text-left">
              
              {/* Decorative Flower Icon */}
              <motion.div
                initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
                whileInView={{ rotate: 360, scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-4 text-[#C89B7B]"
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 17.373 12 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
                </svg>
              </motion.div>

              {/* Title with Smooth Fade-Up */}
              <div className="font-sans font-extrabold tracking-tight mb-6">
                <motion.h2
                  className="text-2xl sm:text-3xl lg:text-4xl text-[#c89B7B] leading-tight mt-1"
                  variants={fadeUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {line2}
                </motion.h2>
              </div>

              {/* Subtext with Smooth Fade-Up Animation */}
              <motion.p
                className="text-xs sm:text-sm text-[#c89B7B] font-medium leading-relaxed max-w-md"
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {subText}
              </motion.p>

            </div>

            {/* Right Side: Large Banner Image */}
            <motion.div
              className="lg:col-span-7 h-72 sm:h-96 rounded-2xl overflow-hidden shadow-2xl bg-neutral-900 border border-neutral-800 relative"
              variants={bannerImageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.img
                src="https://image.wedmegood.com/resized-nw/1300X/wp-content/uploads/2021/06/vivekkrishnanphotography-1428.jpg"
                alt="Puberty Ceremony Celebration"
                className="w-full h-full object-cover"
                animate={{
                  y: [-6, 6, -6],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

          </div>

          {/* Bottom Row: 3 Photo Grid with Moving Animations */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
            
            {/* Bottom Image 1 */}
            <motion.div
              className="h-56 sm:h-64 rounded-xl overflow-hidden shadow-lg bg-neutral-900 border border-neutral-800"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <motion.img
                src="https://i.pinimg.com/736x/4f/81/18/4f81185f7c2f1b642909b5811d3599ca.jpg"
                alt="Traditional Rituals"
                className="w-full h-full object-cover"
                animate={{
                  y: [-5, 5, -5],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
              />
            </motion.div>

            {/* Bottom Image 2 */}
            <motion.div
              className="h-56 sm:h-64 rounded-xl overflow-hidden shadow-lg bg-neutral-900 border border-neutral-800"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <motion.img
                src="https://tse4.mm.bing.net/th/id/OIP.Nqh_sZJxVixhE2yH942hywHaJW?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="Family Blessings"
                className="w-full h-full object-cover"
                animate={{
                  y: [5, -5, 5],
                }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4,
                }}
              />
            </motion.div>

            {/* Bottom Image 3 */}
            <motion.div
              className="h-56 sm:h-64 rounded-xl overflow-hidden shadow-lg bg-neutral-900 border border-neutral-800"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.img
                src="https://sidphoto.in/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-23-at-15.46.39-18.jpeg"
                alt="Joyful Celebration"
                className="w-full h-full object-cover"
                animate={{
                  y: [-6, 6, -6],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
              />
            </motion.div>

          </div>

        </div>
      </section>
      <WeddingDriftGallery />
    </>
  );
}