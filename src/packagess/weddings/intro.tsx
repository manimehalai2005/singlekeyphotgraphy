"use client";

export default function BabyIntro() {
  const bgImageUrl = "https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793272047/wedding-photography-south-indian-tamil-hindu-marriage_1337_1.jpg";

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      
     
      <div className="hidden sm:block relative w-full h-full">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={bgImageUrl}
            alt="Babysho Background"
            className="baby-bg w-full h-full object-cover animate-water-wave brightness-110 contrast-105"
          />
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-16 flex flex-col items-start justify-center h-full">
          <div className="relative overflow-hidden animate-contentReveal">
            <h1 className="baby-title text-7xl font-black text-orange-400 uppercase leading-none drop-shadow-lg">
              wedding ceremony
            </h1>
            <p className="text-3xl md:text-5xl italic font-serif text-[#c89b7b] mt-2 drop-shadow-md">
              Stories
            </p>
            <div className="absolute inset-0 bg-black z-20 animate-overlayReveal pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ================= MOBILE DESIGN (Below sm) ================= */}
      <div className="sm:hidden relative w-full h-full overflow-hidden bg-black pt-0">
        
        {/* Triple Background Images in Column Layout */}
        <div className="absolute inset-x-0 top-[22%] h-[65%] flex flex-col gap-2 px-4 z-0">
          <div className="flex-1 w-full relative overflow-hidden rounded-md border border-white/10">
            <img
              src={bgImageUrl}
              alt="Babyshower Memory 1"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/15 pointer-events-none" />
          </div>
          <div className="flex-1 w-full relative overflow-hidden rounded-md border border-white/10">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc6xLNOTzUS7i7n2DGPLMlyn_5hzy9QLhtYa0H8IpZE5gAeyIsL7QNVm0&s=10"
              alt="Babyshower Memory 2"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/15 pointer-events-none" />
          </div>
          <div className="flex-1 w-full relative overflow-hidden rounded-md border border-white/10">
            <img
              src="https://www.culturalindia.net/iliimages/Tamil%20Wedding.jpg"
              alt="Babyshower Memory 3"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/15 pointer-events-none" />
          </div>
        </div>

        {/* Global Overlay */}
        <div className="absolute top-[20%] left-0 w-full h-[70%] bg-black/25 pointer-events-none z-5" />

        {/* Mobile Text - Staring cleanly from top */}
        <div className="relative z-10 flex flex-col items-start justify-start w-full h-full pt-4 px-4 text-left">
          <div className="w-full mobile-text-reveal">
            <h1 className="mobile-title text-3xl mt-10 font-black text-orange-400 uppercase leading-none">
              <span className="block">wedding ceremony</span>
            </h1>
            <p className="mobile-subtitle italic font-serif text-amber-200 text-xl mt-1">
              Stories
            </p>
          </div>
        </div>
      </div>

      {/* ================= STYLES ================= */}
      <style jsx>{`
        @keyframes waterWave {
          0% {
            transform: scale(1) translate(0, 0) rotate(0deg);
          }
          33% {
            transform: scale(1.06) translate(-10px, 12px) rotate(1deg);
          }
          66% {
            transform: scale(1.04) translate(12px, -8px) rotate(-1deg);
          }
          100% {
            transform: scale(1) translate(0, 0) rotate(0deg);
          }
        }

        @keyframes contentReveal {
          0% {
            clip-path: inset(0 100% 0 0);
          }
          100% {
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes overlayReveal {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(101%);
          }
        }

        .animate-water-wave {
          animation: waterWave 10s ease-in-out infinite;
        }

        .animate-contentReveal {
          animation: contentReveal 1.4s cubic-bezier(0.77, 0, 0.18, 1) forwards;
        }

        .animate-overlayReveal {
          animation: overlayReveal 1.2s cubic-bezier(0.77, 0, 0.18, 1) 0.2s forwards;
        }
      `}</style>
    </main>
  );
}