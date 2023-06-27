// Functions
import React from "react";

// Styles
import './Search.css'

function Search() {
    return (
        <div className="searchpage-outer-container">
            <div className="search-menu-container">
                <div className="search-menu search-specific">

                </div>
                <div className="search-menu search-filter-movies-series"></div>
                <div className="search-menu rating"></div>
                <div className="search-menu genres"></div>
            </div>
            <div className="search-results"></div>
        </div>
    )
}

export default Search;