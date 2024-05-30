"use client"
import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import { UserType } from "@/app/types/userType";
import { getCurrentUserData } from '@/app/utils/fetchFunctions/getCurrentUserDataAPI';
import { useRouter } from 'next/navigation';
import { ObjectId, Types } from 'mongoose';

type OmittedUser = Omit<UserType, 'password_hash' | 'created_at' | 'updated_at'>

interface UserContextType {
    currentUserData: OmittedUser;
    setCurrentUserData: Dispatch<SetStateAction<OmittedUser>>;
}

// Context that will be used in components
export const UserContext = createContext<UserContextType>({} as UserContextType);

// UserProvider, for wrapping components that use UserContext
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    
    const router = useRouter();

    const [currentUserData, setCurrentUserData] = useState<OmittedUser>({
        username: '',
        contacts: [],
        conversations: []
    });

    /*
    UseEffect will run only when user currentUserData._id exists, when not, 
    it will redirect to login page, else it will fetch current user data 
    */
    const [currentUserId, setCurrentUserId] = useState<null | ObjectId>(null);

    useEffect(() => {
        if (currentUserData._id) {
            setCurrentUserId(currentUserData._id);
        }
    }, [currentUserData._id]);

    useEffect(() => {
        if (currentUserId) {
            const fetchCurrentUser = async () => {
                const user = await getCurrentUserData();
                setCurrentUserData(user);
            };
            fetchCurrentUser();
        } else {
            router.push('/login');
        }
    }, [currentUserId]);

    return (
        <UserContext.Provider value={{
            currentUserData, 
            setCurrentUserData}}>
            {children}
        </UserContext.Provider>
    );
};
