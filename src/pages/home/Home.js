// Styles
import './Home.css'

// Functions
import React, {useEffect, useState} from "react";
import axios from "axios";

// Components
import MovieCard from "../../components/moviecard/MovieCard";


function Home() {
    const moviesEndpoint = 'https://api.themoviedb.org/3/trending/movie/day';
    // const seriesEndpoint = 'https://api.themoviedb.org/3/trending/tv/week'

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer `
        }
    };

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [movies, setMovies] = useState({});

    useEffect(() => {
        async function fetchMovies() {
            setLoading(true);
            try {
                const moviesResponse = await axios.get(`${moviesEndpoint}`, options);
                if (moviesResponse.data) {
                    setError(false);
                }
                setMovies(moviesResponse.data);
            } catch (e) {
                setError(true);
                console.error(e);
            }
            setLoading(false);
        }

        void fetchMovies();
        console.log(movies);
    }, []);

    return (
        <>
            <div className="home-outer-container">
                <div className="loading-section">
                    {loading && <h2>Loading... </h2>}
                    {error && <h2>Error: Could not fetch data!</h2>}
                </div>
                <h1 className="movies-title">Trending Movies</h1>
                <div className="home-inner-container">
                    <MovieCard/>
                    <MovieCard/>
                    <MovieCard/>
                    <MovieCard/>
                    <MovieCard/>
                </div>
                <h1 className="series-title">Trending Series</h1>
                <div className="home-inner-container">
                    <MovieCard/>
                    <MovieCard/>
                    <MovieCard/>
                    <MovieCard/>
                    <MovieCard/>
                </div>
            </div>
        </>
    )
}

export default Home;