'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Image as ImageIcon, Calendar, MessageSquare, LogOut, ShieldCheck } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    async function checkUserSession() {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        // Session illana login page-ke anuppidum
        router.push('/login'); // Ungaloda login page route path (e.g., '/login' or '/admin')
      } else {
        setUserEmail(session.user.email ?? 'Admin');
        setLoading(false);
      }
    }

    checkUserSession();
  }, [router]);

  // Handle Logout
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0c0d10] flex items-center justify-center text-[#c89B7B] font-serif italic text-xl">
        Loading SingleKey Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0d10] text-white p-6 sm:p-10 font-sans selection:bg-[#c89B7B] selection:text-black">
      
      {/* Top Header Card */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center bg-black/40 border border-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-md shadow-2xl gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#c89B7B] mb-1">
            <ShieldCheck size={18} />
            <span className="text-xs uppercase tracking-widest font-sans">Admin Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif italic text-[#c89B7B]">
            SingleKey Photography
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Welcome back, <span className="text-white font-medium">{userEmail}</span>
          </p>
        </div>

        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 px-5 py-2.5 rounded-xl text-sm transition-all cursor-pointer"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Main Dashboard Content Grid */}
      <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Gallery Management Card */}
        <div 
          onClick={() => router.push('/dashboard/gallery')}
          className="group bg-black/40 hover:bg-black/60 border border-white/10 hover:border-[#c89B7B]/50 p-6 rounded-2xl backdrop-blur-md transition-all cursor-pointer shadow-xl flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#c89B7B]/10 border border-[#c89B7B]/30 flex items-center justify-center text-[#c89B7B] mb-4 group-hover:scale-110 transition-transform">
              <ImageIcon size={24} />
            </div>
            <h3 className="text-xl font-serif italic text-[#c89B7B] mb-2">Galleries</h3>
            <p className="text-sm text-slate-400">
              Manage wedding albums, pre-wedding shoots, and traditional event portfolios.
            </p>
          </div>
          <div className="mt-6 text-xs text-[#c89B7B] tracking-wider uppercase font-sans flex items-center gap-1">
            <span>Open Galleries &rarr;</span>
          </div>
        </div>

        {/* Bookings Card */}
        <div className="bg-black/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md shadow-xl flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#c89B7B]/10 border border-[#c89B7B]/30 flex items-center justify-center text-[#c89B7B] mb-4">
              <Calendar size={24} />
            </div>
            <h3 className="text-xl font-serif italic text-[#c89B7B] mb-2">Bookings</h3>
            <p className="text-sm text-slate-400">
              View upcoming client event schedules, dates, and package selections.
            </p>
          </div>
          <div className="mt-6 text-xs text-slate-500 tracking-wider uppercase font-sans">
            <span>Coming Soon</span>
          </div>
        </div>

        {/* Client Queries Card */}
        <div className="bg-black/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md shadow-xl flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#c89B7B]/10 border border-[#c89B7B]/30 flex items-center justify-center text-[#c89B7B] mb-4">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-xl font-serif italic text-[#c89B7B] mb-2">Client Enquiries</h3>
            <p className="text-sm text-slate-400">
              Check contact form messages and direct photography quote requests.
            </p>
          </div>
          <div className="mt-6 text-xs text-slate-500 tracking-wider uppercase font-sans">
            <span>Coming Soon</span>
          </div>
        </div>

      </div>

    </div>
  );
}