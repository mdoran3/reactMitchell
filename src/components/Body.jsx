// import React, { useEffect, useState } from "react";
// import "../style/Body.css"; 
// import VideoCarousel from "./VideoCarousel"; 
// import PhotoSlider from "./PhotoSlider"; 
// import { characters } from "../utils/languagechars"; 

// const Body = ({ isDarkMode }) => {
//   const [raindrops, setRaindrops] = useState([]);

//   const generateRaindrops = () => {
//     const numDrops = 0; 
//     const drops = [];
//     for (let i = 0; i < numDrops; i++) {
//       const left = Math.random() * 100; 
//       const delay = Math.random() * 10; 
//       const character = characters[Math.floor(Math.random() * characters.length)];
//       drops.push({ left, delay, character });
//     }
//     setRaindrops(drops);
//   };

//   useEffect(() => {
//     generateRaindrops();
//     const interval = setInterval(generateRaindrops, 5000); 

//     return () => clearInterval(interval); 
//   }, []);

//   return (
//     <div className={`digital-rain ${isDarkMode ? "dark-mode" : "light-mode"}`}>
//       {/* Raindrops */}
//       {raindrops.map((drop, index) => (
//         <span
//           key={index}
//           style={{
//             left: `${drop.left}%`,
//             animationDelay: `${drop.delay}s`,
//             animationDuration: `${Math.random() * 6 + 4}s`,
//           }}
//         >
//           {drop.character}
//         </span>
//       ))}

//       {/* Video Carousel */}
//       {/* <div className="video-carousel-container">
//         <VideoCarousel />
//       </div> */}
//       <div className="photo-slider-container">
//         <PhotoSlider 
//           images={[
//             "/assets/images/iceland.png",
//             "/assets/images/thailand.png",
//             "/assets/images/angelfall.png", 
//             "/assets/images/fjord.png",
//             "/assets/images/grandCentral.png",
//             "/assets/images/haivanpass.JPG",
//             "/assets/images/hanoi.JPG",
//             "/assets/images/hongKong.png",
//             "/assets/images/japan.png",
//             "/assets/images/MV11.jpg",
//             "/assets/images/myanmar.png",
//             "/assets/images/navajo.png",
//             "/assets/images/norway.png",
//             "/assets/images/pagoda.png",
//             "/assets/images/sappo.png",
//             "/assets/images/train.png",
//             "/assets/images/vietnam.JPG",
//             "/assets/images/vietnam.png",
//             "/assets/images/waterfall.jpg"
//           ]} 
//         />
//       </div>
//     </div>
//   );
// };

// export default Body;


import React from "react";
import "../style/Body.css"; 
import PhotoSlider from "./PhotoSlider"; 

const Body = ({ isDarkMode }) => {
  return (
    <div className={`body-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="photo-slider-container">
        <PhotoSlider 
          images={[
            "/assets/images/iceland.png",
            "/assets/images/thailand.png",
            "/assets/images/angelfall.png", 
            "/assets/images/fjord.png",
            "/assets/images/grandCentral.png",
            "/assets/images/haivanpass.JPG",
            "/assets/images/hanoi.JPG",
            "/assets/images/hongKong.png",
            "/assets/images/japan.png",
            "/assets/images/MV11.jpg",
            "/assets/images/myanmar.png",
            "/assets/images/navajo.png",
            "/assets/images/norway.png",
            "/assets/images/pagoda.png",
            "/assets/images/sappo.png",
            "/assets/images/train.png",
            "/assets/images/vietnam.JPG",
            "/assets/images/vietnam.png",
            "/assets/images/waterfall.jpg"
          ]} 
        />
      </div>
    </div>
  );
};

export default Body;