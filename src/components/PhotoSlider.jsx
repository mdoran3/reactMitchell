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
      {/* Responsive image container with overlay */}
      <div
        className="photo-slider-image-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          className="photo-slider-image-frame"
          style={{
            position: "relative",
            width: "min(90vw, 1000px)",
            height: "min(70vh, 600px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <img
            src={images[currentIndex]}
            alt={locations[currentIndex]}
            className="slider-image"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px', display: 'block', background: '#111' }}
            onLoad={() => setImageLoaded(true)}
          />
          {/* Typewriter on top of image, only after image loads */}
          {imageLoaded && (
            <div
              style={{
                position: "absolute",
                top: "min(20px, 4vw)",
                right: "min(20px, 4vw)",
                color: "white",
                fontSize: "clamp(1.1rem, 4vw, 2.1rem)",
                fontWeight: "bold",
                textShadow: "2px 2px 6px rgba(0,0,0,0.85)",
                backgroundColor: "rgba(0,0,0,0.4)",
                padding: "clamp(4px, 1vw, 12px) clamp(8px, 2vw, 18px)",
                borderRadius: "8px",
                zIndex: 1001,
                pointerEvents: "none",
                maxWidth: "100%",
                boxSizing: "border-box",
                transition: "font-size 0.2s, padding 0.2s"
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