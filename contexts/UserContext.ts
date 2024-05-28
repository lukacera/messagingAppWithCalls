import React, { createContext, useState, useContext } from 'react';

interface UserInterface {
    username: string,
    contacts: UserInterface[]
}

const UserContext: UserInterface = createContext({});

export const UserProvider = ({ children }) => {
    
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
