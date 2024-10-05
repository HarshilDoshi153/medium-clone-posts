import React from 'react'
import {MdKeyboardArrowLeft} from 'react-icons/md';
import Input from '../../../utils/input';

const SignUp = ({setSignReq}) => {
  return (
    <div className="size mt-[6rem] text-center">
      <h2 className="text-3xl">Sign Up with email</h2>
      <p className="w-full sm:w-[25rem] mx-auto py-[3rem]">
        Enter the email address associated with your account, and we’ll send a
        magic link to your inbox.
      </p>
      <form className="flex flex-col gap-2">
        <Input type="text" title="Username" />
        <Input type="email" title="Email" />
        <Input type="password" title="Password" />
        <Input type="password" title="Repassword" />
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
