import React from 'react'

const ProfileAbout = ({getUserData, setEditModal}) => {
  return (
    <div className='w-full'>
      <p className='text-2xl first-letter:uppercase'>
      {getUserData?.bio ? getUserData.bio : getUserData ? `${getUserData.userName} has no bio` : "Loading..."}
      </p>
      <div className="text-right">
        <button onClick={() => setEditModal(true)} className='border border-black py-2 px-5 rounded-full text-black mt-[3rem] hover:bg-gray-200'>Edit</button>
      </div>
    </div>
  )
}

export default ProfileAbout
