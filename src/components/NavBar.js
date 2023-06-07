import React from "react";
import logo from '../assets/tma-logo.png'

function NavBar() {
    return (
        <nav>
            <span className="logo-container">
                <img src={logo} alt="the movie app logo"/>
                <h3>
                    The Movie App
                </h3>
            </span>

            <ul>
                <li>Home</li>
                <li>Zoeken</li>
                <li>Suggestie</li>
                <li>Lijsten</li>
                <li><button>Uitloggen</button></li>
            </ul>
        </nav>
    )
}

export default NavBar;