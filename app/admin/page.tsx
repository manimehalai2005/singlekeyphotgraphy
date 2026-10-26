'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export default function AdminLoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      if (data.session) {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

 

const handleGoogleLogin = async () => {
  setErrorMessage(null);
  setOauthLoading(true);

  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Google login error:", error.message);
      setErrorMessage(error.message);
      setOauthLoading(false);
    }
  } catch (err) {
    console.error("Google login failed:", err);
    setErrorMessage("Google login failed. Please try again.");
    setOauthLoading(false);
  }
};

  return (
    <div className="relative w-full overflow-hidden flex flex-col font-sans select-none min-h-screen">
      
      {/* Static Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://pub-27b08ca42de846119fe71d8c460d36c9.r2.dev/wp-uploads/2024/01/Pre-Wedding-Photography-Pollachi-15-1-scaled.jpg"
          alt="Static Background"
          className="w-full h-full object-cover"
        />
        {/* Soft Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      {/* Main Container - Center Aligned Login Form Over The Background */}
      <main className="relative z-30 flex-1 flex items-center justify-center px-4 py-12 min-h-screen">
        <div className="w-full max-w-md rounded-2xl p-8 sm:p-12 flex flex-col items-center bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
          
          <h1 className="text-3xl font-serif italic text-[#c89B7B] mb-6 tracking-wide">
            Log in
          </h1>

          {/* Error Banner */}
          {errorMessage && (
            <div className="w-full mb-6 p-3 rounded bg-red-500/20 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            
            {/* Email Input */}
            <div className="relative border-b border-slate-300 focus-within:border-white transition-colors py-2 flex items-center gap-3">
              <User size={18} className="text-slate-300 shrink-0" />
              <input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent text-white text-lg font-serif italic placeholder:text-slate-300 outline-none"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative border-b border-slate-300 focus-within:border-white transition-colors py-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 w-full">
                <Lock size={18} className="text-[#c89B7B] shrink-0" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-transparent text-lg text-white font-serif italic placeholder:text-slate-300 outline-none"
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#c89B7B] hover:text-white transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex flex-col items-center gap-4">
              <button
                type="submit"
                disabled={loading || oauthLoading}
                className="w-full bg-[#c89B7B] font-serif italic hover:bg-slate-200 text-slate-950 font-medium py-3 rounded-md text-sm transition-all shadow-lg cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Log in'}
              </button>
            </div>

          </form>

          {/* Divider */}
          <div className="w-full my-6 flex items-center gap-3">
            <div className="flex-1 h-[1px] bg-white/10" />
            <span className="text-xs text-slate-400 font-sans uppercase tracking-widest">OR</span>
            <div className="flex-1 h-[1px] bg-white/10" />
          </div>

          {/* OAuth Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading || oauthLoading}
            className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white border border-white/15 py-3 rounded-md text-sm font-sans transition-all cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
              />
            </svg>
            <span>{oauthLoading ? 'Redirecting to Google...' : 'Continue with Google'}</span>
          </button>

        </div>
      </main>

    </div>
  );
}