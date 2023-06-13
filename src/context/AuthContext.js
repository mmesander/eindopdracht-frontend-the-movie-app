import React, {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const navigate = useNavigate()
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
    });

    useEffect(() => {
        if (!auth.isAuth) {
            navigate("/login")
        }
    }, []);

    function login() {
        setAuth({
            ...auth,
            isAuth: true,
            user: {
                email: 'mark@novi.nl',
                id: '1'
            }
        });
        console.log("Gebruiker is ingelogd")
        navigate("/")
    }

    function logout() {
        setAuth({
            ...auth,
            isAuth: false,
            user: null,
        });
        console.log("Gebruiker is uitgelogd")
        navigate("/login")
    }

    const data = {
        isAuth: isAuth,
        logout: logout,
        login: login
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;