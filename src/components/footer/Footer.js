// Functions
import React from "react";

// Styles
import './Footer.css';
import {Link} from "react-router-dom";

function Footer() {
    return (
        <div className="footer-outer-container">
            <h4>Deze applicatie is ontwikkeld door <Link to="https://www.linkedin.com/in/mark-mesander/" target="_blank">Mark Mesander</Link></h4>
        </div>
    )
}

export default Footer;