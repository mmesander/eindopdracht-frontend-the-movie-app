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
    const [watchtedArray, setWatchedArray] = useState([]);

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

    }, [listItem.favorite])


    return (
        <div className="page-outer-container">
            <h1 className="lists-titles">Favorieten</h1>
            <div className="lists-section-container">
                {favoritesArray.length > 0 && favoritesArray.map((favorite) => {
                    return <MovieCard key={favorite.id} title={favorite.title} image={favorite.poster_path} rating={favorite.vote_average} id={favorite.id}/>
                })}
                {favoritesArray.length === 0 && <p>Geen favorieten gevonden!</p>}
            </div>
        </div>
    )
}

export default Lists;