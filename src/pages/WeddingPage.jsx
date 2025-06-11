import React, { useEffect } from 'react'
import Weddings from '../components/Weddings' 

const WeddingPage = () => {
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="py-12">      
      <Weddings title={ 'Discover Authentic Weddings'} button={false} subtitle={'Experience vibrant traditions, heartfelt ceremonies, and local culture like never before. Select a wedding you’d love to be part of.'} />
    </div>
  )
}

export default WeddingPage
