import React from "react";
import './MovieDetails.css'
import {useParams} from "react-router-dom";

function MovieDetails() {
    const {movieId} = useParams();

    return (
        <div>
            <h1>Hier komen de details onder</h1>
        </div>
    )
}

export default MovieDetails;
