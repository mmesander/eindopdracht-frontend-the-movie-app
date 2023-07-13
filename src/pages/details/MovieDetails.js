// Functions
import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

// Context
import {ListsContext} from "../../context/ListsContext";

// Components
import Button from "../../components/button/Button";

// Helpers
import formatDate from "../../helpers/formatDate";
import roundRating from "../../helpers/roundRating";
import createListsArray from "../../helpers/createListsArray";

// Styles
import './Details.css';

// Assets
import favoriteIcon from "../../assets/icons/heart-straight-fill.svg";
import watchlistIcon from "../../assets/icons/eye-fill.svg";
import watchedIcon from "../../assets/icons/check-fat-fill.svg";
import noImage from "../../assets/images/no-image.png"

function MovieDetails() {
    const navigate = useNavigate();
    const {movieId} = useParams();
    const {listItem, setListItem} = useContext(ListsContext);

    const [details, setDetails] = useState({});
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const favoriteActive = listItem.favoriteMovies.includes(movieId);
    const watchlistActive = listItem.watchlistMovies.includes(movieId);
    const watchedActive = listItem.watchedMovies.includes(movieId);

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
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, options);
                if (response.data) {
                    setError(false);
                }
                setDetails(response.data);
                setGenres(response.data.genres);
            } catch (e) {
                setError(true);
                console.error(e);
            }
            setLoading(false);
        }

        void fetchMovieDetails(movieId);

    }, []);

    function setFavorite(id) {
        const favoritesArray = createListsArray(id, listItem.favoriteMovies);

        setListItem({
            ...listItem,
            favoriteMovies: favoritesArray,
        });
    }

    function setWatchlist(id) {
        const watchlistArray = createListsArray(id, listItem.watchlistMovies);

        setListItem({
            ...listItem,
            watchlistMovies: watchlistArray,
        });
    }

    function setWatched(id) {
        const watchedArray = createListsArray(id, listItem.watchedMovies);

        setListItem({
            ...listItem,
            watchedMovies: watchedArray,
        });
    }

    return (
        <>
            <div className="page-outer-container">
                <div className="loading-error-section">
                    {loading && <h3 className="loading-message">Laden... </h3>}
                    {error && <h3 className="error-message">Foutmelding: Er kan geen data opgehaald worden!</h3>}
                </div>
                {Object.keys(details).length > 0 &&
                    <div className="details-inner-container">
                        <section className="details-image-container">
                            {details.poster_path && <img src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                                 alt={details.title}/>}
                            {!details.poster_path && <img src={noImage} alt="Geen foto beschikbaar"/>}
                        </section>
                        <article className="details-information">
                            <section>
                                <h1>{details.title}</h1>

                                {details.release_date && <p className="details-release-date">{formatDate(details.release_date)}</p>}
                                {!details.release_date && <p className="details-release-date">(No date available)</p>}
                                <h4 className="details-tagline">{details.tagline}</h4>
                                <div className="details-icons-container">
                                    <button
                                        type="button"
                                        className={favoriteActive ? "active-favorite-button" : "inactive-favorite-button"}
                                        onClick={() => setFavorite(movieId)}
                                    >
                                        <img src={favoriteIcon} alt="favorite-icon"/>
                                    </button>
                                    <button
                                        type="button"
                                        className={watchlistActive ? "active-watchlist-button" : "inactive-watchlist-button"}
                                        onClick={() => setWatchlist(movieId)}
                                    >
                                        <img src={watchlistIcon} alt="watchlist-icon"/>
                                    </button>
                                    <button
                                        type="button"
                                        className={watchedActive ? "active-watched-button" : "inactive-watched-button"}
                                        onClick={() => setWatched(movieId)}
                                    >
                                        <img src={watchedIcon} alt="watched-icon"/>
                                    </button>
                                </div>
                                <h2>Rating: <span>{roundRating(details.vote_average)}</span></h2>
                                {genres.length > 0 && <ul>
                                    {genres.map((genre) => {
                                        return <li key={genre.id}>{genre.name}</li>
                                    })}
                                </ul>}
                                <h3>Omschrijving:</h3>
                                <p>{details.overview}</p>
                            </section>
                            <Button
                                buttonType="button"
                                name="back-to-previous-page"
                                clickHandler={() => navigate(-1)}
                                children="Terug naar vorige pagina"
                            />
                        </article>
                    </div>
                }
            </div>
        </>
    )
}

export default MovieDetails;
