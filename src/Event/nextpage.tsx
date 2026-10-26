"use client";

import React from "react";

export default function Home() {
  return (
    <main className=" overflow-hidden bg-black">
      <section className="relative  w-full px-4 py-4 md:px-8 md:py-6">
        <div
          className="
              absolute
              left-[78px]
              top-[110px]
              h-[300px]
              w-[260px]
              rounded-[16px]
              border
              border-white/20
              bg-white/10
              p-5
              backdrop-blur-md
            "
        ></div>
        <div
          className="
            absolute
            left-[420px]
            top-[15px]
            hidden
            h-[200px]
            w-[305px]
            rounded-[25px]
            bg-white
            shadow-[0_15px_50px_rgba(100,50,50,0.08)]
            md:block
          "
        >
          <div className="flex h-full flex-col items-center pt-[65px]">
            <h2 className="text-[17px] font-medium text-zinc-900">
              Clinician Portal
            </h2>

            <p className="mt-2 text-[10px] text-zinc-500">
              Your health context, ready for meaningful care.
            </p>

            <div className="mt-8 h-[50px] w-[260px] rounded-full bg-gradient-to-b from-[#f8eeee] to-white shadow-inner" />
          </div>
        </div>

        {/* ================= LARGE WHITE CARD ================= */}
        <div
          className="
            absolute
            left-[135px]
            top-[150px]
            hidden
            h-[200px]
            w-[380px]
            rounded-[28px]
            bg-white
            shadow-[0_20px_60px_rgba(100,50,50,0.08)]
            md:block
          "
        ></div>

        {/* ================= MAIN HERO ================= */}
        <div
          className="
            relative
            z-20
            mx-auto
            mt-[275px]
            h-[200px]
            w-[300px]
            
           
            overflow-hidden
            rounded-[25px]
            bg-[#bd3039]
            shadow-[0_25px_70px_rgba(100,30,30,0.15)]
            md:ml-[27%]
          "
        >
          {/* Grid lines */}
          <div className="pointer-events-none absolute inset-0 z-10 opacity-20">
            <div className="absolute left-[10%] top-0 h-full w-px bg-white" />

            <div className="absolute left-[30%] top-0 h-full w-px bg-white" />

            <div className="absolute left-[50%] top-0 h-full w-px bg-white" />

            <div className="absolute left-[70%] top-0 h-full w-px bg-white" />

            <div className="absolute left-[90%] top-0 h-full w-px bg-white" />

            <div className="absolute left-0 top-[33%] h-px w-full bg-white" />

            <div className="absolute left-0 top-[66%] h-px w-full bg-white" />
          </div>

          {/* ================= NAVBAR ================= */}
          <nav className="relative z-30 flex h-[70px] items-center justify-between px-5 md:px-7">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex h-[25px] w-[25px] items-center justify-center rounded-full border border-white">
                <div className="h-[11px] w-[11px] rounded-full border border-white" />
              </div>
            </div>

            {/* Navigation */}
            <div className="hidden items-center gap-6 text-[9px] text-white md:flex">
              <a href="#how" className="transition-opacity hover:opacity-60">
                How It Works
              </a>

              <a
                href="#features"
                className="transition-opacity hover:opacity-60"
              >
                Features
              </a>

              <a
                href="#clinicians"
                className="transition-opacity hover:opacity-60"
              >
                For Clinicians
              </a>

              <a href="#about" className="transition-opacity hover:opacity-60">
                About Fera
              </a>
            </div>

            {/* Button */}
            <button className="rounded-[8px] bg-white px-4 py-2 text-[9px] font-medium text-zinc-900 shadow-sm transition-transform hover:scale-105">
              Get started
            </button>
          </nav>

          {/* ================= WOMEN IMAGE ================= */}
          <div
            className="
              absolute
              bottom-0
              left-1/2
              z-20
              h-[440px]
              w-[720px]
              -translate-x-1/2
              bg-contain
              bg-bottom
              bg-no-repeat
            "
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1400&auto=format&fit=crop')",
            }}
          />

          {/* Image soft overlay */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[280px] bg-gradient-to-t from-[#bd3039]/30 to-transparent" />

          {/* ================= FLOATING LABELS ================= */}

          <div className="absolute left-[22px] top-[158px] z-40 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[8px] text-white backdrop-blur-md">
            Adaptive Dashboard
          </div>

          <div className="absolute left-[205px] top-[88px] z-40 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[8px] text-white backdrop-blur-md">
            Clinical Portal
          </div>

          <div className="absolute right-[15px] top-[145px] z-40 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[8px] text-white backdrop-blur-md">
            AI Check-in
          </div>

          {/* ================= HERO TEXT ================= */}
          <div className="absolute bottom-[125px] left-1/2 z-40 w-full -translate-x-1/2 px-5 text-center">
            <h1 className="text-[38px] font-light leading-[1.15] tracking-[-1px] text-white md:text-[46px]">
              Your cycle.
              <span className="mx-2 font-[cursive] italic">Your data.</span>
              <br />
              Your
              <span className="mx-2 font-[cursive] italic">clarity.</span>
            </h1>
          </div>

          {/* ================= CTA ================= */}
          <button
            className="
              absolute
              bottom-[78px]
              left-1/2
              z-40
              -translate-x-1/2
              rounded-[7px]
              bg-white
              px-4
              py-2
              text-[9px]
              font-medium
              text-zinc-900
              shadow-lg
              transition-transform
              hover:scale-105
            "
          >
            Start for Free
          </button>
        </div>
      </section>
    </main>
  );
}
