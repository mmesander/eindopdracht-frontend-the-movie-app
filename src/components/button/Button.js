import React from "react";

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