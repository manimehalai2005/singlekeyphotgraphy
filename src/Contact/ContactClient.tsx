'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';

export default function ContactClient() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailID: '',
    contactNumber: '',
    packageName: '',
    sessionHours: '',
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage({ type: "", text: "" });

    // Indian Phone Number Validation: 10 digits starting with 6, 7, 8, or 9
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.contactNumber.trim())) {
      const errorText = "Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.";
      setStatusMessage({ type: "error", text: errorText });
      toast.error(errorText);
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("contact").insert({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.emailID,
        contact_number: formData.contactNumber,
        package_name: formData.packageName || null,
        session_hours: formData.sessionHours || null,
      });

      if (error) {
        console.error("Supabase Insert Error:", {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
        });

        setStatusMessage({
          type: "error",
          text: `Failed to send request: ${error.message}`,
        });
        return;
      }

      // Trigger Toast Message on Success
      toast.success("Request Sent Successfully!");

      setFormData({
        firstName: "",
        lastName: "",
        emailID: "",
        contactNumber: "",
        packageName: "",
        sessionHours: "",
      });
    } catch (err) {
      console.error("Unexpected contact form error:", err);

      setStatusMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-black">
        <div className="w-full bg-transparent relative flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden font-sans">
          {/* Background Shapes */}
          <div className="absolute inset-0 opacity-80 pointer-events-none overflow-hidden">
            <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-amber-500 blur-3xl opacity-40 animate-pulse" />
            <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-indigo-600 blur-3xl opacity-40" />
            <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-rose-500 blur-3xl opacity-30" />
          </div>

          {/* Main Container Card */}
          <div className="relative z-10 w-full max-w-4xl backdrop-blur-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Contact Panel */}
            <div className="lg:col-span-5 text-orange-500 p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
                  Contact Information
                </h2>
                <p className="text-amber-200 text-xs sm:text-sm font-light leading-relaxed">
                  1st floor, Plot no 581, 2nd East Main Rd, Anna Nagar, Madurai, Tamil Nadu 625020
                </p>

                <div className="space-y-5 pt-4">
                  <div className="flex items-center gap-4 text-xs sm:text-sm text-orange-300">
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-amber-400 shrink-0">📞</span>
                    <span>+91 9952840777</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs sm:text-sm text-orange-300">
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-amber-400 shrink-0">✉️</span>
                    <span>singlekeyphotography@gmail.com</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Dots */}
              <div className="flex items-center gap-2 pt-10">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
            </div>

            {/* Right Form Panel */}
            <div className="lg:col-span-7 p-8 sm:p-10 bg-transparent flex flex-col justify-between">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Status Alert Message (for errors) */}
                {statusMessage.text && statusMessage.type === 'error' && (
                  <div className="p-3 text-xs rounded-md bg-red-500/10 text-red-400 border border-red-500/20">
                    {statusMessage.text}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      className="w-full border-b border-slate-300 focus:border-amber-500 py-2 text-sm text-[#c89B7B] font-serif italic placeholder:text-slate-400 outline-none transition-colors bg-transparent"
                      required
                    />
                  </div>

                  {/* Last Name */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
                      className="w-full border-b border-slate-300 focus:border-amber-500 py-2 text-sm text-[#c89B7B] font-serif italic placeholder:text-slate-400 outline-none transition-colors bg-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email ID */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Email ID
                    </label>
                    <input
                      type="email"
                      name="emailID"
                      value={formData.emailID}
                      onChange={handleChange}
                      placeholder="abcd12345@gmail.com"
                      className="w-full border-b border-slate-300 focus:border-amber-500 py-2 text-sm text-[#c89B7B] font-serif italic placeholder:text-slate-400 outline-none transition-colors bg-transparent"
                      required
                    />
                  </div>

                  {/* Contact Number */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      placeholder="1234567890"
                      maxLength={10}
                      className="w-full border-b border-slate-300 focus:border-amber-500 py-2 text-sm text-[#c89B7B] font-serif italic placeholder:text-slate-400 outline-none transition-colors bg-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Package Name */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Package Name
                    </label>
                    <input
                      type="text"
                      name="packageName"
                      value={formData.packageName}
                      onChange={handleChange}
                      placeholder="Your package name"
                      className="w-full border-b border-slate-300 focus:border-amber-500 py-2 text-sm text-[#c89B7B] font-serif italic placeholder:text-slate-400 outline-none transition-colors bg-transparent"
                    />
                  </div>

                  {/* Session Hours */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Session Hours
                    </label>
                    <input
                      type="text"
                      name="sessionHours"
                      value={formData.sessionHours}
                      onChange={handleChange}
                      placeholder="2 hours session"
                      className="w-full border-b border-slate-300 focus:border-amber-500 py-2 text-sm text-[#c89B7B] font-serif italic placeholder:text-slate-400 outline-none transition-colors bg-transparent"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold px-8 py-3.5 rounded-full text-xs shadow-lg shadow-amber-500/20 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? 'Sending...' : 'Send Request'}
                  </button>
                </div>

              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}