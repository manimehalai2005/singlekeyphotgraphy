import Image from "next/image";
import Home from "./nextpage";

export default function TemplateLayout() {
  return (
    <main className="min-h-screen bg-black text-white flex justify-center items-center p-4 md:p-8">
      {/* Main Container mirroring the aspect ratio and grid structure */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 p-3 shadow-2xl"> 
      <Home/>
       <div className="flex flex-col justify-center space-y-2">
          
          {/* Tag / Title */}
          <div className="inline-block border-b-2 border-[#E58123] pb-1 mb-4 w-fit">
            <span className="text-[#E58123] font-bold text-sm tracking-widest uppercase">
              ABOUT US
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 leading-snug mb-4">
            Freewebpsd... This is what we are and this is what we do.
          </h2>

          {/* Description Paragraph */}
          <p className="text-neutral-600 text-sm md:text-base leading-relaxed mb-6">
            We provide web solution elements. We provide PSD (Photoshop Designs Files). 
            The important thing is that the Elements we are provide is free of charge. In other words, we provide free graphics/designs Psd Files, and the graphics we provide are for all purposes which enhance the looks of your web pages... notwithstanding the purposes for which your pages are designed.
          </p>

          {/* Read More Button */}
          <div>
            <button className="bg-[#E58123] hover:bg-[#d0731f] text-white font-medium px-6 py-3 rounded-md shadow-md transition-all duration-300 flex items-center gap-2 text-sm">
              Read More
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}