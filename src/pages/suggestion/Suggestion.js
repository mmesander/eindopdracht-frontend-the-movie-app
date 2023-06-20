// Functions
import React from "react";

// Styles
import './Suggestion.css'

// Assets
import comedy from '../../assets/images/mood-laugh.jpg'
import adventure from '../../assets/images/mood-adventurous.jpg'
import otherwordly from '../../assets/images/mood-otherworldly.jpg'
import horror from '../../assets/images/mood-scary.jpg'
import drama from '../../assets/images/mood-sad.jpg'

// Components
import MoodContainer from "../../components/moodcontainer/MoodContainer";

function Suggestion() {
    return (
        <>
            <div className="suggestion-outer-container">
                <h1 className="suggestion-title">Heb jij zin om: </h1>
                <div className="suggestion-inner-container">

                </div>
            </div>
        </>
    )
}

export default Suggestion;