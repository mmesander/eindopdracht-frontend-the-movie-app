// Functions
import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";

// Context
import {ListsContext} from "../../context/ListsContext";

// Helpers
import roundRating from "../../helpers/roundRating";

// Styles
import './MovieCard.css';

// Assets
import favoriteIcon from '../../assets/icons/heart-straight-fill.svg';
import watchlistIcon from '../../assets/icons/eye-fill.svg';
import watchedIcon from '../../assets/icons/check-fat-fill.svg';

function MovieCard({title, image, rating, id, name, tv}) {
    const navigate = useNavigate();
    const {listItem} = useContext(ListsContext);
    const roundedRating = roundRating(rating);

    const favoriteMovieActive = listItem.favoriteMovies.includes(JSON.stringify(id));
    const watchlistMovieActive = listItem.watchlistMovies.includes(JSON.stringify(id));
    const watchedMovieActive = listItem.watchedMovies.includes(JSON.stringify(id));

    const favoriteSeriesActive = listItem.favoriteSeries.includes(JSON.stringify(id));
    const watchlistSeriesActive = listItem.watchlistSeries.includes(JSON.stringify(id));
    const watchedSeriesActive = listItem.watchedSeries.includes(JSON.stringify(id));

    function clickHandler() {
        if (id && !tv) {
            navigate(`/film-details/${id}`);
        } else if (id && tv) {
            navigate(`/serie-details/${id}`);
        }
    }

    return (
        <button
            type="radio"
            className="moviecard-container-button"
            onClick={clickHandler}
        >
            <div className="moviecard-container">
                <section className="moviecard-header-section">
                    {title && !name && <div>
                        <img src={`https://image.tmdb.org/t/p/w500${image}`} alt={title}/>
                        {title.length < 40 && <h3>{title}</h3>}
                        {title.length > 40 && !title.length < 40 && <h4>{title}</h4>}
                    </div>}
                    {name && !title && <div>
                        <img src={`https://image.tmdb.org/t/p/w500${image}`} alt={name}/>
                        {name.length < 40 && <h3>{name}</h3>}
                        {name.length > 40 && !name.length < 40 && <h4>{name}</h4>}
                    </div>}
                    <div className="moviecard-rating">
                        <h4>Rating: <span>{roundedRating}</span></h4>
                    </div>
                </section>
                <section className="icons-container">
                    <div
                        className={(favoriteMovieActive || favoriteSeriesActive) ? "active-favorite-icon" : "default-icon"}>
                        <img src={favoriteIcon} alt="favorite-icon"/>
                    </div>
                    <div
                        className={(watchlistMovieActive || watchlistSeriesActive) ? "active-watchlist-icon" : "default-icon"}>
                        <img src={watchlistIcon} alt="watchlist-icon"/>
                    </div>
                    <div
                        className={(watchedMovieActive || watchedSeriesActive) ? "active-watched-icon" : "default-icon"}>
                        <img src={watchedIcon} alt="watched-icon"/>
                    </div>
                </section>
            </div>
        </button>
    )
}

export default MovieCard;