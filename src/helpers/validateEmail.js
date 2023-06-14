import React from "react";

function validateEmail({email, setEmail, setEmailError}) {
    const input = email.target.value;
    setEmail(input);

    if (input.includes('@') === false || input.includes(',') || ((input.substring(input.length -1)) === ".")) {
        setEmailError("Voer een geldig emailadres in");
    } else {
        setEmailError("");
    }
}

export default validateEmail;
