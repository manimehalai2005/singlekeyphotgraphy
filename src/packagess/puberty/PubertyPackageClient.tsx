
import InfinitePhotoSlider from '@/src/Event/Photogallerytemplate'
import PubertyCeremonyVisionBoard from '@/src/Event/puberty/Pubertyceremony'
import PuberityCeremonyShoot from '@/src/packagess/puberty/pubertycermonyshoot'
import PubertyGallery from '@/src/packagess/puberty/pubertyGallery'
import PubertyIntro from '@/src/packagess/puberty/pubertyintro'
import StarfieldCursor from '@/src/StarFieldCursor'
import React from 'react'
import PubertyInfinitePhotoSlider from './PubertyPhotogalleryTemplate'

const PubertyPackageClient = () => {
  return (
   <>
   <div className='bg-black'>
  
   <PubertyIntro/>
   <PubertyCeremonyVisionBoard/>
   <PuberityCeremonyShoot/>
   <PubertyInfinitePhotoSlider/>
   </div>
   </>
  )
}

export default PubertyPackageClient
