// Functions
import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";

// Helpers
import roundRating from "../../helpers/roundRating";

// Styles
import './MovieCard.css';

// Assets
import favoriteIcon from '../../assets/icons/heart-straight-fill.svg';
import watchlistIcon from '../../assets/icons/eye-fill.svg';
import watchedIcon from '../../assets/icons/check-fat-fill.svg';
import {ListsContext} from "../../context/ListsContext";

function MovieCard({title, image, rating, id}) {
    const navigate = useNavigate();
    const roundedRating = roundRating(rating);

    const {favorite, watchlist, watched, listItem, setListItem} = useContext(ListsContext);

    function clickHandler() {
        if (id) {
            navigate(`/details/${id}`);
        }
    }

    return (
        <button
            type="radio"
            className="details-button"
            onClick={clickHandler}
        >
            <div className="moviecard-container">
                <section className="moviecard-header-section">
                    <img src={`https://image.tmdb.org/t/p/w500${image}`} alt={title}/>
                    <h3>{title}</h3>
                    <h4>Rating: {roundedRating}</h4>
                </section>
                <div className="icons-container">
                    <div className={listItem.favorite ? "active-favorite-icon" : "default-icon"}>
                        <img src={favoriteIcon} alt="favorite-icon"/>
                    </div>
                    <div className={listItem.watchlist ? "active-watchlist-icon" : "default-icon"}>
                        <img src={watchlistIcon} alt="watchlist-icon"/>
                    </div>
                    <div className={listItem.watched ? "active-watched-icon" : "default-icon"}>
                        <img src={watchedIcon} alt="watched-icon"/>
                    </div>
                </div>
            </div>
        </button>
    )
}

export default MovieCard;