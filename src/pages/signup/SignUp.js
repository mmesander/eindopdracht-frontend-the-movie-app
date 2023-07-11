// Functions
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from 'react-hook-form';
import axios from "axios";

// Components
import InputHookForm from "../../components/inputelements/InputHookForm";

// Styles
import './SignUp.css';

function SignUp() {
    const navigate = useNavigate();
    const {handleSubmit, register, watch, formState: {errors, isValid}} = useForm({mode: "onChange"});

    const [regSuccess, setRegSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (regSuccess) {
            const timer = setTimeout(() => {
                navigate("/login");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [regSuccess, navigate]);

    async function handleRegister(data) {
        setLoading(true);
        setErrorMessage("");
        try {
            const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
                username: data.username,
                email: data.email,
                password: data.password,
                role: ["user"]
            });

            if (response.data) {
                setError(false);
            }

            if (response.data.message === "User registered successfully!") {
                setRegSuccess(true);
            }

        } catch (e) {
            console.error(e)
            setError(true);
            console.log(error);
            if (e.response.data.message.includes("email")) {
                setErrorMessage("Registratie mislukt! Het emailadres is al in gebruik!");
            } else if (e.response.data.message.includes("username")) {
                setErrorMessage("Registratie mislukt! De gebruikersnaam is al in gebruik!");
            } else {
                setErrorMessage("Registratie mislukt!");
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
                        <InputHookForm
                            type="email"
                            name="email"
                            id="reg-email-field"
                            label="Email"
                            placeholder="jouw@email.com"
                            register={register}
                            errors={errors.email && errors.email.message}
                            validationRules={{
                                required: 'Dit veld is verplicht',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: 'Verkeerd email adres'
                                }
                            }}
                        />
                        <InputHookForm
                            type="text"
                            name="username"
                            id="reg-username-field"
                            label="Gebruikersnaam"
                            placeholder="Gebruikersnaam"
                            register={register}
                            errors={errors.username && errors.username.message}
                            validationRules={{
                                required: 'Dit veld is verplicht',
                                pattern: {
                                    value: /^[a-zA-Z0-9_]+$/,
                                    message: 'Gebruikersnaam mag alleen letters, cijfers en underscores bevatten'
                                },
                                minLength: {
                                    value: 6,
                                    message: 'Gebruikersnaam moet minimaal 6 tekens bevatten'
                                },
                                maxLength: {
                                    value: 20,
                                    message: 'Gebruikersnaam mag maximaal 20 tekens bevatten'
                                },
                            }}
                        />
                        <InputHookForm
                            type="password"
                            name="password"
                            id="reg-password-field"
                            label="Wachtwoord"
                            placeholder="Wachtwoord"
                            register={register}
                            errors={errors.password && errors.password.message}
                            validationRules={{
                                required: 'Dit veld is verplicht',
                                minLength: {
                                    value: 6,
                                    message: 'Wachtwoord moet minimaal 6 tekens bevatten'
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{6,}$/,
                                    message: 'Wachtwoord moet minimaal een hoofdletter, een kleine letter, een getal en een speciaal teken bevatten'
                                }
                            }}
                        />
                        <InputHookForm
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
                            disabled={!isValid}
                        >
                            Registreren
                        </button>
                        {regSuccess &&
                            <h4 className="success-message">Registratie is gelukt, je wordt teruggeleid naar de login
                                pagina</h4>}
                    </form>
                    <h3>Terug naar de <Link to="/login">login pagina</Link></h3>
                </div>
            </div>
        </>
    )
}

export default SignUp;
