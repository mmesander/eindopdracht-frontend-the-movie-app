// Functions
import React, {useEffect, useState} from "react";
import axios from "axios";

// Components
import MovieCard from "../../components/moviecard/MovieCard";
import Button from "../../components/button/Button";

// Styles
import './Home.css';

function Home() {
    const [movies, setMovies] = useState({});
    const [moreMovies, setMoreMovies] = useState(false);
    const [moviePage, setMoviePage] = useState(1);
    const [totalMoviePages, setTotalMoviePages] = useState(0);

    const [series, setSeries] = useState({});
    const [moreSeries, setMoreSeries] = useState(false);
    const [seriesPage, setSeriesPage] = useState(1);
    const [totalSeriesPages, setTotalSeriesPages] = useState(0);

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
                const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?page=${moviePage}`, options);
                if (response.data) {
                    setError(false);
                }
                setMovies(response.data.results);
                setTotalMoviePages(response.data.total_pages);
            } catch (e) {
                setError(true);
                console.error(e);
            }
            setLoading(false);
        }

        async function fetchSeries() {
            setLoading(true);
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/trending/tv/day?page=${seriesPage}`, options);
                if (response.data) {
                    setError(false);
                }
                setSeries(response.data.results);
                setTotalSeriesPages(response.data.total_pages);

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
    }, [moviePage, seriesPage]);

    function handleClickMovies() {
        setMoreMovies(!moreMovies);
        setMoreSeries(false);
        setMoviePage(1);
        setSeriesPage(1);
    }

    function handleClickSeries() {
        setMoreSeries(!moreSeries);
        setMoreMovies(false);
        setSeriesPage(1);
        setMoviePage(1);
    }

    return (
        <>
            <div className="page-outer-container">
                <h1 className="home-titles">Trending Movies</h1>
                <div className="loading-error-section">
                    {loading && <h3 className="loading-message">Laden... </h3>}
                    {error && <h3 className="error-message">Foutmelding: Er kan geen data opgehaald worden!</h3>}
                </div>
                {moreMovies && <div className="button-set-page-section">
                    <Button
                        buttonType="button"
                        children="Vorige"
                        clickHandler={() => setMoviePage(moviePage - 1)}
                        disabled={moviePage === 1}
                    />
                    <Button
                        buttonType="button"
                        children="Volgende"
                        clickHandler={() => setMoviePage(moviePage + 1)}
                        disabled={moviePage === totalMoviePages}
                    />
                </div>}
                <div className="home-inner-container">
                    {!moreMovies && Object.keys(movies).length > 0 && movies.slice(0, 5).map((movie) => {
                        return <MovieCard
                            key={movie.id}
                            title={movie.title}
                            image={movie.poster_path}
                            rating={movie.vote_average}
                            id={movie.id}
                            name={movie.name}
                            isMovie={true}
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
                            isMovie={true}
                        />
                    })}
                </div>
                <Button
                    buttonType="button"
                    children={moreMovies ? "Laat minder resultaten zien" : "Laat meer resultaten zien"}
                    name={moreMovies ? "active-home-results-button" : "inactive-home-results-button"}
                    clickHandler={handleClickMovies}
                />
                <h1 className="home-titles">Trending Series</h1>
                <div className="loading-error-section">
                    {loading && <h3 className="loading-message">Laden... </h3>}
                    {error && <h3 className="error-message">Foutmelding: Er kan geen data opgehaald worden!</h3>}
                </div>
                {moreSeries && <div className="button-set-page-section">
                    <Button
                        buttonType="button"
                        children="Vorige"
                        clickHandler={() => setSeriesPage(seriesPage - 1)}
                        disabled={seriesPage === 1}
                    />
                    <Button
                        buttonType="button"
                        children="Volgende"
                        clickHandler={() => setSeriesPage(seriesPage + 1)}
                        disabled={seriesPage === totalSeriesPages}
                    />
                </div>}
                <div className="home-inner-container">
                    {!moreSeries && Object.keys(series).length > 0 && series.slice(0, 5).map((tv) => {
                        return <MovieCard
                            key={tv.id}
                            title={tv.name}
                            image={tv.poster_path}
                            rating={tv.vote_average}
                            id={tv.id}
                            isMovie={false}
                        />
                    })}
                    {moreSeries && Object.keys(series).length > 0 && series.map((tv) => {
                        return <MovieCard
                            key={tv.id}
                            title={tv.name}
                            image={tv.poster_path}
                            rating={tv.vote_average}
                            id={tv.id}
                            isMovie={false}
                        />
                    })}
                </div>
                <Button
                    buttonType="button"
                    children={moreSeries ? "Laat minder resultaten zien" : "Laat meer resultaten zien"}
                    name={moreSeries ? "active-home-results-button" : "inactive-home-results-button"}
                    clickHandler={handleClickSeries}
                />
            </div>
        </>
    );
}

export default Home;