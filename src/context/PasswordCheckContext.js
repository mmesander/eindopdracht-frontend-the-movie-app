import React, {createContext, useContext, useState} from "react";
import {PasswordContext} from "./PasswordContext";

export const PasswordCheckContext = createContext("");

function PasswordCheckContextProvider({children}) {
    const [passwordCheck, setPasswordCheck] = useState();
    const [passwordCheckError, setPasswordCheckError] = useState();
    const {password} = useContext(PasswordContext);

    const data = {
        passwordCheck: passwordCheck,
        passwordCheckError: passwordCheckError
    }

    return(
        <PasswordCheckContext.Provider value={data}>
            {children}
        </PasswordCheckContext.Provider>
    )
}

export default PasswordCheckContextProvider;