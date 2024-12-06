import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { Blog } from '../../../Context/Context';
import FollowBtn from './FollowBtn';

const Follow = () => {
  const { data, loading } = useFetch("users");
  const { currentUser } = Blog();
  const users = data && data?.filter((user) => user.userId !== currentUser?.uid);
  return (
    <>
      {data && users?.map((user, i) => {
        const { userName, bio, userImg, userId, email } = user;
        return (
          <div key={i} className="flex items-start gap-2 my-4">
              <div
                onClick={() => navigate("/profile" + "/" + userId)}
                className="flex-1 flex items-center gap-2 cursor-pointer">
                <img
                  className="w-[3rem] h-[3rem] object-cover gap-2 cursor-pointer rounded-full"
                  src={userImg ? userImg : "src/assets/profile.jpg"}
                  alt="userImg"
                />
                <div className="flex flex-col gap-1">
                  <h2 className="font-bold capitalize">{userName}</h2>
                  <span className="leading-4 text-gray-500 text-sm line-clamp-2">
                    {email}
                  </span>
                </div>
              </div>
              <FollowBtn userId={userId} />
            </div>
        );
      })}
    </>
  );
}

export default Follow;
