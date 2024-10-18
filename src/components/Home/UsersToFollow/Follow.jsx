import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { Blog } from '../../../Context/Context';

const Follow = () => {
  const { data, loading } = useFetch("users");
  const [count, setCount] = useState(3);
  const { currentUser } = Blog();
  const users = data && data?.slice(0, count).filter((user) => user.userId !== currentUser?.uid);
  console.log(users);
  return (
    <>
      {data && users?.map((user, i) => {
        const { userName, bio, userImg, userId, email } = user;
        return (<div key={i} className='flex items-start gap-2 my-6'>
          <div className='flex-1 flex item-center gap-2 cursor-pointer '>
            <img src={userImg ? userImg : "src/assets/profile.jpg"} alt='' className='rounded-full w-[3rem]' />
            <div className='px-2 flex flex-col'>
              <span className='text-lg font-semibold'>{userName}</span>
              <span className='text-sm'>{email}</span>
            </div>
            <div className='flex fle'>
              <button>Follow</button>
            </div>
          </div>
        </div>);
      })}
    </>
  )
}

export default Follow
