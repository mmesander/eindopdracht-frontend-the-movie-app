// Functions
import React, {useEffect, useState} from "react";
import axios from "axios";

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
import MovieCard from "../../components/moviecard/MovieCard";
import Button from "../../components/button/Button";

function Suggestion() {
    const [active, setActive] = useState(false);
    const [movies, setMovies] = useState({});
    const [page, setPage] = useState(1);
    const [endpoint, setEndpoint] = useState("");
    const [title, setTitle] = useState("");
    const [totalPages, setTotalPages] = useState(0);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
        }
    };

    useEffect(() => {
        if (page >= 1 && active) {
            void fetchSpecificMovies(endpoint, title);
        }
    }, [page]);

    function clickHandler(endpoint, text) {
        setPage(1);
        void fetchSpecificMovies(endpoint, text)
    }


    async function fetchSpecificMovies(endpoint, text) {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${endpoint}`, options);
            setMovies(response.data.results)
            setTitle(text)
            setActive(true);
            setEndpoint(endpoint);
            setTotalPages(response.data.total_pages);

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
                            // onClick={() => {
                            //     fetchSpecificMovies("35", "van de bank te rollen van het lachen")
                            // }}
                            onClick={() => clickHandler( "35", "van de bank te rollen van het lachen")}
                        />
                        <MoodContainer
                            mood="op het puntje van je stoel te zitten"
                            image={adventure}
                            imageDescription="mood image for adventure movies"
                            onClick={() => {
                                clickHandler("80%7C28%7C53", "op het puntje van je stoel te zitten")
                            }}
                        />
                        <MoodContainer
                            mood="je af en toe te moeten verstoppen achter een dekentje"
                            image={horror}
                            imageDescription="mood image for horror movies"
                            onClick={() => {
                                clickHandler("27", "je af en toe te moeten verstoppen achter een dekentje")
                            }}
                        />
                        <MoodContainer
                            mood="in een andere wereld te belanden"
                            image={otherworldly}
                            imageDescription="mood image for otherworldly movies"
                            onClick={() => {
                                clickHandler("14%7C878&without_genres=27", "in een andere wereld te belanden")
                            }}
                        />
                        <MoodContainer
                            mood="met een doos tissues op de bank te zitten"
                            image={drama}
                            imageDescription="mood image for sad movies"
                            onClick={() => {
                                clickHandler("18%7C10749&without_genres=28", "met een doos tissues op de bank te zitten")
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
                    <h2 className="suggestion-title">{`Je hebt gekozen om ${title}`}</h2>
                    <div className="button-set-page-section">
                        <Button
                            buttonType="button"
                            children="Vorige"
                            clickHandler={() => setPage(page - 1)}
                            disabled={page === 1}
                        />
                        <Button
                            buttonType="button"
                            children="Volgende"
                            clickHandler={() => setPage(page + 1)}
                            disabled={page === totalPages}
                        />
                    </div>
                    <div className="suggestion-inner-container">
                        {Object.keys(movies).length > 0 && movies.map((movie) => {
                            return <MovieCard key={movie.id} title={movie.name} image={movie.poster_path}
                                              rating={movie.vote_average} id={movie.id}/>
                        })}
                    </div>
                </section>}
            </div>
        </>
    )
}

export default Suggestion;