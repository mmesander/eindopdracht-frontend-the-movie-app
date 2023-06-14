// Styles
import './SignUp.css';

// Functions
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from 'react-hook-form'
import axios from "axios";

// Components
import InputElement from "../../components/inputelement/InputElement";


function SignUp() {
    const navigate = useNavigate();
    const {handleSubmit, register, watch, formState: {errors, isValid}} = useForm({mode:"onChange"});

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleRegister(data) {
        console.log(data)
        setLoading(true);
        setErrorMessage("");
        try {
            const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
                username: data.username,
                email: data.email,
                password: data.password,
                role: ["user"]
            });

            console.log(response)

            if (response.data) {
                setError(false);
            }

            if (response.data.message === "User registered successfully!") {
                console.log("Registratie gelukt!")
                navigate("/login")
            }
        } catch (e) {
            console.error(e)
            setError(true);
            console.log(error);
            if (e.response.data.message.includes("email")) {
                setErrorMessage("Registratie mislukt! Het emailadres is al in gebruik!")
            } else if (e.response.data.message.includes("username")) {
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
                    <form id="signup-form" onSubmit={handleSubmit(handleRegister)}>
                        <InputElement
                            type="email"
                            name="email"
                            id="reg-email-field"
                            label="Email"
                            placeholder="jouw@email.com"
                            register={register}
                            errors={errors.email && errors.email.message}
                            validationRules={{
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: 'Verkeerd email adres'
                                }
                            }}
                        />
                        <InputElement
                            type="text"
                            name="username"
                            id="reg-username-field"
                            label="Gebruikersnaam"
                            placeholder="Gebruikersnaam"
                            register={register}
                            errors={errors.username && errors.username.message}
                            validationRules={{
                                required: 'Username is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9_]+$/,
                                    message: 'Username must contain only letters, numbers, and underscores'
                                },
                                minLength: {
                                    value: 6,
                                    message: 'Username must be at least 6 characters'
                                },
                                maxLength: {
                                    value: 20,
                                    message: 'Username must not exceed 20 characters'
                                },
                            }}
                        />
                        <InputElement
                            type="password"
                            name="password"
                            id="reg-password-field"
                            label="Wachtwoord"
                            placeholder="Wachtwoord"
                            register={register}
                            errors={errors.password && errors.password.message}
                            validationRules={{
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters'
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one digit'
                                }
                            }}
                        />
                        <InputElement
                            type="password"
                            name="passwordCheck"
                            id="password-check-field"
                            label="Wachtwoord controle"
                            placeholder="Wachtwoord controle"
                            register={register}
                            errors={errors.passwordCheck && errors.passwordCheck.message}
                            validationRules={{validate: (value) => value === watch('password') || 'Wachtwoord komt niet overeen',}}
                        />
                        {loading ? <p>Aan het laden.. een moment geduld alstublieft</p> : <p>{errorMessage}</p>}
                        <button
                            type="submit"
                            // disabled={username.length < 0 || username.length < 6|| password.length < 6 || password !== passwordCheck}
                            disabled={!isValid}
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
