import React, { useEffect, useState } from "react";
import "../style/Body.css";

const Body = ({ isDarkMode }) => {
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
    <div className={`digital-rain ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      {/* Raindrops */}
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

      {/* YouTube iframe */}
      <div style={{
        position: 'absolute', 
        top: '45%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        zIndex: 1
      }}>
        <iframe 
          width="960" 
          height="540" 
          src="https://www.youtube.com/embed/EeuXGKk8gkM?autoplay=1"
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default Body;