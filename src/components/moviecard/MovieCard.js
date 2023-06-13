// Styling
import './MovieCard.css'

// Functions
import React from "react";

function MovieCard({title, image, rating}) {
    const roundedRating = Math.round(rating * 10) / 10

    return (
        <div className="moviecard-container">
            <img src={`https://image.tmdb.org/t/p/w500${image}`} alt={title}/>
            <h3>{title}</h3>
            <h4>Rating: {roundedRating}</h4>
        </div>
    )
}

export default MovieCard;