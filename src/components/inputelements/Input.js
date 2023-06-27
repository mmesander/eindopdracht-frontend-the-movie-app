// Functions
import React from "react";

function InputElement({type, name, label, id, placeholder, onChange}) {
    return (
        <>
            <label htmlFor={id}>
                {label}
                <input
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    name={name}
                    onChange={onChange}
                />
            </label>
        </>
    );
}

export default InputElement;