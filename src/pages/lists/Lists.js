// Functions
import React, {useEffect} from "react";

// Styles
import './Lists.css'
import axios from "axios";

function Lists() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
        }
    };

    useEffect(() => {
        const id = localStorage.getItem('favorite')
        async function fetchFavorites() {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=nl-NL`, options)
                console.log(response)
            } catch (e) {
                console.error(e)
            }
        }
        void fetchFavorites();
    }, []);

    return (
        <div className="page-outer-container">

        </div>
    )
}

export default Lists;