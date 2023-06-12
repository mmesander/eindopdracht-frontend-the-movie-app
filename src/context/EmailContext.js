import React, {createContext, useState} from "react";

export const EmailContext = createContext("");

function EmailContextProvider({children}) {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const data = {
        email: email,
        emailError: emailError
    }

    return (
        <EmailContext.Provider value={data}>
            {children}
        </EmailContext.Provider>
    )
}

export default EmailContextProvider;