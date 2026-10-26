
import InfinitePhotoSlider from '@/src/Event/Photogallerytemplate'
import NamingCeremonyGallery from '@/src/packagess/Naming/NamingGallery'
import NamingIntro from '@/src/packagess/Naming/NamingIntro'
import NamingCeremonyShoot from '@/src/packagess/Naming/NamingShoot'
import StarfieldCursor from '@/src/StarFieldCursor'
import React from 'react'
import NamingInfinitePhotoSlider from './NamingPhotogalleryTemplate'

const NamingPackageClient = () => {
  return (
   <>
   <div className='bg-black'>
  
   <NamingIntro/>
   <NamingCeremonyGallery/>
   <NamingCeremonyShoot/>
  <NamingInfinitePhotoSlider/>
   </div>
   
   </>
  )
}

export default NamingPackageClient
