// Functions
import React, {useEffect, useState} from "react";
import axios from "axios";
import InputSlider from "react-input-slider";
import {useNavigate, useParams} from "react-router-dom";

// Components
import Input from "../../components/inputelements/Input";
import Button from "../../components/button/Button";
import MovieCard from "../../components/moviecard/MovieCard";

// Styles
import './Search.css';

function Search() {
    // General
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const filterPageNumber = useParams().filterId


    // Specific Search
    const [specificSearch, setSpecificSearch] = useState("");
    const [searchResults, setSearchResults] = useState({});
    const [active, setActive] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);


    // Filter Search
    const [isMovie, setIsMovie] = useState(true);
    const [endpoint, setEndpoint] = useState('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=');
    const [minRating, setMinRating] = useState(0);
    const [maxRating, setMaxRating] = useState(10);
    const [filterSearchResults, setFilterSearchResults] = useState({});
    const [movieRatingString, setMovieRatingString] = useState("");
    const [movieGenreString, setMovieGenreString] = useState("");
    const [seriesRatingString, setSeriesRatingString] = useState("");
    const [seriesGenreString, setSeriesGenreString] = useState("");
    const [sortText, setSortText] = useState("");
    const [filterPage, setFilterPage] = useState(parseInt(filterPageNumber) || 1);
    const [totalFilterPages, setTotalFilterPages] = useState(0);
    const [activeFilter, setActiveFilter] = useState(false);
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
            void fetchSpecificSearch(specificSearch);
        }

        if (filterPage >= 1 && !active && isMovie) {
            void fetchMoviesFilterSearch({endpoint, filterPage, sortText, movieRatingString, movieGenreString});
            setActiveFilter(true);
            updateUrl();
        }
        if (filterPage >= 1 && !active && !isMovie) {
            void fetchSeriesFilterSearch({endpoint, filterPage, sortText, movieRatingString, movieGenreString});
            setActiveFilter(true);
            updateUrl();
        }
    }, [page, filterPage]);


    //Specific Search
    // function clickHandler(e) {
    //     e.preventDefault();
    //     setPage(1);
    //     if (specificSearch) {
    //         void fetchSpecificSearch(specificSearch);
    //     }
    // }

    function newClickHandler(e) {
        e.preventDefault();
        const url = `/zoeken/specifiek/1?zoekopdracht=${encodeURIComponent(specificSearch)}`
        navigate(`${url}`);
    }

    async function fetchSpecificSearch(specificSearch) {
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
        setEndpoint('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=')
        setIsMovie(true);
        setActiveFilter(false);
        setFilterPage(1);
        setGenresList({
            ...genresList,
            seriesGenres: [],
        });
    }

    function handleSeriesButton() {
        setEndpoint('https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=')
        setIsMovie(false);
        setActiveFilter(false);
        setFilterPage(1);
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

    async function fetchMoviesFilterSearch({endpoint, filterPage, sortText, movieRatingString, movieGenreString}) {
        try {
            const response = await axios.get(`${endpoint}+${filterPage}${sortText}${movieRatingString}${movieGenreString}`, options);
            setFilterSearchResults(response.data.results);
            setTotalFilterPages(response.data.total_pages);
            console.log(response.data);
        } catch (e) {
            console.error(e)
        }
    }

    async function fetchSeriesFilterSearch({endpoint, filterPage, sortText, seriesRatingString, seriesGenreString}) {
        try {
            const response = await axios.get(`${endpoint}+${filterPage}${sortText}${seriesRatingString}${seriesGenreString}`, options);
            setFilterSearchResults(response.data.results);
            setTotalFilterPages(response.data.total_pages);
            console.log(response.data);
        } catch (e) {
            console.error(e)
        }
    }


    function handleFilterSearch() {
        setSortText("&sort_by=popularity.desc");
        setActiveFilter(true);
        const genresText = "&with_genres=";
        const minRatingText = "&vote_average.gte=";
        const maxRatingText = "&vote_average.lte=";

        if (isMovie && endpoint) {
            if (genresList.movieGenres.length === 0) {
                setMovieGenreString("");
            } else if (genresList.movieGenres.length === 1) {
                setMovieGenreString(genresText + genresList.movieGenres[0]);
            } else {
                const numbersToString = genresList.movieGenres.map((id) => id.toString());
                const joinedNumbers = numbersToString.join('%2C');
                setMovieGenreString(genresText + joinedNumbers);
            }

            setMovieRatingString(minRatingText + minRating + maxRatingText + maxRating);

            if (Object.keys(movieRatingString).length > 0 && Object.keys(movieGenreString).length > 0 && Object.keys(sortText).length > 0) {
                void fetchMoviesFilterSearch({endpoint, filterPage, sortText, movieRatingString, movieGenreString});
            }
        }

        if (!isMovie && endpoint) {
            if (genresList.seriesGenres.length === 0) {
                setSeriesGenreString("");
            } else if (genresList.seriesGenres.length === 1) {
                setSeriesGenreString(genresText + genresList.seriesGenres[0]);
            } else {
                const numbersToString = genresList.seriesGenres.map((id) => id.toString());
                const joinedNumbers = numbersToString.join('%2C');
                setSeriesGenreString(genresText + joinedNumbers);
            }

            setSeriesRatingString(minRatingText + minRating + maxRatingText + maxRating);

            if (Object.keys(seriesRatingString).length > 0 && Object.keys(seriesGenreString).length > 0 && Object.keys(sortText).length > 0) {
                void fetchSeriesFilterSearch({
                    endpoint,
                    filterPage,
                    sortText,
                    seriesRatingString,
                    seriesGenreString
                });
            }
        }
    }

    function updateUrl() {
        const newUrl = `/zoeken/filter/${filterPage}`
        navigate(newUrl, {replace: true});
    }

    return (
        <div className={active ? "page-outer-container" : "search-page-outer-container"}>
            {!active && <section className="filter-search-container">
                <div className="search-menu-container">
                    <div className="search-menu search-specific">
                        <h2>Zoeken</h2>
                        <p>Zoek hier naar een specifieke film of serie</p>
                        <form onSubmit={newClickHandler}>
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
                            name={isMovie ? "active-filter-button" : "inactive-filter-button"}
                        />
                        <Button
                            type="radio"
                            id="search-filter-series"
                            children="ik zoek naar series"
                            clickHandler={handleSeriesButton}
                            name={!isMovie ? "active-filter-button" : "inactive-filter-button"}
                        />
                    </div>
                    <div className="search-menu rating">
                        <p>Minimale Rating:</p>
                        <div>
                            <InputSlider
                                className="rating-slider"
                                axis="x"
                                x={minRating}
                                xstep={1}
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
                                xstep={1}
                                xmax={10}
                                onChange={(value) => setMaxRating(value.x)}
                            />
                            <p>{maxRating}</p>
                        </div>
                    </div>
                    <div className="search-menu genres">
                        <p>Genres:</p>
                        {isMovie && <section>
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
                        {!isMovie && <section>
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
                    <div className="search-menu">
                        <Button
                            buttonType="button"
                            name="filter-search-button"
                            children="Zoeken"
                            clickHandler={handleFilterSearch}
                        />
                    </div>
                </div>
                <div className="filter-search-results-outer-container">
                    <div className="loading-error-section">
                        {loading && <h3 className="loading-message">Loading... </h3>}
                        {filterSearchResults.length === 0 &&
                            <h3 className="no-results-filter">Er zijn geen resultaten gevonden!</h3>}
                        {error && <h3 className="error-message">Error: Could not fetch data!</h3>}
                    </div>
                    {activeFilter && (filterSearchResults.length > 1) && <div className="button-set-page-section">
                        <Button
                            buttonType="button"
                            children="Vorige"
                            clickHandler={() => setFilterPage(filterPage - 1)}
                            disabled={filterPage === 1}
                        />
                        <Button
                            buttonType="button"
                            children="Volgende"
                            clickHandler={() => setFilterPage(filterPage + 1)}
                            disabled={filterPage === totalFilterPages}
                        />
                    </div>}
                    <div className="filter-search-results-inner-container">
                        {Object.keys(filterSearchResults).length > 0 && isMovie && activeFilter && filterSearchResults.map((movie) => {
                            return <MovieCard
                                key={movie.id}
                                title={movie.title}
                                image={movie.poster_path}
                                rating={movie.vote_average}
                                id={movie.id}
                                tv={false}
                            />
                        })}
                        {Object.keys(filterSearchResults).length > 0 && !isMovie && activeFilter && filterSearchResults.map((series) => {
                            return <MovieCard
                                key={series.id}
                                title={series.name}
                                image={series.poster_path}
                                rating={series.vote_average}
                                id={series.id}
                                tv={true}
                            />
                        })}
                    </div>
                </div>
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
                {/*<div className="specific-search-results-container">*/}
                {/*    {searchResults && searchResults.map((search) => {*/}
                {/*        if (search.name && search.poster_path && search.vote_average) {*/}
                {/*            return <MovieCard*/}
                {/*                key={search.id}*/}
                {/*                name={search.name}*/}
                {/*                image={search.poster_path}*/}
                {/*                rating={search.vote_average}*/}
                {/*                id={search.id}*/}
                {/*                tv={true}*/}
                {/*            />*/}
                {/*        } else if (search.title && search.poster_path && search.vote_average) {*/}
                {/*            return <MovieCard*/}
                {/*                key={search.id}*/}
                {/*                title={search.title}*/}
                {/*                image={search.poster_path}*/}
                {/*                rating={search.vote_average}*/}
                {/*                id={search.id}*/}
                {/*                tv={false}*/}
                {/*            />*/}
                {/*        }*/}
                {/*    })}*/}
                {/*</div>*/}
            </section>}
        </div>
    )
}

export default Search;