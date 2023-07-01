// Functions
import React, {useContext, useEffect} from "react";
import axios from "axios";

// Context
import {ListsContext} from "../../context/ListsContext";

// Styles
import './Lists.css'

function Lists() {
    const {listItem} = useContext(ListsContext);
    let favoritesArray = [];

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
        }
    };

    // Stappenplan
    // 1. Er moet een variabele aangemaakt worden: een lege array waar straks objecten ingezet worden
    // 2. De array met de id's van de favorieten moeten opgehaald worden uit de context
    // 3. Over de array met id's van favorieten moet heen gemapt worden zodat de specifieke id gebruikt kan worden
    // 4. De specifieke id wordt gebruikt om data op te halen
    // 5. Deze data (object) moet toegevoegd worden aan de lege array
    // 6. De inmiddels gevulde daar moet overheen gemapt worden en de data moet geinjecteerd worden in de moviecontainer


    useEffect(() => {
        listItem.favorite.map((favorite) => {
            async function fetchFavorites() {
                try {
                    const response = await axios.get(`https://api.themoviedb.org/3/movie/${favorite}?language=nl-NL`, options);
                    favoritesArray.push(response.data)
                } catch (e) {
                    console.error(e)
                }
            }
            void fetchFavorites();
        })


        console.log(favoritesArray)

    }, [])


    return (
        <div className="page-outer-container">

        </div>
    )
}

export default Lists;