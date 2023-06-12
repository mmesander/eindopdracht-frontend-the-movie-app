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
                <div className="home-inner-container">
                    <MovieCard/>
                    <MovieCard/>
                    <MovieCard/>
                    <MovieCard/>
                    <MovieCard/>
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