import React from 'react'

const Loading = () => {
  return (
    // <div className='flex flex-col inset-0 justify-center items-center size-30'>
    <div className='fixed inset-0 grid place-items-center bg-white z-30'>
        <img src='src\assets\Loading.gif' alt='Loading...'/>
    </div>
  )
}

export default Loading
