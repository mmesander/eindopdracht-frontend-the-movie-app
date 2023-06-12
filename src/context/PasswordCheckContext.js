import React, {createContext, useState} from "react";

export const PasswordCheckContext = createContext("");

function PasswordCheckContextProvider({children}) {
    const [passwordCheck, setPasswordCheck] = useState();
    const [passwordCheckError, setPasswordCheckError] = useState();

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