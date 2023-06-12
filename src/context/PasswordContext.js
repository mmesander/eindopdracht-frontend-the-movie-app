import React, {createContext, useState} from "react";

export const PasswordContext = createContext("");

function PasswordContextProvider({children}) {
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    function handleInputPassword(e) {
        const input = e.target.value;
        setPassword(input);

        if (input === "" || input.length > 7) {
            setPasswordError("");
        } else {
            setPasswordError("Gebruik minimaal 8 tekens");
        }
    }

    const data = {
        password: password,
        passwordError: passwordError,
        handleInputPassword: handleInputPassword
    }

    return (
        <PasswordContext.Provider value={data}>
            {children}
        </PasswordContext.Provider>
    )
}

export default PasswordContextProvider;