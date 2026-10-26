import InfinitePhotoSlider from '@/src/Event/Photogallerytemplate'
import BabyShowerGallery from '@/src/packagess/Babyshoot/BabyGallery'
import BabyShoot from '@/src/packagess/Babyshoot/Babyshoot'
import BabyIntro from '@/src/packagess/Babyshoot/Intro'
import FashionTemplate from '@/src/packagess/Babyshoot/Intro'
import StarfieldCursor from '@/src/StarFieldCursor'
import React from 'react'
import BabyInfinitePhotoSlider from './Babyphotogallerttemplate'

const BabyPackageClient= () => {
  return (
    <>
    <div className='bg-black'>
    
   <BabyIntro/>
   <BabyShowerGallery/>
   <BabyShoot/>
   <BabyInfinitePhotoSlider/>
   </div>
    </>
  )
}

export default BabyPackageClient
