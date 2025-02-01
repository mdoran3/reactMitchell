// import React, { useEffect, useRef, useState } from 'react';
// import WaveSurfer from 'wavesurfer.js';

// const audioFile = "https://pub-917443ca83a94694bc49ac75707aa2a0.r2.dev/The%20Eulogy.wav";

// const AudioPlayer = () => {
//   const waveformRef = useRef(null);
//   const wavesurferRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   useEffect(() => {
//     wavesurferRef.current = WaveSurfer.create({
//       container: waveformRef.current,
//       waveColor: '#555',
//       progressColor: '#096f6d',
//       cursorColor: '#096f6d',
//       cursorWidth: 5,
//       barWidth: 20,
//       barRadius: 100,
//       responsive: true,
//       height: 80,  // Adjust the height of the waveform for clarity
//       normalize: true,
//     });

//     wavesurferRef.current.load(audioFile);

//     wavesurferRef.current.on('play', () => setIsPlaying(true));
//     wavesurferRef.current.on('pause', () => setIsPlaying(false));

//     return () => {
//       wavesurferRef.current.destroy();
//     };
//   }, []);

//   const handlePlayPause = () => {
//     wavesurferRef.current.playPause();
//   };

//   return (
//     <div className="audio-player">
//       {/* Play/Pause Button */}
//       <button onClick={handlePlayPause}>
//         {isPlaying ? 'Pause' : 'Play'}
//       </button>

//       {/* Waveform */}
//       <div ref={waveformRef} className="waveform" />
//     </div>
//   );
// };

// export default AudioPlayer;








// import React, { useEffect, useRef, useState } from 'react';
// import WaveSurfer from 'wavesurfer.js';

// const audioFile = "https://pub-917443ca83a94694bc49ac75707aa2a0.r2.dev/The%20Eulogy.wav";

// const AudioPlayer = () => {
//   const waveformRef = useRef(null);
//   const wavesurferRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   useEffect(() => {
//     wavesurferRef.current = WaveSurfer.create({
//       container: waveformRef.current,
//       waveColor: '#555',
//       progressColor: '#096f6d',
//       cursorColor: '#096f6d',
//       cursorWidth: 5,
//       barWidth: 20,
//       barRadius: 100,
//       responsive: true,
//       height: 80,
//       normalize: true,
//     });

//     wavesurferRef.current.load(audioFile);

//     wavesurferRef.current.on('play', () => setIsPlaying(true));
//     wavesurferRef.current.on('pause', () => setIsPlaying(false));

//     return () => {
//       wavesurferRef.current.destroy();
//     };
//   }, []);

//   const handlePlayPause = () => {
//     wavesurferRef.current.playPause();
//   };

//   return (
//     <div className="audio-player">
//       {/* Button container */}
//       <div className="button-container">
//         {/* Play Button */}
//         {!isPlaying && (
//           <button
//             onClick={handlePlayPause}
//             className="play-button"
//           >
//             <i className="fas fa-play" />
//           </button>
//         )}

//         {/* Pause Button */}
//         {isPlaying && (
//           <button
//             onClick={handlePlayPause}
//             className="pause-button"
//           >
//             <i className="fas fa-pause" />
//           </button>
//         )}
//       </div>

//       {/* Waveform */}
//       <div ref={waveformRef} className="waveform" />
//     </div>
//   );
// };

// export default AudioPlayer;

// import React, { useEffect, useRef, useState } from "react";
// import WaveSurfer from "wavesurfer.js";
// import "../style/AudioPlayer.css";

// const audioFile =
//   "https://pub-917443ca83a94694bc49ac75707aa2a0.r2.dev/The%20Eulogy.wav";

// const AudioPlayer = ({ isDarkMode }) => {
//   const waveformRef = useRef(null);
//   const wavesurferRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   useEffect(() => {
//     wavesurferRef.current = WaveSurfer.create({
//       container: waveformRef.current,
//       waveColor: isDarkMode ? "#555" : "#aaa",  // Change wave color based on mode
//       progressColor: isDarkMode ? "#096f6d" : "#2b8e82", // Adjust progress color for light mode
//       cursorColor: "#096f6d",
//       cursorWidth: 5,
//       barWidth: 20,
//       barRadius: 100,
//       responsive: true,
//       height: 70,
//       normalize: true,
//     });

//     wavesurferRef.current.load(audioFile);

//     wavesurferRef.current.on("play", () => setIsPlaying(true));
//     wavesurferRef.current.on("pause", () => setIsPlaying(false));

//     return () => {
//       wavesurferRef.current.destroy();
//     };
//   }, [isDarkMode]);

//   const handlePlayPause = () => {
//     wavesurferRef.current.playPause();
//   };

//   return (
//     <div
//       className="audio-player"
//       style={{
//         backgroundColor: isDarkMode ? "#000000" : "#f1f1f1", // Change background color based on mode
//         color: isDarkMode ? "#f1f1f1" : "#000000", // Change text color for better contrast
//       }}
//     >
//       {/* Button container */}
//       <div className="button-container">
//         {/* Play Button (shown when NOT playing) */}
//         {!isPlaying && (
//           <button onClick={handlePlayPause} className="play-button">
//             <i className="fas fa-play" />
//           </button>
//         )}

//         {/* Pause Button (shown when playing) */}
//         {isPlaying && (
//           <button onClick={handlePlayPause} className="pause-button">
//             <i className="fas fa-pause" />
//           </button>
//         )}
//       </div>

//       {/* Waveform */}
//       <div ref={waveformRef} className="waveform" />
//     </div>
//   );
// };

// export default AudioPlayer;

import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import "../style/AudioPlayer.css";

const audioFile =
  "https://pub-917443ca83a94694bc49ac75707aa2a0.r2.dev/The%20Eulogy.wav";

const AudioPlayer = ({ isDarkMode }) => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
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

    wavesurferRef.current.load(audioFile);

    wavesurferRef.current.on("play", () => setIsPlaying(true));
    wavesurferRef.current.on("pause", () => setIsPlaying(false));

    return () => {
      wavesurferRef.current.destroy();
    };
  }, []);

  const handlePlayPause = () => {
    wavesurferRef.current.playPause();
  };

  return (
    <div
      className={`audio-player ${isDarkMode ? "dark-mode" : ""}`} // Conditional dark mode class
      style={{
        backgroundColor: isDarkMode ? "#000000" : "#f8f8f8", // Adjusted dark mode background
        color: isDarkMode ? "#ffffff" : "#000000", // Ensure readable text in both modes
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

        {/* Pause Button (shown when playing, with blinking effect) */}
        {isPlaying && (
          <button onClick={handlePlayPause} className="pause-button">
            <i className="fas fa-pause" />
          </button>
        )}
      </div>

      {/* Waveform */}
      <div ref={waveformRef} className="waveform" />
    </div>
  );
};

export default AudioPlayer;