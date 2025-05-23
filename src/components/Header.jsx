import React, { useState, useEffect } from "react";
import SocialLinks from "./SocialLinks";
import DarkModeToggle from "./DarkModeToggle";
import "../style/Header.css";

const Header = ({ isDarkMode, toggleDarkMode, currentTab, setCurrentTab }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className={`header ${isDarkMode ? "dark-mode" : "light-mode"}`}>
        {/* Left: Social Links */}
        <div className="header-left">
          <div className="social-links">
            <SocialLinks />
          </div>
        </div>

        {/* Center: Name and Title */}
        <div className="header-center">
          <div className="header-content">
            <h1>Mitchell D.</h1>
            <p>Software & Audio Engineer</p>
          </div>
        </div>

        {/* Right: Tabs + Toggle (only on desktop) */}
        <div className="header-right">
          <div className="tab-bar">
            <button onClick={() => setCurrentTab("travel")} className={currentTab === "travel" ? "active" : ""}>Travel</button>
            <button onClick={() => setCurrentTab("projects")} className={currentTab === "projects" ? "active" : ""}>Projects</button>
            <button onClick={() => setCurrentTab("music")} className={currentTab === "music" ? "active" : ""}>Audio</button>
          </div>
          {!isMobile && (
            <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          )}
        </div>
      </header>

      {/* Mobile toggle below header */}
      {isMobile && (
        <div className="mobile-toggle-switch">
          <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        </div>
      )}
    </>
  );
};

export default Header;