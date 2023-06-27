// Functions
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

// Helpers
import formatDate from "../../helpers/formatDate";

// Styles
import './MovieDetails.css'
import roundRating from "../../helpers/roundRating";

function MovieDetails() {
    const {movieId} = useParams();
    const [details, setDetails] = useState({});

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
        }
    };

    useEffect(() => {
        async function fetchMovieDetails(id) {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=nl-NL`, options)
                setDetails(response.data);
                console.log(response.data)
            } catch (e) {
                console.error(e)
            }
        }

        void fetchMovieDetails(movieId);

    }, [])

    return (
        <>
            <div className="details-outer-container">
                {Object.keys(details).length > 0 &&
                    <div className="details-inner-container">
                        <section className="details-image-container">
                            <img src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} alt={details.title}/>
                        </section>
                        <article className="details-movie-information">
                            <section>
                                <h1>{details.title}</h1>

                                <p className="details-release-date">{formatDate(details.release_date)}</p>
                                <h4 className="details-tagline">{details.tagline}</h4>
                                <h2>Rating: <span>{roundRating(details.vote_average)}</span></h2>
                                <div>
                                    <p>hier komen de buttons</p>
                                </div>
                                <h3>Omschrijving:</h3>
                                <p>{details.overview}</p>
                            </section>
                            <h4 className="details-link"><Link to="/">Terug naar Home</Link></h4>
                        </article>
                    </div>
                }
            </div>
        </>
    )
}

export default MovieDetails;
