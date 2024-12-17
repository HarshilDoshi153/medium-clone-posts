import React, { useState } from 'react';
import Modal from '../../../../utils/Modal';
import { LiaTimesSolid } from 'react-icons/lia';
import { Blog } from '../../../../Context/Context';
import { toast } from 'react-toastify';
import { ref } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';

const EditProfile = ({ editModal, setEditModal, getUserData }) => {
  const { currentUser } = Blog();
  const [loading, setLoading] = useState(false);

  // Initialize form state with props
  const [form, setForm] = useState({
    userName: getUserData.userName,
    bio: getUserData.bio,
  });


  const saveForm = async() => {
    if(form.userName === "" || form.bio === ""){
      toast.error("All fields are required");
      return;
    }
    setLoading(true);
    try {
      const docRef = doc(db, "users", getUserData?.userId);
      await updateDoc(docRef,{
        bio: form.bio,
        userName: form.userName,
        userImg: getUserData.userImg,
        userId: getUserData.userId,
        email: getUserData.email
      });
      setLoading(false);
      setEditModal(false);
      toast.success("Profile Updated Successfully")
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Modal modal={editModal} setModal={setEditModal}>
      <div className='center w-[95%] md:w-[45rem] bg-white shadows mx-auto my-[1rem] z-20 mb-[3rem] p-[2rem]'>
        <div className='flex items-center justify-between'>
          <h2 className='font-bold text-xl'>Profile Information</h2>
          <button onClick={() => setEditModal(false)} className='text-xl'>
            <LiaTimesSolid />
          </button>
        </div>
        <section className='mt-6 flex items-center justify-center'>
          <div className="flex gap-[2rem]">
            <div className='w-[5rem]'>
              <img
                className='min-w-[5rem] min-h-[5rem] object-cover rounded-full border border-gray-400'
                src={currentUser.photoURL}
                alt="Profile"
              />
            </div>
          </div>
        </section>
        <section className='pt-[1rem] text-sm'>
          <label className='pb-3 block'>Name*</label>
          <input
            type='text'
            placeholder='username...'
            className='p-1 border-b border-black w-full outline-none'
            maxLength={50}
            value={form.userName} // Use form state
            onChange={(e) => setForm({ ...form, userName: e.target.value })} // Update form state
          />
          <p className='text-sm text-gray-600 pt-2'>
            Appears on your Profile page, as your byline, and in your responses. {form.userName.length}/50
          </p>
          <section className='pt-[1rem] text-sm'>
            <label className='pb-3 block'>Bio*</label>
            <input
              type='text'
              placeholder='bio...'
              className='p-1 border-b border-black w-full outline-none'
              maxLength={160}
              value={form.bio} // Use form state
              onChange={(e) => setForm({ ...form, bio: e.target.value })} // Update form state
            />
            <p className='text-sm text-gray-600 pt-2'>
              Appears on your Profile and next to your stories. {form.bio.length}/160
            </p>
          </section>
        </section>
        <div className='flex items-center justify-end gap-4 pt-[2rem]'>
          <button
            onClick={() => setEditModal(false)}
            className='border border-green-800 text-green-800 py-2 px-5 rounded-full  hover:text-green-900 hover:border-green-900'
          >
            Cancel
          </button>
          <button
            onClick={saveForm}
            className='bg-green-800 text-white py-2 px-5 rounded-full border border-green-800 hover:bg-green-900 hover:border-green-900'
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditProfile;
