import React, { useState } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md';
import Input from '../../../utils/input';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db, provider } from '../../../firebase/firebase.js';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const SignUp = ({ setSignReq }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    repassword: "",
  })
  const hasAlphabet = /[A-Za-z]/.test(form.password); // At least one letter
  const hasNumber = /\d/.test(form.password); // At least one number
  const hasSpecialChar = /[@$!%*?&]/.test(form.password);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!form.username || !form.email || !form.password || !form.repassword) {
      toast.error("All fields are required");
      return;
    }

    // Check if passwords match
    if (form.password !== form.repassword) {
      toast.error("The passwords are not matching");
      return;
    }

    // Check if password contains alphabets
    if (!hasAlphabet) {
      toast.error("Password must contain alphabets");
      return;
    }

    // Check if password contains numbers
    if (!hasNumber) {
      toast.error("Password must contain atleast one number");
      return;
    }

    // Check if password contains special characters
    if (!hasSpecialChar) {
      toast.error("Password must contain atleast one special character");
      return;
    }

    // Check if password's length is greater than 8 or not
    if (form.password.length < 8 ) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }


    try {
      const { user } = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const ref = doc(db, "users", user.uid);
      const userDoc = await getDoc(ref);
      if (!userDoc.exists()) {
        await setDoc(ref, {
          userId: user.uid,
          userName: form.username,
          email: form.email,
          userImg: "",
          bio: ""
        });
        setForm({
          username: "",
          password: "",
          email: "",
          repassword: ""
        })
        navigate("/");
        toast.success("User has been created");
      }
    } catch (error) {
      // Handle specific Firebase errors
      if (error.code === 'auth/email-already-in-use') {
        // await signOut(auth);
        toast.error("User is Signed Out");
      } else if (error.code === 'auth/weak-password') {
        toast.error("The password is too weak. Please enter a stronger password.");
      } else {
        toast.error(error.message);
      }
    }
    finally {

    }
  };

  return (
    <div className="size mt-[6rem] text-center">
      <h2 className="text-3xl">Sign Up with email</h2>
      <p className="w-full sm:w-[25rem] mx-auto py-[3rem]">
        Enter the email address associated with your account, and we’ll send a
        magic link to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Input form={form} setForm={setForm} type="text" title="username" />
        <Input form={form} setForm={setForm} type="email" title="email" />
        <Input form={form} setForm={setForm} type="password" title="password" />
        <Input form={form} setForm={setForm} type="password" title="repassword" />
        <button
          className={`px-4 py-1 my-3 text-sm rounded-full bg-green-700
        hover:bg-green-800 text-white w-fit mx-auto`}>
          Sign Up
        </button>
      </form>
      <button
        onClick={() => setSignReq("")}
        className="mt-5 text-sm text-green-600 hover:text-green-700
      flex items-center mx-auto">
        <MdKeyboardArrowLeft />
        All Sign Up Options
      </button>
    </div>
  )
}

export default SignUp
