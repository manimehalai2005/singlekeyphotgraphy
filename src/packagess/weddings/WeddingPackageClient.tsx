
import InfinitePhotoSlider from "@/src/Event/Photogallerytemplate"
import AboutUsWeddingPackageClient from "@/src/packagess/weddings/About"
import FashionTemplate from "@/src/packagess/weddings/intro"
import WeddingEvents from "@/src/packagess/weddings/Weddingevents"
import StarfieldCursor from "@/src/StarFieldCursor"
import WeddingInfinitePhotoSlider from "./WeddingPhotogalleryTemplate"


const WeddingPackageClient = () => {
  return (
 <>
 <div className="bg-black">
 
<FashionTemplate/>
<AboutUsWeddingPackageClient/>
<WeddingEvents/>
<WeddingInfinitePhotoSlider/>
</div>
</>
  
  )
}

export default WeddingPackageClient
