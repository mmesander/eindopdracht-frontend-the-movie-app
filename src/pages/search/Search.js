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
    // General
    const [active, setActive] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    // Specific Search
    const [specificSearch, setSpecificSearch] = useState("");
    const [searchResults, setSearchResults] = useState({});

    // Filter Search
    const [endpoint, setEndpoint] = useState("https://api.themoviedb.org/3/discover/movie");
    const [minRating, setMinRating] = useState(0);
    const [maxRating, setMaxRating] = useState(10);
    const [series, setSeries] = useState(false);
    const [genresList, setGenresList] = useState({
        movieGenres: [],
        seriesGenres: [],
    });

    // General
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


    //Specific Search
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
            setSearchResults(response.data.results);
            setTotalPages(response.data.total_pages);

        } catch (e) {
            setError(true);
            console.error(e)
            setActive(false);
        }
        setLoading(false);
    }

    // Filter Search
    function handleMovieButton() {
        setEndpoint("https://api.themoviedb.org/3/discover/movie")
        setSeries(false);
        setGenresList({
            ...genresList,
            seriesGenres: [],
        });
    }

    function handleSeriesButton() {
        setEndpoint("https://api.themoviedb.org/3/discover/tv")
        setSeries(true);
        setGenresList({
            ...genresList,
            movieGenres: [],
        });
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

    function setSeriesGenres(id) {
        const checkGenreID = genresList.seriesGenres.find((genre) => {
            return id === genre;
        });

        if (checkGenreID) {
            const seriesGenresArray = [...genresList.seriesGenres];
            const indexNumberOf = seriesGenresArray.indexOf(id);

            seriesGenresArray.splice(indexNumberOf, 1);

            setGenresList({
                ...genresList,
                seriesGenres: seriesGenresArray,
            });
        } else {
            const seriesGenresArray = [...genresList.seriesGenres];

            seriesGenresArray.push(id);

            setGenresList({
                ...genresList,
                seriesGenres: seriesGenresArray,
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
                        <p>Genres:</p>
                        {!series && <section>
                            <Button
                                buttonType="button"
                                children="Actie"
                                name={genresList.movieGenres.includes(28) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setMovieGenres(28)}
                            />
                            <Button
                                buttonType="button"
                                children="Animatie"
                                name={genresList.movieGenres.includes(16) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setMovieGenres(16)}
                            />
                            <Button
                                buttonType="button"
                                children="Avontuur"
                                name={genresList.movieGenres.includes(12) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setMovieGenres(12)}
                            />
                            <Button
                                buttonType="button"
                                children="Documentaire"
                                name={genresList.movieGenres.includes(99) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setMovieGenres(99)}
                            />
                            <Button
                                buttonType="button"
                                children="Drama"
                                name={genresList.movieGenres.includes(18) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setMovieGenres(18)}
                            />
                            <Button
                                buttonType="button"
                                children="Familie"
                                name={genresList.movieGenres.includes(10751) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setMovieGenres(10751)}
                            />
                            <Button
                                buttonType="button"
                                children="Fantasie"
                                name={genresList.movieGenres.includes(14) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setMovieGenres(14)}
                            />
                            <Button
                                buttonType="button"
                                children="Historisch"
                                name={genresList.movieGenres.includes(36) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setMovieGenres(36)}
                            />
                            <Button
                                buttonType="button"
                                children="Horror"
                                name={genresList.movieGenres.includes(27) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setMovieGenres(27)}
                            />
                            <Button
                                buttonType="button"
                                children="Komedie"
                                name={genresList.movieGenres.includes(35) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setMovieGenres(35)}
                            />
                            <Button
                                buttonType="button"
                                children="Misdaad"
                                name={genresList.movieGenres.includes(80) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setMovieGenres(80)}
                            />
                            <Button
                                buttonType="button"
                                children="Muziek"
                                name={genresList.movieGenres.includes(10402) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setMovieGenres(10402)}
                            />
                            <Button
                                buttonType="button"
                                children="Mysterie"
                                name={genresList.movieGenres.includes(9648) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setMovieGenres(9648)}
                            />
                            <Button
                                buttonType="button"
                                children="Oorlog"
                                name={genresList.movieGenres.includes(10752) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setMovieGenres(10752)}
                            />
                            <Button
                                buttonType="button"
                                children="Romantiek"
                                name={genresList.movieGenres.includes(10749) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setMovieGenres(10749)}
                            />
                            <Button
                                buttonType="button"
                                children="Sciencefiction"
                                name={genresList.movieGenres.includes(878) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setMovieGenres(878)}
                            />
                            <Button
                                buttonType="button"
                                children="TV Film"
                                name={genresList.movieGenres.includes(10770) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setMovieGenres(10770)}
                            />
                            <Button
                                buttonType="button"
                                children="Thriller"
                                name={genresList.movieGenres.includes(53) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setMovieGenres(53)}
                            />
                            <Button
                                buttonType="button"
                                children="Western"
                                name={genresList.movieGenres.includes(37) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setMovieGenres(37)}
                            />
                        </section>}
                        {series && <section>
                            <Button
                                buttonType="button"
                                children="Actie & Avontuur"
                                name={genresList.seriesGenres.includes(10759) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setSeriesGenres(10759)}
                            />
                            <Button
                                buttonType="button"
                                children="Animatie"
                                name={genresList.seriesGenres.includes(16) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setSeriesGenres(16)}
                            />
                            <Button
                                buttonType="button"
                                children="Documentaire"
                                name={genresList.seriesGenres.includes(99) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setSeriesGenres(99)}
                            />
                            <Button
                                buttonType="button"
                                children="Drama"
                                name={genresList.seriesGenres.includes(18) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setSeriesGenres(18)}
                            />
                            <Button
                                buttonType="button"
                                children="Familie"
                                name={genresList.seriesGenres.includes(10751) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setSeriesGenres(10751)}
                            />
                            <Button
                                buttonType="button"
                                children="Kids"
                                name={genresList.seriesGenres.includes(10762) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setSeriesGenres(10762)}
                            />
                            <Button
                                buttonType="button"
                                children="Komedie"
                                name={genresList.seriesGenres.includes(35) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setSeriesGenres(35)}
                            />
                            <Button
                                buttonType="button"
                                children="Misdaad"
                                name={genresList.seriesGenres.includes(80) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setSeriesGenres(80)}
                            />
                            <Button
                                buttonType="button"
                                children="Mysterie"
                                name={genresList.seriesGenres.includes(9648) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setSeriesGenres(9648)}
                            />
                            <Button
                                buttonType="button"
                                children="News"
                                name={genresList.seriesGenres.includes(10763) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setSeriesGenres(10763)}
                            />
                            <Button
                                buttonType="button"
                                children="Reality"
                                name={genresList.seriesGenres.includes(10764) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setSeriesGenres(10764)}
                            />
                            <Button
                                buttonType="button"
                                children="Sci-Fi & Fantasy"
                                name={genresList.seriesGenres.includes(10765) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setSeriesGenres(10765)}
                            />
                            <Button
                                buttonType="button"
                                children="Soap"
                                name={genresList.seriesGenres.includes(10766) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setSeriesGenres(10766)}
                            />
                            <Button
                                buttonType="button"
                                children="Talk"
                                name={genresList.seriesGenres.includes(10767) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setSeriesGenres(10767)}
                            />
                            <Button
                                buttonType="button"
                                children="War & Politics"
                                name={genresList.seriesGenres.includes(10768) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setSeriesGenres(10768)}
                            />
                            <Button
                                buttonType="button"
                                children="Western"
                                name={genresList.seriesGenres.includes(37) ? "active-genre-button" : "inactive-genre-button"}
                                clickHandler={() => setSeriesGenres(37)}
                            />
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
                    {searchResults && searchResults.map((search) => {
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