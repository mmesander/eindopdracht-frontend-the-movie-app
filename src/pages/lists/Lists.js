// Functions
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";

// Context
import {ListsContext} from "../../context/ListsContext";

// Components
import MovieCard from "../../components/moviecard/MovieCard";

// Styles
import './Lists.css'

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
        listItem.favorite.map((favorite) => {
            async function fetchFavorites() {
                try {
                    const response = await axios.get(`https://api.themoviedb.org/3/movie/${favorite}?language=nl-NL`, options);
                    setFavoritesArray((addFavorites) => [
                        ...addFavorites,
                        response.data,
                    ]);
                } catch (e) {
                    console.error(e)
                }
            }

            void fetchFavorites();
        });

        listItem.watchlist.map((watchlist) => {
            async function fetchWatchlist() {
                try {
                    const response = await axios.get(`https://api.themoviedb.org/3/movie/${watchlist}?language=nl-NL`, options);
                    setWatchlistArray((addWatchlist) => [
                        ...addWatchlist,
                            response.data,
                    ]);
                } catch (e) {
                    console.error(e)
                }
            }

            void fetchWatchlist();
        });

        listItem.watched.map((watched) => {
            async function fetchWatched() {
                try {
                    const response = await axios.get(`https://api.themoviedb.org/3/movie/${watched}?language=nl-NL`, options);
                    setWatchedArray((addWatched) => [
                        ...addWatched,
                        response.data,
                    ]);
                } catch (e) {
                    console.error(e)
                }
            }

            void fetchWatched();
        });

    }, [listItem])


    return (
        <div className="page-outer-container">
            <h1 className="lists-titles">Favorieten</h1>
            <div className="lists-section-container">
                {favoritesArray.length > 0 && favoritesArray.map((favorite) => {
                    return <MovieCard
                        key={favorite.id}
                        title={favorite.title}
                        image={favorite.poster_path}
                        rating={favorite.vote_average}
                        id={favorite.id}
                    />
                })}
                {favoritesArray.length === 0 && <h3>Je hebt nog geen items aan je favorieten toegevoegd!</h3>}
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
                {watchlistArray.length === 0 && <h3>Je hebt nog geen items aan je watchlist toegevoegd</h3>}
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
                {watchedArray.length === 0 && <h3>Je hebt nog geen items aan al gezien toegevoegd!</h3>}
            </div>
        </div>
    )
}

export default Lists;