"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface PortraitEvent {
  id: string;
  name: string;
  description: string;
}

const eventsList: PortraitEvent[] = [
  {
    id: "half-saree-ceremony",
    name: "Half Saree & Pattu Pavadai Ritual",
    description: "Capturing the grace of traditional silk attire draping, sacred jewelry blessings, and family customs.",
  },
  {
    id: "mature-portrait-session",
    name: "Puberty Portrait & Family Session",
    description: "Elegant and timeless portraiture celebrating this milestone with close family and elders.",
  },
  {
    id: "traditional-blessings-customs",
    name: "Traditional Blessings & Manjal Neerattu",
    description: "Cinematic documentation of sacred turmeric bath rituals, relative greetings, and joyous celebrations.",
  },
  {
    id: "grand-puberty-story",
    name: "Grand Puberty Celebration Story",
    description: "Complete cinematic coverage from morning traditional arrangements to evening grand stage reception.",
  },
];

export default function PuberityCeremonyShoot() {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  // Toggle package selection
  const handleCheckboxChange = (eventName: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventName)
        ? prev.filter((item) => item !== eventName)
        : [...prev, eventName]
    );
  };

  // Construct message with selected packages and redirect to WhatsApp
  const handleWhatsAppClick = () => {
    const phoneNumber = "919876543210"; // உங்களுடைய WhatsApp எண்ணை (Country Code உடன்) இங்கு மாற்றுங்கள்

    let messageText = "Hello SingleKey Photography!\n\nI would like to inquire about booking the following Puberty Ceremony package(s):\n";

    if (selectedEvents.length > 0) {
      selectedEvents.forEach((pkg, index) => {
        messageText += `\n${index + 1}. ${pkg}`;
      });
    } else {
      messageText += "\n- General Puberty Ceremony Packages";
    }

    messageText += "\n\nPlease share availability, pricing, and package details.";

    const encodedMessage = encodeURIComponent(messageText);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <section className="relative w-full min-h-screen bg-transparent text-[#C89B7B] flex flex-col items-center justify-center py-16 px-6 lg:px-16 overflow-hidden">
      {/* Container matching split layout */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Heading, Description & Interactive Options */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-5 flex flex-col justify-center"
        >
          <span className="text-xs uppercase tracking-widest text-[#C89B7B] font-bold mb-6">
            Puberty Ceremony Packages
          </span>
       
          {/* Event List with Clickable Checkbox Cards */}
          <div className="flex flex-col gap-3 mb-8">
            {eventsList.map((event, index) => {
              const isChecked = selectedEvents.includes(event.name);
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  onClick={() => handleCheckboxChange(event.name)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                    isChecked
                      ? "border-[#C89B7B] bg-neutral-900/90 shadow-lg shadow-[#C89B7B]/15"
                      : "border-neutral-800 bg-neutral-900/60 hover:border-[#C89B7B]/50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleCheckboxChange(event.name);
                    }}
                    className="mt-1 w-4 h-4 accent-[#C89B7B] cursor-pointer"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#C89B7B]">{event.name}</h4>
                    <p className="text-xs text-[#C89B7B]/80 mt-0.5">{event.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* WhatsApp Direct Action Button */}
          <div>
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-[#C89B7B] hover:bg-[#b58867] text-black font-bold text-sm px-8 py-3.5 rounded-full shadow-lg transition-transform active:scale-95 cursor-pointer text-center flex items-center justify-center gap-2"
            >
              Book via WhatsApp {selectedEvents.length > 0 ? `(${selectedEvents.length} Selected)` : ""}
            </button>
          </div>
        </motion.div>

        {/* Right Column: Balanced Photo Collage Grid with Flip Cards */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4"
        >

          {/* Card 1: Half Saree & Pattu Pavadai Ritual */}
          <div className="relative w-full h-72 md:h-80 [perspective:1000px] group">
            <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl shadow-md">
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl overflow-hidden">
                <img
                  src="https://tse4.mm.bing.net/th/id/OIP.SzqVBxGS4vV0MLtRsTbmGgHaNK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
                  alt="Half Saree ceremony moment"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-[#C89B7B] font-serif text-lg font-bold">Half Saree & Pattu Pavadai Ritual</h4>
                </div>
              </div>
              <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-2xl overflow-hidden border border-[#C89B7B]/40">
                <img
                  src="https://tse4.mm.bing.net/th/id/OIP.SzqVBxGS4vV0MLtRsTbmGgHaNK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
                  alt="Half Saree Back visual"
                  className="w-full h-full object-cover brightness-50 blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/75 p-6 flex flex-col justify-center items-center text-center">
                  <span className="text-[#C89B7B] text-xs font-bold uppercase tracking-wider mb-2">Half Saree Package</span>
                  <h3 className="text-2xl font-serif font-bold mb-3 text-[#C89B7B]">Half Saree & Pattu Pavadai Ritual</h3>
                  <p className="text-[#C89B7B] font-light text-xs leading-relaxed">Capturing the grace of traditional silk attire draping, sacred jewelry blessings, and family customs.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Puberty Portrait & Family Session */}
          <div className="relative w-full h-72 md:h-80 [perspective:1000px] group">
            <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl shadow-md">
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl overflow-hidden">
                <img
                  src="https://live.staticflickr.com/1177/1397474014_c59638a94f_b.jpg"
                  alt="Puberty portrait session"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-[#C89B7B] font-serif text-lg font-bold">Puberty Portrait & Family Session</h4>
                </div>
              </div>
              <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-2xl overflow-hidden border border-[#C89B7B]/40">
                <img
                  src="https://live.staticflickr.com/1177/1397474014_c59638a94f_b.jpg"
                  alt="Portrait Back visual"
                  className="w-full h-full object-cover brightness-50 blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/75 p-6 flex flex-col justify-center items-center text-center">
                  <span className="text-[#C89B7B] text-xs font-bold uppercase tracking-wider mb-2">Portrait Package</span>
                  <h3 className="text-2xl font-serif font-bold mb-3 text-[#C89B7B]">Puberty Portrait & Family Session</h3>
                  <p className="text-[#C89B7B] font-light text-xs leading-relaxed">Elegant and timeless portraiture celebrating this milestone with close family and elders.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Traditional Blessings & Manjal Neerattu */}
          <div className="relative w-full h-56 [perspective:1000px] group">
            <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl shadow-md">
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl overflow-hidden">
                <img
                  src="https://camouflageclicks.com/assets/uploads/blog/7197561.jpg"
                  alt="Manjal Neerattu ritual"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-[#C89B7B] font-serif text-lg font-bold">Traditional Blessings & Manjal Neerattu</h4>
                </div>
              </div>
              <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-2xl overflow-hidden border border-[#C89B7B]/40">
                <img
                  src="https://camouflageclicks.com/assets/uploads/blog/7197561.jpg"
                  alt="Blessings Back visual"
                  className="w-full h-full object-cover brightness-50 blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/75 p-6 flex flex-col justify-center items-center text-center">
                  <span className="text-[#C89B7B] text-xs font-bold uppercase tracking-wider mb-2">Rituals Package</span>
                  <h3 className="text-xl font-serif font-bold mb-2 text-[#C89B7B]">Traditional Blessings & Manjal Neerattu</h3>
                  <p className="text-[#C89B7B] font-light text-xs leading-relaxed">Cinematic documentation of sacred turmeric bath rituals, relative greetings, and joyous celebrations.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Grand Puberty Celebration Story */}
          <div className="relative w-full h-56 [perspective:1000px] group">
            <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl shadow-md">
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl overflow-hidden">
                <img
                  src="https://i.ytimg.com/vi/8nmUL2QdgRw/oar2.jpg?sqp=-oaymwEkCJUDENAFSFqQAgHyq4qpAxMIARUAAAAAJQAAyEI9AICiQ3gB&rs=AOn4CLCWYtRtxuxlI0DvC90L9blAhTQ4qA&usqp=CCk"
                  alt="Grand puberty celebration"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-[#C89B7B] font-serif text-lg font-bold">Grand Puberty Celebration Story</h4>
                </div>
              </div>
              <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-2xl overflow-hidden border border-[#C89B7B]/40">
                <img
                  src="https://i.ytimg.com/vi/8nmUL2QdgRw/oar2.jpg?sqp=-oaymwEkCJUDENAFSFqQAgHyq4qpAxMIARUAAAAAJQAAyEI9AICiQ3gB&rs=AOn4CLCWYtRtxuxlI0DvC90L9blAhTQ4qA&usqp=CCk"
                  alt="Grand Celebration Back visual"
                  className="w-full h-full object-cover brightness-50 blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/75 p-6 flex flex-col justify-center items-center text-center">
                  <span className="text-[#C89B7B] text-xs font-bold uppercase tracking-wider mb-2">Grand Package</span>
                  <h3 className="text-xl font-serif font-bold mb-2 text-[#C89B7B]">Grand Puberty Celebration Story</h3>
                  <p className="text-[#C89B7B] font-light text-xs leading-relaxed">Complete cinematic coverage from morning traditional arrangements to evening grand stage reception.</p>
                </div>
              </div>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}