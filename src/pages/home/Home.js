// Functions
import React, {useEffect, useState} from "react";
import axios from "axios";

// Components
import MovieCard from "../../components/moviecard/MovieCard";

// Styles
import './Home.css';

function Home() {
    const moviesEndpoint = 'https://api.themoviedb.org/3/trending/movie/day';
    const seriesEndpoint = 'https://api.themoviedb.org/3/trending/tv/day'

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
        }
    };

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [movies, setMovies] = useState({});
    const [series, setSeries] = useState({});

    useEffect(() => {
        async function fetchMovies() {
            setLoading(true);
            try {
                const moviesResponse = await axios.get(`${moviesEndpoint}`, options);
                if (moviesResponse.data) {
                    setError(false);
                }
                setMovies(moviesResponse.data.results);
            } catch (e) {
                setError(true);
                console.error(e);
            }
            setLoading(false);
        }

        async function fetchSeries() {
            setLoading(true);
            try {
                const seriesResponse = await axios.get(`${seriesEndpoint}`, options);
                if (seriesResponse.data) {
                    setError(false);
                }
                setSeries(seriesResponse.data.results);
            } catch (e) {
                setError(true);
                console.error(e);
            }
            setLoading(false);
        }

        if (movies) {
            void fetchMovies();
        }

        if (series) {
            void fetchSeries()
        }
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
                    {loading && <h2>Loading... </h2>}
                    {error && <h2>Error: Could not fetch data!</h2>}
                    {Object.keys(movies).length > 0 && movies.slice(0, 5).map((movie) => {
                        return <MovieCard key={movie.id} title={movie.title} image={movie.poster_path} rating={movie.vote_average} id={movie.id}/>
                    })}
                </div>
                <h1 className="series-title">Trending Series</h1>
                <div className="home-inner-container">
                    {loading && <h2>Loading... </h2>}
                    {error && <h2>Error: Could not fetch data!</h2>}
                    {Object.keys(series).length > 0 && series.slice(0, 5).map((tv) => {
                        return <MovieCard key={tv.id} title={tv.name} image={tv.poster_path} rating={tv.vote_average} id={tv.id}/>
                    })}
                </div>
            </div>
        </>
    )
}

export default Home;