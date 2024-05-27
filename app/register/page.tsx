"use client"
import React from 'react';
import {CldImage} from "next-cloudinary"
import Link from 'next/link';
import { RegistrationForm } from '../components/registrationPageComponents/registrationForm';

const RegisterPage: React.FC = () => {
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
                    Sign up below
                </span>
              </div>
            </div>
            <RegistrationForm />
            <p className='flex gap-1'>
                <span>
                  Already made an account?
                </span>
                <Link href={"/login"}>
                <span className='text-purple-600'>
                  Login
                </span>
                </Link>
            </p>
        </div>
        <div className='relative w-full h-full'>
          <CldImage
            priority={true}
            alt=''
            src="womenTexting.jpg_arsu0m" 
            fill
          />
        </div>   
      </main>
    );
};

export default RegisterPage;