import React, { useState } from 'react'
import { discover, discoverActions } from '../../../data.js';

const Discover = () => {
    const [activeButtons, setActiveButtons] = useState(Array(discover.length).fill(false));

    const handleToggle = (index) => {
        // Toggle the background color for the clicked button
        const updatedButtons = [...activeButtons];
        updatedButtons[index] = !updatedButtons[index];
        setActiveButtons(updatedButtons);
    };
    return (
        <div className='sticky top-[6rem]'>
            <div className='border-b border-gray-400 pb-3'>
                <h2 className='font-bold'>Discover more of what matters to you</h2>
                <div className='my-2 flex items-center gap-3 flex-wrap pt-3 text-black'>
                    {discover.map((item, i) => (<button onClick={() => handleToggle(i)} key={i} className={`py-1 px-3 rounded-full ${activeButtons[i] ? 'bg-green-600 text-gray-100' : 'bg-gray-200'
                        } transition-all duration-300`}>{item}</button>))}
                </div>
                <button className='px-1 pt-5 font-light text-green-600 hover:text-green-700'>See more topics</button>
            </div>
            <div className='my-2 flex items-center gap-3 flex-wrap pt-3 text-black'>
                {discoverActions.map((item,i) => (<button key={i} >{item}</button>))}
            </div>
        </div>
    )
}

export default Discover
