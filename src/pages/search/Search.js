// Functions
import React, {useState} from "react";

// Components
import Input from "../../components/inputelements/Input";
import Button from "../../components/button/Button";

// Styles
import './Search.css'
import axios from "axios";

function Search() {
    const [specificSearch, setSpecificSearch] = useState("");
    const [active, setActive] = useState(false);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
        }
    };

    function clickHandler(e) {
        e.preventDefault();
        void fetchSpecificMovies();
    }

    async function fetchSpecificMovies() {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/multi?query=${specificSearch}&include_adult=false&language=en-US&page=1`, options)
            console.log(response.data)
            if (response.data) {
                setActive(true);
            }
        } catch (e) {
            console.error(e)
            console.log("er is geen data gevonden");
            setActive(false);
        }
    }

    return (
        <div className={active ? "page-outer-container" : "searchpage-outer-container"}>
            {!active && <section className="search-inactive-container">
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
                <div className="search-results-container"></div>
            </section>}
            {active && <section className="search-active-container">
                <button
                    className="button-to-overview"
                    type="button"
                    onClick={() => setActive(false)}
                >
                    Terug naar overzicht
                </button>
                <h2 className="suggestion-title">{`Dit zijn de zoekresultaten voor ${specificSearch}`}</h2>
            </section>}
        </div>
    )
}

export default Search;