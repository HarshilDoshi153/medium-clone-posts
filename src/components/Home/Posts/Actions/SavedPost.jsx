import React, { useEffect, useState } from 'react'
import { CiSaveDown2 } from 'react-icons/ci'
import { Blog } from '../../../../Context/Context';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';
import { toast } from 'react-toastify';
import useSingleFetch from '../../../hooks/useSingleFetch';

const SavedPost = ({ post }) => {
  const [isSaved, setIsSaved] = useState(false);
  const { currentUser } = Blog();
  const { data, loading } = useSingleFetch("users", post?.UserId, "savePost");
  useEffect(() => {
    setIsSaved(data && data.find((item) => item.id === post?.id))
  }, [data,post?.id])
  const handleSave = async () => {
    try {
      if (currentUser) {
        const saveRef = doc(db, "users", currentUser?.uid, "savePost", post?.id);
        if (isSaved) {
          await deleteDoc(saveRef);
          toast.success("Post has beed unsaved");
        }
        else {
          await setDoc(saveRef, {
            ...post,
          })
          toast.success("Post has been saved");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <button onClick={handleSave} className=''>
        <CiSaveDown2 className={`text-2xl hover:text-banner ${isSaved ? 'text-green-600 font-bold' : ''}`} />
      </button>
    </>
  )
}

export default SavedPost
