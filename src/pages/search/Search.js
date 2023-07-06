// Functions
import React, {useEffect, useState} from "react";
import axios from "axios";
import InputSlider from "react-input-slider";

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

    const [endpoint, setEndpoint] = useState("https://api.themoviedb.org/3/discover/movie");
    const [minRating, setMinRating] = useState(0);
    const [maxRating, setMaxRating] = useState(10);
    const [series, setSeries] = useState(false);
    const [genresList, setGenresList] = useState({
        movieGenres: [],
        seriesGenres: [],
    });

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

    function handleMovieButton() {
        setEndpoint("https://api.themoviedb.org/3/discover/movie")
        setSeries(false);
    }

    function handleSeriesButton() {
        setEndpoint("https://api.themoviedb.org/3/discover/tv")
        setSeries(true);
    }

    function setMovieGenres(id) {
        const checkGenreID = genresList.movieGenres.find((genre) => {
            return id === genre;
        });

        if (checkGenreID) {
            const movieGenresArray = [...genresList.movieGenres];
            const indexNumberOf = movieGenresArray.indexOf(id);

            movieGenresArray.splice(indexNumberOf, 1);

            setGenresList({
                ...genresList,
                movieGenres: movieGenresArray,
            });
        } else {
            const movieGenresArray = [...genresList.movieGenres];

            movieGenresArray.push(id);

            setGenresList({
                ...genresList,
                movieGenres: movieGenresArray,
            })
        }
    }






    return (
        <div className={active ? "page-outer-container" : "search-page-outer-container"}>
            {genresList.movieGenres && console.log(genresList.movieGenres)}
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
                            clickHandler={handleMovieButton}
                            name={endpoint === "https://api.themoviedb.org/3/discover/movie" ? "active-filter-button" : "inactive-filter-button"}
                        />
                        <Button
                            type="radio"
                            id="search-filter-series"
                            children="ik zoek naar series"
                            clickHandler={handleSeriesButton}
                            name={endpoint === "https://api.themoviedb.org/3/discover/tv" ? "active-filter-button" : "inactive-filter-button"}
                        />
                    </div>
                    {endpoint && console.log(endpoint)}
                    <div className="search-menu rating">
                        <p>Minimale Rating:</p>
                        <div>
                            <InputSlider
                                className="rating-slider"
                                axis="x"
                                x={minRating}
                                xmax={10}
                                onChange={(value) => setMinRating(value.x)}
                            />
                            <p id="rating-styling">{minRating}</p>
                        </div>
                        <p>Maximale Rating:</p>
                        <div>
                            <InputSlider
                                axis="x"
                                x={maxRating}
                                xmax={10}
                                onChange={(value) => setMaxRating(value.x)}
                            />
                            <p>{maxRating}</p>
                        </div>
                    </div>
                    <div className="search-menu genres">
                        {!series && <section>
                            <Button
                                buttonType="button"
                                children="actie"
                                name={genresList.movieGenres.includes(28) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setMovieGenres(28)}
                            />
                            <Button
                                buttonType="button"
                                children="testgenre"
                                name={genresList.movieGenres.includes(18) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setMovieGenres(18)}
                            />
                        </section>}
                        {series && <section>

                        </section>}
                    </div>
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