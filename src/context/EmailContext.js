import React, {createContext, useState} from "react";

export const EmailContext = createContext("");

function EmailContextProvider({children}) {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    function handleInputEmail(e) {
        const input = e.target.value;
        setEmail(input);

        if (input.includes('@') === false) {
            setEmailError("Voer een geldig emailadres in");
        } else {
            setEmailError("");
        }
    }

    const data = {
        email: email,
        emailError: emailError,
        handleInputEmail: handleInputEmail
    }

    return (
        <EmailContext.Provider value={data}>
            {children}
        </EmailContext.Provider>
    )
}

export default EmailContextProvider;