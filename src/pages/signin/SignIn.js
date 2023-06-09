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
                    <h1>Inloggen</h1>
                    <form id="signin-form">
                        <label htmlFor="username-field">
                            Gebruikersnaam
                            <input
                                type="text"
                                name="username"
                                id="username-field"
                                placeholder="Gebruikersnaam"
                            />
                        </label>
                        <p>Hier komt een error message</p>
                        <label htmlFor="password-field">
                            Wachtwoord
                            <input
                                type="password"
                                name="password"
                                id="password-field"
                                placeholder="Wachtwoord"
                            />
                        </label>
                        <p>Hier komt ook een error message</p>
                        <button
                            type="button"
                            onClick={login}
                        >
                            Inloggen
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignIn;