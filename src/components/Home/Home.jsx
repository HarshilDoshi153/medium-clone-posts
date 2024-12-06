import React from 'react'
import Posts from './Posts/Posts'
import Follow from './UsersToFollow/Follow'
import { Blog } from '../../Context/Context'

const Home = () => {
  const {currentUser} = Blog();
  // console.log(currentUser.uid)
  return (
    <section className='size flex gap-[5rem] relative'>
      <div className='flex-[2] py-10 mb-[4rem]'>
        <Posts userId={currentUser.uid}/>
      </div>
      <div className='hidden md:inline-block md:w-[21rem] p-7 border-l border-gray-300'>
        <h3>Who to Follow? </h3>
        <Follow/>
      </div>
    </section>
  )
}

export default Home
