import React, {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const navigate = useNavigate()
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = jwt_decode(token);
            fetchUserData(decodedToken.sub, token)
        } else {
            setAuth({
                ...auth,
                isAuth: false,
                user: null,
                status: 'done',
            });
            navigate("/login")
        }
    }, []);

    function login(jwt_token) {
        localStorage.setItem('token', jwt_token)
        const decodedToken = jwt_decode(jwt_token);
        void fetchUserData(decodedToken.sub, jwt_token, "/");
    }

    function logout() {
        localStorage.removeItem('token');
        // localStorage.clear();
        setAuth({
            ...auth,
            isAuth: false,
            user: null,
            status: 'done',
        });
        navigate("/login")
    }

    const data = {
        isAuth: auth.isAuth,
        user: auth.user,
        login: login,
        logout: logout,
    }

    async function fetchUserData(id, token, redirectUrl) {
        try {
            const response = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/user`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            console.log(response.data)

            setAuth({
                ...auth,
                isAuth: true,
                user: {
                    email: decodedToken.email,
                    id: decodedToken.sub
                },
                status: 'done',
            });

            if (redirectUrl) {
                navigate(redirectUrl);
            }
        } catch (e) {
            console.error(e);
            setAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;