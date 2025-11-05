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
        backend: 'MediaElement', // Use MediaElement backend to get access to audio element
      });

      wavesurferRef.current = waveSurfer;

      waveSurfer.load(currentSong.url);

      waveSurfer.on("ready", async () => {
        console.log("WaveSurfer ready!");
        setIsLoading(false); // Hide loading indicator when waveform is ready
        
        // Create reusable audio analysis setup function
        const setupAudioAnalysis = async (audioElement) => {
          try {
            if (audioElement && !audioContextRef.current) {
              // Set CORS to avoid issues
              audioElement.crossOrigin = 'anonymous';
              
              const audioContext = new (window.AudioContext || window.webkitAudioContext)();
              const analyser = audioContext.createAnalyser();
              
              // Configure analyser for MUSICAL frequency detection
              analyser.fftSize = 2048; // Much higher resolution for better frequency separation
              analyser.smoothingTimeConstant = 0.4; // Balanced responsiveness
              analyser.minDecibels = -70;
              analyser.maxDecibels = -10;
              
              const source = audioContext.createMediaElementSource(audioElement);
              source.connect(analyser);
              analyser.connect(audioContext.destination);
              
              audioContextRef.current = audioContext;
              analyserRef.current = analyser;
              
              const bufferLength = analyser.frequencyBinCount;
              const dataArray = new Uint8Array(bufferLength);
              
              // Configure analyser for EXTREME sensitivity and response
              analyser.fftSize = 1024; // Much higher resolution
              analyser.smoothingTimeConstant = 0.3; // More responsive, less smoothing
              analyser.minDecibels = -90; // Much lower threshold for quiet sounds
              analyser.maxDecibels = -5; // Higher threshold for loud sounds
              
              const updateFrequencyData = () => {
                if (analyserRef.current && audioElement && !audioElement.paused) {
                  analyserRef.current.getByteFrequencyData(dataArray);
                  
                  // Check if we're actually getting audio data
                  const totalEnergy = dataArray.reduce((sum, value) => sum + value, 0);
                  const avgEnergy = totalEnergy / dataArray.length;
                  
                  // MUSICAL FREQUENCY ANALYZER - targets specific musical ranges
                  const barData = [];
                  const barsCount = 8;
                  
                  // Define musical frequency ranges in Hz (approximate bin mapping)
                  const sampleRate = audioContext.sampleRate;
                  const nyquist = sampleRate / 2;
                  const binWidth = nyquist / (dataArray.length);
                  
                  // Musical frequency ranges in Hz
                  const musicalRanges = [
                    [20, 60],     // Sub-bass: kick drums, lowest bass
                    [60, 200],    // Bass: bass guitar, bass synth
                    [200, 400],   // Low-mids: bass clarity, male vocals
                    [400, 800],   // Mids: vocals, guitars, snare body
                    [800, 2000],  // Upper-mids: vocal presence, guitar attack
                    [2000, 4000], // Presence: vocal clarity, cymbal attack
                    [4000, 8000], // Brilliance: cymbals, vocal sibilance
                    [8000, 16000] // Air: cymbal shimmer, acoustic space
                  ];
                  
                  for (let i = 0; i < barsCount; i++) {
                    const [lowHz, highHz] = musicalRanges[i];
                    const lowBin = Math.floor(lowHz / binWidth);
                    const highBin = Math.ceil(highHz / binWidth);
                    
                    // Calculate RMS (Root Mean Square) for this frequency range
                    let sumSquares = 0;
                    let count = 0;
                    
                    for (let bin = lowBin; bin <= highBin && bin < dataArray.length; bin++) {
                      const value = dataArray[bin];
                      sumSquares += value * value;
                      count++;
                    }
                    
                    const rms = count > 0 ? Math.sqrt(sumSquares / count) : 0;
                    
                    // Apply musical weighting - emphasize musically important frequencies
                    let weightedValue = rms;
                    if (i === 1 || i === 2) { // Bass and low-mid emphasis
                      weightedValue *= 1.4;
                    } else if (i === 3 || i === 4) { // Vocal range emphasis
                      weightedValue *= 1.6;
                    } else if (i === 5) { // Presence boost
                      weightedValue *= 1.3;
                    } else if (i >= 6) { // High frequency clarity
                      weightedValue *= 1.2;
                    }
                    
                    barData.push(Math.min(255, weightedValue));
                  }
                  
                  window.audioFrequencyData = barData;
                  window.audioIsPlaying = true;
                  
                  // Frequent debugging to see real data
                  if (Math.random() < 0.02) {
                    console.log('� RAW Audio Analysis - Energy:', avgEnergy.toFixed(1), 
                               'Raw Data Sample:', dataArray.slice(0, 20).map(v => Math.round(v)),
                               'Processed Bars:', barData.map(v => Math.round(v)));
                  }
                } else {
                  window.audioIsPlaying = audioElement ? !audioElement.paused : false;
                  window.audioFrequencyData = Array(8).fill(0);
                }
                
                if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                  animationRef.current = requestAnimationFrame(updateFrequencyData);
                }
              };
              
              // Handle audio context state
              if (audioContext.state === 'suspended') {
                const resumeAudio = () => {
                  if (audioContext.state !== 'closed') {
                    audioContext.resume();
                  }
                  document.removeEventListener('click', resumeAudio);
                };
                document.addEventListener('click', resumeAudio);
              }
              
              updateFrequencyData();
              console.log('Audio analysis connected for new song!');
              return true;
            }
          } catch (error) {
            console.error('Audio analysis failed for this song:', error);
          }
          return false;
        };
        
        // Try multiple methods to get the audio element for each new song
        const tryGetAudioElement = () => {
          let audioElement = waveSurfer.backend?.media;
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
        
        // Set up audio analysis for this new song
        const audioElement = tryGetAudioElement();
        if (audioElement) {
          const success = await setupAudioAnalysis(audioElement);
          if (!success) {
            setTimeout(() => setupAudioAnalysis(audioElement), 1000);
          }
        } else {
          console.warn('No audio element found for this song');
        }
        try {
          await waveSurfer.play();
          setIsPlaying(true);
        } catch (err) {
          console.warn("Autoplay blocked:", err);
          setIsPlaying(false);
        }
      });

      waveSurfer.on("error", (err) => {
        console.error("WaveSurfer error:", err);
        setIsLoading(false); // Hide loading indicator on error
      });

      waveSurfer.on("play", () => {
        setIsPlaying(true);
        window.audioIsPlaying = true;
        console.log('Audio started playing');
        
        // Enhanced fallback for when real audio analysis isn't available
        if (!window.audioFrequencyData || window.audioFrequencyData.every(val => val === 0)) {
          let fakeDataInterval;
          const createReactiveFakeData = () => {
            if (window.audioIsPlaying) {
              const time = Date.now() / 1000;
              window.audioFrequencyData = Array(8).fill().map((_, i) => {
                // Create different patterns for bass, mid, and treble
                const bassPattern = i < 3 ? Math.sin(time * (0.8 + i * 0.3)) * 80 + 80 : 20;
                const midPattern = i >= 3 && i < 6 ? Math.sin(time * (1.2 + i * 0.2)) * 60 + 40 : 15;
                const treblePattern = i >= 6 ? Math.sin(time * (2 + i * 0.4)) * 40 + 30 : 10;
                
                const randomVariation = (Math.random() - 0.5) * 30;
                const combined = bassPattern + midPattern + treblePattern + randomVariation;
                
                return Math.max(5, Math.min(255, combined));
              });
              
              fakeDataInterval = setTimeout(createReactiveFakeData, 50);
            }
          };
          
          createReactiveFakeData();
          
          // Clear interval when audio stops
          const originalPauseHandler = waveSurfer.on;
          waveSurfer.on("pause", () => {
            if (fakeDataInterval) {
              clearTimeout(fakeDataInterval);
            }
          });
        }
      });
      
      waveSurfer.on("pause", () => {
        setIsPlaying(false);
        window.audioIsPlaying = false;
        window.audioFrequencyData = Array(8).fill(0);
        console.log('Audio paused');
      });
      
      // Add WaveSurfer event for progress to help with visualization timing
      waveSurfer.on("audioprocess", () => {
        if (wavesurferRef.current) {
          const currentTime = wavesurferRef.current.getCurrentTime();
          const duration = wavesurferRef.current.getDuration();
          window.audioProgress = duration > 0 ? currentTime / duration : 0;
          
          // If we don't have real frequency data, create time-based fake data
          if (!window.audioFrequencyData || window.audioFrequencyData.every(val => val < 5)) {
            const time = currentTime;
            window.audioFrequencyData = Array(8).fill().map((_, index) => {
              // Create varied patterns for different frequency ranges
              const baseFreq = 0.5 + index * 0.2;
              const highFreq = 2 + index * 0.8;
              
              const wave1 = Math.sin(time * baseFreq * Math.PI) * 50;
              const wave2 = Math.sin(time * highFreq * Math.PI) * 30;
              const noise = (Math.random() - 0.5) * 20;
              
              const combined = Math.abs(wave1 + wave2 + noise);
              return Math.min(255, Math.max(10, combined + 20));
            });
          }
        }
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
      wavesurferRef.current.playPause();
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
            className={`$${
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