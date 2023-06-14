// Styles
import './SignIn.css'

// Functions
import React, {useContext, useState} from "react";
import { Link } from 'react-router-dom';

// Context
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import {useForm} from "react-hook-form";
import InputElement from "../../components/inputelement/InputElement";

function SignIn() {
    const {login} = useContext(AuthContext);
    const {handleSubmit, register, formState: {errors, isValid}} = useForm({mode:"onChange"});

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleLogin(data) {
        setLoading(true);
        setErrorMessage("");
        try {
            const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
                username: data.username,
                password: data.password
            });
            login(response.data.accessToken);

            if(response.data.accessToken) {
                setError(false);
            }


        } catch (e) {
            setError(true);
            console.log(error);
            console.error(e);
            setErrorMessage("Onjuiste gebruikersnaam en wachtwoord combinatie")
        }
        setLoading(false);
    }

    return (
        <>
            <div className="signin-outer-container">
                <div className="signin-inner-container">
                    <h1>Inloggen</h1>
                    <form id="signin-form" onSubmit={handleSubmit(handleLogin)}>
                        <InputElement
                            type="text"
                            name="username"
                            id="username-field"
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
                                }
                            }}
                        />
                        {loading ? <p>Aan het laden.. een moment geduld alstublieft</p> : <p>{errorMessage}</p>}
                        <button
                            type="submit"
                            disabled={!isValid}
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