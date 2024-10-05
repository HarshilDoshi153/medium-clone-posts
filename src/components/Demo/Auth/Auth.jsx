import React, { useState } from 'react'
import Modal from '../../../utils/Modal'
import { LiaTimesSolid } from "react-icons/lia";
import { MdFacebook } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineMail } from "react-icons/ai";
import SignIn from './SignIn';
import SignUp from './SignUp';

const Auth = () => {
    const [createUser, setCreateUser] = useState(false);
    const [signReq, setSignReq] = useState(""); // Corrected

    return (
        <Modal>
            <section className='z-50 fixed top-0 bottom-0 left-0 md:left-[10rem] bg-white right-0 md:right-[10rem] flex justify-center py-24 overflow-auto shadows'>
                <button className='absolute top-8 right-8 text-2xl hover:opacity-50'><LiaTimesSolid /></button>
                <div className='flex flex-col items-center gap-[3rem]'>
                    {signReq === "" ? (
                        <>
                            <h2 className='text-2xl pt-[5rem]'>{createUser ? "Join Medium." : "Welcome Back !"}</h2>
                            <div className='flex flex-col gap-5 w-fit mx-auto'>
                                <Button icon={<FcGoogle className='text-2xl' />} text={createUser ? "Sign Up with Google" : "Sign In with Google"} />
                                <Button icon={<MdFacebook className='text-2xl text-blue-700' />} text={createUser ? "Sign Up with Facebook" : "Sign In with FaceBook"} />
                                <Button click={() => setSignReq(createUser ? "sign-up" : "sign-in")} icon={<AiOutlineMail className='text-2xl' />} text={createUser ? "Sign Up with Email" : "Sign In with Email"} />
                            </div>
                            <p> {createUser ? "Already have one?" : "No Account yet?"}
                                <button onClick={() => setCreateUser(!createUser)} className='text-green-600 hover:text-green-700 font-bold ml-2'>{createUser ? "Log In" : "Create One"}</button>
                            </p>
                        </>
                    ) : signReq === "sign-in" ? (
                        <SignIn setSignReq={setSignReq} />
                    ) : signReq === "sign-up" ? (
                        <SignUp setSignReq={setSignReq} />
                    ) : null}
                    <p className='md:w-[30rem] mx-auto text-center text-sm mb-[3rem]'>
                        Click "Sign In" to agree to Medium's Terms of Service and acknowledge that Medium's Privacy Policy applies to you.
                    </p>
                </div>
            </section>
        </Modal>
    )
}

export default Auth

const Button = ({ icon, text, click }) => {
    return (
        <button onClick={click} className='flex items-center gap-10 sm:w-[20rem] border border-spacing-3 p-2 justify-start rounded-full border-black'>
            {icon}
            {text}
        </button>
    );
}
