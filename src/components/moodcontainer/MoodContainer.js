// Styling
import './MoodContainer.css'

// Functions
import React from "react";

function MoodContainer({mood, image, imageDescription}) {
    return (
        <>
            <div className="mood-outer-container">
                <img src={image} alt={imageDescription}/>
                <p className="mood-description">{mood}</p>
            </div>
        </>
    )
}

export default MoodContainer;