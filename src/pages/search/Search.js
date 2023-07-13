// Functions
import React, {useEffect, useState} from "react";
import axios from "axios";
import InputSlider from "react-input-slider";
import {useNavigate, useParams} from "react-router-dom";

// Components
import Input from "../../components/inputelements/Input";
import Button from "../../components/button/Button";
import MovieCard from "../../components/moviecard/MovieCard";

// Helpers
import createFilterStrings from "../../helpers/createFilterStrings";
import createGenreArray from "../../helpers/createGenreArray";

// Styles
import './Search.css';

function Search() {
    // General
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const pageNumber = useParams().filterId;
    const [page, setPage] = useState(parseInt(pageNumber) || 1);
    const [totalPages, setTotalPages] = useState(0);

    // Specific Search
    const [specificSearch, setSpecificSearch] = useState("");

    // Filter Search
    const [filtersActive, setFiltersActive] = useState(false);
    const [filterSearchResults, setFilterSearchResults] = useState({});
    const [isMovie, setIsMovie] = useState(true);
    const [endpoint, setEndpoint] = useState('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=');
    const [minRating, setMinRating] = useState(0);
    const [maxRating, setMaxRating] = useState(10);
    const [sortText, setSortText] = useState("&sort_by=popularity.desc");
    const [genresList, setGenresList] = useState({
        movieGenres: [],
        seriesGenres: [],
    });

    const movieGenresID = [
        {name: "Actie", id: 28},
        {name: "Animatie", id: 16},
        {name: "Avontuur", id: 12},
        {name: "Documentaire", id: 99},
        {name: "Drama", id: 18},
        {name: "Familie", id: 10751},
        {name: "Fantasie", id: 14},
        {name: "Historisch", id: 36},
        {name: "Horror", id: 27},
        {name: "Komedie", id: 35},
        {name: "Misdaad", id: 80},
        {name: "Muziek", id: 10402},
        {name: "Mysterie", id: 9648},
        {name: "Oorlog", id: 10752},
        {name: "Romantiek", id: 10749},
        {name: "Sciencefiction", id: 878},
        {name: "TV Film", id: 10770},
        {name: "Thriller", id: 53},
        {name: "Western", id: 37}
    ];

    const seriesGenresID = [
        {name: "Actie & Avontuur", id: 10759},
        {name: "Animatie", id: 16},
        {name: "Documentaire", id: 99},
        {name: "Drama", id: 18},
        {name: "Familie", id: 10751},
        {name: "Kids", id: 10762},
        {name: "Komedie", id: 35},
        {name: "Misdaad", id: 80},
        {name: "Mysterie", id: 9648},
        {name: "News", id: 10763},
        {name: "Reality", id: 10764},
        {name: "Sci-Fi & Fantasy", id: 10765},
        {name: "Soap", id: 10766},
        {name: "Talk", id: 10767},
        {name: "War & Politics", id: 10768},
        {name: "Western", id: 37}
    ];

    const sortTextDataMovies = [
        {name: "Populariteit - Aflopend", string: "&sort_by=popularity.desc"},
        {name: "Populariteit - Oplopend", string: "&sort_by=popularity.asc"},
        {name: "Beoordeling - Aflopend", string: "&sort_by=vote_average.desc"},
        {name: "Beoordeling - Oplopend", string: "&sort_by=vote_average.asc"},
        {name: "Verschijningsdatum - Aflopend", string: "&sort_by=primary_release_date.desc"},
        {name: "Verschijningsdatum - Oplopend", string: "&sort_by=primary_release_date.asc"},
    ]

    const sortTextDataSeries = [
        {name: "Populariteit - Aflopend", string: "&sort_by=popularity.desc"},
        {name: "Populariteit - Oplopend", string: "&sort_by=popularity.asc"},
        {name: "Beoordeling - Aflopend", string: "&sort_by=vote_average.desc"},
        {name: "Beoordeling - Oplopend", string: "&sort_by=vote_average.asc"},
        {name: "Verschijningsdatum - Aflopend", string: "&sort_by=first_air_date.desc"},
        {name: "Verschijningsdatum - Oplopend", string: "&sort_by=first_air_date.asc"},
    ]

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
        }
    };


    // General
    useEffect(() => {
        if (page >= 1) {
            void fetchFilterSearch(
                endpoint,
                page,
                sortText,
            );
            setFiltersActive(true);
            updateUrl();
        }
    }, [page, sortText]);

    function updateUrl() {
        const newUrl = `/zoeken/filter/${page}`;
        navigate(newUrl, {replace: true});
    }


    //Specific Search
    function handleSpecificSearch(e) {
        e.preventDefault();
        const url = `/zoeken/specifiek/1?zoekopdracht=${encodeURIComponent(specificSearch)}`
        navigate(`${url}`);
    }


    // Filter Search
    function handleSortButton(text) {
        setPage(1);
        setSortText(text);
    }

    function handleMovieButton() {
        setEndpoint('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=');
        setIsMovie(true);
        setFiltersActive(false);
        setPage(1);
        setMinRating(0);
        setMaxRating(10);
        setGenresList({
            ...genresList,
            seriesGenres: [],
        });
    }

    function handleSeriesButton() {
        setEndpoint('https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=');
        setIsMovie(false);
        setFiltersActive(false);
        setMinRating(0);
        setMaxRating(10);
        setPage(1);
        setGenresList({
            ...genresList,
            movieGenres: [],
        });
    }

    function handleFilterReset() {
        setMinRating(0);
        setMaxRating(10);
        setFiltersActive(false);
        setGenresList({
            ...genresList,
            movieGenres: [],
            seriesGenres: [],
        })
    }

    function setMovieGenres(id) {
        const movieGenresArray = createGenreArray(id, genresList.movieGenres);

        setGenresList({
            ...genresList,
            movieGenres: movieGenresArray,
        });
    }

    function setSeriesGenres(id) {
        const serieGenresArray = createGenreArray(id, genresList.seriesGenres);

        setGenresList({
            ...genresList,
            seriesGenres: serieGenresArray,
        });
    }

    async function fetchFilterSearch(endpoint, page, sortText) {
        setLoading(true);
        const [genreString, ratingString] = createFilterStrings(isMovie, genresList, minRating, maxRating);
        try {
            const response = await axios.get(`${endpoint}+${page}${sortText}${ratingString}${genreString}`, options);
            if (response.data) {
                setError(false);
            }
            setFilterSearchResults(response.data.results);
            setTotalPages(response.data.total_pages);
        } catch (e) {
            setError(true);
            console.error(e);
        }
        setLoading(false);
    }

    function handleFilterSearch() {
        setFiltersActive(true);
        setPage(1);

        void fetchFilterSearch(endpoint, page, sortText);
    }

    return (
        <div className="search-page-outer-container">
            <section className="filter-search-container">
                <div className="search-menu-container">
                    <div className="search-menu search-specific">
                        <h2>Zoeken</h2>
                        <p>Zoek hier naar een specifieke film of serie</p>
                        <form onSubmit={handleSpecificSearch}>
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
                        <h2>Sorteren</h2>
                    </div>
                    <div className="search-menu search-filter-movies-series">
                        <p>Sorteer op:</p>
                        {isMovie && sortTextDataMovies.map((text) => {
                            return <Button
                                key={text.string}
                                buttonType="button"
                                children={text.name}
                                name={sortText.includes(text.string) ? "active-filter-button" : "inactive-filter-button"}
                                clickHandler={() => handleSortButton(text.string)}
                            />
                        })}
                        {!isMovie && sortTextDataSeries.map((text) => {
                            return <Button
                                key={text.string}
                                buttonType="button"
                                children={text.name}
                                name={sortText.includes(text.string) ? "active-filter-button" : "inactive-filter-button"}
                                clickHandler={() => handleSortButton(text.string)}
                            />
                        })}
                    </div>
                    <div className="search-menu">
                        <h2>Filters</h2>
                    </div>
                    <div className="search-menu">
                        <Button
                            buttonType="button"
                            name="filter-reset-button"
                            children="Reset alle filters"
                            clickHandler={handleFilterReset}
                        />
                    </div>
                    <div className="search-menu search-filter-movies-series">
                        <Button
                            type="radio"
                            id="search-filter-movies"
                            children="Ik zoek naar films"
                            clickHandler={handleMovieButton}
                            name={isMovie ? "active-filter-button" : "inactive-filter-button"}
                        />
                        <Button
                            type="radio"
                            id="search-filter-series"
                            children="Ik zoek naar series"
                            clickHandler={handleSeriesButton}
                            name={!isMovie ? "active-filter-button" : "inactive-filter-button"}
                        />
                    </div>
                    <div className="search-menu rating-outer-container">
                        <p>Minimale Rating:</p>
                        <div className="rating-inner-container">
                            <InputSlider
                                className="rating-slider"
                                axis="x"
                                x={minRating}
                                xstep={1}
                                xmax={10}
                                onChange={(value) => setMinRating(value.x)}
                                styles={{
                                    track: {
                                        backgroundColor: '#282828'
                                    },
                                    active: {
                                        backgroundColor: '#FFD700'
                                    },
                                    thumb: {
                                        width: 20,
                                        height: 20,
                                        backgroundColor: '#FFD700'
                                    },
                                    disabled: {
                                        opacity: 0.5
                                    }
                                }}
                            />
                            <p id="rating-styling">{minRating}</p>
                        </div>
                        <p>Maximale Rating:</p>
                        <div className="rating-inner-container">
                            <InputSlider
                                axis="x"
                                x={maxRating}
                                xstep={1}
                                xmax={10}
                                onChange={(value) => setMaxRating(value.x)}
                                styles={{
                                    track: {
                                        backgroundColor: '#282828'
                                    },
                                    active: {
                                        backgroundColor: '#FFD700'
                                    },
                                    thumb: {
                                        width: 20,
                                        height: 20,
                                        backgroundColor: '#FFD700'
                                    },
                                    disabled: {
                                        opacity: 0.5
                                    }
                                }}
                            />
                            <p>{maxRating}</p>
                        </div>
                        {minRating > maxRating &&
                            <h4 className="rating-error">Maximale rating kan niet kleiner zijn dan minimale rating
                                rating</h4>}
                    </div>
                    <div className="search-menu genres">
                        <p>Genres:</p>
                        {isMovie && <section>
                            {movieGenresID && movieGenresID.map((genre) => {
                                return <Button
                                    key={genre.id}
                                    buttonType="button"
                                    children={genre.name}
                                    name={genresList.movieGenres.includes(genre.id) ? "active-genre-button" : "inactive-genre-button"}
                                    clickHandler={() => setMovieGenres(genre.id)}
                                />
                            })}
                        </section>}
                        {!isMovie && <section>
                            {seriesGenresID && seriesGenresID.map((genre) => {
                                return <Button
                                    key={genre.id}
                                    buttonType="button"
                                    children={genre.name}
                                    name={genresList.seriesGenres.includes(genre.id) ? "active-genre-button" : "inactive-genre-button"}
                                    clickHandler={() => setSeriesGenres(genre.id)}
                                />
                            })}
                        </section>}
                    </div>
                    <div className="search-menu">
                        <Button
                            buttonType="button"
                            name="filter-search-button"
                            children="Zoeken"
                            clickHandler={handleFilterSearch}
                            disabled={minRating > maxRating}
                        />
                    </div>
                </div>
                <div className="filter-search-results-outer-container">
                    <div className="loading-error-section">
                        {loading && <h3 className="loading-message">Laden... </h3>}
                        {filterSearchResults.length === 0 &&
                            <h3 className="no-results-filter">Er zijn geen resultaten gevonden!</h3>}
                        {error && <h3 className="error-message">Foutmelding: Er kan geen data opgehaald worden!</h3>}
                    </div>
                    {filtersActive && (filterSearchResults.length > 1) && <div className="button-set-page-section">
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
                    </div>}
                    <div className="filter-search-results-inner-container">
                        {Object.keys(filterSearchResults).length > 0 && filtersActive && filterSearchResults.map((search) => {
                            if (!isMovie && search.name) {
                                return <MovieCard
                                    key={search.id}
                                    name={search.name}
                                    image={search.poster_path}
                                    rating={search.vote_average}
                                    id={search.id}
                                    isMovie={false}
                                />
                            } else if (isMovie && search.title) {
                                return <MovieCard
                                    key={search.id}
                                    title={search.title}
                                    image={search.poster_path}
                                    rating={search.vote_average}
                                    id={search.id}
                                    isMovie={true}
                                />
                            }
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Search;