import InfinitePhotoSlider from '@/src/Event/Photogallerytemplate'
import EngagementGallery from '@/src/packagess/engagement/engagementGallery'
import EngagementShoot from '@/src/packagess/engagement/engagementshoot'
import EngagementIntro from '@/src/packagess/engagement/Intro'
import StarfieldCursor from '@/src/StarFieldCursor'
import React from 'react'
import EngageInfinitePhotoSlider from './Engagephotogallerytemplate'

const EngagementClient = () => {
  return (
   <>
   <div className='bg-black'>
   
   <EngagementIntro/>
   <EngagementGallery/>
   <EngagementShoot/>
   <EngageInfinitePhotoSlider/>
   </div>
   
   </>
  )
}

export default EngagementClient
