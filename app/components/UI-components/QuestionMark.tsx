import React, { useState } from 'react';
import { FaQuestion } from "react-icons/fa";

const rules = {
    username: [
        "Must consist of at least 1 uppercase letter, 1 lowercase letter, and 1 number",
        "Must have between 6 and 20 characters"
    ],
    password: [
        "Must consist of at least 1 uppercase letter, 1 lowercase letter, and 1 number",
        "Must have at least 8 characters"
    ]
};

const QuestionMark: React.FC<{ type: "username" | "password" }> = ({ type }) => {

    const isUsername = type === "username";
    
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    return (
        <div className='flex items-center gap-2 relative'>
            <div 
            onMouseEnter={() => setIsModalOpen(true)}
            onMouseLeave={() => setIsModalOpen(false)}
            className='p-2 bg-purple-600 hover:bg-purple-900
            rounded-full max-w-[2rem] cursor-pointer'>
                <FaQuestion color='white'/>
            </div>
            {isModalOpen && 
                <div className={`absolute ${isUsername ? '-bottom-10' : 'top-0'} -right-[22rem] z-10
                bg-white shadow-lg border rounded-lg p-4 max-w-[20rem]`}>
                    <ul className='list-decimal text-[0.85rem] p-2 flex flex-col gap-5'>
                        {rules[type].map((rule, index) => (
                            <li key={index}>{rule}</li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    );
};

export default QuestionMark;
