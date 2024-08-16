import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState('');

    const setUser = (email) =>{
        setUserEmail(email);
    }

    useEffect(()=> console.log(userEmail), [userEmail]);

    return (
        <UserContext.Provider value={{ userEmail, setUserEmail, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
