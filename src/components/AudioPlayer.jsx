import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import "../style/AudioPlayer.css";
import { Minus, ChevronUp } from "lucide-react";

// Global audio analysis data that SoundWave can access
window.audioAnalysisData = null;

// Degrees of jog-wheel rotation mapped to one second of track time while scrubbing
const SECONDS_PER_ROTATION = 8;

const formatTime = (seconds) => {
  if (!isFinite(seconds) || seconds < 0) seconds = 0;
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const AudioPlayer = ({ isDarkMode, currentSong, isPlaying, setIsPlaying, isLoading, setIsLoading }) => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);
  const [minimized, setMinimized] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Jog wheel scrubbing
  const wheelRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const rotationRef = useRef(0);
  const lastAngleRef = useRef(0);
  const dragTimeRef = useRef(0);
  const isDraggingRef = useRef(false);

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
    window.audioBassLevel = null;
    window.currentSongName = currentSong?.name || null;

    // Set loading state
    setIsLoading(true);
    setIsPlaying(false); // Reset playing state when loading new song
    setCurrentTime(0);
    setDuration(0);

    // Wait longer for container to be fully sized
    const timer = setTimeout(() => {
      if (!waveformRef.current) return;

      // Create new WaveSurfer instance with explicit sizing
      const waveSurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#0f6b64",
        progressColor: "#4fe0d4",
        cursorColor: "#4fe0d4",
        cursorWidth: 1,
        barWidth: 2,
        barGap: 1,
        barRadius: 1,
        responsive: true,
        height: 28,
        normalize: true,
        fillParent: true,
      });

      wavesurferRef.current = waveSurfer;

      waveSurfer.load(currentSong.url);

      waveSurfer.on("ready", async () => {
        setIsLoading(false); // Hide loading indicator when waveform is ready
        setDuration(waveSurfer.getDuration());

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
          return audioElement;
        };

        // Set up basic audio element access
        const audioElement = tryGetAudioElement();
        if (audioElement) {
          // Ensure CORS
          audioElement.crossOrigin = 'anonymous';

          try {
            if (!audioContextRef.current) {
              const AudioCtx = window.AudioContext || window.webkitAudioContext;
              audioContextRef.current = new AudioCtx();
            }
            const audioCtx = audioContextRef.current;
            if (audioCtx.state === "suspended") audioCtx.resume();

            const source = audioCtx.createMediaElementSource(audioElement);
            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 256;
            analyser.smoothingTimeConstant = 0.75;
            source.connect(analyser);
            analyser.connect(audioCtx.destination);
            analyserRef.current = analyser;

            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            const tick = () => {
              analyser.getByteFrequencyData(dataArray);
              const bassBins = dataArray.slice(0, 6);
              const bassAvg =
                bassBins.reduce((sum, v) => sum + v, 0) / bassBins.length / 255;
              window.audioBassLevel = bassAvg;
              window.audioFrequencyData = Array.from(dataArray);
              animationRef.current = requestAnimationFrame(tick);
            };
            tick();
          } catch (err) {
            console.log("Audio analysis unavailable:", err);
          }
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
      });

      waveSurfer.on("pause", () => {
        setIsPlaying(false);
        window.audioIsPlaying = false;
      });

      waveSurfer.on("audioprocess", (time) => {
        if (!isDraggingRef.current) setCurrentTime(time);
      });

      waveSurfer.on("seeking", (time) => {
        setCurrentTime(time);
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
    window.audioBassLevel = null;
    };
  }, [currentSong?.url]);

  // Let the CSS spin animation take back over once playback (re)starts
  useEffect(() => {
    if (isPlaying && wheelRef.current) {
      wheelRef.current.style.transform = "";
    }
  }, [isPlaying]);

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  const handlePlayPause = () => {
    if (wavesurferRef.current) {
      if (isPlaying) {
        wavesurferRef.current.pause();
      } else {
        wavesurferRef.current.play();
      }
    }
  };

  const seekToTime = (time) => {
    const ws = wavesurferRef.current;
    if (!ws) return;
    const dur = ws.getDuration() || 0;
    const clamped = Math.min(Math.max(time, 0), dur);
    if (typeof ws.setTime === "function") {
      ws.setTime(clamped);
    } else if (dur > 0) {
      ws.seekTo(clamped / dur);
    }
  };

  const getPointerAngle = (e, rect) => {
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
  };

  const handleWheelPointerDown = (e) => {
    if (!wavesurferRef.current || !wheelRef.current) return;
    wheelRef.current.setPointerCapture(e.pointerId);
    const rect = wheelRef.current.getBoundingClientRect();
    lastAngleRef.current = getPointerAngle(e, rect);
    dragTimeRef.current = wavesurferRef.current.getCurrentTime();
    isDraggingRef.current = true;
    setIsDragging(true);
    e.preventDefault();
  };

  const handleWheelPointerMove = (e) => {
    if (!isDraggingRef.current || !wavesurferRef.current || !wheelRef.current) return;
    const rect = wheelRef.current.getBoundingClientRect();
    const angle = getPointerAngle(e, rect);
    let delta = angle - lastAngleRef.current;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    lastAngleRef.current = angle;

    rotationRef.current += delta;
    wheelRef.current.style.transform = `rotate(${rotationRef.current}deg)`;

    const dur = wavesurferRef.current.getDuration() || 0;
    const timeDelta = (delta / 360) * SECONDS_PER_ROTATION;
    dragTimeRef.current = Math.min(Math.max(dragTimeRef.current + timeDelta, 0), dur);
    seekToTime(dragTimeRef.current);
    setCurrentTime(dragTimeRef.current);
  };

  const endWheelDrag = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    rotationRef.current = rotationRef.current % 360;
    if (wheelRef.current) {
      wheelRef.current.style.transform = isPlaying ? "" : `rotate(${rotationRef.current}deg)`;
      try {
        wheelRef.current.releasePointerCapture(e.pointerId);
      } catch {
        // pointer capture may already be released
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
            onTouchEnd={(e) => { e.preventDefault(); handlePlayPause(); }}
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
            <ChevronUp size={22} color="#4fe0d4" strokeWidth={2.5} />
          </button>
        </div>
      ) : null}
      {/* Always render the full player, just hide it when minimized */}
      <div
        className={`cdj-player ${isDarkMode ? "dark-mode" : ""}`}
        style={{
          display: minimized ? 'none' : undefined,
        }}
      >
        <span className="cdj-screw cdj-screw-tl" />
        <span className="cdj-screw cdj-screw-tr" />
        <span className="cdj-screw cdj-screw-bl" />
        <span className="cdj-screw cdj-screw-br" />

        {/* Minimize Button */}
        <button
          className="audio-player-minimize-btn cdj-minimize-btn"
          onClick={() => setMinimized(true)}
          onTouchEnd={() => setMinimized(true)}
          title="Minimize player"
        >
          <Minus size={18} color="#4fe0d4" strokeWidth={2.5} />
        </button>

        {/* LCD Display */}
        <div className="cdj-lcd">
          <div className="cdj-lcd-title">
            <span className="marquee-text">{currentSong?.name || "No Track Loaded"}</span>
          </div>
          <div className="cdj-lcd-row">
            <span className="cdj-lcd-time">{formatTime(currentTime)}</span>
            <div className="cdj-waveform-strip">
              <div
                ref={waveformRef}
                className="waveform"
                onTouchStart={e => {
                  if (wavesurferRef.current && e.touches && e.touches.length === 1) {
                    const rect = e.target.getBoundingClientRect();
                    const x = e.touches[0].clientX - rect.left;
                    const percent = x / rect.width;
                    wavesurferRef.current.seekTo(percent);
                  }
                }}
              />
            </div>
            <span className="cdj-lcd-time">{formatTime(duration)}</span>
          </div>
          {isLoading && (
            <div className="cdj-lcd-loading-overlay">
              <div className="loading-spinner" />
              <span className="loading-text">Loading song...</span>
            </div>
          )}
        </div>

        {/* Jog wheel / platter */}
        <div className="cdj-deck">
          <div className={`cdj-led-ring ${isPlaying ? "on" : "blink"}`} />
          <div
            ref={wheelRef}
            className={`jog-wheel ${isPlaying && !isDragging ? "spinning" : ""} ${isDragging ? "dragging" : ""}`}
            onPointerDown={handleWheelPointerDown}
            onPointerMove={handleWheelPointerMove}
            onPointerUp={endWheelDrag}
            onPointerCancel={endWheelDrag}
            title="Drag to scrub"
          >
            <div className="jog-wheel-grooves" />
          </div>
          <div className="jog-wheel-hub">
            <button
              onClick={handlePlayPause}
              onTouchEnd={(e) => { e.preventDefault(); handlePlayPause(); }}
              onPointerDown={(e) => e.stopPropagation()}
              className={`cdj-play-btn ${isPlaying ? "pause" : "play"}`}
            >
              <i className={`fas fa-${isPlaying ? "pause" : "play"}`} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
