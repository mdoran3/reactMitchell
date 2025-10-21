import React from "react";
import OrigamiFlower from "./OrigamiFlower";
import AudioPlayer from "./AudioPlayer";
import "../style/Footer.css";

const Footer = ({ isDarkMode, currentSong }) => (
  <footer className={`footer ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
    <div className="footer-content">
      <div className="footer-left">
        <OrigamiFlower width={80} height={80} />
      </div>
      <div className="footer-center">
        <p>&copy; {new Date().getFullYear()} mitchelld.net | All rights reserved</p>
      </div>
    </div>
    
  {/* AudioPlayer is now rendered globally as a floating component in App.jsx */}
  </footer>
);

export default Footer;