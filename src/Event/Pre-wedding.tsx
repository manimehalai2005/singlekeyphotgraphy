import React from 'react';

export default function BentoBlogTemplate() {
  return (
    <section className="min-h-screen bg-[#112318] p-4 md:p-8 flex items-center justify-center font-sans">
      {/* Outer Bento Grid Container */}
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Column: Latest Blog Card */}
        <div className="lg:col-span-4 bg-[#f8f9f5] border-4 border-[#1a3826] rounded-xl overflow-hidden flex flex-col justify-between shadow-xl">
          <div>
            <div className="relative h-[320px] w-full overflow-hidden bg-emerald-100">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000"
                alt="Woman relaxing by pool"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-gray-500">
                LATEST BLOG
              </span>
              <h2 className="text-xl font-serif font-bold text-gray-900 mt-2 leading-snug">
                The Forgotten Joy of Getting Lost in the moment
              </h2>
              <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                Why sometimes the best adventures happens when you put away the GPS. It is crucial to enjoy the moment when everyone is obsessed with the fast paced world.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (Stacked Cards) */}
        <div className="lg:col-span-8 grid grid-cols-1 gap-4">
          
          {/* Top Wide Banner: Featured Collection */}
          <div className="relative bg-[#1a3826] border-4 border-[#1a3826] rounded-xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2 h-[240px]">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000"
                  alt="Camera feature"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-lg hidden md:block">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000"
                  alt="Wanderlust landscape"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-lg hidden md:block">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000"
                  alt="Portraits"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="p-6 bg-[#1a3826] text-white">
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-emerald-400">
                FEATURED COLLECTION
              </span>
              <h3 className="text-lg md:text-xl font-serif mt-1 tracking-wide">
                When precision meets wanderlust - a journey of unexpected discoveries beyond mapped routes
              </h3>
            </div>
          </div>

          {/* Bottom Grid: Testimonial & Midnight Oil Blog */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Testimonial / Quote Box */}
            <div className="md:col-span-5 bg-[#bce3c5] border-4 border-[#1a3826] rounded-xl p-6 flex flex-col justify-between shadow-xl text-gray-900">
              <p className="font-serif italic text-base md:text-lg leading-snug">
                &quot;Her words aren&apos;t just stories—they&apos;re mirrors reflecting our unspoken experiences.&quot;
              </p>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-emerald-700/20">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200"
                  alt="Sarah K."
                  className="w-10 h-10 rounded-full object-cover border border-emerald-900"
                />
                <div>
                  <h4 className="text-sm font-bold">Sarah K.</h4>
                  <p className="text-[11px] text-gray-700">Marketing Director</p>
                </div>
              </div>
            </div>

            {/* Midnight Oil Blog Card */}
            <div className="md:col-span-7 bg-[#f8f9f5] border-4 border-[#1a3826] rounded-xl overflow-hidden flex flex-col justify-between shadow-xl">
              <div>
                <div className="h-[180px] w-full overflow-hidden bg-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1000"
                    alt="Professional Kitchen"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-serif font-bold text-gray-900 leading-snug">
                    Midnight Oil: Tales from Professional Kitchens
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    Navigating adult friendships and why they&apos;re nothing like what you expected.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2">
                <a
                  href="#read-more"
                  className="text-xs font-semibold uppercase tracking-wider text-gray-900 hover:text-emerald-700 inline-flex items-center gap-1"
                >
                  Read More <span>→</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}