import Footer from '@/src/Footer/Footer'
import PhotoAboutSection from '@/src/Intro/Aboutslide'
import HeroSection from '@/src/Intro/Heroslide'
import StarfieldCursor from '@/src/StarFieldCursor'

import React from 'react'
import BookingSection from './BookingSection'
import ReviewSection from '../components/ReviewSection'


const HomeClient = () => {
  return (
    <div className='relative min-h-screen bg-black text-white'>
      
     
    
      <div className="relative z-10 bg-transparent">
        <HeroSection />
       
      </div>
        <div className='w-full px-1 sm:px-0 mx-auto'>
              <BookingSection />
            </div>
        <ReviewSection/>
      
    </div>
  )
}

export default HomeClient