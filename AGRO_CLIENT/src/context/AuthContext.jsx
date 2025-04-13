import { createContext, useContext, useEffect, useState } from "react";
import { loginService } from "../services/AuthService";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [ user, setUser ] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const login = async (username, password) => {
        const response = await loginService(username, password)
        setUser(response)
        localStorage.setItem('user', JSON.stringify(response))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    } 

    return (
        <AuthContext.Provider value={{ user, login, logout }} >
            {children}
        </AuthContext.Provider>
    )
}

