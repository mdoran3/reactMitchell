import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const audioFile = "https://pub-917443ca83a94694bc49ac75707aa2a0.r2.dev/The%20Eulogy.wav";

const AudioPlayer = () => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#555',
      progressColor: '#096f6d',
      cursorColor: '#2f8430',
      barWidth: 6,
      barRadius: 3,
      responsive: true,
      height: 100,
      normalize: true,
    });

    wavesurferRef.current.load(audioFile);

    wavesurferRef.current.on('play', () => setIsPlaying(true));
    wavesurferRef.current.on('pause', () => setIsPlaying(false));

    return () => {
      wavesurferRef.current.destroy();
    };
  }, []);

  const handlePlayPause = () => {
    wavesurferRef.current.playPause();
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#000000',
      padding: '10px',
      gap: '15px' // Space between button and waveform
    }}>
      {/* Play/Pause Button */}
      <button
        onClick={handlePlayPause}
        style={{
          padding: '10px 20px',
          backgroundColor: '#096f6d',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          flexShrink: 0 // Prevents button from shrinking
        }}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>

      {/* Waveform */}
      <div ref={waveformRef} style={{ flexGrow: 1, width: '100%' }} />
    </div>
  );
};

export default AudioPlayer;