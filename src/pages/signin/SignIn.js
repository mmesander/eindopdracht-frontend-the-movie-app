// Styles
import './SignIn.css'

// Assets
import background from '../../assets/background.jpg'

// Functions
import React, {useContext} from "react";

// Context
import {AuthContext} from "../../context/AuthContext";

function SignIn() {
    const {login} = useContext(AuthContext);

    return (
        <>
            <div className="signin-outer-container">
                <div className="signin-inner-container">
                    <h1>This is the singin page</h1>
                    <button
                        type="button"
                        onClick={login}
                    >
                        Inloggen
                    </button>
                </div>
            </div>
        </>
    )
}

export default SignIn;