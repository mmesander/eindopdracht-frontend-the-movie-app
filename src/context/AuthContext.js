// Functions
import React, {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

// Helpers
import checkTokenValidity from "../helpers/checkTokenValidity";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const navigate = useNavigate();
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        if (storedToken && checkTokenValidity(storedToken)) {
            const decodedToken = jwt_decode(storedToken);
            void fetchUserData(decodedToken.sub, storedToken);
        } else {
            setAuth({
                ...auth,
                isAuth: false,
                user: null,
                status: 'done',
            });
            navigate("/login");
        }
    }, []);

    function login(jwt_token) {
        localStorage.setItem('token', jwt_token);
        const decodedToken = jwt_decode(jwt_token);
        void fetchUserData(decodedToken.sub, jwt_token, "/");
    }

    function logout() {
        localStorage.clear();
        setAuth({
            ...auth,
            isAuth: false,
            user: null,
            status: 'done',
        });
        navigate("/login");
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

            setAuth({
                ...auth,
                isAuth: true,
                user: {
                    id: response.data.id,
                    email: response.data.email,
                    username: response.data.username,
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