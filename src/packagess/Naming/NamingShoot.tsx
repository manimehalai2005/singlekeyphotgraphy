"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface PortraitEvent {
  id: string;
  name: string;
  description: string;
}

const eventsList: PortraitEvent[] = [
  {
    id: "cradle-ceremony",
    name: "Cradle Ceremony & Ritual Coverage",
    description: "Candid and emotional moments of placing the baby in the traditional decorated cradle.",
  },
  {
    id: "baby-portrait",
    name: "Baby Portrait & Family Session",
    description: "Adorable portraiture capturing the newborn and joyful family members.",
  },
  {
    id: "traditional-blessings",
    name: "Traditional Blessings & Custom Rituals",
    description: "Cinematic documentation of sacred naming rituals, family prayers, and customs.",
  },
  {
    id: "grand-naming-story",
    name: "Grand Naming Ceremony Story",
    description: "Complete cinematic coverage from morning preparations to grand celebration and guests.",
  },
  {
    id: "outdoor-baby-shoot",
    name: "Outdoor Cinematic Location Shoot",
    description: "Stylized storytelling portraiture shot at a scenic outdoor garden or studio location.",
  },
];

export default function NamingCeremonyShoot() {
  // State to track selected package IDs
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  // Toggle package selection
  const handleToggleEvent = (id: string) => {
    setSelectedEvents((prev) =>
      prev.includes(id) ? prev.filter((eventId) => eventId !== id) : [...prev, id]
    );
  };

  // Replace with your business WhatsApp phone number (with country code, without + or spaces)
  const phoneNumber = "919876543210";

  // Redirect to WhatsApp with pre-filled text
  const handleWhatsAppRedirect = () => {
    const selectedItems = eventsList.filter((event) => selectedEvents.includes(event.id));

    if (selectedItems.length === 0) {
      alert("Please select at least one package to inquire on WhatsApp.");
      return;
    }

    let message = "Hello! I would like to inquire about booking the following Naming Ceremony package(s):\n\n";
    selectedItems.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n   _${item.description}_\n\n`;
    });

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="relative w-full min-h-screen bg-transparent text-[#C89B7B] flex flex-col items-center justify-center py-16 px-6 lg:px-16 overflow-hidden">
      {/* Container matching split layout */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Heading, Interactive Checkbox Options & Selected Summary */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-5 flex flex-col justify-center"
        >
          <span className="text-xs uppercase tracking-widest text-[#C89B7B] font-bold mb-2">
            Naming Ceremony Packages
          </span>
         
          {/* Interactive Event List with Checkboxes */}
          <div className="flex flex-col gap-3 mb-6">
            {eventsList.map((event, index) => {
              const isChecked = selectedEvents.includes(event.id);
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  onClick={() => handleToggleEvent(event.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                    isChecked
                      ? "border-[#C89B7B] bg-[#C89B7B]/10"
                      : "border-neutral-800 bg-neutral-900/60 hover:border-[#C89B7B]/50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}} // Controlled via outer div click
                    className="mt-1 h-4 w-4 rounded border-neutral-700 text-[#C89B7B] focus:ring-[#C89B7B] accent-[#C89B7B] cursor-pointer"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#C89B7B]">{event.name}</h4>
                    <p className="text-xs font-medium text-[#C89B7B]/80 mt-0.5">{event.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Selected Packages Summary Box */}
          {selectedEvents.length > 0 && (
            <div className="mb-6 p-4 rounded-xl border border-[#C89B7B]/40 bg-black/40">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#C89B7B] mb-2">
                Selected Packages ({selectedEvents.length}):
              </h5>
              <ul className="list-disc list-inside text-xs text-[#C89B7B]/90 space-y-1">
                {eventsList
                  .filter((e) => selectedEvents.includes(e.id))
                  .map((item) => (
                    <li key={item.id} className="font-medium">
                      {item.name}
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {/* Action Button: Routes directly to WhatsApp */}
          <div>
            <button
              onClick={handleWhatsAppRedirect}
              className="w-full bg-[#C89B7B] hover:bg-[#b58867] text-black font-bold text-sm px-8 py-3.5 rounded-full shadow-lg transition-transform active:scale-95 cursor-pointer text-center"
            >
              {selectedEvents.length > 0
                ? `Inquire ${selectedEvents.length} Selected on WhatsApp`
                : "Select Packages & Contact via WhatsApp"}
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

          {/* Card 1: Cradle Ceremony & Ritual Coverage */}
          <div className="relative w-full h-72 md:h-80 [perspective:1000px] group">
            <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl shadow-md">
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl overflow-hidden">
                <img
                  src="https://phometo.com/images/gallery/NamingCeremony/19.jpg"
                  alt="Cradle ceremony moment"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-[#C89B7B] font-serif text-lg font-bold">Cradle Ceremony & Ritual Coverage</h4>
                </div>
              </div>
              <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-2xl overflow-hidden border border-[#C89B7B]/40">
                <img
                  src="https://phometo.com/images/gallery/NamingCeremony/19.jpg"
                  alt="Cradle Ceremony Back visual"
                  className="w-full h-full object-cover brightness-50 blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/75 p-6 flex flex-col justify-center items-center text-center">
                  <span className="text-[#C89B7B] text-xs font-bold uppercase tracking-wider mb-2">Cradle Package</span>
                  <h3 className="text-2xl font-serif font-bold mb-3 text-[#C89B7B]">Cradle Ceremony & Ritual Coverage</h3>
                  <p className="text-[#C89B7B] font-light text-xs leading-relaxed">Candid and emotional moments of placing the baby in the traditional decorated cradle.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Baby Portrait & Family Session */}
          <div className="relative w-full h-72 md:h-80 [perspective:1000px] group">
            <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl shadow-md">
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl overflow-hidden">
                <img
                  src="https://i.pinimg.com/736x/0b/8c/26/0b8c26a883abe89e0f15b9e3e58bbd04.jpg"
                  alt="Baby portrait session"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-[#C89B7B] font-serif text-lg font-bold">Baby Portrait & Family Session</h4>
                </div>
              </div>
              <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-2xl overflow-hidden border border-[#C89B7B]/40">
                <img
                  src="https://i.pinimg.com/736x/0b/8c/26/0b8c26a883abe89e0f15b9e3e58bbd04.jpg"
                  alt="Baby Portrait Back visual"
                  className="w-full h-full object-cover brightness-50 blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/75 p-6 flex flex-col justify-center items-center text-center">
                  <span className="text-[#C89B7B] text-xs font-bold uppercase tracking-wider mb-2">Portrait Package</span>
                  <h3 className="text-2xl font-serif font-bold mb-3 text-[#C89B7B]">Baby Portrait & Family Session</h3>
                  <p className="text-[#C89B7B] font-light text-xs leading-relaxed">Adorable portraiture capturing the newborn and joyful family members.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Traditional Blessings & Custom Rituals */}
          <div className="relative w-full h-56 [perspective:1000px] group">
            <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl shadow-md">
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl overflow-hidden">
                <img
                  src="https://tse1.mm.bing.net/th/id/OIP.fcRMPnMejSc9ow86AjfybwHaFs?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
                  alt="Traditional blessings and rituals"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-[#C89B7B] font-serif text-lg font-bold">Traditional Blessings & Customs</h4>
                </div>
              </div>
              <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-2xl overflow-hidden border border-[#C89B7B]/40">
                <img
                  src="https://tse1.mm.bing.net/th/id/OIP.fcRMPnMejSc9ow86AjfybwHaFs?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
                  alt="Rituals Back visual"
                  className="w-full h-full object-cover brightness-50 blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/75 p-6 flex flex-col justify-center items-center text-center">
                  <span className="text-[#C89B7B] text-xs font-bold uppercase tracking-wider mb-2">Rituals Package</span>
                  <h3 className="text-xl font-serif font-bold mb-2 text-[#C89B7B]">Traditional Blessings & Customs</h3>
                  <p className="text-[#C89B7B] font-light text-xs leading-relaxed">Cinematic documentation of sacred naming rituals, family prayers, and customs.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Grand Naming Ceremony Story */}
          <div className="relative w-full h-56 [perspective:1000px] group">
            <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl shadow-md">
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl overflow-hidden">
                <img
                  src="https://i.pinimg.com/736x/c8/4f/c2/c84fc29f53af34c73a5f8e4a2dc716e1.jpg"
                  alt="Grand naming ceremony celebration"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-[#C89B7B] font-serif text-lg font-bold">Grand Naming Ceremony Story</h4>
                </div>
              </div>
              <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-2xl overflow-hidden border border-[#C89B7B]/40">
                <img
                  src="https://i.pinimg.com/736x/c8/4f/c2/c84fc29f53af34c73a5f8e4a2dc716e1.jpg"
                  alt="Grand Naming Back visual"
                  className="w-full h-full object-cover brightness-50 blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/75 p-6 flex flex-col justify-center items-center text-center">
                  <span className="text-[#C89B7B] text-xs font-bold uppercase tracking-wider mb-2">Grand Package</span>
                  <h3 className="text-xl font-serif font-bold mb-2 text-[#C89B7B]">Grand Naming Ceremony Story</h3>
                  <p className="text-[#C89B7B] font-light text-xs leading-relaxed">Complete cinematic coverage from morning preparations to grand celebration and guests.</p>
                </div>
              </div>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}