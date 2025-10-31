import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";

export default function PhotoSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const typewriterKeyRef = useRef(0);

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
    setCurrentIndex((prev) => {
      const next = (prev + 1) % images.length;
      setImageLoaded(false);
      typewriterKeyRef.current++;
      return next;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const next = (prev - 1 + images.length) % images.length;
      setImageLoaded(false);
      typewriterKeyRef.current++;
      return next;
    });
  };

  useEffect(() => {
    // Trigger fade-in after mount
    setTimeout(() => setIsVisible(true), 10);
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, []);

  // Reset typewriter when image loads
  useEffect(() => {
    if (imageLoaded) {
      typewriterKeyRef.current++;
    }
  }, [imageLoaded]);

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
          onLoad={() => setImageLoaded(true)}
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

        {/* Typewriter on top of image, only after image loads */}
        {imageLoaded && (
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
              key={typewriterKeyRef.current}
              words={[locations[currentIndex]]}
              loop={1}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </div>
        )}
      </div>
    </div>
  );
}