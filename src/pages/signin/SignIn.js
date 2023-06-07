// Functions
import React, {useContext} from "react";

// Context
import {AuthContext} from "../../context/AuthContext";

function SignIn() {
    const {login} = useContext(AuthContext);

    return (
        <>
            <h1>This is the singin page</h1>
            <button
                type="button"
                onClick={login}
            >
                Inloggen
            </button>
        </>
    )
}

export default SignIn;