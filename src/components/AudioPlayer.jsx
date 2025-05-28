import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import "../style/AudioPlayer.css";

const AudioPlayer = ({ isDarkMode, currentSong }) => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!currentSong?.url || !waveformRef.current) return;

    // Cleanup previous instance
    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
      wavesurferRef.current = null;
    }

    // Create new WaveSurfer instance
    const waveSurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#555",
      progressColor: "#096f6d",
      cursorColor: "#096f6d",
      cursorWidth: 5,
      barWidth: 20,
      barRadius: 100,
      responsive: true,
      height: 70,
      normalize: true,
    });

    wavesurferRef.current = waveSurfer;

    waveSurfer.load(currentSong.url);

    waveSurfer.on("ready", async () => {
      try {
        await waveSurfer.play(); // attempt autoplay
        setIsPlaying(true);
      } catch (err) {
        console.warn("Autoplay blocked or failed", err);
        setIsPlaying(false);
      }
    });

    waveSurfer.on("play", () => setIsPlaying(true));
    waveSurfer.on("pause", () => setIsPlaying(false));

    return () => {
      waveSurfer.destroy();
    };
  }, [currentSong?.url]);

  const handlePlayPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
    }
  };

  return (
    <div
      className={`audio-player ${isDarkMode ? "dark-mode" : ""}`}
      style={{
        backgroundColor: isDarkMode ? "#000000" : "#f8f8f8",
        color: isDarkMode ? "#ffffff" : "#000000",
        position: "relative",
      }}
    >
      {/* Song Title Display */}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 100,
          zIndex: 10,
          backgroundColor: "rgba(0, 0, 0, 0.7)", 
          color: "white", 
          fontWeight: "bold",
          fontSize: "1rem",
          pointerEvents: "none",
          userSelect: "none",
          padding: "2px 6px", 
          borderRadius: "4px", 
        }}
      >
        {currentSong?.name || "Loading..."}
      </div>

      {/* Play/Pause Button */}
      <div className="button-container">
        <button
          onClick={handlePlayPause}
          className={`${
            isPlaying ? "solid-ring pause-button" : "blinking-ring play-button"
          }`}
        >
          <i className={`fas fa-${isPlaying ? "pause" : "play"}`} />
        </button>
      </div>

      {/* Waveform */}
      <div ref={waveformRef} className="waveform" />
    </div>
  );
};

export default AudioPlayer;