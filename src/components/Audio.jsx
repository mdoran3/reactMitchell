import React from "react";
import "../style/Audio.css";
import { FaPlay } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import songs from "../data/songs";

const Audio = ({ setCurrentSong, isDarkMode, currentSong, isPlaying, isLoading }) => {
  return (
    <div className={`audio-container modern ${isDarkMode ? "dark" : "light"}`}>
      <div className="audio-content">
        <span className="audio-eyebrow">Originals · Remixes</span>
        <h2>Audio</h2>

        <ul className="audio-track-list">
          {songs.map((song, index) => {
            const isActive = currentSong && currentSong.url === song.url;
            const status = isActive ? (isLoading ? "loading" : isPlaying ? "playing" : "paused") : null;

            return (
              <li key={song.url} className="audio-track-item">
                <button
                  className={`audio-track-row${isActive ? " active" : ""}`}
                  onClick={() => setCurrentSong(song)}
                >
                  <span className="audio-track-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="audio-track-name">{song.name}</span>

                  {isActive ? (
                    <span className={`audio-status-pill ${status}`}>
                      {status === "playing" && (
                        <span className="audio-status-eq">
                          <span /><span /><span />
                        </span>
                      )}
                      <span className="audio-status-text">
                        <Typewriter
                          key={`${status}-${song.url}`}
                          words={[
                            status === "loading"
                              ? "loading"
                              : status === "playing"
                              ? "now playing"
                              : "paused",
                          ]}
                          loop={1}
                          cursor={status !== "paused"}
                          cursorStyle="█"
                          typeSpeed={60}
                          deleteSpeed={0}
                          delaySpeed={2000}
                        />
                      </span>
                    </span>
                  ) : (
                    <span className="audio-track-play" aria-hidden="true">
                      <FaPlay size={12} />
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Audio;
