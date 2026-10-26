
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Image as GalleryHorizontal,
  Gamepad2 as JoystickIcon,
  Folder,
  ChevronDown,
} from 'lucide-react';

const packageOptions = [
  { label: 'Weddings', href: '/dashboard/packages/wedding' },
  { label: 'Engagement', href: '/dashboard/packages/engagement' },
  { label: 'Birthday events', href: '/dashboard/packages/birthday' },
  { label: 'Baby showers', href: '/dashboard/packages/baby' },
  { label: 'Naming ceremony', href: '/dashboard/packages/naming' },
  { label: 'Earpiercing ceremony', href: '/dashboard/packages/earpiercing' },
  { label: 'Housewarming ceremony', href: '/dashboard/packages/housewarming' },
  { label: 'Ritual ceremony', href: '/dashboard/packages/ritual' },
  { label: 'Puberty ceremony', href: '/dashboard/packages/puberty' },
];

const eventOptions = [
  { label: 'Weddings', href: '/dashboard/event/wedding' },
  { label: 'Engagement', href: '/dashboard/event/engagement' },
  { label: 'Birthday events', href: '/dashboard/event/birthday' },
  { label: 'Baby showers', href: '/dashboard/event/baby' },
  { label: 'Naming ceremony', href: '/dashboard/event/naming' },
  { label: 'Earpiercing ceremony', href: '/dashboard/event/earpiercing' },
  { label: 'Housewarming ceremony', href: '/dashboard/event/housewarming' },
  { label: 'Ritual ceremony', href: '/dashboard/event/ritual' },
  { label: 'Puberty ceremony', href: '/dashboard/event/puberty' },
];

const dashboardNavLinks = [
  {
    name: 'Gallery',
    href: '/dashboard/gallery',
    icon: GalleryHorizontal,
  },
  {
    name: 'Events',
    href: '/dashboard/events',
    icon: JoystickIcon,
    hasDropdown: true,
    options: eventOptions,
  },
  {
    name: 'Packages',
    href: '/dashboard/packages',
    icon: Folder,
    hasDropdown: true,
    options: packageOptions,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Initial state is the same on the server and client.
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown whenever the route changes.
  useEffect(() => {
    setActiveDropdown(null);
  }, [pathname]);

  // Close dropdown when clicking outside the dashboard layout.
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

  return (
    <div
      ref={navRef}
      className="h-screen bg-neutral-950 text-white font-sans flex flex-col overflow-hidden"
    >
      <div className="flex flex-1 w-full h-full overflow-hidden">

        {/* Left Sidebar */}
        <aside className="hidden md:flex flex-col w-64 shrink-0 space-y-6 p-6 border-r border-neutral-800/80 h-full">
          <div>
            <p className="text-xl font-bold uppercase tracking-widest text-[#c89B7B] font-serif italic mb-4 px-3">
              Main Menu
            </p>

            <nav className="space-y-1.5">
              {dashboardNavLinks.map((link) => {
                const IconComponent = link.icon;
                const isThisDropdownOpen =
                  activeDropdown === link.name;

                const isActive =
                  pathname === link.href ||
                  (link.hasDropdown &&
                    pathname.startsWith(`${link.href}/`));

                if (link.hasDropdown && link.options) {
                  return (
                    <div
                      key={link.name}
                      className="relative font-serif italic"
                    >
                      <button
                        type="button"
                        aria-expanded={isThisDropdownOpen}
                        onClick={() =>
                          setActiveDropdown(
                            isThisDropdownOpen ? null : link.name
                          )
                        }
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xl font-serif italic transition-all ${
                          isActive
                            ? 'bg-neutral-900 border border-[#c89B7B]/30'
                            : 'hover:bg-neutral-900'
                        } text-[#c89B7B]`}
                      >
                        <span className="flex items-center gap-3 font-serif italic">
                          <IconComponent size={20} />
                          <span>{link.name}</span>
                        </span>

                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-300 ${
                            isThisDropdownOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {isThisDropdownOpen && (
                        <div className="mt-1 ml-4 pl-3 border-l border-[#C89B7B]/40 space-y-1 max-h-60 overflow-y-auto no-scrollbar">
                          {link.options.map((opt) => {
                            const isOptionActive =
                              pathname === opt.href;

                            return (
                              <Link
                                key={opt.href}
                                href={opt.href}
                                onClick={() =>
                                  setActiveDropdown(null)
                                }
                                className={`w-full text-left block py-1.5 px-2 rounded-lg text-xl font-serif italic transition-colors text-[#c89B7B] ${
                                  isOptionActive
                                    ? 'bg-neutral-900'
                                    : 'hover:bg-neutral-900'
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
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setActiveDropdown(null)}
                    className={`w-full text-left flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xl transition-all font-serif italic ${
                      isActive
                        ? 'bg-neutral-900 text-[#c89B7B] border border-[#c89B7B]/30'
                        : 'text-[#c89B7B] hover:bg-neutral-900'
                    }`}
                  >
                    <IconComponent size={20} />
                    <span className="font-serif italic">
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-auto p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800">
            <p className="text-xl font-medium text-[#c89B7B] font-serif italic">
              Single Key Studio
            </p>
            <p className="text-xl text-[#c89B7B] mt-1 font-serif italic">
              Madurai, Tamil Nadu
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen h-full overflow-y-auto no-scrollbar p-2 space-y-8">
          {children}
        </main>

      </div>
    </div>
  );
}
