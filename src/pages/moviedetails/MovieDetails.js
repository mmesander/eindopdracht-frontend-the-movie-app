import React, {useEffect, useState} from "react";
import './MovieDetails.css'
import {Link, useParams} from "react-router-dom";

function MovieDetails() {
    const {movieId} = useParams();
    const [details, setDetails] = useState();

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
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=nl-NL`, options)
                setDetails(response.data);
                console.log(details);
            } catch (e) {
                console.error(e)
            }
        }

        void fetchMovieDetails();
    }, [])

    return (
        <div>
            <h1>Hier komen de details onder</h1>
            <p>DETAAAAAAAAAILS</p>
            <p><Link to="/">Terug naar Home</Link></p>
        </div>
    )
}

export default MovieDetails;
