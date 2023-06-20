import React from "react";
import './Button.css'

function Button({buttonType, name, clickHandler, children, disabled}){
    return (
        <button
            className={name}
            type={buttonType}
            onClick={clickHandler}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button;