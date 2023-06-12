import React, {createContext, useContext, useState} from "react";
import {PasswordContext} from "./PasswordContext";

export const PasswordCheckContext = createContext("");

function PasswordCheckContextProvider({children}) {
    const [passwordCheck, setPasswordCheck] = useState(false);
    const [passwordCheckError, setPasswordCheckError] = useState("");
    const {password} = useContext(PasswordContext);

    function handleInputPasswordCheck(e) {
        const input = e.target.value;
        setPasswordCheck(input);

        if (input === password) {
            setPasswordCheckError("")
        } else {
            setPasswordCheckError("Wachtwoorden komen niet overeen")
        }
    }

    const data = {
        passwordCheck: passwordCheck,
        passwordCheckError: passwordCheckError,
        handleInputPasswordCheck: handleInputPasswordCheck
    }

    return(
        <PasswordCheckContext.Provider value={data}>
            {children}
        </PasswordCheckContext.Provider>
    )
}

export default PasswordCheckContextProvider;