import React, { useEffect, useRef, useState } from "react";
import { FaGithub, FaStepBackward, FaStepForward } from "react-icons/fa";
import {
  SiPython,
  SiClaude,
  SiUnity,
  SiOpenjdk,
} from "react-icons/si";
import PhotoSlider from "./PhotoSlider";
import "../style/BentoHome.css";

const AbletonLogo = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: "block" }}
    aria-hidden="true"
  >
    {/* Three vertical bars (left half) */}
    <rect x="2" y="4" width="2.4" height="16" />
    <rect x="6" y="4" width="2.4" height="16" />
    <rect x="10" y="4" width="2.4" height="16" />
    {/* Three horizontal bars (right half) */}
    <rect x="14" y="5.6" width="8" height="2.4" />
    <rect x="14" y="10.8" width="8" height="2.4" />
    <rect x="14" y="16" width="8" height="2.4" />
  </svg>
);

const TECH_STACK = [
  { label: "Ableton Live", logo: AbletonLogo, type: "icon" },
  { label: "Python", icon: SiPython, type: "icon" },
  { label: "Claude", icon: SiClaude, type: "icon" },
  { label: "Java", icon: SiOpenjdk, type: "icon" },
  { label: "Unity", icon: SiUnity, type: "icon" },
  { label: "Arizona State University", short: "ASU", type: "text" },
];

const TRAVEL_IMAGES = [
  "/assets/images/iceland.webp",
  "/assets/images/thailand.webp",
  "/assets/images/angelfall.webp",
  "/assets/images/fjord.webp",
  "/assets/images/grandCentral.webp",
  "/assets/images/haivanpass.webp",
  "/assets/images/hanoi.webp",
  "/assets/images/hongKong.webp",
  "/assets/images/japan.webp",
  "/assets/images/MV11.webp",
  "/assets/images/myanmar.webp",
  "/assets/images/navajo.webp",
  "/assets/images/norway.webp",
  "/assets/images/pagoda.webp",
  "/assets/images/sappo.webp",
  "/assets/images/train.webp",
  "/assets/images/vietnam.webp",
  "/assets/images/vietnam-2.webp",
  "/assets/images/waterfall.webp",
];

const FEATURED_PROJECTS = [
  {
    eyebrow: "Featured · 2024",
    title: "NASA Psyche Mission",
    description:
      "A public-facing Unity simulation for the NASA Psyche mission, featuring a 3D asteroid model and interactive elements.",
    link: "https://psyche.ssl.berkeley.edu/get-involved/capstone-projects/capstone-projects-iridium-class/m-type-asteroid-sampling-simulator-asu-d/",
    github: "https://github.com/MissionToPsyche-Iridium/iridium_22d_m-type_sim-se/blob/main/README.md",
  },
  {
    eyebrow: "Featured · 2025",
    title: "Analyze This",
    description:
      "A React + Vite web app for musicians and producers to analyze songs — key detection, BPM analysis, and MIDI generation, all processed locally in the browser.",
    link: "https://analyzethis.io",
    github: "https://github.com/mdoran3/analyze-this/blob/main/README.md",
  },
  {
    eyebrow: "Featured · 2026",
    title: "Mesón Server Education",
    description:
      "A mobile-first app that helps restaurant servers master Mesón's wine, tapas, fish, and sherry offerings through interactive reviews and randomized quizzes.",
    link: "https://mesoneducation.com",
    github: "https://github.com/mdoran3/wine_study",
  },
];

const NowPlayingVisualizer = ({ isPlaying }) => {
  const glowRef = useRef(null);
  const barRefs = useRef([]);
  const frameRef = useRef(null);

  useEffect(() => {
    let t = 0;
    const animate = () => {
      t += 0.045;
      const idleWave = 0.35 + Math.sin(t) * 0.2;
      const bass = isPlaying
        ? window.audioBassLevel ?? idleWave
        : 0;

      if (glowRef.current) {
        glowRef.current.style.setProperty("--bass", bass.toFixed(3));
      }

      barRefs.current.forEach((bar, i) => {
        if (!bar) return;
        const wobble = Math.sin(t * 1.5 + i * 1.4) * 0.18;
        const scale = isPlaying
          ? Math.max(0.15, Math.min(1, bass * 0.85 + wobble * bass + 0.12))
          : 0.15;
        bar.style.transform = `scaleY(${scale})`;
      });

      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [isPlaying]);

  return (
    <div className={`bento-visualizer ${isPlaying ? "playing" : ""}`}>
      <div className="bento-visualizer-glow" ref={glowRef} aria-hidden="true" />
      <div className="bento-visualizer-bars">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} ref={(el) => (barRefs.current[i] = el)} />
        ))}
      </div>
    </div>
  );
};

const FEATURED_ROTATE_MS = 5000;
const FEATURED_TRANSITION_MS = 600;
const FEATURED_SWIPE_THRESHOLD = 40;

