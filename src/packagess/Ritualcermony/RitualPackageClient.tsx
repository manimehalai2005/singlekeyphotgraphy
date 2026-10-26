import InfinitePhotoSlider from '@/src/Event/Photogallerytemplate'
import RitualCeremonyShoot from '@/src/packagess/Ritualcermony/Ritualceremonyshoot'
import RitualGallery from '@/src/packagess/Ritualcermony/RitualGallery'
import RitualIntro from '@/src/packagess/Ritualcermony/RitualIntro'
import StarfieldCursor from '@/src/StarFieldCursor'
import React from 'react'
import RitualInfinitePhotoSlider from './RitualPhotogalleryTemplate'

const RitualPackageClient = () => {
  return (
  <>
  <div className='bg-black'>
   
  <RitualIntro/>
  <RitualGallery/>
  <RitualCeremonyShoot/>
  <RitualInfinitePhotoSlider/>
  </div>
  </>
  )
}

export default RitualPackageClient
