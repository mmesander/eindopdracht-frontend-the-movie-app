// Styles
import './Home.css'

// Functions
import React from "react";

// Components
import MovieCard from "../../components/moviecard/MovieCard";

function Home() {
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