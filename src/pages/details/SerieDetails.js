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

function SerieDetails() {
    const navigate = useNavigate();
    const {serieId} = useParams();
    const {listItem, setListItem} = useContext(ListsContext);

    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const favoriteActive = listItem.favoriteSeries.includes(serieId);
    const watchlistActive = listItem.watchlistSeries.includes(serieId);
    const watchedActive = listItem.watchedSeries.includes(serieId);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
        }
    };

    useEffect(() => {
        async function fetchSerieDetails(id) {
            try {
                setLoading(true);
                const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, options)
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

        void fetchSerieDetails(serieId);

    }, [])

    function setFavorite() {
        const checkSerieID = listItem.favoriteSeries.find((serie) => {
            return serieId === serie;
        });

        if (checkSerieID) {
            const favoritesArray = [...listItem.favoriteSeries];
            const indexNumberOf = favoritesArray.indexOf(serieId);

            favoritesArray.splice(indexNumberOf, 1);

            setListItem({
                ...listItem,
                favoriteSeries: favoritesArray,
            });
        } else {
            const favoritesArray = [...listItem.favoriteSeries];

            favoritesArray.push(serieId);

            setListItem({
                ...listItem,
                favoriteSeries: favoritesArray,
            });
        }
    }

    function setWatchlist() {
        const checkSerieID = listItem.watchlistSeries.find((serie) => {
            return serieId === serie;
        });

        if (checkSerieID) {
            const watchlistArray = [...listItem.watchlistSeries];
            const indexNumberOf = watchlistArray.indexOf(serieId);

            watchlistArray.splice(indexNumberOf, 1);

            setListItem({
                ...listItem,
                watchlistSeries: watchlistArray,
            });
        } else {
            const watchlistArray = [...listItem.watchlistSeries];

            watchlistArray.push(serieId);

            setListItem({
                ...listItem,
                watchlistSeries: watchlistArray,
            });
        }
    }

    function setWatched() {
        const checkSerieID = listItem.watchedSeries.find((serie) => {
            return serieId === serie;
        });

        if (checkSerieID) {
            const watchedArray = [...listItem.watchedSeries];
            const indexNumberOf = watchedArray.indexOf(serieId);

            watchedArray.splice(indexNumberOf, 1);

            setListItem({
                ...listItem,
                watchedSeries: watchedArray,
            });
        } else {
            const watchedArray = [...listItem.watchedSeries];

            watchedArray.push(serieId);

            setListItem({
                ...listItem,
                watchedSeries: watchedArray,
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
                                 alt={details.name}/>
                        </section>
                        <article className="details-information">
                            <section>
                                <h1>{details.name}</h1>

                                <p className="details-release-date">{formatDate(details.first_air_date)}</p>
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

export default SerieDetails;
