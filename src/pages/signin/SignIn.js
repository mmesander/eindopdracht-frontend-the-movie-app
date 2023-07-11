// Functions
import React, {useContext, useState} from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import {useForm} from "react-hook-form";

// Context
import {AuthContext} from "../../context/AuthContext";

// Components
import InputHookForm from "../../components/inputelements/InputHookForm";

// Styles
import './SignIn.css';

function SignIn() {
    const {login} = useContext(AuthContext);
    const {handleSubmit, register, formState: {errors, isValid}} = useForm({mode: "onChange"});

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

            if (response.data.accessToken) {
                setError(false);
            }


        } catch (e) {
            setError(true);
            console.error(e);
            console.log(error);
            setErrorMessage("Onjuiste gebruikersnaam en wachtwoord combinatie");
        }
        setLoading(false);
    }

    return (
        <>
            <div className="sign-in-outer-container">
                <div className="sign-in-inner-container">
                    <h1>Inloggen</h1>
                    <form id="sign-in-form" onSubmit={handleSubmit(handleLogin)}>
                        <InputHookForm
                            type="text"
                            name="username"
                            id="username-field"
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
                                }
                            }}
                        />
                        {loading ? <p>Aan het laden.. een moment geduld alstublieft</p> :
                            <p className="input-error-message">{errorMessage}</p>}
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