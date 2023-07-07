// Functions
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

// Components
import Button from "../../components/button/Button";
import MovieCard from "../../components/moviecard/MovieCard";

function SearchSpecific() {
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('zoekopdracht');
    const pageNumber = useParams().searchId;

    const [searchResults, setSearchResults] = useState({});
    const [page, setPage] = useState(parseInt(pageNumber) || 1);
    const [totalPages, setTotalPages] = useState(0);

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
        if (page >= 1) {
            void fetchSpecificSearch(search);
            updateUrl();
        }
    }, [page])

    function updateUrl() {
        const newUrl = `/zoeken/specifiek/${page}?zoekopdracht=${search}`
        navigate(newUrl, {replace: true})
    }

    async function fetchSpecificSearch(search) {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=false&language=en-US&page=${page}`, options)
            if (response.data) {
                setError(false);
            }
            setSearchResults(response.data.results);
            setTotalPages(response.data.total_pages);
            console.log(response.data)
        } catch (e) {
            setError(true);
            console.error(e)
        }
        setLoading(false);
    }

    return (
        <div className="page-outer-container">
            <button
                className="button-to-overview"
                type="button"
                onClick={() => navigate(-1)}
            >
                Terug naar overzicht
            </button>
            <h2 className="suggestion-title">{`Dit zijn de resultaten voor ${search}`}</h2>
            <div className="button-set-page-section">
                <Button
                    buttonType="button"
                    children="Vorige"
                    clickHandler={() => setPage(page - 1)}
                    disabled={page === 1}
                />
                <Button
                    buttonType="button"
                    children="Volgende"
                    clickHandler={() => setPage(page + 1)}
                    disabled={page === totalPages}
                />
            </div>
        </div>
    )
}

export default SearchSpecific;