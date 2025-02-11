import { useState, useEffect } from "react";

const videos = [
  /***********************************
  * Add your YouTube video URLs here 
  **********************************/
  // { title: "Psyche Popup Tool Selector", src: "https://www.youtube.com/embed/EeuXGKk8gkM" },
  // { title: "Razor Vocoder", src: "https://www.youtube.com/embed/sOiD5vdeM7c" },
  // { title: "Archimede's Screw Animation", src: "https://www.youtube.com/embed/UwP7jclzsvw" },
  // { title : "Ableton Live Session", src: "https://www.youtube.com/embed/8aWJzuGFc3c" }
  { title: "Landing Page", src: "https://www.youtube.com/embed/2t0NNUTMQV8" }
  //{ title: "Sylenth", src: "https://www.youtube.com/embed/1hBAVQUhGJ8" }
  //{ title: "Sylenth", src: "https://5d8c9cc64e390e9643fac3a8419fe476.r2.cloudflarestorage.com/video" }
];

const VideoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  /**********************************************************************
  * Uncomment the following useEffect to enable automatic video switching
  **********************************************************************/
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 13000); // change video every 13 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="video-carousel-container">
      {/* Title Bar */}
      <div className="video-title">
        {videos[currentIndex].title}
      </div>

      {/* YouTube Video */}
      <iframe
        key={videos[currentIndex].src} 
        className="video-iframe"
        src={`${videos[currentIndex].src}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&iv_load_policy=3&cc_load_policy=0&loop=1&playlist=${videos[currentIndex].src.split('/embed/')[1]}`} 
        title={videos[currentIndex].title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoCarousel;