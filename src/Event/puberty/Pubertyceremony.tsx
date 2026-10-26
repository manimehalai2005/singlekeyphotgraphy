/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { usePuberty } from "@/src/context/PubertyContext";

export default function PubertyCeremonyVisionBoard() {
  const { pubertyCards } = usePuberty();
  const [cardOrder, setCardOrder] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7]);
  const [isSwapping, setIsSwapping] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setIsSwapping(true);
      setTimeout(() => {
        setCardOrder((prev) => [
          prev[4],
          prev[5],
          prev[6],
          prev[7],
          prev[0],
          prev[1],
          prev[2],
          prev[3],
        ]);
        setIsSwapping(false);
      }, 700);
    }, 4500);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-transparent text-white flex flex-col justify-center items-center px-4 sm:px-8 py-20 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="my-6 text-center z-20"
        >
          <h2 className="text-orange-300 font-bold font-sans italic text-2xl text-center">
            Puberty ceremony
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-xs uppercase tracking-[0.3em] text-[#c89B7B] mt-2"
          >
            Celebrating Sacred Milestones & Blessings
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mt-4">
          {cardOrder.map((index, slot) => {
            const card = pubertyCards[index];
            return (
              <div
                key={slot}
                className={`text-neutral-900 p-2 pb-6 shadow-xl transform ${card.rotation} hover:rotate-0 transition-all duration-700 ease-in-out ${
                  isSwapping ? "scale-90 opacity-20 rotate-3 translate-x-4" : "scale-100 opacity-100 translate-x-0"
                }`}
                style={{
                  transitionDelay: `${slot * 0.05}s`,
                }}
              >
                <div
                  className={`w-full h-36 sm:h-44 overflow-hidden bg-neutral-200 rounded-sm ${
                    isVisible ? "animate-partReveal" : "opacity-0"
                  }`}
                  style={{
                    animationDelay: `${slot * 0.15}s`,
                  }}
                >
                  <img
                    src={card.src}
                    alt={`Puberty ceremony moment ${index + 1}`}
                    className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes partReveal {
          0% {
            clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%);
            opacity: 0;
            transform: scale(0.9);
          }
          50% {
            clip-path: polygon(0% 20%, 100% 0%, 80% 100%, 0% 80%);
            opacity: 0.7;
          }
          100% {
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-partReveal {
          animation: partReveal 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
      `}</style>
    </section>
  );
}