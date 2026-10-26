'use client';

import React, { useState } from 'react';
import ZigzagImages from './Nextslide';

interface FormData {
  name: string;
  email: string;
  service: string;
  message: string;
}

export default function PhotographyAboutPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    service: 'Wedding Photography',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('All');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setFormSubmitted(true);
    }
  };

  const portfolioItems = [
    { id: 1, title: 'Ethereal Wedding', category: 'Weddings', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80' },
    { id: 2, title: 'Portraiture & Light', category: 'Portraits', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80' },
    { id: 3, title: 'Commercial Brand', category: 'Commercial', img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80' },
    { id: 4, title: 'Golden Hour Story', category: 'Weddings', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80' },
  ];

  const filteredItems = activeTab === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeTab);

  const headingText = "Capturing , Creating Timeless Stories .";

  return (
    <div className="w-full bg-transparent text-[#c89b7b] font-sans overflow-x-hidden">
      {/* Hero Section - Full Width */}
      <section className="relative overflow-hidden">
        <div className="w-full pt-10 px-4 sm:px-6 lg:px-8 text-center">
          <div 
            className="inline-block text-[#c89b7b]  text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-6"
          >
            Professional Photography & Visual Storytelling
          </div>

          {/* Standard Heading */}
          <div className="text-xl md:text-4xl font-extrabold text-[#c89b7b] tracking-tight max-w-4xl mx-auto leading-tight">
            {headingText}
          </div>

          {/* Banner Image with Floating Badge - Full Width Container */}
          <div className="mt-12 relative w-full rounded-none md:rounded-3xl overflow-hidden h-[420px] md:h-[500px]">
            <ZigzagImages />
          </div>
        </div>
      </section>
    </div>
  );
}