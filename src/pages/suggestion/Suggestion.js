// Functions
import React, {useState} from "react";

// Styles
import './Suggestion.css'

// Assets
import comedy from '../../assets/images/mood-laugh.jpg'
import adventure from '../../assets/images/mood-adventurous.jpg'
import otherworldly from '../../assets/images/mood-otherworldly.jpg'
import horror from '../../assets/images/mood-scary.jpg'
import drama from '../../assets/images/mood-sad.jpg'

// Components
import MoodContainer from "../../components/moodcontainer/MoodContainer";

function Suggestion() {
    const [active, setActive] = useState(false);
    console.log(active)

    return (
        <>
            <div className="suggestion-outer-container">
                {!active && <section className="suggestion-inner-container">
                    <h1 className="suggestion-title">Heb jij zin om: </h1>
                    <div className="suggestion-mood-container">
                        <MoodContainer
                            mood="van de bank te rollen van het lachen"
                            image={comedy}
                            imageDescription="mood image for comedy movies"
                            onClick={() => setActive(true)}
                        />
                        <MoodContainer
                            mood="op het puntje van de bank te zitten"
                            image={adventure}
                            imageDescription="mood image for adventure movies"
                            onClick={() => setActive(true)}
                        />
                        <MoodContainer
                            mood="je af en toe te moeten verstoppen achter een dekentje"
                            image={horror}
                            imageDescription="mood image for horror movies"
                            onClick={() => setActive(true)}
                        />
                        <MoodContainer
                            mood="in een andere wereld te belanden"
                            image={otherworldly}
                            imageDescription="mood image for otherworldly movies"
                            onClick={() => setActive(true)}
                        />
                        <MoodContainer
                            mood="met een doos tissues op de bank te zitten"
                            image={drama}
                            imageDescription="mood image for sad movies"
                            onClick={() => setActive(true)}
                        />
                    </div>
                </section>}
                {active && <section>
                    <button
                        className="button-to-overview"
                        type="button"
                        onClick={() => setActive(false)}
                    >
                        Terug naar overzicht
                    </button>
                </section>}
            </div>
        </>
    )
}

export default Suggestion;