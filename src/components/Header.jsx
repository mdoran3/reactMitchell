import React, { useEffect, useRef, useState } from "react";
import { FaHome, FaFolder, FaMusic } from "react-icons/fa";
import SocialLinks from "./SocialLinks";
import SoundWave from "./SoundWave";
import "../style/Header.css";

const Header = ({ isDarkMode, toggleDarkMode, currentTab, onTabChange }) => {
  const headerRef = useRef(null);

  const [isMobile, setIsMobile] = useState(() => (
    typeof window !== "undefined" ? window.innerWidth <= 900 : false
  ));
  useEffect(() => {
    function setHeaderHeightVar() {
      if (!headerRef.current) return;
      const height = headerRef.current.offsetHeight;
      document.documentElement.style.setProperty("--header-height", `${height}px`);
    }

    function handleResize() {
      setIsMobile(window.innerWidth <= 900);
      // Re-measure on next frame after potential mobile/desktop layout swap.
      requestAnimationFrame(setHeaderHeightVar);
    }

    setHeaderHeightVar();

    const resizeObserver = new ResizeObserver(() => {
      setHeaderHeightVar();
    });

    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    window.addEventListener("resize", handleResize);

    const viewport = window.visualViewport;
    viewport?.addEventListener("resize", setHeaderHeightVar);
    viewport?.addEventListener("scroll", setHeaderHeightVar);

    return () => {
      window.removeEventListener("resize", handleResize);
      viewport?.removeEventListener("resize", setHeaderHeightVar);
      viewport?.removeEventListener("scroll", setHeaderHeightVar);
      resizeObserver.disconnect();
    };
  }, []);

  // Desktop tab bar (Home/Projects/Audio) is kept centered in the band between
  // the photo slider's left edge and the light/dark toggle's left edge, so it
  // lines up with the bento grid's photo column instead of hugging the toggle.
  // The photo slider only exists in the DOM on the "travel" tab, so its last
  // measured position is cached and reused on other tabs.
  const [photoLeft, setPhotoLeft] = useState(null);
  const photoLeftRef = useRef(null);
  useEffect(() => {
    if (isMobile) return;
    function measurePhotoAlign() {
      const photo = document.querySelector('.bento-photo');
      if (photo) {
        const left = photo.getBoundingClientRect().left;
        photoLeftRef.current = left;
        setPhotoLeft(left);
      } else if (photoLeftRef.current != null) {
        setPhotoLeft(photoLeftRef.current);
      }
    }
    const raf = requestAnimationFrame(measurePhotoAlign);
    window.addEventListener('resize', measurePhotoAlign);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measurePhotoAlign);
    };
  }, [isMobile, currentTab]);

  return (
    <header ref={headerRef} className={`header ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      {isMobile ? (
        <>
          <div className="header-top-row">
            <div className="social-links">
              <SocialLinks />
            </div>
            <div className="header-content">
              <h1>
                Mitchell <span className="header-name-accent">D.</span>
              </h1>
              <p className="header-tagline">
                <span className="header-tagline-eyebrow">Applied AI</span>
                <span className="header-tagline-role">Software × Audio Engineer</span>
              </p>
            </div>
            <div className="toggle-switch">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                />
                <span className="slider">
                  <span className="sun">
                    {/* sun icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="5"></circle>
                      <line x1="12" y1="1" x2="12" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="23"></line>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                      <line x1="1" y1="12" x2="3" y2="12"></line>
                      <line x1="21" y1="12" x2="23" y2="12"></line>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                  </span>
                  <span className="moon">
                    {/* moon icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                  </span>
                </span>
              </label>
            </div>
          </div>
          <div className="header-bottom-row">
            <div className="tab-bar">
              <button onClick={() => onTabChange("travel")} className={currentTab === "travel" ? "active" : ""}>
                <FaHome size={14} /> Home
              </button>
              <button onClick={() => onTabChange("projects")} className={currentTab === "projects" ? "active" : ""}>
                <FaFolder size={14} /> Projects
              </button>
              <button onClick={() => onTabChange("music")} className={currentTab === "music" ? "active" : ""}>
                <FaMusic size={14} /> Audio
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="header-left">
            <div className="social-links">
              <SocialLinks />
            </div>
          </div>
          <div className="header-center">
            <div className="header-content">
              <h1>
                Mitchell <span className="header-name-accent">D.</span>
              </h1>
              <p className="header-tagline">
                <span className="header-tagline-eyebrow">Applied AI</span>
                <span className="header-tagline-role">Software × Audio Engineer</span>
              </p>
            </div>
          </div>
          <div className="header-right">
            <div
              className="tab-bar"
              style={photoLeft != null ? { left: `${photoLeft}px` } : undefined}
            >
              <button onClick={() => onTabChange("travel")} className={currentTab === "travel" ? "active" : ""}>
                <FaHome size={14} /> Home
              </button>
              <button onClick={() => onTabChange("projects")} className={currentTab === "projects" ? "active" : ""}>
                <FaFolder size={14} /> Projects
              </button>
              <button onClick={() => onTabChange("music")} className={currentTab === "music" ? "active" : ""}>
                <FaMusic size={14} /> Audio
              </button>
            </div>
            <div className="toggle-switch">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                />
                <span className="slider">
                  <span className="sun">
                    {/* sun icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="5"></circle>
                      <line x1="12" y1="1" x2="12" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="23"></line>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                      <line x1="1" y1="12" x2="3" y2="12"></line>
                      <line x1="21" y1="12" x2="23" y2="12"></line>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                  </span>
                  <span className="moon">
                    {/* moon icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                  </span>
                </span>
              </label>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;