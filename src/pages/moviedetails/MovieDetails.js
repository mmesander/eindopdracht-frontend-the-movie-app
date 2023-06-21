// Functions
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

// Styles
import './MovieDetails.css'

function MovieDetails() {
    const {movieId} = useParams();
    const [details, setDetails] = useState({});

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
                console.log(response.data)
            } catch (e) {
                console.error(e)
            }
        }

        void fetchMovieDetails(movieId);

    }, [])

    return (
        <>
            <div className="details-outer-container">
                {Object.keys(details).length > 0 &&
                    <section>
                        <h1>{details.title}</h1>
                        <p>DETAAAAAAAAAILS</p>
                        <p><Link to="/">Terug naar Home</Link></p>
                    </section>}
                }
            </div>
        </>
    )
}

export default MovieDetails;
