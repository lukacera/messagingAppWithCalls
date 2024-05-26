"use client"
import React from 'react';
import {CldImage} from "next-cloudinary"
import { FaArrowRight } from "react-icons/fa";

const LoginPage: React.FC = () => {
  return (
    <main className='w-screen h-screen grid grid-cols-2'>
        {/* Login container */}
        <div className='w-full h-full flex items-center justify-center flex-col
        gap-7 p-20 px-60'>
          <div className='flex flex-col items-center gap-2'>
            <h2 className='font-bold text-[2.2rem] tracking-wide'>Reach me</h2>
            <span className='font-semibold text-[1.2rem] tracking-wider'>
              Welcome back!
            </span>
            <span className='tracking-tight'>
              Please enter your details
            </span>
          </div>
          <div className='flex flex-col gap-8 w-full'>
            <div className='flex flex-col gap-1 items-start'>
              <span>Username</span>
              <input type="text" className='py-2 w-full rounded-md border-2'/>
            </div>
            <div className='flex flex-col gap-1 items-start'>
              <span>Password</span>
              <input type="text" className='py-2 w-full rounded-md border-2'/>
            </div>          
          </div>
          <div className='bg-purple-600 w-full flex justify-center 
          items-center gap-4 p-3 text-white'>
            <span>
              Login
            </span>
            <FaArrowRight />
          </div>
          <p className='flex gap-1'>
            <span>
              Don't have an account?
            </span>
            <span className='text-purple-600'>
              Sign up
            </span>
          </p>
        </div>
      <div className='relative w-full h-full'>
        <CldImage
          alt=''
          src="videoCall_heaswe" // Use this sample image or upload your own via the Media Explorer
          fill
          radius={40}
        />
      </div>   
    </main>
  );
};

export default LoginPage;