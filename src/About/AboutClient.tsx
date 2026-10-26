import PhotographyAboutPage from "@/src/About/Aboutusintro";
import WhyChooseUsSection from "@/src/About/ChooseusSection";
import PhotographyPortfolioTemplate from "@/src/About/mainsecondsection";
import MissionVisionSection from "@/src/About/MissionVisionSection";
import WhatICaptureSection from "@/src/About/Thridsection";
import StarfieldCursor from "@/src/StarFieldCursor";

export default function AboutClient() {
  return (
    <main className="relative min-h-screen bg-black text-white">
     
      <div className="fixed inset-0 pointer-events-none z-0">
       
      </div>

      
      <div className="relative z-10 bg-transparent">
        <PhotographyAboutPage />
        <PhotographyPortfolioTemplate />
        <WhatICaptureSection />
       
        <WhyChooseUsSection />
       
      </div>
    </main>
  );
}