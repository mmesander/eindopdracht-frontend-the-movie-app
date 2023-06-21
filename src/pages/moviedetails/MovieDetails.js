import React from "react";
import './MovieDetails.css'
import {Link, useParams} from "react-router-dom";

function MovieDetails() {
    const {movieId} = useParams();

    return (
        <div>
            <h1>Hier komen de details onder</h1>
            <p>DETAAAAAAAAAILS</p>
            <p><Link to="/">Terug naar Home</Link></p>
        </div>
    )
}

export default MovieDetails;
