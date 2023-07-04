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

    const [favoritesArray, setFavoritesArray] = useState([]);
    const [watchlistArray, setWatchlistArray] = useState([]);
    const [watchedArray, setWatchedArray] = useState([]);

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
                    setFavoritesArray((addFavorites) => [
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

        listItem.favoriteSeries.map((favorite) => {
            async function fetchFavoriteSeries() {
                setLoading(true);
                try {
                    const response = await axios.get(`https://api.themoviedb.org/3/tv/${favorite}`, options);
                    if (response.data) {
                        setError(false);
                    }
                    setFavoritesArray((addFavorites) => [
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

        listItem.watchlistMovies.map((watchlist) => {
            async function fetchWatchlistMovies() {
                setLoading(true);
                try {
                    const response = await axios.get(`https://api.themoviedb.org/3/movie/${watchlist}`, options);
                    if (response.data) {
                        setError(false);
                    }
                    setWatchlistArray((addWatchlist) => [
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
                    setWatchedArray((addWatched) => [
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

    }, [listItem]);


    return (
        <div className="page-outer-container">
            <h1 className="lists-titles">Favorieten</h1>
            <div className="lists-section-container">
                {favoritesArray.length > 0 && favoritesArray.map((favorite) => {
                    console.log(favorite.title)
                    return <MovieCard
                        key={favorite.id}
                        title={favorite.title}
                        image={favorite.poster_path}
                        rating={favorite.vote_average}
                        id={favorite.id}
                    />
                })}
                {!loading && !error && favoritesArray.length === 0 &&
                    <h3 className="no-items-message">Je hebt nog geen items aan je favorieten toegevoegd!</h3>}
                {loading && <h3 className="loading-message">Je lijst wordt opgehaald... </h3>}
                {error && <h3 className="error-message">Foutmelding: Er kan geen data opgehaald worden</h3>}
            </div>
            <h1 className="lists-titles">Watchlist</h1>
            <div className="lists-section-container">
                {watchlistArray.length > 0 && watchlistArray.map((watchlist) => {
                    return <MovieCard
                        key={watchlist.id}
                        title={watchlist.title}
                        image={watchlist.poster_path}
                        rating={watchlist.vote_average}
                        id={watchlist.id}
                    />
                })}
                {!loading && !error && watchlistArray.length === 0 &&
                    <h3>Je hebt nog geen items aan je watchlist toegevoegd</h3>}
                {loading && <h3 className="loading-message">Je lijst wordt opgehaald... </h3>}
                {error && <h3 className="error-message">Foutmelding: Er kan geen data opgehaald worden</h3>}
            </div>
            <h1 className="lists-titles">Watched</h1>
            <div className="lists-section-container">
                {watchedArray.length > 0 && watchedArray.map((watched) => {
                    return <MovieCard
                        key={watched.id}
                        title={watched.title}
                        image={watched.poster_path}
                        rating={watched.vote_average}
                        id={watched.id}
                    />
                })}
                {!loading && !error && watchedArray.length === 0 &&
                    <h3>Je hebt nog geen items aan al gezien toegevoegd!</h3>}
                {loading && <h3 className="loading-message">Je lijst wordt opgehaald... </h3>}
                {error && <h3 className="error-message">Foutmelding: Er kan geen data opgehaald worden</h3>}
            </div>
        </div>
    )
}

export default Lists;