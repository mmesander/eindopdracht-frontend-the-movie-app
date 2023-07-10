// Functions
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

// Components
import Button from "../../components/button/Button";
import MovieCard from "../../components/moviecard/MovieCard";

// Styles
import './SuggestionSpecific.css';

function SuggestionSpecific() {
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const endpoint = searchParams.get('endpoint');
    const text = searchParams.get('text');
    const link = useParams().moodId;
    const pageNumber = useParams().pageId;

    const [movies, setMovies] = useState({});
    const [page, setPage] = useState(parseInt(pageNumber) || 1);
    const [title, setTitle] = useState("");
    const [totalPages, setTotalPages] = useState(0);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (page >= 1) {
            void fetchSpecificMovies(endpoint, text);
            updateUrl();
        }
    }, [page]);

    function updateUrl() {
        const newUrl = `/suggestie/${link}/${page}?endpoint=${endpoint}&text=${text}`
        navigate(newUrl, {replace: true});
    }

    async function fetchSpecificMovies(endpoint, text) {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${endpoint}`, options);
            if (response.data) {
                setError(false);
            }
            setMovies(response.data.results);
            setTitle(text);
            setTotalPages(response.data.total_pages);
        } catch (e) {
            setError(true);
            console.error(e);
        }
        setLoading(false);
    }

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
        }
    };

    return (
        <div className="page-outer-container">
            <button
                className="button-to-overview"
                type="button"
                onClick={() => navigate(-1)}
            >
                Terug naar overzicht
            </button>
            <h2 className="suggestion-title">{`Je hebt gekozen om ${title}`}</h2>
            <div className="loading-error-section">
                {loading && <h3 className="loading-message">Laden... </h3>}
                {error && <h3 className="error-message">Foutmelding: Er kan geen data opgehaald worden!</h3>}
            </div>
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
            <div className="suggestion-inner-container">
                {Object.keys(movies).length > 0 && movies.map((movie) => {
                    return <MovieCard
                        key={movie.id}
                        title={movie.title}
                        image={movie.poster_path}
                        rating={movie.vote_average}
                        id={movie.id}
                        tv={false}/>
                })}
            </div>
        </div>
    )
}

export default SuggestionSpecific;