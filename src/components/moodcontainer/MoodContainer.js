// Functions
import React from "react";

// Styles
import './MoodContainer.css';

function MoodContainer({mood, image, imageDescription, onClick}) {
    return (
        <>
            <button
                type="button"
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