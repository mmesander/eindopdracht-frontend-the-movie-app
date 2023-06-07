import React, {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate()

    // useEffect(() => {
    //     if (!isAuth) {
    //         navigate("/login")
    //     }
    // }, []);

    function login() {
        setIsAuth(true);
        console.log("Gebruiker is ingelogd")
        navigate("/")
    }

    function logout() {
        setIsAuth(false);
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