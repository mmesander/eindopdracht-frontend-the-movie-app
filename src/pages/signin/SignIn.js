// Styles
import './SignIn.css'

// Functions
import React, {useContext} from "react";
import { Link } from 'react-router-dom';

// Context
import {AuthContext} from "../../context/AuthContext";
import {UsernameContext} from "../../context/UsernameContext";
import {PasswordContext} from "../../context/PasswordContext";

function SignIn() {
    const {login} = useContext(AuthContext);
    const {username, usernameError, handleInputUsername} = useContext(UsernameContext);
    const {password, passwordError, handleInputPassword} = useContext(PasswordContext);

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
                                value={password}
                                onChange={handleInputPassword}
                            />
                        </label>
                        <p>{passwordError}</p>
                        <button
                            type="button"
                            onClick={login}
                        >
                            Inloggen
                        </button>
                    </form>
                    <h3>Nog geen account? <Link to="/registratie">Registreer je nu!</Link></h3>
                </div>
            </div>
        </>
    )
}

export default SignIn;