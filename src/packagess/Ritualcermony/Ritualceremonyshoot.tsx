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
    id: "pal kudam",
    name: "Paal Kudam & Sacred Offering",
    description: "Devotional capture of devotees carrying milk pots in procession with absolute grace and faith.",
  },
  {
    id: "kovil-festival",
    name: "Kovil Thiruvizha & Chariot Fest",
    description: "Cinematic documentation of grand temple festivities, decorated chariots, and vibrant local crowds.",
  },
  {
    id: "urathu-thiruvizha",
    name: "Village Festival & Cultural Aradhana",
    description: "Comprehensive coverage of traditional folk arts, street processions, and community celebrations.",
  },
  {
    id: "agni-chatti",
    name: "Agni Chatti & Special Vow Rituals",
    description: "Capturing powerful spiritual moments, sacred fire pots, and deep devotional fervor.",
  },
  {
    id: "traditional-street",
    name: "Temple Street Procession Story",
    description: "Stylized storytelling portraiture of ancient temple rituals, oil lamps, and divine ambiance.",
  },
];

export default function RitualCeremonyShoot() {
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

    let messageText = "Hello SingleKey Photography!\n\nI would like to inquire about booking the following Temple Festival & Ritual package(s):\n";

    if (selectedEvents.length > 0) {
      selectedEvents.forEach((pkg, index) => {
        messageText += `\n${index + 1}. ${pkg}`;
      });
    } else {
      messageText += "\n- General Temple Festival & Ritual Packages";
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
            Temple Festival & Ritual Packages
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

          {/* Card 1: Paal Kudam & Sacred Offering */}
          <div className="relative w-full h-72 md:h-80 [perspective:1000px] group">
            <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl shadow-md">
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl overflow-hidden">
                <img
                  src="https://www.mylaporetimes.com/wp-content/uploads/2017/04/108-pal-kudam.jpg"
                  alt="Paal Kudam ritual moment"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-[#C89B7B] font-serif text-lg font-bold">Paal Kudam & Sacred Offering</h4>
                </div>
              </div>
              <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-2xl overflow-hidden border border-[#C89B7B]/40">
                <img
                  src="https://www.mylaporetimes.com/wp-content/uploads/2017/04/108-pal-kudam.jpg"
                  alt="Paal Kudam Back visual"
                  className="w-full h-full object-cover brightness-50 blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/75 p-6 flex flex-col justify-center items-center text-center">
                  <span className="text-[#C89B7B] text-xs font-bold uppercase tracking-wider mb-2">Devotional Package</span>
                  <h3 className="text-2xl font-serif font-bold mb-3 text-[#C89B7B]">Paal Kudam & Sacred Offering</h3>
                  <p className="text-[#C89B7B] font-light text-xs leading-relaxed">Devotional capture of devotees carrying milk pots in procession with absolute grace and faith.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Kovil Thiruvizha & Chariot Fest */}
          <div className="relative w-full h-72 md:h-80 [perspective:1000px] group">
            <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl shadow-md">
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl overflow-hidden">
                <img
                  src="https://www.tirumala.org/ALBUMS/Srivari%20Navarathri%20Brahmotsavam%202015%20%E2%80%93%20CHINNA%20SESHA%20VAHANAM/CHINNASESHA-VAHANAM1-copy.jpg"
                  alt="Kovil Thiruvizha festival"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-[#C89B7B] font-serif text-lg font-bold">Kovil Thiruvizha & Chariot Fest</h4>
                </div>
              </div>
              <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-2xl overflow-hidden border border-[#C89B7B]/40">
                <img
                  src="https://www.tirumala.org/ALBUMS/Srivari%20Navarathri%20Brahmotsavam%202015%20%E2%80%93%20CHINNA%20SESHA%20VAHANAM/CHINNASESHA-VAHANAM1-copy.jpg"
                  alt="Kovil Festival Back visual"
                  className="w-full h-full object-cover brightness-50 blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/75 p-6 flex flex-col justify-center items-center text-center">
                  <span className="text-[#C89B7B] text-xs font-bold uppercase tracking-wider mb-2">Festival Package</span>
                  <h3 className="text-2xl font-serif font-bold mb-3 text-[#C89B7B]">Kovil Thiruvizha & Chariot Fest</h3>
                  <p className="text-[#C89B7B] font-light text-xs leading-relaxed">Cinematic documentation of grand temple festivities, decorated chariots, and vibrant local crowds.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Village Festival & Cultural Aradhana */}
          <div className="relative w-full h-56 [perspective:1000px] group">
            <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl shadow-md">
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl overflow-hidden">
                <img
                  src="https://i.ytimg.com/vi/hrNywltnCWY/maxresdefault.jpg"
                  alt="Village festival cultural aradhana"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-[#C89B7B] font-serif text-lg font-bold">Village Festival & Cultural Aradhana</h4>
                </div>
              </div>
              <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-2xl overflow-hidden border border-[#C89B7B]/40">
                <img
                  src="https://i.ytimg.com/vi/hrNywltnCWY/maxresdefault.jpg"
                  alt="Village Festival Back visual"
                  className="w-full h-full object-cover brightness-50 blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/75 p-6 flex flex-col justify-center items-center text-center">
                  <span className="text-[#C89B7B] text-xs font-bold uppercase tracking-wider mb-2">Uru Thiruvizha Package</span>
                  <h3 className="text-xl font-serif font-bold mb-2 text-[#C89B7B]">Village Festival & Cultural Aradhana</h3>
                  <p className="text-[#C89B7B] font-light text-xs leading-relaxed">Comprehensive coverage of traditional folk arts, street processions, and community celebrations.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Agni Chatti & Special Vow Rituals */}
          <div className="relative w-full h-56 [perspective:1000px] group">
            <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl shadow-md">
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl overflow-hidden">
                <img
                  src="https://i.ytimg.com/vi/16Sqvzp3Xfo/maxresdefault.jpg"
                  alt="Agni Chatti ritual"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-[#C89B7B] font-serif text-lg font-bold">Agni Chatti & Special Vow Rituals</h4>
                </div>
              </div>
              <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-2xl overflow-hidden border border-[#C89B7B]/40">
                <img
                  src="https://i.ytimg.com/vi/16Sqvzp3Xfo/maxresdefault.jpg"
                  alt="Agni Chatti Back visual"
                  className="w-full h-full object-cover brightness-50 blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/75 p-6 flex flex-col justify-center items-center text-center">
                  <span className="text-[#C89B7B] text-xs font-bold uppercase tracking-wider mb-2">Vow Rituals Package</span>
                  <h3 className="text-xl font-serif font-bold mb-2 text-[#C89B7B]">Agni Chatti & Special Vow Rituals</h3>
                  <p className="text-[#C89B7B] font-light text-xs leading-relaxed">Capturing powerful spiritual moments, sacred fire pots, and deep devotional fervor.</p>
                </div>
              </div>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}