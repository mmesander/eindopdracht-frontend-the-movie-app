// Styles
import './Home.css'

// Functions
import React, {useEffect, useState} from "react";

// Components
import MovieCard from "../../components/moviecard/MovieCard";

function Home() {
    const moviesEndpoint = 'https://api.themoviedb.org/3/trending/movie/week';
    const seriesEndpoint = 'https://api.themoviedb.org/3/trending/tv/week'

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchMovies() {
            setLoading(true);
            try {

            }
        }
    }, [])

    return (
        <>
            <div className="home-outer-container">
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