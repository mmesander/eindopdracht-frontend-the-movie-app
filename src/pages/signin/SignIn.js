// Styles
import './SignIn.css'

// Functions
import React, {useContext} from "react";

// Context
import {AuthContext} from "../../context/AuthContext";
import {UsernameContext} from "../../context/UsernameContext";

function SignIn() {
    const {login} = useContext(AuthContext);
    const {username, usernameError, handleInputUsername} = useContext(UsernameContext);

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
                                value={username}
                                onChange={handleInputUsername}
                            />
                        </label>
                        <p>{usernameError}</p>
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