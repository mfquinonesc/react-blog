import { createContext, useContext, useState, useEffect } from "react";
import { SESSION , ACCESS_TOKEN } from '../utilities/constants';

const UserContext = createContext();

export function UserProvider({ children }) {
    
    const [user, setUser] = useState(null);
  
    useEffect(()=>{       
        const data = localStorage.getItem(SESSION);
        if(data){
            setUser(JSON.parse(data));   
        }       
    },[]);

    const login = (userData, token) => {
        setUser(userData);      
        localStorage.setItem(ACCESS_TOKEN, token);
        localStorage.setItem(SESSION,JSON.stringify(userData));
    };

    const logout = ()=>{
        setUser(null);      
        localStorage.removeItem(SESSION);
        localStorage.removeItem(ACCESS_TOKEN);
    } 

    return(
        <UserContext.Provider value={{ login, logout, user }}>
            { children }
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
