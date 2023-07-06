// Functions
import React, {useEffect, useState} from "react";
import axios from "axios";

// Components
import Input from "../../components/inputelements/Input";
import Button from "../../components/button/Button";
import MovieCard from "../../components/moviecard/MovieCard";

// Styles
import './Search.css';

function Search() {
    const [specificSearch, setSpecificSearch] = useState("");
    const [active, setActive] = useState(false);
    const [search, setSearch] = useState({});
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [endpoint, setEndpoint] = useState("nummer 1");

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
    }, [page]);

    function clickHandler(e) {
        e.preventDefault();
        setPage(1);
        if (specificSearch) {
            void fetchSpecificMovies(specificSearch);
        }
    }

    async function fetchSpecificMovies(specificSearch) {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/multi?query=${specificSearch}&include_adult=false&language=en-US&page=${page}`, options)
            if (response.data) {
                setActive(true);
                setError(false);
            }
            setSearch(response.data.results);
            setTotalPages(response.data.total_pages);

        } catch (e) {
            setError(true);
            console.error(e)
            setActive(false);
        }
        setLoading(false);
    }


    return (
        <div className={active ? "page-outer-container" : "search-page-outer-container"}>
            {!active && <section className="filter-search-container">
                <div className="search-menu-container">
                    <div className="search-menu search-specific">
                        <h2>Zoeken</h2>
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
                    <div className="search-menu">
                        <h2>Filters</h2>
                    </div>
                    <div className="search-menu search-filter-movies-series">
                        <Button
                            type="radio"
                            id="search-filter-movies"
                            children="ik zoek naar films"
                            clickHandler={() => setEndpoint("nummer 1")}
                            name={endpoint === "nummer 1" ? "active-filter-button" : "inactive-filter-button"}
                        />
                        <Button
                            type="radio"
                            id="search-filter-series"
                            children="ik zoek naar series"
                            clickHandler={() => setEndpoint("nummer 2")}
                            name={endpoint === "nummer 2" ? "active-filter-button" : "inactive-filter-button"}
                        />
                    </div>
                    {endpoint && console.log(endpoint)}
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
                <div className="specific-search-results-container">
                    {search && search.map((search) => {
                        if (search.name && search.poster_path && search.vote_average) {
                            return <MovieCard
                                key={search.id}
                                name={search.name}
                                image={search.poster_path}
                                rating={search.vote_average}
                                id={search.id}
                                tv={true}
                            />
                        } else if (search.title && search.poster_path && search.vote_average) {
                            return <MovieCard
                                key={search.id}
                                title={search.title}
                                image={search.poster_path}
                                rating={search.vote_average}
                                id={search.id}
                                tv={false}
                            />
                        }
                    })}
                </div>
            </section>}
        </div>
    )
}

export default Search;