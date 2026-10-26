
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import StarfieldCursor from '../StarFieldCursor';
import {
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
  FaFacebookF,
} from 'react-icons/fa';

const packageOptions = [
  { label: 'Weddings', href: '/packages/weddings' },
  { label: 'Engagement', href: '/packages/engagement' },
  { label: 'Birthday events', href: '/packages/birthday' },
  { label: 'Baby showers', href: '/packages/baby' },
  { label: 'Naming ceremony', href: '/packages/naming' },
  { label: 'Earpiercing ceremony', href: '/packages/earpiercing' },
  { label: 'Housewarming ceremony', href: '/packages/housewarming' },
  { label: 'Ritual ceremony', href: '/packages/ritual' },
  { label: 'Puberty ceremony', href: '/packages/puberty' },
];

const eventOptions = [
  { label: 'Weddings', href: '/event/wedding' },
  { label: 'Engagement', href: '/event/engagement' },
  { label: 'Birthday events', href: '/event/birthday' },
  { label: 'Baby showers', href: '/event/baby' },
  { label: 'Naming ceremony', href: '/event/naming' },
  { label: 'Earpiercing ceremony', href: '/event/earpiercing' },
  { label: 'Housewarming ceremony', href: '/event/housewarming' },
  { label: 'Ritual ceremony', href: '/event/ritual' },
  { label: 'Puberty ceremony', href: '/event/puberty' },
];

