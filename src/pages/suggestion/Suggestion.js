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
            <h1>This is the Suggestion page</h1>
            <MoodContainer
                mood="test"
                image={comedy}
                imageDescription="comedy-test"
            />
        </>
    )
}

export default Suggestion;