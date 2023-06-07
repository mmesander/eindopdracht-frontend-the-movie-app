// Functions
import React, {useContext} from "react";

// Context
import authContext, {AuthContext} from "../../context/AuthContext";

function SingIn() {
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

export default SingIn;