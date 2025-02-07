import React from "react";
import { Link } from "react-router-dom"; 

const NavBar = ({ isDarkMode, setIsDarkMode }) => {
    return (
        <nav
        className={`nav-bar ${isDarkMode ? "dark-mode" : ""}`}
        style={{
            backgroundColor: isDarkMode ? "#000000" : "#f8f8f8",
            color: isDarkMode ? "#ffffff" : "#000000",
        }}
        >
        {/* Link components for navigation */}
        <Link to="/" className="nav-link">
            Home
        </Link>
        <Link to="/about" className="nav-link">
            About
        </Link>
        <button
            className="toggle-dark-mode"
            onClick={() => setIsDarkMode(!isDarkMode)}
        >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
        </nav>
    );
}

export default NavBar;