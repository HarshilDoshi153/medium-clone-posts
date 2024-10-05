import React from 'react'

const Banner = () => {
    return (
        <>
            <div className='bg-banner border-b border-black'>
                <div className='size py-[5rem] flex flex-col items-start gap-[3rem] font-normal'>
                    <h1 className=' text-[3rem] sm:text-[4rem] md:text-[6rem] font-normal'>Stay Curious.</h1>
                    <h3 className=' text-[2rem] sm:text-[4rem] md:text-[2rem] font-normal'>Discover Stories, thinking and expertise from <br /> writers on any topic.</h3>
                    <button className={` bg-black text-white text-[1rem] rounded-full px-3 p-2 font-normal`}>Start Reading</button>
                </div>
            </div>
        </>
    )
}

export default Banner
