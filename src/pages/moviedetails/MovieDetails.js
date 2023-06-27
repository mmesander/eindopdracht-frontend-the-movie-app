// Functions
import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

// Context
import {ListsContext} from "../../context/ListsContext";

// Helpers
import formatDate from "../../helpers/formatDate";
import roundRating from "../../helpers/roundRating";

// Styles
import './MovieDetails.css'

// Assets
import favoriteIcon from "../../assets/icons/heart-straight-fill.svg";
import watchlistIcon from "../../assets/icons/eye-fill.svg";
import watchedIcon from "../../assets/icons/check-fat-fill.svg";

function MovieDetails() {
    const {movieId} = useParams();
    const {favorite, watchlist, watched, listItem, setListItem} = useContext(ListsContext);
    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

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
                setLoading(true);
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=nl-NL`, options)
                if (response.data) {
                    setError(false);
                }
                setDetails(response.data);
                console.log(response.data)
            } catch (e) {
                setError(true);
                console.error(e)
            }
            setLoading(false);
        }

        void fetchMovieDetails(movieId);

    }, [])

    return (
        <>
            <div className="page-outer-container">
                <div className="loading-error-section">
                    {loading && <h3 className="loading-message">Loading... </h3>}
                    {error && <h3 className="error-message">Error: Could not fetch data!</h3>}
                </div>
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
                                <div className="details-icons-container">
                                    <button
                                        type="button"
                                        className={listItem.favorite ? "active-favorite-button" : "inactive-favorite-button"}
                                        onClick={() => setListItem({
                                            ...listItem,
                                            favorite: !favorite
                                        })}
                                    >
                                        <img src={favoriteIcon} alt="favorite-icon"/>
                                    </button>
                                    <button
                                        type="button"
                                        className={listItem.watchlist ? "active-watchlist-button" : "inactive-watchlist-button"}
                                        onClick={() => setListItem({
                                            ...listItem,
                                            watchlist: !watchlist
                                        })}
                                    >
                                        <img src={watchlistIcon} alt="watchlist-icon"/>
                                    </button>
                                    <button
                                        type="button"
                                        className={listItem.watched ? "active-watched-button" : "inactive-watched-button"}
                                        onClick={() => setListItem({
                                            ...listItem,
                                            watched: !watched
                                        })}
                                    >
                                        <img src={watchedIcon} alt="watched-icon"/>
                                    </button>
                                </div>
                                <h3>Omschrijving:</h3>
                                <p>{details.overview}</p>
                            </section>
                            <h4><Link to="/">Terug naar Home</Link></h4>
                        </article>
                    </div>
                }
            </div>
        </>
    )
}

export default MovieDetails;
