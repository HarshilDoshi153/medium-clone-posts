import React, { useState } from 'react'
import { BsMedium } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { LiaEditSolid } from 'react-icons/lia';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Search from './Search';
import Modal from '../../../utils/Modal';
import UserModal from './UserModal';

const HomeHeader = () => {
  const [modal, setModal] = useState(false);
  return (
    <header className='border-b border-gray-400'>
      <div className='size h-[60px] flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Link to={"/"}>
            <span className='text-7xl'><BsMedium /></span>
          </Link>
          <Search />
        </div>
        <div className='flex items-center  gap-3'>
          <Link to={"/write"} className='hidden md:flex items-center gap-1 text-black hover:text-banner'>
            <span className='text-3xl'>
              <LiaEditSolid />
            </span>
            <span className='text-lg'>Write</span>
          </Link>
          <Link to={"/notifications"} className='md:flex items-center gap-1 text-black hover:text-banner'>
            <span className='text-3xl'><IoMdNotificationsOutline /></span>
          </Link>
          <div  className='flex items-center relative cursor-pointer'>
            <img onClick={()=> setModal(true)} className='w-9 rounded-full  object-cover' src='src\assets\profile.jpg' alt='Profile' />
            <span className='text-black hover:text-banner'>
              <MdKeyboardArrowDown/>
            </span>
            <Modal modal={modal} setModal={setModal}>
              <div className={`${modal ? "visible opacity-100%":"invisible opacity-0"} transition-all duration-200`}>
                <UserModal/>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HomeHeader
