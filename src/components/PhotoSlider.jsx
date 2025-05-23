import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";

export default function PhotoSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const locations = [
    "Fjaðrárgljúfur",
    "กรุงเทพฯ",
    "Salto Angel",
    "Geirangerfjord",
    "ရန်ကုန်",
    "Đèo Hải Vân",
    "Hà Nội",
    "鰂魚涌",
    "渋谷区",
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
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div style={{ position: "relative", width: "600px", margin: "auto" }}>
      <img
        src={images[currentIndex]}
        alt={locations[currentIndex]}
        style={{ width: "100%", height: "auto", borderRadius: "8px" }}
      />
      <button
        onClick={prevSlide}
        style={{ position: "absolute", top: "50%", left: 0, transform: "translateY(-50%)" }}
      >
        <ChevronLeft size={36} />
      </button>
      <button
        onClick={nextSlide}
        style={{ position: "absolute", top: "50%", right: 0, transform: "translateY(-50%)" }}
      >
        <ChevronRight size={36} />
      </button>

      {/* Typewriter Location Text */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          color: "white",
          fontSize: "1.5rem",
          fontWeight: "bold",
          textShadow: "1px 1px 4px rgba(0,0,0,0.9)",
          backgroundColor: "rgba(0,0,0,0.3)",
          padding: "4px 10px",
          borderRadius: "6px",
          minWidth: "120px",
          textAlign: "right",
        }}
      >
        <Typewriter
          key={currentIndex} // to re-trigger typing on slide change
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
  );
}