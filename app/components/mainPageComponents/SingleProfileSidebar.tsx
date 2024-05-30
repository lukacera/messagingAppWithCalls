import { UserType } from '@/app/types/userType'
import React from 'react'

const SingleProfileSidebar: React.FC<{contact: UserType}> = ({
    contact
}) => {
return (
        <div className='grid grid-cols-[20%_80%]'>
            <div className='grid place-items-center'>
                <div className='w-10 aspect-square rounded-full bg-red-400'>
                </div>
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <div className='flex justify-between items-start mr-7'>
                    <span>
                        {contact.username}
                    </span>
                    <span>
                        15:40
                    </span>
                </div>
                <p className='text-sm w-[80%]'>
                    Hi! Want to grab coffee at 2:00pm?
                </p>
            </div>
        </div>  
    )
}


export default SingleProfileSidebar