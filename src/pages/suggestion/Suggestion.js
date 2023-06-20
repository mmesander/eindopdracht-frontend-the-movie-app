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
import MovieCard from "../../components/moviecard/MovieCard";

function Suggestion() {
    const [active, setActive] = useState(false);
    const [movies, setMovies] = useState({});
    const [title, setTitle] = useState("");

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
        }
    };

    async function fetchSpecificMovies(endpoint, text) {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${endpoint}`, options);
            console.log(response.data.results)
            setMovies(response.data.results)
            setTitle(text)
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
                            onClick={() => {
                                fetchSpecificMovies(35, "van de bank te rollen van het lachen")
                            }}
                        />
                        <MoodContainer
                            mood="op het puntje van je stoel te zitten"
                            image={adventure}
                            imageDescription="mood image for adventure movies"
                            onClick={() => {
                                fetchSpecificMovies('80%7C28%7C53', "op het puntje van je stoel te zitten")
                            }}
                        />
                        <MoodContainer
                            mood="je af en toe te moeten verstoppen achter een dekentje"
                            image={horror}
                            imageDescription="mood image for horror movies"
                            onClick={() => {
                                fetchSpecificMovies(27, "je af en toe te moeten verstoppen achter een dekentje")
                            }}
                        />
                        <MoodContainer
                            mood="in een andere wereld te belanden"
                            image={otherworldly}
                            imageDescription="mood image for otherworldly movies"
                            onClick={() => {
                                fetchSpecificMovies('14%7C878&without_genres=27', "in een andere wereld te belanden")
                            }}
                        />
                        <MoodContainer
                            mood="met een doos tissues op de bank te zitten"
                            image={drama}
                            imageDescription="mood image for sad movies"
                            onClick={() => {
                                fetchSpecificMovies('18%7C10749&without_genres=28', "met een doos tissues op de bank te zitten")
                            }}
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
                    <h1 className="suggestion-title">{`Je hebt gekozen om ${title}`}</h1>
                    <div className="suggestion-inner-container">
                        {Object.keys(movies).length > 0 && movies.map((movie) => {
                            return <MovieCard key={movie.id} title={movie.name} image={movie.poster_path}
                                              rating={movie.vote_average}/>
                        })}
                    </div>
                </section>}
            </div>
        </>
    )
}

export default Suggestion;