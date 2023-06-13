// Functions
import React from "react";

function InputElement({inputType, inputName, inputLabel, inputId, inputPlaceholder, inputValue, errors, inputChange}) {
    return (
        <>
            <label htmlFor={inputId}>
                {inputLabel}
                <input
                    type={inputType}
                    name={inputName}
                    id={inputId}
                    placeholder={inputPlaceholder}
                    value={inputValue}
                    onChange={inputChange}
                />
            </label>
            <p>{errors}</p>
        </>
    );
}

export default InputElement;