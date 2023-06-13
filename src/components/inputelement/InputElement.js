// Functions
import React from "react";

function InputElement({inputType, inputName, inputLabel, inputId, inputPlaceholder,     validationRules, register, errors}) {
    return (
        <>
            <label htmlFor={inputId}>
                {inputLabel}
                <input
                    type={inputType}
                    id={inputId}
                    placeholder={inputPlaceholder}
                    {...register(inputName, validationRules)}
                />
            </label>
            {errors[inputName] && <p>{errors[inputName].message}</p>}
        </>
    );
}

export default InputElement;