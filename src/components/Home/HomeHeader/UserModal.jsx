import React from 'react';
import { BiSpreadsheet } from 'react-icons/bi';
import { HiOutlineChartBar } from 'react-icons/hi';
import { LiaEditSolid, LiaUserSolid } from 'react-icons/lia';
import { MdOutlineLocalLibrary } from 'react-icons/md';
import { Blog } from '../../../Context/Context';
import { Link, useNavigate } from 'react-router-dom';
import { secretEmail } from "../../../utils/helper";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { toast } from 'react-toastify';

const UserModal = ({setModal}) => {
    const { currentUser } = Blog();
    const userModal = [
        {
            title: "Profile",
            icon: <LiaUserSolid />,
            path: `/profile/${currentUser?.uid}`
        },
        {
            title: "Library",
            icon: <MdOutlineLocalLibrary />,
            path: "/library"
        },
        {
            title: "Stories",
            icon: <BiSpreadsheet />,
            path: "/stories"
        },
        {
            title: "Stats",
            icon: <HiOutlineChartBar />,
            path: "/stats"
        },
    ]

    const navigate = useNavigate(null);
    const logOut = async() =>{
        try {
            await signOut(auth);
            navigate("/demo");
            toast.success("User logged out");
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <section className='absolute w-[16rem] p-6 bg-white right-0 top-[100%] shadow border rounded-xl z-30'>
            <Link to={"/write"} className='flex p-2 text-lg gap-3 items-center text-black hover:text-banner border-b md:hidden'>
                <span className='text-2xl p-1 gap-3'>
                    <LiaEditSolid />
                </span>
                Write
            </Link>
            <div className='border-b'>
                {userModal.map((item, i) => (
                    <Link onClick={()=>setModal(false)} key={i} to={item.path}>
                        <div className='p-2 flex text-lg gap-3 text-black hover:text-banner items-center'>
                            <div className='p-1 flex text-2xl gap-3'>
                                {item.icon}
                            </div>
                            {item.title}
                        </div>
                    </Link>
                ))}
            </div>
            <div>
                <div onClick={logOut} className='text-black curser-pointer hover:text-red-500 text-lg'>
                    <button className='pt-3 flex item-center'>Sign-Out</button>
                    <span className='pb-3'>{secretEmail(currentUser?.email)}</span>
                </div>

            </div>
        </section>
    )
}

export default UserModal
