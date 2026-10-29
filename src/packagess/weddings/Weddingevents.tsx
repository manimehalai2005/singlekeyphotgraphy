"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface WeddingEvent {
  id: string;
  name: string;
  description: string;
}

const eventsList: WeddingEvent[] = [
  {
    id: "engagement",
    name: "Engagement",
    description: "Capture the intimate moments of your ring exchange and celebration.",
  },
  {
    id: "pre-wedding",
    name: "Haldi and Mehendi",
    description: "Vibrant colors, candid laughs, and traditional pre-wedding rituals.",
  },
  {
    id: "wedding",
    name: "Wedding ceremony",
    description: "Complete coverage of the main rituals, pheras, and emotional milestones.",
  },
  {
    id: "reception",
    name: "Reception",
    description: "Grand entrance, first dance, speeches, and evening celebrations.",
  },
  {
    id: "post-wedding",
    name: "Post-wedding shoot",
    description: "Cinematic romantic portrait sessions at scenic outdoor locations.",
  },
];

export default function WeddingEvents() {
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

    let messageText = "Hello SingleKey Photography!\n\nI would like to inquire about booking the following Wedding package(s):\n";

    if (selectedEvents.length > 0) {
      selectedEvents.forEach((pkg, index) => {
        messageText += `\n${index + 1}. ${pkg}`;
      });
    } else {
      messageText += "\n- General Wedding Photography Packages";
    }

    messageText += "\n\nPlease share availability, pricing, and package details.";

    const encodedMessage = encodeURIComponent(messageText);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <section className="relative w-full min-h-screen bg-transparent text-[#C89b7b] flex flex-col items-center justify-center py-16 px-6 lg:px-16 overflow-hidden font-sans">
      {/* Container matching split layout */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Heading, Event Descriptions & Direct Contact Button */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-5 flex flex-col justify-center"
        >
          <span className="text-xs uppercase tracking-widest text-[#C89b7b] font-bold mb-4">
            Our Photography Offerings
          </span>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#C89b7b] tracking-tight mb-6">
            Capturing Every <span className="italic font-normal text-[#C89b7b]">Milestone</span>
          </h2>

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
                      ? "border-[#C89b7b] bg-neutral-900/90 shadow-lg shadow-[#C89b7b]/15"
                      : "border-neutral-800 bg-neutral-900/60 hover:border-[#C89b7b]/50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleCheckboxChange(event.name);
                    }}
                    className="mt-1 w-4 h-4 accent-[#C89b7b] cursor-pointer"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#C89b7b]">{event.name}</h4>
                    <p className="text-xs text-[#C89b7b]/80 mt-0.5">{event.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* WhatsApp Direct Action Button */}
          <div>
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-[#C89b7b] hover:bg-[#b58867] text-black font-bold text-sm px-8 py-3.5 rounded-full shadow-lg transition-transform active:scale-95 cursor-pointer text-center flex items-center justify-center gap-2"
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

          {/* Card 1: Wedding Ceremony */}
          <div className="relative w-full h-72 md:h-80 [perspective:1000px] group">
            <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl shadow-md">
              
              {/* Front Side */}
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793270862/12x15_2.jpg"
                  alt="Bride and groom couple portrait"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-[#C89b7b] font-serif text-xl font-bold">Wedding Ceremony</h4>
                </div>
              </div>

              {/* Back Side */}
              <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-2xl overflow-hidden border border-[#C89b7b]/40">
                <img
                  src="https://thetalesoftradition.com/wp-content/uploads/2024/01/vivekkrishnanphotography-618-1024x683.jpg"
                  alt="Wedding Ceremony Back visual"
                  className="w-full h-full object-cover brightness-50 blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/75 p-6 flex flex-col justify-center items-center text-center">
                  <span className="text-[#C89b7b] text-xs font-bold uppercase tracking-wider mb-2">Grand Celebrations</span>
                  <h3 className="text-2xl font-serif font-bold mb-3 text-[#C89b7b]">Wedding Ceremony</h3>
                  <p className="text-[#C89b7b] font-light text-xs leading-relaxed">
                    Complete cinematic coverage of main rituals, traditional ceremonies, pheras, and unscripted emotional highlights.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Card 2: Haldi and Mehendi */}
          <div className="relative w-full h-72 md:h-80 [perspective:1000px] group">
            <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl shadow-md">
              
              {/* Front Side */}
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl overflow-hidden">
                <img
                  src="https://i.pinimg.com/originals/b3/9d/e8/b39de8850ad8495558856c7d1dad614f.jpg"
                  alt="Traditional wedding ceremony details"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-[#C89b7b] font-serif text-xl font-bold">Haldi & Mehendi</h4>
                </div>
              </div>

              {/* Back Side */}
              <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-2xl overflow-hidden border border-[#C89b7b]/40">
                <img
                  src="https://images.bergerpaints.com/s3fs-public/2024-08/Haldi-Ceremony.jpg?VersionId=FqcI.yffG"
                  alt="Haldi and Mehendi Back visual"
                  className="w-full h-full object-cover brightness-50 blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/75 p-6 flex flex-col justify-center items-center text-center">
                  <span className="text-[#C89b7b] text-xs font-bold uppercase tracking-wider mb-2">Vibrant Festivities</span>
                  <h3 className="text-2xl font-serif font-bold mb-3 text-[#C89b7b]">Haldi & Mehendi</h3>
                  <p className="text-[#C89b7b] font-light text-xs leading-relaxed">
                    Vibrant candid moments, family laughter, color splashes, and intricate henna artistic documentation.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Card 3: Reception */}
          <div className="relative w-full h-56 [perspective:1000px] group">
            <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl shadow-md">
              
              {/* Front Side */}
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl overflow-hidden">
                <img
                  src="https://dsphotography.info/wp-content/uploads/2025/02/DSS_7381.jpg"
                  alt="Reception couple celebration"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-[#C89b7b] font-serif text-xl font-bold">Reception</h4>
                </div>
              </div>

              {/* Back Side */}
              <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-2xl overflow-hidden border border-[#C89b7b]/40">
                <img
                  src="https://www.jaihindhphotography.com/wp-content/uploads/2023/10/Pre-wedding-photography-styles-3.jpg"
                  alt="Reception Back visual"
                  className="w-full h-full object-cover brightness-50 blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/75 p-6 flex flex-col justify-center items-center text-center">
                  <span className="text-[#C89b7b] text-xs font-bold uppercase tracking-wider mb-2">Evening Glamour</span>
                  <h3 className="text-2xl font-serif font-bold mb-3 text-[#C89b7b]">Reception</h3>
                  <p className="text-[#C89b7b] font-light text-xs leading-relaxed">
                    Grand stage entries, speeches, first dance, guest portraits, and evening party celebrations.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Card 4: Engagement */}
          <div className="relative w-full h-56 [perspective:1000px] group">
            <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl shadow-md">
              
              {/* Front Side */}
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793268960/cfaoaro9w9ngn144dqcx.jpg"
                  alt="Ring exchange engagement moment"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-[#C89b7b] font-serif text-xl font-bold">Engagement</h4>
                </div>
              </div>

              {/* Back Side */}
              <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-2xl overflow-hidden border border-[#C89b7b]/40">
                <img
                  src="https://img.perniaspopupshop.com/store-locator-v2/uploads/Nishchayathramsec1mob3_3b5233dcb0.jpg"
                  alt="Engagement Back visual"
                  className="w-full h-full object-cover brightness-50 blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/75 p-6 flex flex-col justify-center items-center text-center">
                  <span className="text-[#C89b7b] text-xs font-bold uppercase tracking-wider mb-2">Intimate Moments</span>
                  <h3 className="text-2xl font-serif font-bold mb-3 text-[#C89b7b]">Engagement</h3>
                  <p className="text-[#C89b7b] font-light text-xs leading-relaxed">
                    Ring exchange moments, close-ups, candid smiles, and family group portraits.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}