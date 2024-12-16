import { createContext, useContext, useState } from "react"
import UserApi from "../services/api/UserApi"

export const StudentStateContext = createContext({
    user : {},
    setUser: () => {},
    login: (email,password) => {},
    logout: () => {},
    Authenticated: false,
    setAuthenticated: () => {},
    setToken: () => {},
})

export default function StudentContext({children}) {
    const [user, setUser] = useState({})
    const [Authenticated, _setAuthenticated] = useState('true' === window.localStorage.getItem('AUTHENTICATED'))
    const login = async (email,password) => {
        return UserApi.login(email,password)
    }
    const logout = () => {
        setUser({})
        setAuthenticated(false)
    }
    const setAuthenticated = (isAuthenticated) => {
        _setAuthenticated(isAuthenticated);
        window.localStorage.setItem('AUTHENTICATED', isAuthenticated);
    }
    const setToken = (token) => {
        window.localStorage.setItem('token', token);

    }
        return <>
            <StudentStateContext.Provider value={{
                user,
                login,
                logout,
                setUser,
                Authenticated,
                setAuthenticated,
                setToken
            }}>
                {children}
            </StudentStateContext.Provider>
        </>
     }

export const useUserContext = () => useContext(StudentStateContext)
