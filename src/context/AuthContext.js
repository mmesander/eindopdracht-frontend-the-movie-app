import React, {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();

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

}

export default AuthContextProvider;