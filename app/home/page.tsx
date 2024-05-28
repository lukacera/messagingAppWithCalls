"use client"
import { CldImage } from 'next-cloudinary'
import React from 'react'
import { FaSearch } from "react-icons/fa";
import SingleProfileSidebar from '../components/mainPageComponents/SingleProfileSidebar';
import withAuth from '../components/withAuth';

function HomePage() {
  return (
    <main className='w-screen h-screen grid grid-cols-[8%_17%_75%]'>
        {/* First column */}
        <div className ='flex items-end justify-center pb-20 border-r-2 border-black'>
                <div className='w-[9rem] aspect-square absolute top-0 left-0'>
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
        <div>
            <div className='flex items-center gap-4 bg-white mx-5 my-10
            px-4 rounded-lg border-2 border-gray-400'>
                <FaSearch className='text-gray-500'/>
                <input type="text" name="" 
                className='py-3 outline-none placeholder:text-gray-500'
                placeholder='Search'/>                
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
        <div className='bg-green-500'></div>
    </main>
  )
}

export default withAuth(HomePage);

