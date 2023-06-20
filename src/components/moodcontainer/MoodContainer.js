// Styling
import './MoodContainer.css'

// Functions
import React from "react";
import {useNavigate} from "react-router-dom";

function MoodContainer({mood, image, imageDescription}) {
    const navigate = useNavigate();

    return (
        <>
            <button
            type="button"
            onClick={() => navigate("/")}
            >
                <div className="mood-outer-container">
                    <img src={image} alt={imageDescription}/>
                    <h4 className="mood-description">{mood}</h4>
                </div>
            </button>
        </>
    )
}

export default MoodContainer;