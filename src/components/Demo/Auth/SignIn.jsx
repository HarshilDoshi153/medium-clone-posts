import React, { useState } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md';
import Input from '../../../utils/input';
import { toast } from 'react-toastify';
import {auth, db, provider} from '../../../firebase/firebase.js';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = ({ setSignReq }) => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate();
  const handleSubmit = async(e) =>{
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate("/");
      toast.success("User Signed In Successfully")
    } catch (error) {
      toast.error("Invalid email address or password");
    }
  }
  return (
    <div className="size mt-[6rem] text-center">
      <h2 className="text-3xl">Sign in with email</h2>
      <p className="w-full sm:w-[25rem] mx-auto py-[3rem]">
        Enter the email address associated with your account, and we’ll send a
        magic link to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Input form={form} setForm={setForm} type="email" title="email" />
        <Input form={form} setForm={setForm} type="password" title="password" />
        <button
          className={`px-4 py-1 my-3 text-sm rounded-full bg-green-700
        hover:bg-green-800 text-white w-fit mx-auto`}>
          Sign In
        </button>
      </form>
      <button
        onClick={() => setSignReq("")}
        className="mt-5 text-sm text-green-600 hover:text-green-700
      flex items-center mx-auto">
        <MdKeyboardArrowLeft />
        All Sign In Options
      </button>
    </div>
  )
}

export default SignIn
