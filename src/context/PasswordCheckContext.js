import React, {createContext, useContext, useState} from "react";
import {PasswordContext} from "./PasswordContext";

export const PasswordCheckContext = createContext("");

function PasswordCheckContextProvider({children}) {
    const [passwordCheck, setPasswordCheck] = useState("");
    const [passwordCheckError, setPasswordCheckError] = useState("");
    const {password} = useContext(PasswordContext);

    function handleInputPasswordCheck(e) {
        const input = e.target.value;
        setPasswordCheck(input);

        if (input !== password && input.length > 0) {
            setPasswordCheckError("Wachtwoorden komen niet overeen")
        } else {
            setPasswordCheckError("")
        }


    }

    const data = {
        passwordCheck: passwordCheck,
        passwordCheckError: passwordCheckError,
        handleInputPasswordCheck: handleInputPasswordCheck
    }

    return (
        <PasswordCheckContext.Provider value={data}>
            {children}
        </PasswordCheckContext.Provider>
    )
}

export default PasswordCheckContextProvider;