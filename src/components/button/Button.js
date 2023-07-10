// Functions
import React from "react";

// Styles
import './Button.css';

function Button({buttonType, name, clickHandler, children, disabled, id}){
    return (
        <button
            className={name}
            type={buttonType}
            onClick={clickHandler}
            disabled={disabled}
            id={id}
        >
            {children}
        </button>
    )
}

export default Button;