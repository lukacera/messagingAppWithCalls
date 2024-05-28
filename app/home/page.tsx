"use client"
import { CldImage } from 'next-cloudinary'
import React from 'react'
import { FaSearch } from "react-icons/fa";
import SingleProfileSidebar from '../components/mainPageComponents/SingleProfileSidebar';
import withAuth from '../components/withAuth';
import { FaPhone } from "react-icons/fa6";
import { BsCameraVideoFill } from "react-icons/bs";

function HomePage() {
  return (
    <main className='w-screen h-screen grid grid-cols-[8%_17%_75%]'>
        {/* First column */}
        <div className ='flex items-end justify-center pb-20 border-r-2 border-black'>
                <div className='w-[9rem] aspect-square absolute -top-5 left-0'>
                    <CldImage
                    alt=''
                    src="Reach_me_prev_ui_aqi0ko"
                    fill
                    />
                </div>
                <div className='p-1 bg-gray-400 rounded-full aspect-square
                text-center grid place-items-center'>
                    <span>
                        User profile image(little bit smaller)
                    </span>
                </div>
        </div>
        {/* Second column */}
        <div className='grid grid-rows-[10%_90%]'>
            <div className='grid place-items-center'>
                <div className='flex items-center gap-4 bg-white
                px-4 rounded-lg border-2 border-gray-400'>
                    <FaSearch className='text-gray-500'/>
                    <input type="text" name=""
                    className='py-3 outline-none placeholder:text-gray-500'
                    placeholder='Search'/>
                </div>
            </div>
            <div>
                <div className='grid place-items-center w-full'>
                    <h4 className='font-bold'>All messages</h4>
                </div>
                <div className='flex flex-col gap-5 mt-5 w-[95%] mx-auto
                border-b-2 pb-7'>
                    <SingleProfileSidebar />
                    <SingleProfileSidebar />
                    <SingleProfileSidebar />
                </div>
            </div>
        </div>
        {/* Third column */}
        <div className='grid grid-rows-[10%_90%]'>
            <div className='w-full flex justify-between px-10'>
                <div className='flex items-center gap-4'>
                    <div className='w-10 aspect-square rounded-full bg-green-500'>
                    </div>
                    <div className='flex flex-col'>
                        <span>
                            Username
                        </span>
                        <span className='text-green-600 font-bold text-sm'>
                            Username is typing...
                        </span>
                    </div>
                </div>
                <div className='flex items-center gap-5 text-[1.6rem] text-gray-600'>
                    <BsCameraVideoFill />
                    <FaPhone />
                </div>
            </div>
            <div className='bg-blue-600'></div>
        </div>
    </main>
  )
}

export default withAuth(HomePage);

