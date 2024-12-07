import React, { useEffect, useState } from 'react'
import Modal from '../../../utils/Modal'
import { LiaTimesSolid } from "react-icons/lia";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { auth, db, provider } from '../../../firebase/firebase.js'
import SignIn from './SignIn';
import SignUp from './SignUp';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Auth = ({ modal, setModal }) => {
    const [createUser, setCreateUser] = useState(false);
    const [signReq, setSignReq] = useState("");
    const navigate = useNavigate();
    const googleAuth = async () => {
        try {
            const createUser = await signInWithPopup(auth, provider);
            const newUser = createUser.user;

            const ref = doc(db, "users", newUser.uid);
            const userDoc = await getDoc(ref);
            if (!userDoc.exists()) {
                await setDoc(ref, {
                    userId: newUser.uid,
                    userName: newUser.displayName,
                    email: newUser.email,
                    userImg: newUser.photoURL,
                    bio: ""
                });
                navigate("/");
                toast.success("User has been signed in");
                setModal(false);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const githubAuth = async () => {
        const githubProvider = new GithubAuthProvider();

        try {
            const createUser = await signInWithPopup(auth, githubProvider);
            const newUser = createUser.user;

            const ref = doc(db, "users", newUser.uid);
            const userDoc = await getDoc(ref);

            if (!userDoc.exists()) {
                await setDoc(ref, {
                    userId: newUser.uid,
                    userName: newUser.displayName || "GitHub User",
                    email: newUser.email,
                    userImg: newUser.photoURL || "",
                    bio: "",
                });
            }
            navigate("/");
            toast.success("User has been signed in");
            setModal(false);
        }
        catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    const hidden = modal ? "visible opacity-100" : "invisible opacity-0";

    // Handle scrolling based on editModal state
    useEffect(() => {
        if (modal) {
            document.body.style.overflow = "hidden"; // Disable scrolling
        } else {
            document.body.style.overflow = "auto"; // Enable scrolling
        }

        // Cleanup to reset scrolling behavior
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [modal]);

    return (
        <Modal modal={modal} setModal={setModal}>
            <section className={` border z-50 fixed top-0 bottom-0 left-0 md:left-[10rem] bg-white right-0 md:right-[10rem] flex justify-center py-24 overflow-auto shadows ${hidden} transition-all duration-500`}>
                <button onClick={() => setModal(false)} className='absolute top-8 right-8 text-2xl hover:opacity-50'><LiaTimesSolid /></button>
                <div className='flex flex-col items-center gap-[3rem]'>
                    {signReq === "" ? (
                        <>
                            <h2 className='text-2xl pt-[5rem]'>{createUser ? "Join Medium." : "Welcome Back !"}</h2>
                            <div className='flex flex-col gap-5 w-fit mx-auto'>
                                <Button click={() => googleAuth()} icon={<FcGoogle className='text-2xl' />} text={createUser ? "Sign Up with Google" : "Sign In with Google"} />
                                <Button click={() => githubAuth()} icon={<FaGithub className='text-2xl' />} text={createUser ? "Sign Up with GitHub" : "Sign In with GitHub"} />
                                <Button click={() => setSignReq(createUser ? "sign-up" : "sign-in")} icon={<AiOutlineMail className='text-2xl' />} text={createUser ? "Sign Up with Email" : "Sign In with Email"} />
                            </div>
                            <p> {createUser ? "Already have one?" : "No Account yet?"}
                                <button onClick={() => setCreateUser(!createUser)} className='text-green-600 hover:text-green-700 font-bold ml-2'>{createUser ? "Sign In" : "Create One"}</button>
                            </p>
                        </>
                    ) : signReq === "sign-in" ? (
                        <SignIn setModal={setModal} setSignReq={setSignReq} />
                    ) : signReq === "sign-up" ? (
                        <SignUp setModal={setModal} setSignReq={setSignReq} />
                    ) : null}
                    <p className='md:w-[30rem] mx-auto text-center text-sm mb-[3rem]'>
                        Click {createUser ? "Sign Up" : "Sign In"} to agree to Medium's Terms of Service and acknowledge that Medium's Privacy Policy applies to you.
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
