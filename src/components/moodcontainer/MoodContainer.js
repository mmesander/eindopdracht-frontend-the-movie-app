// Styling
import './MoodContainer.css'

// Functions
import React from "react";

function MoodContainer({mood, image, imageDescription, onClick}) {


    return (
        <>
            <button
                type="radio"
                className="mood-button"
                onClick={onClick}
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