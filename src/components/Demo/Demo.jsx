import React from 'react'
import Banner from './Banner'
import Posts from './Components/Posts'
import Trending from './Trending'
import Discover from './Components/Discover'
const Demo = () => {
  return (
    <>
      <Banner />
      <Trending />
      <div className='size py-7 flex flex-col-reverse md:flex-row gap-[7rem]'>
        <div className='flex-[1.5]'>
          <Posts />
        </div>
        <div className='flex-[1] relative'>
          <Discover />
        </div>
      </div>
    </>
  )
}

export default Demo
