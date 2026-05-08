import React from "react";
import { FaGithub } from "react-icons/fa";
import {
  SiPython,
  SiClaude,
  SiUnity,
  SiRive,
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
  { label: "Rive", icon: SiRive, type: "icon" },
  { label: "Java", icon: SiOpenjdk, type: "icon" },
  { label: "Unity", icon: SiUnity, type: "icon" },
  { label: "Arizona State University", short: "ASU", type: "text" },
  { label: "Georgia Tech", short: "GT", type: "text" },
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

const BentoHome = ({ isDarkMode, currentSong, isPlaying, onTabChange }) => {
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
          <span className="bento-eyebrow">Now Playing</span>
          <div className="bento-track">
            <div className={`bento-track-icon ${isPlaying ? "playing" : ""}`}>
              <span /><span /><span /><span />
            </div>
            <div className="bento-track-meta">
              <div className="bento-track-name">{currentSong?.name || "—"}</div>
              <div className="bento-track-artist">Mitchell Doran</div>
            </div>
          </div>
        </section>

        <section className="bento-card bento-featured-project">
          <span className="bento-eyebrow">Featured · 2024</span>
          <h3 className="bento-card-title">NASA Psyche Mission</h3>
          <p className="bento-card-body">
            A public-facing Unity simulation for the NASA Psyche mission, featuring
            a 3D asteroid model and interactive elements.
          </p>
          <div className="bento-featured-actions">
            <a
              className="bento-btn primary"
              href="https://psyche.ssl.berkeley.edu/get-involved/capstone-projects/capstone-projects-iridium-class/m-type-asteroid-sampling-simulator-asu-d/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Go
            </a>
            <a
              className="bento-btn ghost bento-btn-icon"
              href="https://github.com/MissionToPsyche-Iridium/iridium_22d_m-type_sim-se/blob/main/README.md"
              target="_blank"
              rel="noopener noreferrer"
              title="View GitHub README"
              aria-label="GitHub README"
            >
              <FaGithub size={18} />
            </a>
          </div>
        </section>

        <section className="bento-card bento-stats">
          <span className="bento-eyebrow">By the numbers</span>
          <div className="bento-stat-row">
            <div className="bento-stat">
              <div className="bento-stat-value">6</div>
              <div className="bento-stat-label">Projects</div>
            </div>
            <div className="bento-stat">
              <div className="bento-stat-value">19</div>
              <div className="bento-stat-label">Cities</div>
            </div>
            <div className="bento-stat">
              <div className="bento-stat-value">6</div>
              <div className="bento-stat-label">Tracks</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BentoHome;
