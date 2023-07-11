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
    const pageNumber = useParams().filterId
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
    const [movieRatingString, setMovieRatingString] = useState("");
    const [movieGenreString, setMovieGenreString] = useState("");
    const [seriesRatingString, setSeriesRatingString] = useState("");
    const [seriesGenreString, setSeriesGenreString] = useState("");
    const [sortText, setSortText] = useState("");
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
    const seriesGenreID = [
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

    // General
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
        }
    };

    useEffect(() => {

        if (page >= 1 && isMovie) {
            void fetchMoviesFilterSearch({
                endpoint,
                page,
                sortText,
                movieRatingString,
                movieGenreString
            });
            setFiltersActive(true);
            updateUrl();
        }

        if (page >= 1 && !isMovie) {
            void fetchSeriesFilterSearch({
                endpoint,
                page,
                sortText,
                seriesRatingString,
                seriesGenreString
            });
            setFiltersActive(true);
            updateUrl();
        }
    }, [page]);

    function updateUrl() {
        if (isMovie) {
            const newUrl = `/zoeken/filter/${page}`
            navigate(newUrl, {replace: true});
        }
        if (!isMovie) {
            const newUrl = `/zoeken/filter/${page}`
            navigate(newUrl, {replace: true});
        }
    }

    //Specific Search
    function newClickHandler(e) {
        e.preventDefault();
        const url = `/zoeken/specifiek/1?zoekopdracht=${encodeURIComponent(specificSearch)}`
        navigate(`${url}`);
    }


    // Filter Search
    function handleMovieButton() {
        setEndpoint('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=');
        setIsMovie(true);
        setFiltersActive(false);
        setPage(1);
        setGenresList({
            ...genresList,
            seriesGenres: [],
        });
    }

    function handleSeriesButton() {
        setEndpoint('https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=');
        setIsMovie(false);
        setFiltersActive(false);
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

    async function fetchMoviesFilterSearch({endpoint, page, sortText, movieRatingString, movieGenreString}) {
        setLoading(true);
        try {
            const response = await axios.get(`${endpoint}+${page}${sortText}${movieRatingString}${movieGenreString}`, options);
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

    async function fetchSeriesFilterSearch({endpoint, page, sortText, seriesRatingString, seriesGenreString}) {
        setLoading(true);
        try {
            const response = await axios.get(`${endpoint}+${page}${sortText}${seriesRatingString}${seriesGenreString}`, options);
            if (response.data) {
                setError(false);
            }
            setFilterSearchResults(response.data.results);
            setTotalPages(response.data.total_pages);
            console.log(response.data);
        } catch (e) {
            setError(true);
            console.error(e);
        }
        setLoading(false);
    }

    function handleFilterSearch() {
        setSortText("&sort_by=popularity.desc");
        setFiltersActive(true);
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
                void fetchMoviesFilterSearch({
                    endpoint,
                    page,
                    sortText,
                    movieRatingString,
                    movieGenreString
                });
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
                    page,
                    sortText,
                    seriesRatingString,
                    seriesGenreString
                });
            }
        }
    }

    return (
        <div className="search-page-outer-container">
            <section className="filter-search-container">
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
                            {minRating > maxRating &&
                                <h4 className="rating-error">Minimale rating kan niet groter zijn dan maximale
                                    rating</h4>}
                        </div>
                    </div>
                    <div className="search-menu genres">
                        <p>Genres:</p>
                        {isMovie && <section>
                            {movieGenresID && movieGenresID.map((genre) => {
                                return <Button
                                    buttonType="button"
                                    children={genre.name}
                                    name={genresList.movieGenres.includes(genre.id) ? "active-genre-button" : "inactive-genre-button"}
                                    clickHandler={() => setMovieGenres(genre.id)}
                                />
                            })}
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
                            if (!isMovie && search.name && search.poster_path && search.vote_average) {
                                return <MovieCard
                                    key={search.id}
                                    name={search.name}
                                    image={search.poster_path}
                                    rating={search.vote_average}
                                    id={search.id}
                                    tv={true}
                                />
                            } else if (isMovie && search.title && search.poster_path && search.vote_average) {
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
                </div>
            </section>
        </div>
    )
}

export default Search;