const navLinks = [
  { name: 'Home', href: '/' },
  {
    name: 'Events',
    href: '/events',
    hasDropdown: true,
    options: eventOptions,
  },
  {
    name: 'Packages',
    href: '/packages',
    hasDropdown: true,
    options: packageOptions,
  },
  { name: 'Gallery', href: '/gallery' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setMobileSubmenu(null);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <StarfieldCursor />

      <nav
        ref={navRef}
        className="sticky top-0 z-50 h-20 w-full border-b border-neutral-800 bg-gray-900 shadow-lg backdrop-blur-md"
      >
        <div className="mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-full items-center justify-between">

            {/* Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold tracking-tight text-white"
              >
                <img
                  src="https://cdn.photomall.in/photomall/d0bade31-0828-4442-a034-25a0a58c6bb90nhCITc9"
                  alt="Logo"
                  className="h-14 w-28 object-contain brightness-0 invert sm:h-16 sm:w-36"
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden items-center space-x-6 md:flex lg:space-x-8">
              {navLinks.map((link) => {
                const isDropdownActive =
                  link.hasDropdown &&
                  link.options?.some((opt) => opt.href === pathname);

                const isActive =
                  link.href === '/'
                    ? pathname === '/'
                    : link.hasDropdown
                      ? pathname === link.href || isDropdownActive
                      : pathname === link.href ||
                        pathname.startsWith(link.href + '/');

                if (link.hasDropdown && link.options) {
                  const isThisDropdownOpen =
                    activeDropdown === link.name;

                  return (
                    <div key={link.name} className="relative">
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            isThisDropdownOpen ? null : link.name
                          )
                        }
                        className={`relative flex items-center gap-1.5 py-2 text-sm font-medium transition-colors focus:outline-none ${
                          isActive
                            ? 'font-semibold text-[#C89B7B]'
                            : 'text-neutral-200 hover:text-[#C89B7B]'
                        }`}
                      >
                        <span>{link.name}</span>

                        <svg
                          className={`h-4 w-4 transition-transform duration-300 ${
                            isThisDropdownOpen
                              ? 'rotate-180 text-[#C89B7B]'
                              : 'rotate-0 text-neutral-400'
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>

                        <span
                          className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-[#C89B7B] transition-all duration-300 ease-out ${
                            isActive ? 'w-full' : 'w-0 hover:w-full'
                          }`}
                        />
                      </button>

                      {/* Desktop Dropdown */}
                      {isThisDropdownOpen && (
                        <div className="animate-fadeIn absolute left-0 z-50 mt-2 w-64 space-y-1 rounded-2xl border border-neutral-800 bg-neutral-950/95 p-2 shadow-2xl backdrop-blur-xl">
                          <div className="border-b border-neutral-800 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#C89B7B]">
                            Explore {link.name}
                          </div>

                          <div className="custom-scrollbar max-h-80 overflow-y-auto">
                            {link.options.map((opt) => {
                              const isOptActive = pathname === opt.href;

                              return (
                                <Link
                                  key={opt.label}
                                  href={opt.href}
                                  onClick={() => setActiveDropdown(null)}
                                  className={`block rounded-xl px-3 py-2 text-xs transition-colors ${
                                    isOptActive
                                      ? 'bg-[#C89B7B]/20 font-semibold text-[#C89B7B]'
                                      : 'text-neutral-300 hover:bg-neutral-800 hover:text-[#C89B7B]'
                                  }`}
                                >
                                  {opt.label}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'font-semibold text-[#C89B7B]'
                        : 'text-neutral-200 hover:text-[#C89B7B]'
                    }`}
                  >
                    {link.name}

                    <span
                      className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-[#C89B7B] transition-all duration-300 ease-out ${
                        isActive ? 'w-full' : 'w-0 hover:w-full'
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button Only — No Social Icons Here */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => {
                  setIsOpen(!isOpen);

                  if (isOpen) {
                    setMobileSubmenu(null);
                  }
                }}
                className="rounded-xl border border-neutral-700 bg-neutral-800/80 p-2 text-white transition-colors hover:text-[#C89B7B] focus:outline-none"
                aria-label="Toggle Menu"
                aria-expanded={isOpen}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu Overlay & Drawer */}
        {isOpen && (
          <div className="fixed inset-0 top-20 z-40 flex h-[calc(100vh-5rem)] flex-col justify-start overflow-y-auto bg-neutral-950/98 px-6 py-6 backdrop-blur-2xl md:hidden">

            {/* Mobile Navigation Links */}
            <div className="space-y-3">
              {navLinks.map((link) => {
                const isDropdownActive =
                  link.hasDropdown &&
                  link.options?.some((opt) => opt.href === pathname);

                const isActive =
                  link.href === '/'
                    ? pathname === '/'
                    : link.hasDropdown
                      ? pathname === link.href || isDropdownActive
                      : pathname === link.href ||
                        pathname.startsWith(link.href + '/');

                if (link.hasDropdown && link.options) {
                  const isSubMenuOpen = mobileSubmenu === link.name;

                  return (
                    <div
                      key={link.name}
                      className="border-b border-neutral-800/80 pb-2"
                    >
                      <button
                        onClick={() =>
                          setMobileSubmenu(
                            isSubMenuOpen ? null : link.name
                          )
                        }
                        className={`flex w-full items-center justify-between py-2.5 text-base font-medium transition-colors ${
                          isActive
                            ? 'font-semibold text-[#C89B7B]'
                            : 'text-neutral-200'
                        }`}
                      >
                        <span>{link.name}</span>

                        <svg
                          className={`h-5 w-5 transition-transform duration-300 ${
                            isSubMenuOpen
                              ? 'rotate-180 text-[#C89B7B]'
                              : 'text-neutral-400'
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {/* Mobile Submenu */}
                      {isSubMenuOpen && (
                        <div className="animate-fadeIn mb-2 mt-1 max-h-56 space-y-1.5 overflow-y-auto rounded-r-xl border-l-2 border-[#C89B7B]/40 bg-neutral-900/60 py-2 pl-3">
                          {link.options.map((opt) => {
                            const isOptActive = pathname === opt.href;

                            return (
                              <Link
                                key={opt.label}
                                href={opt.href}
                                onClick={() => {
                                  setIsOpen(false);
                                  setMobileSubmenu(null);
                                }}
                                className={`block rounded-lg px-3 py-2 text-xs transition-colors ${
                                  isOptActive
                                    ? 'bg-[#C89B7B]/20 font-semibold text-[#C89B7B]'
                                    : 'text-neutral-300 hover:bg-neutral-800/60 hover:text-[#C89B7B]'
                                }`}
                              >
                                {opt.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <div
                    key={link.name}
                    className="border-b border-neutral-800/80 pb-2"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block py-2.5 text-base font-medium transition-colors ${
                        isActive
                          ? 'font-semibold text-[#C89B7B]'
                          : 'text-neutral-200 hover:text-[#C89B7B]'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Social Media Icons — After Contact */}
            <div className="mt-6 flex items-center justify-center gap-6  pt-5 md:hidden">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-neutral-800 p-3 text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-[#C89B7B]"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="h-5 w-5" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-neutral-800 p-3 text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-[#C89B7B]"
                aria-label="Instagram"
              >
                <FaInstagram className="h-5 w-5" />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-neutral-800 p-3 text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-[#C89B7B]"
                aria-label="YouTube"
              >
                <FaYoutube className="h-5 w-5" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-neutral-800 p-3 text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-[#C89B7B]"
                aria-label="Facebook"
              >
                <FaFacebookF className="h-5 w-5" />
              </a>
            </div>

          </div>
        )}
      </nav>
    </>
  );
}
