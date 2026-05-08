import React from "react";
import "../style/Body.css"; 
import PhotoSlider from "./PhotoSlider"; 
import PerlinNoiseBackground from "./PerlinNoiseBackground";

const Body = ({ isDarkMode }) => {
  return (
    <div className={`body-container ${isDarkMode ? "dark-mode" : "light-mode"}`} style={{position: 'relative', overflow: 'hidden'}}>
      <PerlinNoiseBackground />
      <div className="photo-slider-container" style={{position: 'relative', zIndex: 1}}>
        <PhotoSlider 
          images={[
            "/assets/images/iceland.webp",
            "/assets/images/thailand.webp",
            "/assets/images/angelfall.webp",
            "/assets/images/fjord.webp",
            "/assets/images/grandCentral.webp",
            "/assets/images/haivanpass.webp",
            "/assets/images/hanoi.webp",
            "/assets/images/hongKong.webp",
            "/assets/images/japan.webp",
            "/assets/images/MV11.webp",
            "/assets/images/myanmar.webp",
            "/assets/images/navajo.webp",
            "/assets/images/norway.webp",
            "/assets/images/pagoda.webp",
            "/assets/images/sappo.webp",
            "/assets/images/train.webp",
            "/assets/images/vietnam.webp",
            "/assets/images/vietnam-2.webp",
            "/assets/images/waterfall.webp"
          ]} 
        />
      </div>
    </div>
  );
};

export default Body;