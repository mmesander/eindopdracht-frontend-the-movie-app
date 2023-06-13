import React, {createContext, useState} from "react";

export const UsernameContext = createContext("");

function UsernameContextProvider({children}) {
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");

    function handleInputUsername(e) {
        const input = e.target.value;
        setUsername(input);

        if (input.includes('@')) {
            setUsernameError("Gebruikersnaam mag geen @ bevatten");
        } else if (input === "" || input.length > 5) {
            setUsernameError("");
        } else {
            setUsernameError("Gebruik minimaal 6 tekens");
        }
    }

    const data = {
        username: username,
        usernameError: usernameError,
        handleInputUsername: handleInputUsername
    }

    return (
        <UsernameContext.Provider value={data}>
            {children}
        </UsernameContext.Provider>
    )
}

export default UsernameContextProvider;

