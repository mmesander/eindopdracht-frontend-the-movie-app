import React, {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";

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

    function login(jwt_token) {
        const decodedToken = jwt_decode(jwt_token);
        localStorage.setItem('token', jwt_token)
        setAuth({
            ...auth,
            isAuth: true,
            user: {
                email: decodedToken.email,
                id: decodedToken.sub
            }
        });
        console.log("Gebruiker is ingelogd")
        navigate("/")
    }

    function logout() {
        localStorage.removeItem('token');
        setAuth({
            ...auth,
            isAuth: false,
            user: null,
        });
        console.log("Gebruiker is uitgelogd")
        navigate("/login")
    }

    const data = {
        isAuth: auth.isAuth,
        user: auth.user,
        login: login,
        logout: logout,
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;