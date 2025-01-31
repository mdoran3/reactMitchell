import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
const audioFile = "https://pub-917443ca83a94694bc49ac75707aa2a0.r2.dev/The%20Eulogy.wav";

const AudioPlayer = () => { // Remove the audioUrl prop
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Initialize WaveSurfer
    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#4a4a4a',
      progressColor: '#1db954',
      cursorColor: '#1db954',
      barWidth: 3,
      barRadius: 3,
      responsive: true,
      height: 100,
      normalize: true,
    });

    // Load the imported audio file
    wavesurferRef.current.load(audioFile);

    // Play/pause event listener
    wavesurferRef.current.on('play', () => setIsPlaying(true));
    wavesurferRef.current.on('pause', () => setIsPlaying(false));

    // Cleanup on unmount
    return () => {
      wavesurferRef.current.destroy();
    };
  }, []); // Remove audioUrl from dependencies

  const handlePlayPause = () => {
    wavesurferRef.current.playPause();
  };

  return (
    <div style={{ width: '100%', backgroundColor: '#f0f0f0', padding: '10px 0' }}>
      <div ref={waveformRef} style={{ width: '100%' }} />
      <button
        onClick={handlePlayPause}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: '#1db954',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default AudioPlayer;