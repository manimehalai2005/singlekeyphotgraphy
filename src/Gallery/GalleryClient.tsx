import AboutUs from "@/src/Gallery/About";
import ArtisticCollage from "@/src/Gallery/ArticleCollege";
import InteriorGallery from "@/src/Gallery/Introgallery";
import PolaroidsFamilyCollage from "@/src/Gallery/PolaridFamilyGallery";



export default function GalleryClient() {
  return (
    <main className="relative bg-black min-h-screen text-white">
 
    
      <div className="relative z-10">
        <div className="bg-black">
          <InteriorGallery />
        </div>
        <AboutUs />   
     
        <PolaroidsFamilyCollage />
      </div>
    </main>
  );
}