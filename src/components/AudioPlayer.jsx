import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import "../style/AudioPlayer.css";

const audioFile = "https://pub-5c6372312189426f903f701c7e1544e5.r2.dev/The%20Eulogy.wav";
  //"https://pub-917443ca83a94694bc49ac75707aa2a0.r2.dev/The%20Eulogy.wav";

const AudioPlayer = ({ isDarkMode }) => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (waveformRef.current) {
      wavesurferRef.current = WaveSurfer.create({
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

      // Load the audio file
      wavesurferRef.current.load(audioFile);

      // Listen for play and pause events
      wavesurferRef.current.on("play", () => {
        console.log("Audio is playing");
        setIsPlaying(true);
      });
      wavesurferRef.current.on("pause", () => {
        console.log("Audio is paused");
        setIsPlaying(false);
      });

      // Cleanup the WaveSurfer instance on unmount
      return () => {
        if (wavesurferRef.current) {
          wavesurferRef.current.destroy();
        }
      };
    }
  }, []);

  // Handle play/pause button click
  const handlePlayPause = () => {
    console.log("Play/Pause button clicked");
    wavesurferRef.current.playPause();
  };

  return (
    <div
      className={`audio-player ${isDarkMode ? "dark-mode" : ""}`} 
      style={{
        backgroundColor: isDarkMode ? "#000000" : "#f8f8f8",
        color: isDarkMode ? "#ffffff" : "#000000",
      }}
    >
      {/* Button container */}
      <div className="button-container">
        {/* Play Button (shown when NOT playing) */}
        {!isPlaying && (
          <button onClick={handlePlayPause} className="play-button">
            <i className="fas fa-play" />
          </button>
        )}

        {/* Pause Button (shown when playing) */}
        {isPlaying && (
          <button onClick={handlePlayPause} className="pause-button">
            <i className="fas fa-pause" />
          </button>
        )}
      </div>

      {/* Waveform */}
      <div ref={waveformRef} className="waveform"></div>
    </div>
  );
};

export default AudioPlayer;