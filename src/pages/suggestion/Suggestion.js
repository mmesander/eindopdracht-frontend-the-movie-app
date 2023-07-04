// Functions
import React from "react";

import {useNavigate} from "react-router-dom";

// Components
import MoodContainer from "../../components/moodcontainer/MoodContainer";

// Styles
import './Suggestion.css';

// Assets
import comedy from '../../assets/images/mood-laugh.jpg';
import adventure from '../../assets/images/mood-adventurous.jpg';
import otherworldly from '../../assets/images/mood-otherworldly.jpg';
import horror from '../../assets/images/mood-scary.jpg';
import drama from '../../assets/images/mood-sad.jpg';

function Suggestion() {
    const navigate = useNavigate();

    function clickHandler(endpoint, text, link) {
        const url = `/suggestie/${link}/1?endpoint=${encodeURIComponent(endpoint)}&text=${encodeURIComponent(text)}`
        navigate(`${url}`);
    }

    return (
        <>
            <div className="page-outer-container">
                <section className="suggestion-switch-container">
                    <h1 className="suggestion-title">Heb jij zin om: </h1>
                    {/*<div className="loading-error-section">*/}
                    {/*    {loading && <h3 className="loading-message">Loading... </h3>}*/}
                    {/*    {error && <h3 className="error-message">Error: Could not fetch data!</h3>}*/}
                    {/*</div>*/}
                    <div className="suggestion-mood-container">
                        <MoodContainer
                            mood="van de bank te rollen van het lachen"
                            image={comedy}
                            imageDescription="mood image for comedy movies"
                            onClick={() => clickHandler( "35", "van de bank te rollen van het lachen", "1")}
                        />
                        <MoodContainer
                            mood="op het puntje van je stoel te zitten"
                            image={adventure}
                            imageDescription="mood image for adventure movies"
                            onClick={() => {
                                clickHandler("80%7C28%7C53", "op het puntje van je stoel te zitten", "2")
                            }}
                        />
                        <MoodContainer
                            mood="je af en toe te moeten verstoppen achter een dekentje"
                            image={horror}
                            imageDescription="mood image for horror movies"
                            onClick={() => {
                                clickHandler("27", "je af en toe te moeten verstoppen achter een dekentje", "3")
                            }}
                        />
                        <MoodContainer
                            mood="in een andere wereld te belanden"
                            image={otherworldly}
                            imageDescription="mood image for otherworldly movies"
                            onClick={() => {
                                clickHandler("14%7C878&without_genres=27", "in een andere wereld te belanden", "4")
                            }}
                        />
                        <MoodContainer
                            mood="met een doos tissues op de bank te zitten"
                            image={drama}
                            imageDescription="mood image for sad movies"
                            onClick={() => {
                                clickHandler("18%7C10749&without_genres=28", "met een doos tissues op de bank te zitten", "5")
                            }}
                        />
                    </div>
                </section>
            </div>
        </>
    )
}

export default Suggestion;