// Styling
import './MovieCard.css';

// Assets
import favorite from '../../assets/heart-straight-fill.svg';
import watchlist from '../../assets/eye-fill.svg';
import watched from '../../assets/check-fat-fill.svg';

// Functions
import React, {useState} from "react";

function MovieCard({title, image, rating}) {
    const roundedRating = Math.round(rating * 10) / 10;
    const [listItem, setListItem] = useState({
        favorite: false,
        watchlist: false,
        watched: false
    })
    // const [watchList, setWatchList]

    return (
        <div className="moviecard-container">
            <section className="moviecard-header-section">
                <img src={`https://image.tmdb.org/t/p/w500${image}`} alt={title}/>
                <h3>{title}</h3>
                <h4>Rating: {roundedRating}</h4>
            </section>
            <div className="icons-container">
                <button
                    type="button"
                    className={ listItem.favorite ? "active-favorite-icon" : "default-icon" }
                    onClick={() => setListItem({
                        ...listItem,
                        favorite: true
                    })}
                >
                    <img src={favorite} alt="favorite-icon"/>
                </button>
                <button
                    type="button"
                    className={ listItem.watchlist ? "active-watchlist-icon" : "default-icon" }
                    onClick={() => setListItem({
                        ...listItem,
                        watchlist: true
                    })}
                >
                    <img src={watchlist} alt="watchlist-icon"/>
                </button>
                <button
                    type="button"
                    className={ listItem.watched ? "active-watched-icon" : "default-icon" }
                    onClick={() => setListItem({
                        ...listItem,
                        watched: true
                    })}
                    // className={({isActive}) => isActive ? 'active-watched-icon' : 'default-icon'}
                >
                    <img src={watched} alt="watched-icon"/>
                </button>
            </div>
        </div>
    )
}

export default MovieCard;