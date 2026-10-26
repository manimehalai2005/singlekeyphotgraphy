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
    id: "ring-ceremony",
    name: "Ring Exchange Coverage",
    description: "Candid and emotional capturing of the auspicious ring exchange moment.",
  },
  {
    id: "couple-portraits",
    name: "Couple Portrait Session",
    description: "Romantic and timeless portraits celebrating the newly engaged couple.",
  },
  {
    id: "traditional-rituals",
    name: "Traditional Blessings & Rituals",
    description: "Cinematic documentation of sacred family blessings, garlands, and customs.",
  },
  {
    id: "grand-engagement",
    name: "Grand Engagement Story",
    description: "Complete cinematic coverage from preparations to evening celebration.",
  },
  {
    id: "cinematic-location",
    name: "Outdoor Cinematic Couple Shoot",
    description: "Moody, storytelling pre-engagement shoot at a scenic outdoor location.",
  },
];

export default function EngagementShoot() {
  // State to track checked package IDs
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  // Toggle package selection
  const handleToggleEvent = (id: string) => {
    setSelectedEvents((prev) =>
      prev.includes(id) ? prev.filter((eventId) => eventId !== id) : [...prev, id]
    );
  };

  // Replace with your business WhatsApp phone number (with country code, without + or spaces)
  const phoneNumber = "919876543210";

  // Redirect to WhatsApp with dynamic pre-filled text
  const handleWhatsAppRedirect = () => {
    const selectedItems = eventsList.filter((event) => selectedEvents.includes(event.id));

    if (selectedItems.length === 0) {
      alert("Please select at least one package to inquire on WhatsApp.");
      return;
    }

    let message = "Hello! I would like to inquire about booking the following Engagement package(s):\n\n";
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
            Engagement Packages
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

          {/* Action Button Routing to WhatsApp */}
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

          {/* Card 1: Ring Exchange Coverage */}
          <div className="relative w-full h-72 md:h-80 [perspective:1000px] group">
            <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl shadow-md">
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl overflow-hidden">
                <img
                  src="https://m.economictimes.com/thumb/msid-72144955,width-1200,height-900,resizemode-4,imgsize-199934/untitled-4.jpg"
                  alt="Ring exchange ceremony moment"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-[#C89B7B] font-serif text-lg font-bold">Ring Exchange Coverage</h4>
                </div>
              </div>
              <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-2xl overflow-hidden border border-[#C89B7B]/40">
                <img
                  src="https://m.economictimes.com/thumb/msid-72144955,width-1200,height-900,resizemode-4,imgsize-199934/untitled-4.jpg"
                  alt="Ring Exchange Back visual"
                  className="w-full h-full object-cover brightness-50 blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/75 p-6 flex flex-col justify-center items-center text-center">
                  <span className="text-[#C89B7B] text-xs font-bold uppercase tracking-wider mb-2">Ring Ceremony Package</span>
                  <h3 className="text-2xl font-serif font-bold mb-3 text-[#C89B7B]">Ring Exchange Coverage</h3>
                  <p className="text-[#C89B7B] font-light text-xs leading-relaxed">Candid and emotional capturing of the auspicious ring exchange moment.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Couple Portrait Session */}
          <div className="relative w-full h-72 md:h-80 [perspective:1000px] group">
            <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl shadow-md">
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl overflow-hidden">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUTY-oefhh6pI04FNnLmrvnDYtKHpFTxIOijUB2MVmqIob8lVzUHhcFt4&s=10"
                  alt="Couple engagement portrait"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-[#C89B7B] font-serif text-lg font-bold">Couple Portrait Session</h4>
                </div>
              </div>
              <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-2xl overflow-hidden border border-[#C89B7B]/40">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUTY-oefhh6pI04FNnLmrvnDYtKHpFTxIOijUB2MVmqIob8lVzUHhcFt4&s=10"
                  alt="Couple Portrait Back visual"
                  className="w-full h-full object-cover brightness-50 blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/75 p-6 flex flex-col justify-center items-center text-center">
                  <span className="text-[#C89B7B] text-xs font-bold uppercase tracking-wider mb-2">Couple Package</span>
                  <h3 className="text-2xl font-serif font-bold mb-3 text-[#C89B7B]">Couple Portrait Session</h3>
                  <p className="text-[#C89B7B] font-light text-xs leading-relaxed">Romantic and timeless portraits celebrating the newly engaged couple.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Traditional Blessings & Rituals */}
          <div className="relative w-full h-56 [perspective:1000px] group">
            <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl shadow-md">
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl overflow-hidden">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHqftp6WI54tnimSEqtCEw5eF7z8jBBCR-5n3WdJ4dDHO9zKOMrmWbSmfO&s=10"
                  alt="Traditional blessings and rituals"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-[#C89B7B] font-serif text-lg font-bold">Traditional Blessings & Rituals</h4>
                </div>
              </div>
              <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-2xl overflow-hidden border border-[#C89B7B]/40">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHqftp6WI54tnimSEqtCEw5eF7z8jBBCR-5n3WdJ4dDHO9zKOMrmWbSmfO&s=10"
                  alt="Rituals Back visual"
                  className="w-full h-full object-cover brightness-50 blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/75 p-6 flex flex-col justify-center items-center text-center">
                  <span className="text-[#C89B7B] text-xs font-bold uppercase tracking-wider mb-2">Rituals Package</span>
                  <h3 className="text-xl font-serif font-bold mb-2 text-[#C89B7B]">Traditional Blessings & Rituals</h3>
                  <p className="text-[#C89B7B] font-light text-xs leading-relaxed">Cinematic documentation of sacred family blessings, garlands, and customs.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Grand Engagement Story */}
          <div className="relative w-full h-56 [perspective:1000px] group">
            <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl shadow-md">
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl overflow-hidden">
                <img
                  src="https://img.perniaspopupshop.com/store-locator-v2/uploads/Nishchayathramsec1mob3_3b5233dcb0.jpg"
                  alt="Grand engagement celebration"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-[#C89B7B] font-serif text-lg font-bold">Grand Engagement Story</h4>
                </div>
              </div>
              <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-2xl overflow-hidden border border-[#C89B7B]/40">
                <img
                  src="https://img.perniaspopupshop.com/store-locator-v2/uploads/Nishchayathramsec1mob3_3b5233dcb0.jpg"
                  alt="Grand Engagement Back visual"
                  className="w-full h-full object-cover brightness-50 blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/75 p-6 flex flex-col justify-center items-center text-center">
                  <span className="text-[#C89B7B] text-xs font-bold uppercase tracking-wider mb-2">Grand Package</span>
                  <h3 className="text-xl font-serif font-bold mb-2 text-[#C89B7B]">Grand Engagement Story</h3>
                  <p className="text-[#C89B7B] font-light text-xs leading-relaxed">Complete cinematic coverage from preparations to evening celebration.</p>
                </div>
              </div>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}