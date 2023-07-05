// Functions
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";

// Context
import {ListsContext} from "../../context/ListsContext";

// Components
import MovieCard from "../../components/moviecard/MovieCard";

// Styles
import './Lists.css';

function Lists() {
    const {listItem} = useContext(ListsContext);

    const [favoriteMoviesArray, setFavoriteMoviesArray] = useState([]);
    const [watchlistMoviesArray, setWatchlistMoviesArray] = useState([]);
    const [watchedMoviesArray, setWatchedMoviesArray] = useState([]);

    const [favoriteSeriesArray, setFavoriteSeriesArray] = useState([]);
    const [watchlistSeriesArray, setWatchlistSeriesArray] = useState([]);
    const [watchedSeriesArray, setWatchedSeriesArray] = useState([]);

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
        listItem.favoriteMovies.map((favorite) => {
            async function fetchFavoriteMovies() {
                setLoading(true);
                try {
                    const response = await axios.get(`https://api.themoviedb.org/3/movie/${favorite}`, options);
                    if (response.data) {
                        setError(false);
                    }
                    setFavoriteMoviesArray((addFavorites) => [
                        ...addFavorites,
                        response.data,
                    ]);
                } catch (e) {
                    setError(true);
                    console.error(e);
                }
                setLoading(false);
            }

            void fetchFavoriteMovies();
        });

        listItem.watchlistMovies.map((watchlist) => {
            async function fetchWatchlistMovies() {
                setLoading(true);
                try {
                    const response = await axios.get(`https://api.themoviedb.org/3/movie/${watchlist}`, options);
                    if (response.data) {
                        setError(false);
                    }
                    setWatchlistMoviesArray((addWatchlist) => [
                        ...addWatchlist,
                        response.data,
                    ]);
                } catch (e) {
                    setError(true);
                    console.error(e);
                }
                setLoading(false);
            }

            void fetchWatchlistMovies();
        });

        listItem.watchedMovies.map((watched) => {
            async function fetchWatchedMovies() {
                setLoading(true);
                try {
                    const response = await axios.get(`https://api.themoviedb.org/3/movie/${watched}`, options);
                    if (response.data) {
                        setError(false);
                    }
                    setWatchedMoviesArray((addWatched) => [
                        ...addWatched,
                        response.data,
                    ]);
                } catch (e) {
                    setError(true);
                    console.error(e);
                }
                setLoading(false);
            }

            void fetchWatchedMovies();
        });

        listItem.favoriteSeries.map((favorite) => {
            async function fetchFavoriteSeries() {
                setLoading(true);
                try {
                    const response = await axios.get(`https://api.themoviedb.org/3/tv/${favorite}`, options);
                    if (response.data) {
                        setError(false);
                    }
                    setFavoriteSeriesArray((addFavorites) => [
                        ...addFavorites,
                        response.data,
                    ]);
                } catch (e) {
                    setError(true);
                    console.error(e);
                }
                setLoading(false);
            }

            void fetchFavoriteSeries();
        });

        listItem.watchlistSeries.map((watchlist) => {
            async function fetchWatchlistSeries() {
                setLoading(true);
                try {
                    const response = await axios.get(`https://api.themoviedb.org/3/tv/${watchlist}`, options);
                    if (response.data) {
                        setError(false);
                    }
                    setWatchlistSeriesArray((addWatchlist) => [
                        ...addWatchlist,
                        response.data,
                    ]);
                } catch (e) {
                    setError(true);
                    console.error(e);
                }
                setLoading(false);
            }

            void fetchWatchlistSeries();
        });

        listItem.watchedSeries.map((watched) => {
            async function fetchWatchedSeries() {
                setLoading(true);
                try {
                    const response = await axios.get(`https://api.themoviedb.org/3/tv/${watched}`, options);
                    if (response.data) {
                        setError(false);
                    }
                    setWatchedSeriesArray((addWatched) => [
                        ...addWatched,
                        response.data,
                    ]);
                } catch (e) {
                    setError(true);
                    console.error(e);
                }
                setLoading(false);
            }

            void fetchWatchedSeries();
        });

    }, [listItem]);


    return (
        <div className="page-outer-container">
            <h1 className="lists-titles">Favorieten</h1>
            <div className="lists-section-container">
                {favoriteMoviesArray.length > 0 && favoriteMoviesArray.map((favorite) => {
                    return <MovieCard
                        key={favorite.id}
                        title={favorite.title}
                        image={favorite.poster_path}
                        rating={favorite.vote_average}
                        id={favorite.id}
                        tv={false}
                    />
                })}

                {favoriteSeriesArray.length > 0 && favoriteSeriesArray.map((favorite) => {
                    return <MovieCard
                        key={favorite.id}
                        name={favorite.name}
                        image={favorite.poster_path}
                        rating={favorite.vote_average}
                        id={favorite.id}
                        tv={true}
                    />
                })}

                {!loading && !error && favoriteMoviesArray.length === 0 && favoriteSeriesArray.length === 0 &&
                    <h3 className="no-items-message">Je hebt nog geen items aan je favorieten toegevoegd!</h3>}
                {loading && <h3 className="loading-message">Je lijst wordt opgehaald... </h3>}
                {error && <h3 className="error-message">Foutmelding: Er kan geen data opgehaald worden</h3>}
            </div>
            <h1 className="lists-titles">Watchlist</h1>
            <div className="lists-section-container">
                {watchlistMoviesArray.length > 0 && watchlistMoviesArray.map((watchlist) => {
                    return <MovieCard
                        key={watchlist.id}
                        title={watchlist.title}
                        image={watchlist.poster_path}
                        rating={watchlist.vote_average}
                        id={watchlist.id}
                        tv={false}
                    />
                })}

                {watchlistSeriesArray.length > 0 && watchlistSeriesArray.map((watchlist) => {
                    return <MovieCard
                        key={watchlist.id}
                        name={watchlist.name}
                        image={watchlist.poster_path}
                        rating={watchlist.vote_average}
                        id={watchlist.id}
                        tv={true}
                    />
                })}

                {!loading && !error && watchlistMoviesArray.length === 0 && watchlistSeriesArray.length === 0 &&
                    <h3 className="no-items-message">Je hebt nog geen items aan je watchlist toegevoegd</h3>}
                {loading && <h3 className="loading-message">Je lijst wordt opgehaald... </h3>}
                {error && <h3 className="error-message">Foutmelding: Er kan geen data opgehaald worden</h3>}
            </div>
            <h1 className="lists-titles">Al gezien</h1>
            <div className="lists-section-container">
                {watchedMoviesArray.length > 0 && watchedMoviesArray.map((watched) => {
                    return <MovieCard
                        key={watched.id}
                        title={watched.title}
                        image={watched.poster_path}
                        rating={watched.vote_average}
                        id={watched.id}
                        tv={false}
                    />
                })}

                {watchedSeriesArray.length > 0 && watchedSeriesArray.map((watched) => {
                    return <MovieCard
                        key={watched.id}
                        name={watched.name}
                        image={watched.poster_path}
                        rating={watched.vote_average}
                        id={watched.id}
                        tv={true}
                    />
                })}

                {!loading && !error && watchedMoviesArray.length === 0 && watchedSeriesArray.length === 0 &&
                    <h3 className="no-items-message">Je hebt nog geen items aan al gezien toegevoegd!</h3>}
                {loading && <h3 className="loading-message">Je lijst wordt opgehaald... </h3>}
                {error && <h3 className="error-message">Foutmelding: Er kan geen data opgehaald worden</h3>}
            </div>
        </div>
    )
}

export default Lists;