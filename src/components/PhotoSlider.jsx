import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../style/PhotoSlider.css";

export default function PhotoSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0); // Track the previous image for fade effect

  const nextSlide = () => {
    setPrevIndex(currentIndex); // Update the previous image index
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setPrevIndex(currentIndex); // Update the previous image index
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const photos = images || [
    "/assets/images/iceland.png",
    "/assets/images/angelfall.png", 
    "/assets/images/fjord.png",
    "/assets/images/grandCentral.png",
    "/assets/images/haivanpass.JPG",
    "/assets/images/hanoi.JPG",
    "/assets/images/hongKong.png",
    "/assets/images/indonesia.png",
    "/assets/images/japan.png",
    "/assets/images/MV11.jpg",
    "/assets/images/myanmar.png",
    "/assets/images/navajo.png",
    "/assets/images/norway.png",
    "/assets/images/pagoda.png",
    "/assets/images/sappo.png",
    "/assets/images/thailand.png",
    "/assets/images/train.png",
    "/assets/images/trolltunga.png",
    "/assets/images/vietnam.JPG",
    "/assets/images/vietnam.png",
    "/assets/images/waterfall.jpg"
  ];

  return (
    <div className="photo-slider-wrapper">
      <div className="photo-slider">
        <img
          src={photos[prevIndex]}
          alt="Previous Slide"
          className="slider-image fade"
          key={currentIndex}
        />
        <img
          src={photos[currentIndex]}
          alt="Current Slide"
          className="slider-image active"
          key={currentIndex} 
        />
        <button
          onClick={prevSlide}
          className="slider-button left"
        >
          <ChevronLeft size={36} />
        </button>
        <button
          onClick={nextSlide}
          className="slider-button right"
        >
          <ChevronRight size={36} />
        </button>
      </div>
    </div>
  );
}