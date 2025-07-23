import React, { useState, useEffect } from "react";
import OrigamiFlower from "./OrigamiFlower";
import AudioPlayer from "./AudioPlayer";
import "../style/Footer.css";

const Footer = ({ isDarkMode, currentSong }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled to the bottom
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      // Show footer when within 50px of the bottom
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50;
      setIsVisible(isAtBottom);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Check initial position
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className={`footer ${isDarkMode ? 'dark-mode' : 'light-mode'} ${isVisible ? 'visible' : ''}`}>
      <AudioPlayer isDarkMode={isDarkMode} currentSong={currentSong} />
      
      <div className="footer-content">
        <div className="footer-left">
          <OrigamiFlower width={80} height={80} />
        </div>
        <div className="footer-center">
          <p>&copy; {new Date().getFullYear()} mitchelld.net | All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;