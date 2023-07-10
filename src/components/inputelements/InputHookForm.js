// Functions
import React from "react";

function InputHookForm({type, name, label, id, placeholder, errors, register, validationRules}) {
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
            <p className="input-error-message">{errors}</p>
        </>
    );
}
export default InputHookForm;