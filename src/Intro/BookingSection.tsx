
'use client';

import React from "react";
import { Mail, Phone, Clock } from "lucide-react";

export default function BookingSection() {
  return (
    <section className="w-full py-12 px-0 sm:px-20 lg:px-12 font-sans">

      {/* Title */}
      <h1 className="text-4xl sm:text-7xl md:text-7xl text-[#c89B7B] font-serif italic text-center mb-8">
        Find us Location
      </h1>

      {/* Map Card Container */}
      <div className="w-[calc(100%-32px)] sm:w-full  max-w-7xl xs:mx-auto  mx-auto border border-zinc-800 relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl min-h-[500px] flex flex-col justify-between p-3 sm:m-10 md:p-12">

        {/* Google Map Background */}
        <div className="absolute inset-0 z-0 ">
          <iframe
            title="Outlet Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735.690901248072!2d78.14770637479256!3d9.9213358901801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c500112d60a1%3A0x21a7fb04a9b79415!2sSingleKey%20Photography!5e1!3m2!1sen!2sin!4v1792489650455!5m2!1sen!2sin"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full sm:mx-auto xs:px-20"
          />
        </div>

        {/* Top Section */}
        <div className="relative z-10 space-y-4 p-2 sm:p-4"></div>

        {/* Opening Hours & Contact */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 p-3 sm:p-6 rounded-2xl mt-8 text-xs sm:text-sm font-medium">

          {/* Opening Hours */}
          <div className="min-w-0 space-y-2">
            <h3 className="font-extrabold uppercase text-[#c89B7B] text-xs sm:text-sm md:text-base flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#c89B7B] shrink-0" />
              OPENING HOURS
            </h3>

            <ul className="space-y-2 text-white leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-[#c89B7B] shrink-0"></span>
                <span className="break-words">
                  <strong>Monday–Saturday:</strong>{" "}
                  8:00 AM–10:00 PM
                </span>
              </li>

              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-[#c89B7B] shrink-0"></span>
                <span className="break-words">
                  <strong>Sunday:</strong>{" "}
                  9:00 AM–9:00 PM
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="min-w-0 space-y-2">
            <h3 className="font-extrabold uppercase text-[#c89B7B] text-xs sm:text-sm md:text-base flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-[#c89B7B] shrink-0" />
              CONTACT
            </h3>

            <ul className="space-y-3 text-white leading-relaxed">
              <li className="flex items-start gap-2 min-w-0">
                <Mail className="w-4 h-4 mt-0.5 text-[#c89B7B] shrink-0" />
                <a
                  href="mailto:singlekeyphotography@gmail.com"
                  className="min-w-0 break-all hover:text-[#c89B7B] transition-colors"
                >
                  singlekeyphotography@gmail.com
                </a>
              </li>

              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-[#c89B7B] shrink-0" />
                <a
                  href="tel:+919952840777"
                  className="break-words hover:text-[#c89B7B] transition-colors"
                >
                  +91 99528 40777
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Decorative Accent Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#c89B7B] z-10" />

      </div>
    </section>
  );
}
