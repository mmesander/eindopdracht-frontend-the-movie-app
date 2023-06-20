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
import axios from "axios";

function Suggestion() {
    const [active, setActive] = useState(false);
    const [movies, setMovies] = useState({});

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
        }
    };

    async function fetchSpecificMovies() {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35`, options);
            console.log(response.data)
            setActive(true);
        } catch (e) {
            console.error(e)
        }
    }



    return (
        <>
            <div className="suggestion-outer-container">
                {!active && <section className="suggestion-switch-container">
                    <h1 className="suggestion-title">Heb jij zin om: </h1>
                    <div className="suggestion-mood-container">
                        <MoodContainer
                            mood="van de bank te rollen van het lachen"
                            image={comedy}
                            imageDescription="mood image for comedy movies"
                            onClick={fetchSpecificMovies}
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
                {active && <section className="suggestion-switch-container">
                    <button
                        className="button-to-overview"
                        type="button"
                        onClick={() => setActive(false)}
                    >
                        Terug naar overzicht
                    </button>
                    <h1 className="suggestion-title">Je hebt gekozen voor iets. </h1>
                    <div className="suggestion-inner-container">

                    </div>
                </section>}
            </div>
        </>
    )
}

export default Suggestion;