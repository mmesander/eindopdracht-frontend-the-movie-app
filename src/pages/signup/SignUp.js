// Styles
import './SignUp.css'

// Functions
import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

// Components
import InputElement from "../../components/inputelement/InputElement";

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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleRegister(e) {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");
        try {
            const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
                username: username,
                email: email,
                password: password,
                role: ["user"]
            });

            if (response.data) {
                setError(false);
            }

            if (response.data.message === "User registered successfully!") {
                console.log("Registratie gelukt!")
                navigate("/login")
            }
        } catch (e) {
            console.error(e.response.data)
            setError(true);
            if (e.response.data.message.includes("email")) {
                setErrorMessage("Registratie mislukt! Het emailadres is al in gebruik!")
            } else if (e.response.data.message.includes("username")){
                setErrorMessage("Registratie mislukt! De gebruikersnaam is al in gebruik!")
            } else {
                setErrorMessage("Registratie mislukt!")
            }
        }
        setLoading(false);
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
                            label="Gebruikersnaam"
                            placeholder="Gebruikersnaam"
                            value={username}
                            onChange={handleInputUsername}
                            errors={usernameError}
                        />
                        <InputElement
                            type="password"
                            name="password"
                            id="reg-password-field"
                            label="Wachtwoord"
                            placeholder="Wachtwoord"
                            value={password}
                            onChange={handleInputPassword}
                            errors={passwordError}
                        />
                        <InputElement
                            type="password"
                            name="password-check"
                            id="password-check-field"
                            label="Wachtwoord controle"
                            placeholder="Wachtwoord controle"
                            value={passwordCheck}
                            onChange={handleInputPasswordCheck}
                            errors={passwordCheckError}
                        />
                        {loading ? <p className="loading">Aan het laden.. een moment geduld alstublieft</p> : <p>{errorMessage}</p>}
                        <button
                            type="submit"
                            disabled={username.length < 0 || username.length < 6|| password.length < 6 || password !== passwordCheck}
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
