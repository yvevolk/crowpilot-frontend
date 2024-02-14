
import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [userToken, setUserToken] = useState({token: null, username: 'hharr'})

    return (
        <AuthContext.Provider value={{ userToken, setUserToken }}>
            {children}
        </AuthContext.Provider>
    )
}