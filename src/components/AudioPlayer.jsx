import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import "../style/AudioPlayer.css";
import { Minus, ChevronUp } from "lucide-react";

// Global audio analysis data that SoundWave can access
window.audioAnalysisData = null;


const AudioPlayer = ({ isDarkMode, currentSong, isPlaying, setIsPlaying, isLoading, setIsLoading }) => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    if (!currentSong?.url || !waveformRef.current) {
      setIsLoading(false); // Reset loading state when no song
      return;
    }

    // Cleanup previous instance
    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
      wavesurferRef.current = null;
    }
    
    // Cleanup previous audio context
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    // Reset global state
    window.audioIsPlaying = false;
    window.audioFrequencyData = null;
    window.currentSongName = currentSong?.name || null;

    // Set loading state
    setIsLoading(true);
    setIsPlaying(false); // Reset playing state when loading new song

    // Wait longer for container to be fully sized
    const timer = setTimeout(() => {
      if (!waveformRef.current) return;

      console.log("Container dimensions:", {
        width: waveformRef.current.offsetWidth,
        height: waveformRef.current.offsetHeight
      });

      // Create new WaveSurfer instance with explicit sizing
      const waveSurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#555",
        progressColor: "#096f6d",
        cursorColor: "#096f6d",
        cursorWidth: 2,
        barWidth: 3,
        barRadius: 3,
        responsive: true,
        height: 70,
        normalize: true,
        fillParent: true,
      });

      wavesurferRef.current = waveSurfer;

      console.log('Loading audio from URL:', currentSong.url);
      waveSurfer.load(currentSong.url);

      waveSurfer.on("ready", async () => {
        console.log("WaveSurfer ready!");
        setIsLoading(false); // Hide loading indicator when waveform is ready
        
        // Try multiple methods to get the audio element for each new song
        const tryGetAudioElement = () => {
          let audioElement = waveSurfer.getMediaElement?.();
          if (!audioElement) {
            audioElement = document.querySelector('audio');
          }
          if (!audioElement) {
            const container = waveformRef.current;
            audioElement = container?.querySelector('audio');
          }
          console.log('Found audio element for new song:', audioElement);
          return audioElement;
        };
        
        // Set up basic audio element access
        const audioElement = tryGetAudioElement();
        if (audioElement) {
          console.log('Audio element found:', audioElement.src);
          // Ensure CORS
          audioElement.crossOrigin = 'anonymous';
        }
        
        // Auto-play the new song after it's loaded
        setTimeout(() => {
          if (waveSurfer) {
            waveSurfer.play().catch(err => {
              console.log('Autoplay prevented - user needs to click play:', err);
            });
          }
        }, 100);
      });

      waveSurfer.on("error", (err) => {
        console.error("WaveSurfer error loading:", currentSong.url, err);
        setIsLoading(false); // Hide loading indicator on error
        setIsPlaying(false);
      });

      waveSurfer.on("play", () => {
        setIsPlaying(true);
        window.audioIsPlaying = true;
        console.log('Audio started playing');
      });
      
      waveSurfer.on("pause", () => {
        setIsPlaying(false);
        window.audioIsPlaying = false;
        console.log('Audio paused');
      });
    }, 200);

    return () => {
      clearTimeout(timer);
      setIsLoading(false); // Reset loading state on cleanup
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      analyserRef.current = null;
      window.audioIsPlaying = false;
      window.audioFrequencyData = null;
      console.log('Cleaned up audio analysis for song change');
    };
  }, [currentSong?.url]);

  const handlePlayPause = () => {
    if (wavesurferRef.current) {
      if (isPlaying) {
        wavesurferRef.current.pause();
      } else {
        wavesurferRef.current.play();
      }
    }
  };

  return (
    <>
      {minimized ? (
        // Minimized floating widget (always mounted)
        <div className="audio-player-minimized" style={{position: 'fixed', bottom: 24, right: 24, zIndex: 2000}}>
          <button
            onClick={handlePlayPause}
            onTouchEnd={handlePlayPause}
            className={`minimized-play-btn ${isPlaying ? "pause" : "play"}`}
          >
            <i className={`fas fa-${isPlaying ? "pause" : "play"}`} />
          </button>
          <span className="audio-player-minimized-title">
            <span className="marquee-text">{currentSong?.name || "No Song"}</span>
          </span>
          <button
            className="audio-player-restore-btn"
            onClick={() => setMinimized(false)}
            onTouchEnd={() => setMinimized(false)}
            title="Restore player"
          >
            <ChevronUp size={22} color="#096f6d" strokeWidth={2.5} />
          </button>
        </div>
      ) : null}
      {/* Always render the full player, just hide it when minimized */}
      <div
        className={`audio-player ${isDarkMode ? "dark-mode" : ""}`}
        style={{
          color: isDarkMode ? "#ffffff" : "#000000",
          position: "relative",
          display: minimized ? 'none' : undefined,
        }}
      >
        {/* Minimize Button */}
        <button
          className="audio-player-minimize-btn"
          style={{position: 'absolute', top: 8, right: 8, zIndex: 10}}
          onClick={() => setMinimized(true)}
          onTouchEnd={() => setMinimized(true)}
          title="Minimize player"
        >
          <Minus size={24} color="#096f6d" strokeWidth={2.5} />
        </button>

        {/* Loading Overlay above title, centered between play/pause and minimize */}
        {isLoading && (
          <div
            className={`audio-player-loading-bar ${isDarkMode ? 'dark' : 'light'}`}
            style={{
              position: 'absolute',
              top: 8,
              left: 'calc(50% + 18px)', // visually center between play/pause and minimize
              transform: 'translateX(-50%)',
              minWidth: 120,
              maxWidth: 220,
              margin: 0,
              zIndex: 20,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              gap: 10,
              padding: '4px 12px',
            }}
          >
            <div className="loading-spinner" style={{ margin: 0 }}></div>
            <span className="loading-text">Loading song...</span>
          </div>
        )}
        {/* Song Title Display */}
        <div
          className="audio-player-song-title-marquee"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            width: "100%",
            bottom: 0,
            zIndex: 9,
            backgroundColor: "transparent",
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem",
            pointerEvents: "none",
            userSelect: "none",
            padding: "2px 6px",
            borderRadius: 0,
            overflow: 'hidden',
            minHeight: 24,
          }}
        >
          <span className="marquee-text">{currentSong?.name || "Loading..."}</span>
        </div>

        {/* Play/Pause Button */}
        <div className="button-container">
          <button
            onClick={handlePlayPause}
            onTouchEnd={handlePlayPause}
            className={`${
              isPlaying ? "solid-ring pause-button" : "blinking-ring play-button"
            }`}
          >
            <i className={`fas fa-${isPlaying ? "pause" : "play"}`} />
          </button>
        </div>

        {/* Waveform */}
        <div className="waveform-container" style={{ touchAction: 'manipulation' }}>
          <div
            ref={waveformRef}
            className="waveform"
            style={{ pointerEvents: 'auto' }}
            onTouchStart={e => {
              if (wavesurferRef.current && e.touches && e.touches.length === 1) {
                const rect = e.target.getBoundingClientRect();
                const x = e.touches[0].clientX - rect.left;
                const percent = x / rect.width;
                const duration = wavesurferRef.current.getDuration();
                wavesurferRef.current.seekTo(percent);
              }
            }}
          />
          {/* No loading overlay here anymore */}
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;