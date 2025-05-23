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