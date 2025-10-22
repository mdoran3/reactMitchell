import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";

export default function PhotoSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const locations = [
    "Fjaðrárgljúfur",
    "กรุงเทพฯ",
    "Salto Angel",
    "Geirangerfjord",
    "ရန်ကုန်",
    "Đèo Hải Vân",
    "Hà Nội",
    "鰂魚涌",
    "渋谷",
    "Monument Valley",
    "မန္တလေး",
    "John Ford Point",
    "Preikestolen",
    "ရွှေတိဂုံစေတီတော်",
    "Salto El Sapo",
    "ဗိုလ်ချုပ်အောင်ဆန်းဈေး",
    "Lăng Chủ tịch Hồ Chí Minh",
    "Đường mòn Hồ Chí Minh",
    "Háifoss"
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    // Trigger fade-in after mount
    setTimeout(() => setIsVisible(true), 10);
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fade-in-photo-slider${isVisible ? ' fade-in' : ''}`}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        padding: "0 20px",
        boxSizing: "border-box",
      }}
    >
      {/* Responsive container that maintains aspect ratio */}
      <div
        style={{
          position: "relative",
          width: "min(90vw, 1000px)", // Responsive width with max limit
          height: "min(70vh, 600px)",  // Responsive height with max limit
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <img
          src={images[currentIndex]}
          alt={locations[currentIndex]}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "8px",
            objectFit: "cover", // Use cover to fill container consistently
          }}
        />

        <button
          onClick={prevSlide}
          style={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            zIndex: 2,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          <ChevronLeft size={36} />
        </button>

        <button
          onClick={nextSlide}
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            zIndex: 2,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          <ChevronRight size={36} />
        </button>

        {/* Typewriter on top of image */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            color: "white",
            fontSize: "1.75rem",
            fontWeight: "bold",
            textShadow: "2px 2px 6px rgba(0,0,0,0.85)",
            backgroundColor: "rgba(0,0,0,0.4)",
            padding: "6px 12px",
            borderRadius: "8px",
            zIndex: 1001, 
            pointerEvents: "none", 
          }}
        >
          <Typewriter
            key={currentIndex}
            words={[locations[currentIndex]]}
            loop={1}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </div>
      </div>
    </div>
  );
}