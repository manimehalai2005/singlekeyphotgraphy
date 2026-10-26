'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, MessageCircle, X } from "lucide-react";
import { LuFacebook, LuInstagram, LuYoutube } from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";
import picture from "./logo-name.png";

const socialLinks = [
  { Icon: LuInstagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: LuFacebook, href: "https://facebook.com", label: "Facebook" },
  { Icon: LuYoutube, href: "https://youtube.com", label: "YouTube" },
  { Icon: FaWhatsapp, href: "https://wa.me/919952840777", label: "WhatsApp" },
];

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <footer className="w-full bg-gray-950 text-white py-16 px-6 md:px-20 overflow-hidden border-t border-zinc-900 font-sans relative">
      <div className="max-w-7xl mx-auto">

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 pb-12">

          {/* Column 1: Brand Info & Socials */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-2 space-y-6">
            <div className="flex items-center">
              <Link href="/" className="inline-block">
        
             <img
                  src="https://cdn.photomall.in/photomall/d0bade31-0828-4442-a034-25a0a58c6bb90nhCITc9"
                  alt="SingleKey Photography Logo"
                  className="h-16 w-auto object-contain filter brightness-0 invert"
                />

              </Link>
            </div>

            <p className="text-sm font-normal text-white max-w-sm leading-relaxed opacity-90">
              Best photography platform that captures genuine emotions,
              meaningful details, and timeless stories.
            </p>

            {/* Social Icons including WhatsApp */}
            <div className="flex items-center space-x-3">
              {socialLinks.map(({ Icon, href, label }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-black border border-[#c89B7B] flex items-center justify-center hover:border-[#C89B7B] hover:bg-[#C89B7B] transition-colors group"
                >
                  <Icon className="w-4 h-4 text-[#c89B7B] group-hover:text-black transition-colors" />
                </a>
              ))}
            </div>

           
          </div>

          {/* Column 2: Events */}
          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-wider text-[#c89B7B] font-semibold">
              Events
            </h4>

            <ul className="space-y-3 text-sm">
              {[
                "Wedding ceremony",
                "Engagement ceremony",
                "Birthday ceremony",
                "Baby shower ceremony",
                "Naming ceremony",
                "Earpiercing ceremony",
                "Housewarming ceremony",
                "Ritual ceremony",
                "Puberty ceremony",
              ].map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="text-white hover:text-[#C89B7B] transition-colors tracking-wide capitalize block font-normal"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Packages */}
          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-wider text-[#c89B7B] font-semibold">
              Packages
            </h4>

            <ul className="space-y-3 text-sm">
              {[
                "Essential collection",
                "Signature collection",
                "Premium collection",
                "Luxury collection",
                "Elite collection",
                "Royal collection",
              ].map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="tracking-wide text-white hover:text-[#C89B7B] transition-colors block capitalize font-normal"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: About Us & Policies */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-sm uppercase tracking-wider text-[#c89B7B] font-semibold">
                About Us
              </h4>

              <ul className="space-y-3 text-sm">
                {[
                  "Collections",
                  "What capture our team",
                  "Why choose us",
                  "Mission & Vision",
                ].map((item, idx) => (
                  <li key={idx}>
                    <a
                      href="#"
                      className="text-xs uppercase tracking-wider text-white hover:text-[#C89B7B] transition-colors block font-normal"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policies Section */}
            <div className="space-y-4 pt-2">
              <h4 className="text-sm uppercase tracking-wider text-[#c89B7B] font-semibold">
                Policies
              </h4>

              <ul className="space-y-3 text-sm">
                {[
                  { title: "Privacy Policy", href: "/privacy-policy" },
                  { title: "Terms & Conditions", href: "/terms-and-conditions" },
                  { title: "Cancellation & Refund", href: "/cancellation-and-refund" },
                ].map((policy, idx) => (
                  <li key={idx}>
                    <Link
                      href={policy.href}
                      className="text-xs uppercase tracking-wider text-white hover:text-[#C89B7B] transition-colors block font-normal"
                    >
                      {policy.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 5: Contact */}
          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-wider text-[#c89B7B] font-semibold">
              Contact
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=1st+floor+Plot+no+581+2nd+East+Main+Rd+Anna+Nagar+Madurai+Tamil+Nadu+625020"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-wide text-white hover:text-[#C89B7B] transition-colors flex items-start gap-2 leading-relaxed font-normal group"
                >
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-white group-hover:text-[#C89B7B] transition-colors" />
                  <span>
                    1st floor, Plot no 581, 2nd East Main Rd, Anna Nagar,
                    Madurai, Tamil Nadu 625020
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="tel:+919952840777"
                  className="text-xs tracking-wide text-white hover:text-[#C89B7B] transition-colors flex items-center gap-2 font-normal group"
                >
                  <Phone className="w-4 h-4 shrink-0 text-white group-hover:text-[#C89B7B] transition-colors" />
                  <span>+91 9952840777</span>
                </a>
              </li>

              <li>
                <a
                  href="mailto:singlekeyphotography@gmail.com"
                  className="text-xs tracking-wide text-white hover:text-[#C89B7B] transition-colors flex items-center gap-2 font-normal group"
                >
                  <Mail className="w-4 h-4 shrink-0 text-white group-hover:text-[#C89B7B] transition-colors" />
                  <span>singlekeyphotography@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* Bottom Bar: Full Width */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-zinc-900/80">

        {/* Policy Links + Developed By */}
        <div className="w-full flex flex-wrap items-center justify-center gap-x-6 gap-y-4">

          <Link
            href="/privacy-policy"
            className="text-xs tracking-wide text-white hover:text-[#C89B7B] transition-colors"
          >
            Privacy Policy
          </Link>

          <Link
            href="/terms-and-conditions"
            className="text-xs tracking-wide text-white hover:text-[#C89B7B] transition-colors"
          >
            Terms & Conditions
          </Link>

          <Link
            href="/cancellation-and-refund"
            className="text-xs tracking-wide text-white hover:text-[#C89B7B] transition-colors"
          >
            Cancellation & Refund
          </Link>

          {/* Developed By */}
          <div className="flex items-center justify-center gap-2 text-white text-sm">
            <span className="tracking-wide font-normal">
              Developed By
            </span>

            <a
              href="https://genzzi.in"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Genzzi website"
              className="inline-flex items-center"
            >
              <Image
                src={picture}
                alt="Genzzi Logo"
                width={120}
                height={24}
                className="h-6 w-auto object-contain hover:opacity-80 transition-opacity"
              />
            </a>
          </div>

        </div>

        {/* Copyright */}
        <p className="w-full mt-5 text-center text-xs tracking-wide text-white/80 font-normal">
          © 2026 SingleKey Photography. All Rights Reserved.
        </p>

      </div>

      {/* Floating Quick Contact Widget (Bottom Left) */}
      <div className="absolute bottom-8 right-5 z-50 flex flex-col items-end gap-3">
        {/* Expanded WhatsApp Link */}
        <div
          className={`flex items-center gap-3 transition-all duration-300 transform ${
            isOpen
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 translate-y-4 scale-95 pointer-events-none"
          }`}
        >
          <a
            href="https://wa.me/919952840777"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
            aria-label="WhatsApp"
          >
            <FaWhatsapp className="w-6 h-6" />
          </a>
          <span className="bg-zinc-900 border border-zinc-800 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg">
            WhatsApp
          </span>
        </div>

        {/* Expanded Phone Link */}
        <div
          className={`flex items-center gap-3 transition-all duration-300 transform ${
            isOpen
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 translate-y-4 scale-95 pointer-events-none"
          }`}
        >
          <a
            href="tel:+919952840777"
            className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center shadow-lg hover:bg-green-700 transition-colors"
            aria-label="Call Us"
          >
            <Phone className="w-5 h-5" />
          </a>
          <span className="bg-zinc-900 border border-zinc-800 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg">
            Call +91 99528 40777
          </span>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-green-800 text-white flex items-center justify-center shadow-xl hover:bg-green-700 transition-all focus:outline-none"
          aria-label="Toggle contact options"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
        </button>
      </div>
    </footer>
  );
}