import React, { useEffect, useState } from "react";
import "../style/Body.css"; 
import VideoCarousel from "./VideoCarousel"; 
import { characters } from "../utils/languagechars"; 

const Body = ({ isDarkMode }) => {
  const [raindrops, setRaindrops] = useState([]);

  const generateRaindrops = () => {
    const numDrops = 0; 
    const drops = [];
    for (let i = 0; i < numDrops; i++) {
      const left = Math.random() * 100; 
      const delay = Math.random() * 10; 
      const character = characters[Math.floor(Math.random() * characters.length)];
      drops.push({ left, delay, character });
    }
    setRaindrops(drops);
  };

  useEffect(() => {
    generateRaindrops();
    const interval = setInterval(generateRaindrops, 5000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className={`digital-rain ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      {/* Raindrops */}
      {raindrops.map((drop, index) => (
        <span
          key={index}
          style={{
            left: `${drop.left}%`,
            animationDelay: `${drop.delay}s`,
            animationDuration: `${Math.random() * 6 + 4}s`,
          }}
        >
          {drop.character}
        </span>
      ))}

      {/* Video Carousel */}
      <div className="video-carousel-container">
        <VideoCarousel />
      </div>
    </div>
  );
};

export default Body;