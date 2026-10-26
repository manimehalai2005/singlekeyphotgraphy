
import InfinitePhotoSlider from '@/src/Event/Photogallerytemplate'
import BirthdayGallery from '@/src/packagess/birthday/BirthdayGallery'
import BrithdayIntro from '@/src/packagess/birthday/birthdayIntro'
import BirthdayShoot from '@/src/packagess/birthday/Birthdayshoot'
import React from 'react'
import BirthdayInfinitePhotoSlider from './BirthdayPhotogalleryTemplate'

const BirthdayPackageClient = () => {
  return (
   <>
   <div className='bg-black'>
   <BrithdayIntro/>
   <BirthdayGallery/>
   <BirthdayShoot/>
  <BirthdayInfinitePhotoSlider/>
   </div>
   </>
  )
}

export default BirthdayPackageClient
