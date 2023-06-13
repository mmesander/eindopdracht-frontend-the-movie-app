// Styles
import './SignUp.css'

// Functions
import React, {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";

// Context
import {UsernameContext} from "../../context/UsernameContext";
import {PasswordContext} from "../../context/PasswordContext";
import {PasswordCheckContext} from "../../context/PasswordCheckContext";
import {EmailContext} from "../../context/EmailContext";

function SignUp() {
    const {email, emailError, handleInputEmail} = useContext(EmailContext);
    const {username, usernameError, handleInputUsername} = useContext(UsernameContext);
    const {password, passwordError, handleInputPassword} = useContext(PasswordContext);
    const {passwordCheck, passwordCheckError, handleInputPasswordCheck} = useContext(PasswordCheckContext);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        navigate("login")
    }

    return (
        <>
            <div className="signup-outer-container">
                <div className="signup-inner-container">
                    <h1>Registreren</h1>
                    <form id="signup-form" onSubmit={handleSubmit}>
                        <label htmlFor="reg-email-field">
                            Email
                            <input
                                type="email"
                                name="reg-email"
                                id="reg-email-field"
                                placeholder="jouw@email.com"
                                value={email}
                                onChange={handleInputEmail}
                            />
                        </label>
                        <p>{emailError}</p>
                        <label htmlFor="reg-username-field">
                            Gebruikersnaam
                            <input
                                type="text"
                                name="reg-username"
                                id="reg-username-fiel"
                                placeholder="Gebruikersnaam"
                                value={username}
                                onChange={handleInputUsername}
                            />
                        </label>
                        <p>{usernameError}</p>
                        <label htmlFor="reg-password-field">
                            Wachtwoord
                            <input
                                type="password"
                                name="reg-password"
                                id="reg-password-field"
                                placeholder="Wachtwoord"
                                value={password}
                                onChange={handleInputPassword}
                            />
                        </label>
                        <p>{passwordError}</p>
                        <label htmlFor="reg-password-check-field">
                            Wachtwoord Controle
                            <input
                                type="password"
                                name="reg-password-check"
                                id="reg-password-check-field"
                                placeholder="Wachtwoord controle"
                                value={passwordCheck}
                                onChange={handleInputPasswordCheck}
                            />
                        </label>
                        <p>{passwordCheckError}</p>

                        <button
                            type="submit"
                            disabled={username.length < 0 || password.length < 8 || password !== passwordCheck}
                        >
                            Registreren
                        </button>
                    </form>
                    <h3>Terug naar de <Link to="/login">login</Link> pagina</h3>
                </div>
            </div>
        </>
    )
}

export default SignUp;
