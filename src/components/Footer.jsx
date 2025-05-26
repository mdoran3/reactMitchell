import React from "react";
import OrigamiFlower from "./OrigamiFlower";
import AudioPlayer from "./AudioPlayer";
import '../style/Footer.css';

const Footer = ({ isDarkMode }) => (
  <footer className="footer">
    <AudioPlayer isDarkMode={isDarkMode} />
    <div className="footer-content">
      <div className="footer-left">
        <OrigamiFlower width={100} height={100} />
      </div>
      <div className="footer-center">
        <p>&copy; {new Date().getFullYear()} mitchelld.net | All rights reserved</p>
      </div>
    </div>
  </footer>
);

export default Footer;