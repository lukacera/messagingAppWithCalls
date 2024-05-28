import React, { useState } from 'react';
import { FaArrowRight } from "react-icons/fa";
import QuestionMark from './QuestionMark';
import { register } from '@/app/utils/fetchFunctions/registrationAPI';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

// Make zod schema
const UserSchema = z.object({
    username: z.string()
      .min(6, 'Username must be at least 6 characters')
      .max(15, 'Username must be at most 15 characters')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Username must contain at least one uppercase letter, one lowercase letter, and one digit'),
    password: z.string()
      .min(8, 'Password must contain at least 8 characters')
      .max(20, 'Password must be at most 20 characters')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one digit'),
});

export const RegistrationForm: React.FC = () => {
    const router = useRouter();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [errorValidation, setErrorValidation] = useState<string>("");

    

    const handleRegistration = async (e: any) => {
        e.preventDefault();

        // Clear previous errors
        setErrorValidation("");

        try {
            // Validate inputs using Zod schema
            UserSchema.parse({ username, password });

            // Check if passwords match
            if (password !== confirmPassword) {
                setErrorValidation("Passwords do not match");
                return;
            }

            // Proceed with registration if validation passes
            const fetched_data = await register(username, password);

           

            router.push("/");
        } catch (error) {
            if (error instanceof z.ZodError) {
                const validationError = error.errors[0];
                const errMessage = validationError.message
                if (errMessage.includes("Username")){
                    setUsername("") 
                  } else {
                    setPassword("")
                    setConfirmPassword("")
                  } 
                  setErrorValidation(errMessage);
                  return;
            }
        }
    };

    return (
        <form onSubmit={handleRegistration} className='flex flex-col gap-8 w-full'>
            {/* Username */}
            <div className='flex flex-col gap-1 items-start relative'>
                <span>Username</span>
                <div className='relative w-full'>
                    <input type="text" value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="py-2 px-4 w-full rounded-md border-2" />
                    <div className='absolute top-1 -right-12'>
                        <QuestionMark type='username' />
                    </div>
                </div>
            </div>
            {/* Password */}
            <div className='flex flex-col gap-1 items-start'>
                <span>Password</span>
                <div className='relative w-full'>
                    <input type="password" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="py-2 px-4 w-full rounded-md border-2" />
                    <div className='absolute top-1 -right-12'>
                        <QuestionMark type='password' />
                    </div>
                </div>
            </div>
            {/* Repeat Password */}
            <div className='flex flex-col gap-1 items-start'>
                <span>Repeat password</span>
                <input type="password" value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="py-2 px-4 w-full rounded-md border-2" />
            </div>
            <div className='min-h-[3rem] text-center'>
                {errorValidation &&
                    <span className='text-red-600 font-semibold tracking-wide'>
                        {errorValidation}
                    </span>}
            </div>
            <button type='submit'
                className='bg-purple-600 w-full flex justify-center 
                items-center gap-4 p-3 text-white cursor-pointer'>
                <span>Sign up</span>
                <FaArrowRight />
            </button>
        </form>
    )
}
