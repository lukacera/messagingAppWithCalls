"use client"
import React, { useState } from 'react';
import {CldImage} from "next-cloudinary"
import { FaArrowRight } from "react-icons/fa";
import { login } from '../utils/fetchFunctions/loginAPI';
import { useRouter } from 'next/navigation';
import {motion} from "framer-motion"

const LoginPage: React.FC = () => {
    const router = useRouter()

    const [password, setPassword] = useState<string>("")  
    const [username, setUsername] = useState<string>("")
    const [errorValidation, setErrorValidation] = useState<string>("")

    const [usernameNotFound, setUsernameNotFound] = useState<boolean>(false)
    const [passwordIncorrect, setPasswordIncorrect] = useState<boolean>(false)

    // Function that logs user in
    const handleLogin = async (e:any) => {
  
      e.preventDefault()

      console.log("Handle login")
      if (!username || !password){
        setErrorValidation("Missing credentials")
        setPasswordIncorrect(true)
        setUsernameNotFound(true)
        return
      } 

      // Proceed with login if validation passes
      const fetched_data = await login(username, password);
  
      if (typeof (fetched_data) === "string") { // This means that !response.ok
        fetched_data.includes("Username") ? setUsernameNotFound(true) : setPasswordIncorrect(true)
        setErrorValidation(fetched_data);
        return;
      }
  
      router.push("/");
    };

    // Function that resets red border of input based on prop (PASSWORD or USERNAME)
    const handleChangeInput = (passOrUser: string, e: any) => {
      if (passOrUser === "password") {
        // Reset password incorrect flag when typing in password field
        if (passwordIncorrect) {
          setPasswordIncorrect(false);
        }
        setPassword(e.target.value);
      } else {
        // Reset username not found flag when typing in username field
        if (usernameNotFound) {
          setUsernameNotFound(false);
        }
        setUsername(e.target.value);
      }
    };
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
            <form onSubmit={(e) => handleLogin(e)}
            className='flex flex-col gap-8 w-full'>
              {/* Username */}
              <div className='flex flex-col gap-1 items-start'>
                <span>Username</span>
                <input type="text" value={username} 
                onChange={(e) => handleChangeInput("username", e)}
                className={`py-2 px-4  w-full rounded-md border-2
                ${usernameNotFound ? "border-red-400" : null}`}/>
              </div>
              {/* Password */}
              <div className='flex flex-col gap-1 items-start'>
                <span>Password</span>
                <input type="password" value={password} 
                onChange={(e) => handleChangeInput("password", e)}
                className={`py-2 px-4  w-full rounded-md border-2
                ${passwordIncorrect ? "border-red-400" : null}`}
                />
              </div> 
              <div className='min-h-[1.5rem] text-center'>
              {errorValidation && (
                <motion.span 
                  initial={{ opacity: 0, y: 100 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  className='text-red-600 font-semibold tracking-wide'
                >
                  {errorValidation}
                </motion.span>
                )}
              </div>
              <button type='submit' 
              className='bg-purple-600 w-full flex justify-center 
              items-center gap-4 p-3 text-white cursor-pointer'>
                <span>
                  Login
                </span>
                <FaArrowRight />
              </button>       
            </form>
            
            <p className='flex gap-1'>
              <span>
                Don&apos;t have an account?
              </span>
              <span className='text-purple-600'>
                Sign up
              </span>
            </p>
          </div>
        <div className='relative w-full h-full'>
          <CldImage
            priority={true}
            alt=''
            src="videoCall_heaswe" 
            fill
          />
        </div>   
      </main>
    );
};

export default LoginPage;