"use client"
import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import { UserType } from "@/app/types/userType";
import { getCurrentUserData } from '@/app/utils/fetchFunctions/getCurrentUserDataAPI';

type OmittedUser = Omit<UserType, 'password_hash' | 'created_at' | 'updated_at'>

interface UserContextType {
    currentUserData: OmittedUser;
    setCurrentUserData: Dispatch<SetStateAction<OmittedUser>>;
}

// Context that will be used in components
export const UserContext = createContext<UserContextType>({} as UserContextType);

// UserProvider, for wrapping components that use UserContext
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [currentUserData, setCurrentUserData] = useState<OmittedUser>({
        username: '',
        contacts: [],
        conversations: []
    });

    // Fetch user's data whenever new user logs in
    useEffect(() => {
        const fetchCurrentUser = async () => {
            const user = await getCurrentUserData();
            setCurrentUserData(user);
        };
        fetchCurrentUser();
    }, [currentUserData._id]);

    return (
        <UserContext.Provider value={{
            currentUserData, 
            setCurrentUserData}}>
            {children}
        </UserContext.Provider>
    );
};
