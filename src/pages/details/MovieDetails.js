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

// Styles
import './Details.css'

// Assets
import favoriteIcon from "../../assets/icons/heart-straight-fill.svg";
import watchlistIcon from "../../assets/icons/eye-fill.svg";
import watchedIcon from "../../assets/icons/check-fat-fill.svg";

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
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, options)
                if (response.data) {
                    setError(false);
                }
                setDetails(response.data);
                setGenres(response.data.genres);
                console.log(response.data)
            } catch (e) {
                setError(true);
                console.error(e)
            }
            setLoading(false);
        }

        void fetchMovieDetails(movieId);

    }, [])

    function setFavorite() {
        const checkMovieID = listItem.favoriteMovies.find((movie) => {
            return movieId === movie;
        });

        if (checkMovieID) {
            const favoritesArray = [...listItem.favoriteMovies];
            const indexNumberOf = favoritesArray.indexOf(movieId);

            favoritesArray.splice(indexNumberOf, 1);

            setListItem({
                ...listItem,
                favoriteMovies: favoritesArray,
            });

        } else {
            const favoritesArray = [...listItem.favoriteMovies];

            favoritesArray.push(movieId);

            setListItem({
                ...listItem,
                favoriteMovies: favoritesArray,
            });
        }
    }

    function setWatchlist() {
        const checkMovieID = listItem.watchlistMovies.find((movie) => {
            return movieId === movie;
        });

        if (checkMovieID) {
            const watchlistArray = [...listItem.watchlistMovies];
            const indexNumberOf = watchlistArray.indexOf(movieId);

            watchlistArray.splice(indexNumberOf, 1);

            setListItem({
                ...listItem,
                watchlistMovies: watchlistArray,
            });
        } else {
            const watchlistArray = [...listItem.watchlistMovies];

            watchlistArray.push(movieId);

            setListItem({
                ...listItem,
                watchlistMovies: watchlistArray,
            });
        }
    }

    function setWatched() {
        const checkMovieID = listItem.watchedMovies.find((movie) => {
            return movieId === movie;
        });

        if (checkMovieID) {
            const watchedArray = [...listItem.watchedMovies];
            const indexNumberOf = watchedArray.indexOf(movieId);

            watchedArray.splice(indexNumberOf, 1);

            setListItem({
                ...listItem,
                watchedMovies: watchedArray,
            });
        } else {
            const watchedArray = [...listItem.watchedMovies];

            watchedArray.push(movieId);

            setListItem({
                ...listItem,
                watchedMovies: watchedArray,
            });
        }
    }

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
                            <img src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                                 alt={details.title}/>
                        </section>
                        <article className="details-information">
                            <section>
                                <h1>{details.title}</h1>

                                <p className="details-release-date">{formatDate(details.release_date)}</p>
                                <h4 className="details-tagline">{details.tagline}</h4>
                                <h2>Rating: <span>{roundRating(details.vote_average)}</span></h2>
                                <div className="details-icons-container">
                                    <button
                                        type="button"
                                        className={favoriteActive ? "active-favorite-button" : "inactive-favorite-button"}
                                        onClick={setFavorite}
                                    >
                                        <img src={favoriteIcon} alt="favorite-icon"/>
                                    </button>
                                    <button
                                        type="button"
                                        className={watchlistActive ? "active-watchlist-button" : "inactive-watchlist-button"}
                                        onClick={setWatchlist}
                                    >
                                        <img src={watchlistIcon} alt="watchlist-icon"/>
                                    </button>
                                    <button
                                        type="button"
                                        className={watchedActive ? "active-watched-button" : "inactive-watched-button"}
                                        onClick={setWatched}
                                    >
                                        <img src={watchedIcon} alt="watched-icon"/>
                                    </button>
                                </div>
                                {genres.length > 0 && <ul>
                                    {genres.map((genre) => {
                                        return <li>{genre.name}</li>
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
