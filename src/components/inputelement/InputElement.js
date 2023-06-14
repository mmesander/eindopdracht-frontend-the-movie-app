// Functions
import React from "react";

function InputElement({type, name, label, id, placeholder, errors, register, validationRules}) {
    return (
        <>
            <label htmlFor={id}>
                {label}
                <input
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    {...register(name, validationRules)}
                />
            </label>
            <p>{errors}</p>
        </>
    );
}

export default InputElement;