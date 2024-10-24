import React, { useEffect, useState } from 'react'
import { Blog } from '../../../Context/Context';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import useSingleFetch from '../../hooks/useSingleFetch';
import { db } from '../../../firebase/firebase';

const FollowBtn = ({userId}) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const {currentUser} = Blog();
  const {data, loading} = useSingleFetch("users", currentUser?.uid, "follows");
  useEffect(()=>{
    setIsFollowed(data && data?.findIndex((item) => item.id === userId)!== -1);
  },[data, currentUser?.uid])
  const handleFollow = async() =>{
    try {
      if(currentUser){
        const FollowRef = doc(
          db,
          "users",
          currentUser?.uid,
          "follows",
          userId
        )
        if(isFollowed){
          await deleteDoc(FollowRef)
          toast.success("User is unFollowed");
        }
        else{
          await setDoc(FollowRef,
            {
              userId,

            });
            toast.success("User is Followed");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <>
      <button
        onClick={handleFollow}
        className={`border border-black px-3 py-[0.2rem] rounded-full ${isFollowed ? "text-gray-500 border-none" : ""}`}
        >{isFollowed ? "Following" : "Follow"}
      </button>
    </>
  )
}

export default FollowBtn
