// Styling
import './MoodContainer.css'

// Functions
import React from "react";
// import {Link} from 'react-router-dom';

function MoodContainer({mood, image, imageDescription, onClick}) {


    return (
        <>
            {/*<Link to="/" className="mood-link">*/}
            {/*    <div className="mood-outer-container">*/}
            {/*        <img src={image} alt={imageDescription}/>*/}
            {/*        <h4 className="mood-description">{mood}</h4>*/}
            {/*    </div>*/}
            {/*</Link>*/}
            <button type="radio" className="mood-button">
                <div className="mood-outer-container">
                    <img src={image} alt={imageDescription}/>
                    <h4 className="mood-description">{mood}</h4>
                </div>
            </button>
        </>
    )
}

export default MoodContainer;