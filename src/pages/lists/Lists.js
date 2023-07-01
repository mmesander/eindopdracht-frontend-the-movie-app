// Functions
import React, {useContext, useEffect} from "react";
import axios from "axios";

// Context
import {ListsContext} from "../../context/ListsContext";

// Styles
import './Lists.css'

function Lists() {
    const {listItem} = useContext(ListsContext);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
        }
    };

    useEffect(() => {
        listItem.favorite.map((id) => {
            console.log(id)
        })
    }, [])


// useEffect(() => {
//     const id = localStorage.getItem('favorite')
//     async function fetchFavorites() {
//         try {
//             const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=nl-NL`, options)
//             console.log(response)
//         } catch (e) {
//             console.error(e)
//         }
//     }
//     void fetchFavorites();
// }, []);

    return (
        <div className="page-outer-container">

        </div>
    )
}

export default Lists;