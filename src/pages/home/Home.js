// Functions
import React, {useEffect, useState} from "react";
import axios from "axios";

// Components
import MovieCard from "../../components/moviecard/MovieCard";

// Styles
import './Home.css';
import Button from "../../components/button/Button";

function Home() {
    const moviesEndpoint = 'https://api.themoviedb.org/3/trending/movie/day';
    const seriesEndpoint = 'https://api.themoviedb.org/3/trending/tv/day';

    const [movies, setMovies] = useState({});
    const [series, setSeries] = useState({});
    const [moreMovies, setMoreMovies] = useState(false);
    const [moreSeries, setMoreSeries] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);



    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
        }
    };

    useEffect(() => {
        async function fetchMovies() {
            setLoading(true);
            try {
                const response = await axios.get(`${moviesEndpoint}`, options);
                if (response.data) {
                    setError(false);
                }
                setMovies(response.data.results);
            } catch (e) {
                setError(true);
                console.error(e);
            }
            setLoading(false);
        }

        async function fetchSeries() {
            setLoading(true);
            try {
                const response = await axios.get(`${seriesEndpoint}`, options);
                if (response.data) {
                    setError(false);
                }
                setSeries(response.data.results);
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
            <div className="page-outer-container">
                <div className="loading-section">
                    {loading && <h2>Loading... </h2>}
                    {error && <h2>Error: Could not fetch data!</h2>}
                </div>
                <h1 className="home-titles">Trending Movies</h1>
                <div className="home-inner-container">
                    {loading && <h2>Loading... </h2>}
                    {error && <h2>Error: Could not fetch data!</h2>}
                    {!moreMovies && Object.keys(movies).length > 0 && movies.slice(0, 5).map((movie) => {
                        return <MovieCard
                            key={movie.id}
                            title={movie.title}
                            image={movie.poster_path}
                            rating={movie.vote_average}
                            id={movie.id}
                            name={movie.name}
                            tv={false}
                        />
                    })}
                    {moreMovies && Object.keys(movies).length > 0 && movies.map((movie) => {
                        return <MovieCard
                            key={movie.id}
                            title={movie.title}
                            image={movie.poster_path}
                            rating={movie.vote_average}
                            id={movie.id}
                            name={movie.name}
                            tv={false}
                        />
                    })}
                </div>
                <Button
                    buttonType="button"
                    children={moreMovies ? "Laat minder resultaten zien" : "Laat meer resultaten zien"}
                    name={moreMovies ? "active-home-results-button" : "inactive-home-results-button"}
                    clickHandler={() => setMoreMovies(!moreMovies)}
                />
                <h1 className="home-titles">Trending Series</h1>
                <div className="home-inner-container">
                    {loading && <h2>Loading... </h2>}
                    {error && <h2>Error: Could not fetch data!</h2>}
                    {Object.keys(series).length > 0 && console.log(series)}
                    {!moreSeries && Object.keys(series).length > 0 && series.slice(0, 5).map((tv) => {
                        return <MovieCard
                            key={tv.id}
                            title={tv.name}
                            image={tv.poster_path}
                            rating={tv.vote_average}
                            id={tv.id}
                            tv={true}
                        />
                    })}
                    {moreSeries && Object.keys(series).length > 0 && series.map((tv) => {
                        return <MovieCard
                            key={tv.id}
                            title={tv.name}
                            image={tv.poster_path}
                            rating={tv.vote_average}
                            id={tv.id}
                            tv={true}
                        />
                    })}
                </div>
                <Button
                    buttonType="button"
                    children={moreSeries ? "Laat minder resultaten zien" : "Laat meer resultaten zien"}
                    name={moreSeries ? "active-home-results-button" : "inactive-home-results-button"}
                    clickHandler={() => setMoreSeries(!moreSeries)}
                />
            </div>
        </>
    )
}

export default Home;