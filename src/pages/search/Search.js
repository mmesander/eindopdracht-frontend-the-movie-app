// Functions
import React, {useEffect, useState} from "react";

// Components
import Input from "../../components/inputelements/Input";
import Button from "../../components/button/Button";
import MovieCard from "../../components/moviecard/MovieCard";

// Styles
import './Search.css'
import axios from "axios";

function Search() {
    const [specificSearch, setSpecificSearch] = useState("");
    const [active, setActive] = useState(false);
    const [movies, setMovies] = useState({});
    const [page, setPage] = useState(1);
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
        if (page >= 1 && active) {
            void fetchSpecificMovies(specificSearch);
        }
    }, [page])

    function clickHandler(e) {
        e.preventDefault();
        setPage(1);
        if (specificSearch) {
            void fetchSpecificMovies(specificSearch);
        }
        console.log(specificSearch);
        console.log(totalPages);
    }

    async function fetchSpecificMovies(specificSearch) {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/multi?query=${specificSearch}&include_adult=false&language=en-US&page=1`, options)
            if (response.data) {
                setActive(true);
                setError(false);
            }
            setMovies(response.data.results);
            setTotalPages(response.data.total_pages);

        } catch (e) {
            setError(true);
            console.error(e)
            setActive(false);
        }
        setLoading(false);
        // console.log(movies)
    }

    return (
        <div className={active ? "page-outer-container" : "searchpage-outer-container"}>
            {!active && <section className="filter-search-container">
                <div className="search-menu-container">
                    <div className="search-menu search-specific">
                        <p>Zoek hier naar een specifieke film of serie</p>
                        <form onSubmit={clickHandler}>
                            <Input
                                type="text"
                                id="search-specific-field"
                                name="search-specific"
                                value={specificSearch}
                                placeholder="Typ hier je zoekopdracht"
                                onChange={(e) => setSpecificSearch(e.target.value)}
                            />
                            <Button
                                buttonType="submit"
                                children="Zoek"
                                id="search-specific-button"
                            />
                        </form>
                    </div>
                    <div className="search-menu search-filter-movies-series"></div>
                    <div className="search-menu rating"></div>
                    <div className="search-menu genres"></div>
                </div>
                <div className="filter-search-results-container"></div>
            </section>}
            {active && <section className="specific-search-container">
                <button
                    className="button-to-overview"
                    type="button"
                    onClick={() => setActive(false)}
                >
                    Terug naar overzicht
                </button>
                <h2 className="suggestion-title">{`Dit zijn de zoekresultaten voor ${specificSearch}`}</h2>
                <div className="loading-error-section">
                    {loading && <h3 className="loading-message">Loading... </h3>}
                    {error && <h3 className="error-message">Error: Could not fetch data!</h3>}
                </div>
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
                <div className="specific-search-results-container">
                    {Object.keys(movies).length > 0 && console.log(movies)}
                    {/*{Object.keys(movies).length > 0 && movies.map((movie) => {*/}
                    {/*    return <MovieCard key={movie.id} title={movie.title} image={movie.poster_path}*/}
                    {/*                      rating={movie.vote_average} id={movie.id}/>*/}
                    {/*})}*/}
                </div>
            </section>}
        </div>
    )
}

export default Search;