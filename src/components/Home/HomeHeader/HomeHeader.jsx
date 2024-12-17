import React, { useState } from 'react'
import { BsMedium } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { LiaEditSolid } from 'react-icons/lia';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import Search from './Search';
import Modal from '../../../utils/Modal';
import UserModal from './UserModal';
import { Blog } from '../../../Context/Context';

const HomeHeader = () => {
  const [modal, setModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const { setPublish, currentUser } = Blog();
  const { pathname } = useLocation();
  return (
    <header className='border-b border-gray-400'>
      <div className='size h-[60px] flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Link to={"/"}>
            <img src="/src/assets/PenHub.png" className='h-[3.5rem]' alt="logo" />
          </Link>
          <Search modal={searchModal} setModal={setSearchModal} />
        </div>
        <div className='flex items-center gap-3'>
          <span
            onClick={() => setSearchModal(true)}
            className='flex sm:hidden text-3xl text-black cursor-pointer hover:text-banner'>
            <CiSearch />
          </span>
          {pathname === "/write" ? <button onClick={() => setPublish(true)} className=' text-green-800 py-2 px-5 rounded-full border border-green-800 hover:bg-green-800 hover:text-white transition-all duration-500'>Publish</button> :
            <Link to={"/write"} className='hidden md:flex items-center gap-1 text-black hover:text-banner'>
              <span className='text-3xl'>
                <LiaEditSolid />
              </span>
              <span className='text-lg'>Write</span>
            </Link>}
          <Link to={"/notifications"} className='md:flex items-center gap-1 text-black hover:text-banner'>
            <span className='text-3xl'><IoMdNotificationsOutline /></span>
          </Link>
          <div className='flex items-center relative cursor-pointer'>
            <img onClick={() => setModal(true)} className='w-9 rounded-full  object-cover' src={currentUser.photoURL} alt='Profile' />
            <span className='text-black hover:text-banner'>
              <MdKeyboardArrowDown />
            </span>
            <Modal modal={modal} setModal={setModal}>
              <div className={`${modal ? "visible opacity-100%" : "invisible opacity-0"} transition-all duration-200`}>
                <UserModal setModal={setModal} />
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HomeHeader
