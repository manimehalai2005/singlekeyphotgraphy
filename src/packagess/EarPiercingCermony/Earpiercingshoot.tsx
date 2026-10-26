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
    id: "ear-piercing-ritual",
    name: "Ear Piercing Ritual Session",
    description: "Gentle and sacred coverage of the traditional ear piercing ceremony moments.",
  },
  {
    id: "traditional-attire",
    name: "Traditional Attire & Family Portraits",
    description: "Capturing beautiful memories in traditional attire with parents and close family.",
  },
  {
    id: "blessings-customs",
    name: "Sacred Blessings & Custom Prayers",
    description: "Cinematic documentation of family prayers, sacred offerings, and blessings.",
  },
  {
    id: "grand-ceremony",
    name: "Grand Ear Piercing Celebration",
    description: "Comprehensive cinematic coverage of the entire celebration from morning to evening.",
  },
  {
    id: "outdoor-portrait",
    name: "Outdoor Cinematic Portrait Shoot",
    description: "Stylized storytelling portraiture shot at a scenic outdoor heritage location.",
  },
];

export default function EarPiercingShoot() {
  // State to store selected package IDs
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  // Toggle package selection
  const handleToggleEvent = (id: string) => {
    setSelectedEvents((prev) =>
      prev.includes(id) ? prev.filter((eventId) => eventId !== id) : [...prev, id]
    );
  };

  // Replace with your target WhatsApp number (country code without + or spaces)
  const phoneNumber = "919876543210";

  // Redirect to WhatsApp with pre-filled text of selected items
  const handleWhatsAppRedirect = () => {
    const selectedItems = eventsList.filter((event) => selectedEvents.includes(event.id));

    if (selectedItems.length === 0) {
      alert("Please select at least one package to inquire on WhatsApp.");
      return;
    }

    let message = "Hello! I would like to inquire about booking the following Ear Piercing package(s):\n\n";
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
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs uppercase tracking-widest text-[#C89B7B] font-bold mb-6"
          >
            Ear Piercing Packages
          </motion.span>
         
          {/* Interactive Event List with Checkboxes */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-3 mb-6"
          >
            {eventsList.map((event) => {
              const isChecked = selectedEvents.includes(event.id);
              return (
                <div
                  key={event.id}
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
                    onChange={() => {}} // Handled by parent div click
                    className="mt-1 h-4 w-4 rounded border-neutral-700 text-[#C89B7B] focus:ring-[#C89B7B] accent-[#C89B7B] cursor-pointer"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#C89B7B]">{event.name}</h4>
                    <p className="text-xs font-medium text-[#C89B7B]/80 mt-0.5">{event.description}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>

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

          {/* Card 1: Ear Piercing Ritual Session */}
          <div className="relative w-full h-72 md:h-80 [perspective:1000px] group">
            <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl shadow-md">
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl overflow-hidden">
                <img
                  src="https://vedictribe.com/wp-content/uploads/2020/12/ear-piercing-550x289.jpg"
                  alt="Ear piercing ritual session"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-[#C89B7B] font-serif text-lg font-bold">Ear Piercing Ritual Session</h4>
                </div>
              </div>
              <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-2xl overflow-hidden border border-[#C89B7B]/40">
                <img
                  src="https://vedictribe.com/wp-content/uploads/2020/12/ear-piercing-550x289.jpg"
                  alt="Ear Piercing Back visual"
                  className="w-full h-full object-cover brightness-50 blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/75 p-6 flex flex-col justify-center items-center text-center">
                  <span className="text-[#C89B7B] text-xs font-bold uppercase tracking-wider mb-2">Ritual Package</span>
                  <h3 className="text-2xl font-serif font-bold mb-3 text-[#C89B7B]">Ear Piercing Ritual Session</h3>
                  <p className="text-[#C89B7B] font-light text-xs leading-relaxed">Gentle and sacred coverage of the traditional ear piercing ceremony moments.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Traditional Attire & Family Portraits */}
          <div className="relative w-full h-72 md:h-80 [perspective:1000px] group">
            <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl shadow-md">
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl overflow-hidden">
                <img
                  src="https://media.istockphoto.com/id/507030354/photo/baby-girl-crying-in-hindus-ear-piercing-ceremony.jpg?s=612x612&w=0&k=20&c=f4DKhn_eop9C82G1Yq67UFr20M_B_KFVReURFGgPLl4="
                  alt="Traditional attire and family portraits"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-[#C89B7B] font-serif text-lg font-bold">Traditional Attire & Family Portraits</h4>
                </div>
              </div>
              <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-2xl overflow-hidden border border-[#C89B7B]/40">
                <img
                  src="https://media.istockphoto.com/id/507030354/photo/baby-girl-crying-in-hindus-ear-piercing-ceremony.jpg?s=612x612&w=0&k=20&c=f4DKhn_eop9C82G1Yq67UFr20M_B_KFVReURFGgPLl4="
                  alt="Traditional Attire Back visual"
                  className="w-full h-full object-cover brightness-50 blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/75 p-6 flex flex-col justify-center items-center text-center">
                  <span className="text-[#C89B7B] text-xs font-bold uppercase tracking-wider mb-2">Portrait Package</span>
                  <h3 className="text-2xl font-serif font-bold mb-3 text-[#C89B7B]">Traditional Attire & Family Portraits</h3>
                  <p className="text-[#C89B7B] font-light text-xs leading-relaxed">Capturing beautiful memories in traditional attire with parents and close family.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Sacred Blessings & Custom Prayers */}
          <div className="relative w-full h-56 [perspective:1000px] group">
            <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl shadow-md">
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl overflow-hidden">
                <img
                  src="https://www.pilgrimagetour.in/blog/wp-content/uploads/2024/09/Mundan-Samskara.jpg"
                  alt="Sacred blessings and custom prayers"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-[#C89B7B] font-serif text-lg font-bold">Sacred Blessings & Custom Prayers</h4>
                </div>
              </div>
              <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-2xl overflow-hidden border border-[#C89B7B]/40">
                <img
                  src="https://www.pilgrimagetour.in/blog/wp-content/uploads/2024/09/Mundan-Samskara.jpg"
                  alt="Blessings Back visual"
                  className="w-full h-full object-cover brightness-50 blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/75 p-6 flex flex-col justify-center items-center text-center">
                  <span className="text-[#C89B7B] text-xs font-bold uppercase tracking-wider mb-2">Blessings Package</span>
                  <h3 className="text-xl font-serif font-bold mb-2 text-[#C89B7B]">Sacred Blessings & Custom Prayers</h3>
                  <p className="text-[#C89B7B] font-light text-xs leading-relaxed">Cinematic documentation of family prayers, sacred offerings, and blessings.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Grand Ear Piercing Celebration */}
          <div className="relative w-full h-56 [perspective:1000px] group">
            <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl shadow-md">
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl overflow-hidden">
                <img
                  src="https://tse4.mm.bing.net/th/id/OIP.6gjnJi9jiGH6i7IP_rnSwwHaE7?r=0&w=1600&h=1064&rs=1&pid=ImgDetMain&o=7&rm=3"
                  alt="Grand ear piercing celebration"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-[#C89B7B] font-serif text-lg font-bold">Grand Ear Piercing Celebration</h4>
                </div>
              </div>
              <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-2xl overflow-hidden border border-[#C89B7B]/40">
                <img
                  src="https://tse4.mm.bing.net/th/id/OIP.6gjnJi9jiGH6i7IP_rnSwwHaE7?r=0&w=1600&h=1064&rs=1&pid=ImgDetMain&o=7&rm=3"
                  alt="Grand Celebration Back visual"
                  className="w-full h-full object-cover brightness-50 blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/75 p-6 flex flex-col justify-center items-center text-center">
                  <span className="text-[#C89B7B] text-xs font-bold uppercase tracking-wider mb-2">Grand Package</span>
                  <h3 className="text-xl font-serif font-bold mb-2 text-[#C89B7B]">Grand Ear Piercing Celebration</h3>
                  <p className="text-[#C89B7B] font-light text-xs leading-relaxed">Comprehensive cinematic coverage of the entire celebration from morning to evening.</p>
                </div>
              </div>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}