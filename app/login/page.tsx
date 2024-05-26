"use client"
import React, { useEffect, useState } from 'react';
import {CldImage} from "next-cloudinary"
import { FaArrowRight } from "react-icons/fa";
import { login } from '../utils/fetchFunctions/loginAPI';
import { useRouter} from 'next/navigation';

const LoginPage: React.FC = () => {
    const router = useRouter()
    const [password, setPassword] = useState<string>("")  
    const [username, setUsername] = useState<string>("")
    const [errorValidation, setErrorValidation] = useState<string>('')

    // Function that logs user in
    const handleLogin = async () => {

      const fetched_data = await login(username, password);

      if (typeof (fetched_data) === "string") { // This means that !response.ok
          setErrorValidation(fetched_data)
          return
      }
    
      router.push("/")
  }

  useEffect(() => {
    console.log("Username changed: " + username)
  }, [username])
  
  useEffect(() => {
    console.log("password changed: " + password)
  }, [password])

  return (
    <main className='w-screen h-screen grid grid-cols-2'>
        {/* Login container */}
        <div className='w-full h-full flex items-center justify-center flex-col
        gap-7 p-20 px-60'>
          <div className='flex flex-col items-center w-full relative'>
              <div className='w-[15rem] aspect-square absolute -top-40'>
                <CldImage
                alt=''
                src="Reach_me_prev_ui_aqi0ko"
                fill
              />
              </div>
            <div className='grid place-items-center gap-3'>
              <span className='font-bold text-[1.4rem] tracking-wider'>
                Welcome back!
              </span>
              <span className='tracking-tight'>
                Please enter your details
              </span>
            </div>
          </div>
          <form className='flex flex-col gap-8 w-full'>
            {/* Username */}
            <div className='flex flex-col gap-1 items-start'>
              <span>Username</span>
              <input type="text" value={username} 
              onChange={(e) => setUsername(e.target.value)}
              className='py-2 px-4  w-full rounded-md border-2'/>
            </div>
            {/* Password */}
            <div className='flex flex-col gap-1 items-start'>
              <span>Password</span>
              <input type="text" value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className='py-2  px-4 w-full rounded-md border-2'
              />
            </div>          
          </form>
          <div className='bg-purple-600 w-full flex justify-center 
          items-center gap-4 p-3 text-white cursor-pointer'
          onClick={() => handleLogin()}>
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
          src="videoCall_heaswe" 
          fill
        />
      </div>   
    </main>
  );
};

export default LoginPage;