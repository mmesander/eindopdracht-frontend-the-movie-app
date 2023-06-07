import React from "react";
import logo from '../assets/tma-logo.png'
import './NavBar.css'
import {NavLink} from "react-router-dom";

function NavBar() {
    return (
        <nav className="navbar-container">
            <NavLink to="/">
                <span className="logo-container">
                <img src={logo} alt="the movie app logo"/>
                <h3>
                    The Movie App
                </h3>
                </span>
            </NavLink>

            <ul>
                <li><NavLink to="/" className={({isActive})=> isActive ? 'active-nav-link' : 'default-nav-link'}>Home</NavLink></li>
                <li><NavLink to="/zoeken" className={({isActive})=> isActive ? 'active-nav-link' : 'default-nav-link'}>Zoeken</NavLink></li>
                <li><NavLink to="/suggestie" className={({isActive})=> isActive ? 'active-nav-link' : 'default-nav-link'}>Suggestie</NavLink></li>
                <li><NavLink to="/lijsten" className={({isActive})=> isActive ? 'active-nav-link' : 'default-nav-link'}>Lijsten</NavLink></li>
                <li><button>Uitloggen</button></li>
            </ul>
        </nav>
    )
}

export default NavBar;