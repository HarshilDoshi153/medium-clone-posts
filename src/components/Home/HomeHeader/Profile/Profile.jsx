import React, { useEffect, useState } from 'react';
import ProfileHome from './Activities/ProfileHome';
import ProfileLists from './Activities/ProfileLists';
import ProfileAbout from './Activities/ProfileAbout';
import { LiaTimesSolid } from 'react-icons/lia';
import { IoSettingsSharp } from 'react-icons/io5';
import Modal from '../../../../utils/Modal';
import { discoverActions } from '../../../../data';
import { Blog } from '../../../../Context/Context';
import EditProfile from './EditProfile';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const activities = [
    {
      title: "Home",
      comp: ProfileHome
    },
    {
      title: "Lists",
      comp: ProfileLists
    },
    {
      title: "About",
      comp: ProfileAbout
    }
  ];

  // const [loading, setLoading] = useState(false)
  const { allUsers } = Blog();
  const { userId } = useParams();
  const [currentActive, setCurrentActive] = useState(activities[0]);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const getUserData = allUsers.find((user) => user.userId === userId);

  // Handle scrolling based on editModal state
  useEffect(() => {
    if (editModal) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }

    // Cleanup to reset scrolling behavior
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [editModal]);
  return (
    <section className='size flex gap-[4rem] relative'>
      <div className='mt-[9rem] flex-[2]'>
        <div className='flex items-center gap-4'>
          <h2 className='text-3xl sm:text-5xl font-bold capitalize'>{getUserData?.userName}</h2>
          <p className='text-gray-500 text-xs sm:text-sm'>Followers(2)</p>
          <p className='text-gray-500 text-xs sm:text-sm'>Followings(2)</p>
        </div>
        <div className='flex items-center gap-5 mt-[3rem] border-b border-gray-300 mb-[3rem]'>
          {activities.map((item) => (
            <div key={item.title} className={`py-[0.5rem] px-[1rem] ${item.title === currentActive.title ? "border-b border-gray-700" : ""}`}>
              <button onClick={() => setCurrentActive(item)}>{item.title}</button>
            </div>
          ))}
        </div>
        <currentActive.comp getUserData={getUserData} setEditModal={setEditModal} />
      </div>
      <button onClick={() => setModal(true)} className='fixes top-[8rem] right-0 w-[2rem] h-[2rem] bg-black text-white grid items-center justify-center rounded-lg md:hidden'>
        <IoSettingsSharp />
      </button>
      <Modal modal={modal} setModal={setModal}>
        <div className={`flex-[1] border-l border-gray-300 p-[2rem] z-10 fixed right-0 bottom-0 top-0 w-[18rem] bg-white md:sticky
        ${modal ? "translate-x-0" : "translate-x-[100%] md:translate-x-0"} transition-all duration-500`}>
          <div className="pb-4 text-right">
            <button onClick={() => setModal(false)} className="inline-block md:hidden">
              <LiaTimesSolid />
            </button>
          </div>
          <div className='sticky top-7 flex flex-col justify-between'>
            <img className='w-[3.5rem] h-[3.5rem] object-cover rounded-full' src={getUserData?.userImg} alt='profile' />
            <h2 className='py-2 font-bold capitalize'>{getUserData?.userName ? getUserData.userName : getUserData ? "Unknown User" : "Loading..."}</h2>
            <p className='text-gray-500 first-letter:uppercase text-sm'>{getUserData?.bio ? getUserData.bio : getUserData ? `${getUserData.userName} has no bio` : "Loading..."}</p>
            <button onClick={() => setEditModal(true)} className='text-green-700 pt-6 text-sm w-fit'>Edit Profile</button>
            <div className='flex-[1] flex items-center flex-wrap gap-3 pt-8'>
              {discoverActions.map((item) => (
                <button key={item} className='text-sm text-black1'>{item}</button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
      {editModal && <EditProfile editModal={editModal} setEditModal={setEditModal} getUserData={getUserData} />}
    </section>
  );
};

export default Profile;
