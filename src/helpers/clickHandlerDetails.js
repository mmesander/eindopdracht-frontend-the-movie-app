// Functions
import React from "react";
import {useNavigate} from "react-router-dom";

function clickHandlerDetails(id) {
    const navigate = useNavigate();

    if (id) {
        navigate(`/details/${id}`)
    }
}

export default clickHandlerDetails;