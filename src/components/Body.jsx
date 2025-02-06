import React, { useEffect, useState } from "react";
import "../style/Body.css";

const Body = ({ isDarkMode }) => { // Accept isDarkMode as a prop
  const [raindrops, setRaindrops] = useState([]);

  // Generate raindrops
  const generateRaindrops = () => {
    const numDrops = 25; // Number of raindrops
    const drops = [];
    for (let i = 0; i < numDrops; i++) {
      const left = Math.random() * 100; // Random position
      const delay = Math.random() * 10; // Random animation delay
      drops.push({ left, delay });
    }
    setRaindrops(drops);
  };

  useEffect(() => {
    generateRaindrops();
    const interval = setInterval(generateRaindrops, 5000); // Regenerate drops every 5 seconds

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  return (
    <div className={`digital-rain ${isDarkMode ? "dark-mode" : "light-mode"}`}> {/* Adjust class for theme */}
      {raindrops.map((drop, index) => (
        <span
          key={index}
          style={{
            left: `${drop.left}%`,
            animationDelay: `${drop.delay}s`,
            animationDuration: `${Math.random() * 3 + 2}s`, // Randomize speed
          }}
        >
          {Math.random() > 0.5 ? "1" : "0"}
        </span>
      ))}
    </div>
  );
};

export default Body;