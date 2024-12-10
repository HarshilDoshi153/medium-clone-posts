import React from 'react'
import { Navigate } from 'react-router-dom';
import FollowBtn from '../../../UsersToFollow/FollowBtn';
import Loading from '../../../../Demo/Loading';

const ProfileFollowings = ({ getFollowingsData, allUsers }) => {

    const {data, loading} = getFollowingsData;
    const followingIds = data?.map(following => following.userId);
    const followingsData = allUsers?.filter(user => followingIds.includes(user.userId));
    // console.log(followingsData);

    return (
        <>
        {loading ? <Loading/> : followingsData && followingsData?.map((user, i) => {
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
    )
}

export default ProfileFollowings
