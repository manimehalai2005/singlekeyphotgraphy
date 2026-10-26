import PhotoGalleryTemplate from "../Photogallerytemplate"
import WeddingDriftGallery from "../Prewedd"
import ThankYouWeddingCard from "./weddingEvent"
import WeddingSaveTheDateTemplate from "./Weddingsecondpart"
import WeddingHexagonSaveTheDate from "./Weddingthirdpart"


const overallweddingpage = () => {
  return (
   <>
   <ThankYouWeddingCard/>
   <WeddingSaveTheDateTemplate/>
   <WeddingHexagonSaveTheDate/>
 
   <WeddingDriftGallery/>
   </>
  )
}

export default overallweddingpage
