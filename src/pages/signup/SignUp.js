// Styles
import './SignUp.css'

// Functions
import React, {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";

// Components
import inputElement from "../../components/inputelement/InputElement";

// Context
import {UsernameContext} from "../../context/UsernameContext";
import {PasswordContext} from "../../context/PasswordContext";
import {PasswordCheckContext} from "../../context/PasswordCheckContext";
import {EmailContext} from "../../context/EmailContext";
import InputElement from "../../components/inputelement/InputElement";
// import axios from "axios";

function SignUp() {
    const navigate = useNavigate();

    const {email, emailError, handleInputEmail} = useContext(EmailContext);
    const {username, usernameError, handleInputUsername} = useContext(UsernameContext);
    const {password, passwordError, handleInputPassword} = useContext(PasswordContext);
    const {passwordCheck, passwordCheckError, handleInputPasswordCheck} = useContext(PasswordCheckContext);

    async function handleRegister(e) {
        e.preventDefault();
        // try {
        //     const response = await axios.get('https://frontend-educational-backend.herokuapp.com/api/test/all');
        //
        // } catch (e) {
        //     console.error(e)
        // }
        console.log(e.data)
        navigate("/login")
    }

    return (
        <>
            <div className="signup-outer-container">
                <div className="signup-inner-container">
                    <h1>Registreren</h1>
                    <form id="signup-form" onSubmit={handleRegister}>
                        <InputElement
                            type="email"
                            name="email"
                            id="reg-email-field"
                            label="Email"
                            placeholder="jouw@email.com"
                            value={email}
                            onChange={handleInputEmail}
                            errors={emailError}
                        />
                        <InputElement
                            type="text"
                            name="username"
                            id="reg-username-field"
                            placeholder="Gebruikersnaam"
                            value={username}
                            onChange={handleInputUsername}
                            errors={usernameError}
                        />
                        <label htmlFor="reg-password-field">
                            Wachtwoord
                            <input
                                type="password"
                                name="password"
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