const BentoHome = ({ isDarkMode, currentSong, isPlaying, onTabChange, onNextSong, onPrevSong }) => {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isFeaturedVisible, setIsFeaturedVisible] = useState(true);
  const featuredIntervalRef = useRef(null);
  const featuredDragRef = useRef({ x: 0, y: 0, pointerId: null });

  const stepFeatured = (direction) => {
    setIsFeaturedVisible(false);
    setTimeout(() => {
      setFeaturedIndex(
        (prev) => (prev + direction + FEATURED_PROJECTS.length) % FEATURED_PROJECTS.length
      );
      setIsFeaturedVisible(true);
    }, FEATURED_TRANSITION_MS);
  };

  const restartFeaturedAutoRotate = () => {
    if (featuredIntervalRef.current) clearInterval(featuredIntervalRef.current);
    featuredIntervalRef.current = setInterval(() => stepFeatured(1), FEATURED_ROTATE_MS);
  };

  useEffect(() => {
    restartFeaturedAutoRotate();
    return () => clearInterval(featuredIntervalRef.current);
  }, []);

  const handleFeaturedManualStep = (direction) => {
    stepFeatured(direction);
    restartFeaturedAutoRotate();
  };

  const handleFeaturedPointerDown = (e) => {
    featuredDragRef.current = { x: e.clientX, y: e.clientY, pointerId: e.pointerId };
  };

  const handleFeaturedPointerUp = (e) => {
    const drag = featuredDragRef.current;
    if (drag.pointerId !== e.pointerId) return;
    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    featuredDragRef.current = { x: 0, y: 0, pointerId: null };
    if (Math.abs(dx) < FEATURED_SWIPE_THRESHOLD || Math.abs(dx) <= Math.abs(dy)) return;
    handleFeaturedManualStep(dx < 0 ? 1 : -1);
  };

  const featured = FEATURED_PROJECTS[featuredIndex];

  return (
    <div className={`bento-home ${isDarkMode ? "dark" : "light"}`}>
      <div className="bento-grid">
        <section className="bento-card bento-hero">
          <span className="bento-eyebrow">Portfolio · 2026</span>
          <h1 className="bento-hero-title">
            Building software<br />
            <span className="bento-hero-accent">that listens.</span>
          </h1>
          <p className="bento-hero-sub">
            AI-native software engineer and audio producer.
          </p>
          <div className="bento-tech-row" aria-label="Tools and organizations">
            {TECH_STACK.map((item) => {
              const Icon = item.icon || item.logo;
              return (
                <span
                  key={item.label}
                  className={`bento-tech-pill bento-tech-${item.type}`}
                  title={item.label}
                >
                  {Icon ? <Icon size={18} /> : item.short}
                </span>
              );
            })}
          </div>
          <div className="bento-hero-actions">
            <button className="bento-btn primary" onClick={() => onTabChange("projects")}>
              View projects
            </button>
            <button className="bento-btn ghost" onClick={() => onTabChange("music")}>
              Listen
            </button>
          </div>
        </section>

        <section className="bento-card bento-photo">
          <PhotoSlider images={TRAVEL_IMAGES} />
        </section>

        <section
          className="bento-card bento-now-playing"
          onClick={() => onTabChange("music")}
          role="button"
          tabIndex={0}
        >
          <div className="bento-now-playing-header">
            <span className="bento-eyebrow">Now Playing</span>
            <span className={`bento-status-pill ${isPlaying ? "playing" : ""}`}>
              <span className="bento-status-dot" />
              {isPlaying ? "Playing" : "Paused"}
            </span>
          </div>
          <div className="bento-track">
            <NowPlayingVisualizer isPlaying={isPlaying} />
            <div className="bento-track-meta">
              <div className="bento-track-name">{currentSong?.name || "—"}</div>
              <div className="bento-track-hint">Tap to browse tracks</div>
            </div>
          </div>
          <div className="bento-track-controls">
            <button
              className="bento-track-nav-btn"
              onClick={(e) => {
                e.stopPropagation();
                onPrevSong?.();
              }}
              aria-label="Previous track"
              title="Previous track"
            >
              <FaStepBackward size={13} />
            </button>
            <button
              className="bento-track-nav-btn"
              onClick={(e) => {
                e.stopPropagation();
                onNextSong?.();
              }}
              aria-label="Next track"
              title="Next track"
            >
              <FaStepForward size={13} />
            </button>
          </div>
        </section>

        <section
          className="bento-card bento-featured-project"
          onPointerDown={handleFeaturedPointerDown}
          onPointerUp={handleFeaturedPointerUp}
        >
          <div className={`bento-featured-content ${isFeaturedVisible ? "visible" : ""}`}>
            <span className="bento-eyebrow">{featured.eyebrow}</span>
            <h3 className="bento-card-title">{featured.title}</h3>
            <p className="bento-card-body">{featured.description}</p>
            <div className="bento-featured-actions">
              <a
                className="bento-btn primary"
                href={featured.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Go
              </a>
              <a
                className="bento-btn ghost bento-btn-icon"
                href={featured.github}
                target="_blank"
                rel="noopener noreferrer"
                title="View GitHub README"
                aria-label="GitHub README"
              >
                <FaGithub size={18} />
              </a>
            </div>
          </div>
          <div className="bento-featured-dots">
            {FEATURED_PROJECTS.map((p, i) => (
              <span
                key={p.title}
                className={`bento-featured-dot ${i === featuredIndex ? "active" : ""}`}
              />
            ))}
          </div>
        </section>

        <section className="bento-card bento-stats">
          <span className="bento-eyebrow">By the numbers</span>
          <div className="bento-stat-row">
            <div className="bento-stat">
              <div className="bento-stat-value">6</div>
              <div className="bento-stat-label">Featured Projects</div>
            </div>
            <div className="bento-stat">
              <div className="bento-stat-value">32</div>
              <div className="bento-stat-label">Countries</div>
            </div>
            <div className="bento-stat">
              <div className="bento-stat-value">6</div>
              <div className="bento-stat-label">Featured Tracks</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BentoHome;
