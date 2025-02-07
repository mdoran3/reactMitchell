import React, { useEffect, useState } from "react";
import "../style/Body.css"; // Your existing CSS file
import VideoCarousel from "./VideoCarousel"; // Import VideoCarousel component
import { characters } from "../utils/languagechars"; 

const Body = ({ isDarkMode }) => {
  const [raindrops, setRaindrops] = useState([]);

  // Function to generate raindrops
  const generateRaindrops = () => {
    const numDrops = 50; // Number of raindrops
    const drops = [];
    for (let i = 0; i < numDrops; i++) {
      const left = Math.random() * 100; // Random position across the width
      const delay = Math.random() * 10; // Random animation delay
      const character = characters[Math.floor(Math.random() * characters.length)];
      drops.push({ left, delay, character });
    }
    setRaindrops(drops);
  };

  useEffect(() => {
    generateRaindrops();
    const interval = setInterval(generateRaindrops, 5000); // Regenerate drops every 5 seconds

    return () => clearInterval(interval); // Clean up the interval on unmount
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
            animationDuration: `${Math.random() * 6 + 4}s`, // Randomize speed
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