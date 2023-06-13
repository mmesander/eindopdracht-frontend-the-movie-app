// Functions
import React from "react";

function InputElement({type, name, label, id, placeholder, value, errors, onChange}) {
    return (
        <>
            <label htmlFor={id}>
                {label}
                <input
                    type={type}
                    name={name}
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </label>
            <p>{errors}</p>
        </>
    );
}

export default InputElement;