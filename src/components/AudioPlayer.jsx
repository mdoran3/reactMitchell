// import React, { useEffect, useRef, useState } from "react";
// import WaveSurfer from "wavesurfer.js";
// import "../style/AudioPlayer.css";

// const audioFile = "https://pub-5c6372312189426f903f701c7e1544e5.r2.dev/The%20Eulogy.wav";
//   //"https://pub-917443ca83a94694bc49ac75707aa2a0.r2.dev/The%20Eulogy.wav";

// const AudioPlayer = ({ isDarkMode }) => {
//   const waveformRef = useRef(null);
//   const wavesurferRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isWaveformReady, setIsWaveformReady] = useState(false);

//   useEffect(() => {
//     if (waveformRef.current) {
//       wavesurferRef.current = WaveSurfer.create({
//         container: waveformRef.current,
//         waveColor: "#555",
//         progressColor: "#096f6d",
//         cursorColor: "#096f6d",
//         cursorWidth: 5,
//         barWidth: 20,
//         barRadius: 100,
//         responsive: true,
//         height: 70,
//         normalize: true,
//       });

//       // Load the audio file
//       wavesurferRef.current.load(audioFile);

//       // Render waveform once ready
//       wavesurferRef.current.on("ready", () => {
//         wavesurferRef.current.drawBuffer();
//         setIsWaveformReady(true);
//       });

//       // Listen for play and pause events
//       wavesurferRef.current.on("play", () => {
//         setIsPlaying(true);
//       });
//       wavesurferRef.current.on("pause", () => {
//         setIsPlaying(false);
//       });

//       // Cleanup on unmount
//       return () => {
//         if (wavesurferRef.current) {
//           wavesurferRef.current.destroy();
//         }
//       };
//     }
//   }, []);

//   // Handle play/pause button click
//   const handlePlayPause = () => {
//     wavesurferRef.current.playPause();
//   };

//   return (
//     <div
//       className={`audio-player ${isDarkMode ? "dark-mode" : ""}`}
//       style={{
//         backgroundColor: isDarkMode ? "#000000" : "#f8f8f8",
//         color: isDarkMode ? "#ffffff" : "#000000",
//       }}
//     >
//       <div className="button-container">
//         {!isPlaying && (
//           <button onClick={handlePlayPause} className="play-button">
//             <i className="fas fa-play" />
//           </button>
//         )}
//         {isPlaying && (
//           <button onClick={handlePlayPause} className="pause-button">
//             <i className="fas fa-pause" />
//           </button>
//         )}
//       </div>

//       {!isWaveformReady && <div></div>}
//       <div ref={waveformRef} className="waveform" />
//     </div>
//   );
// };

// export default AudioPlayer;

import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import "../style/AudioPlayer.css";

const AudioPlayer = ({ isDarkMode, currentSong }) => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWaveformReady, setIsWaveformReady] = useState(false);

  useEffect(() => {
    if (waveformRef.current) {
      if (!wavesurferRef.current) {
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

        wavesurferRef.current.on("ready", () => {
          setIsWaveformReady(true);
        });

        wavesurferRef.current.on("play", () => setIsPlaying(true));
        wavesurferRef.current.on("pause", () => setIsPlaying(false));
      }

      if (currentSong) {
        wavesurferRef.current.load(currentSong);
      }
    }

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }
    };
  }, [currentSong]);

  const handlePlayPause = () => {
    wavesurferRef.current?.playPause();
  };

  return (
    <div
      className={`audio-player ${isDarkMode ? "dark-mode" : ""}`}
      style={{
        backgroundColor: isDarkMode ? "#000000" : "#f8f8f8",
        color: isDarkMode ? "#ffffff" : "#000000",
      }}
    >
      <div className="button-container">
        {!isPlaying ? (
          <button onClick={handlePlayPause} className="play-button">
            <i className="fas fa-play" />
          </button>
        ) : (
          <button onClick={handlePlayPause} className="pause-button">
            <i className="fas fa-pause" />
          </button>
        )}
      </div>

      {!isWaveformReady && <div />}
      <div ref={waveformRef} className="waveform" />
    </div>
  );
};

export default AudioPlayer;