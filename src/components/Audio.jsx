import React from "react";
import "../style/Audio.css";
import { FaPlay } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";

const Audio = ({ setCurrentSong, isDarkMode, currentSong, isPlaying, isLoading }) => {
  const songs = [
    {
      name: "Run (original mix)",
      url: "https://pub-5c6372312189426f903f701c7e1544e5.r2.dev/Run%20-%20Wet%20Stem%20Mix%20(3%3A27).wav",
    },
    {
      name: "The Eulogy (original mix)",
      url: "https://pub-5c6372312189426f903f701c7e1544e5.r2.dev/The%20Eulogy.wav",
    },
    {
      name: "I Want You - Savage Garden (remix)",
      url: "https://pub-5c6372312189426f903f701c7e1544e5.r2.dev/I%20Want%20Your%20-%20Savage%20Garden%20(remix).wav",
    },
    {
      name: "As Saigon Vanishes (original mix)",
      url: "https://pub-5c6372312189426f903f701c7e1544e5.r2.dev/As%20Saigon%20Vanishes.wav",
    },
    {
      name: "The Way I See (original mix)",
      url: "https://pub-5c6372312189426f903f701c7e1544e5.r2.dev/The%20Way%20I%20See.wav",
    },
    {
      name: "Streetlamps to Pleiku (original mix)",
      url: "https://pub-5c6372312189426f903f701c7e1544e5.r2.dev/Streetlamps%20to%20Pleiku.wav",
    },
  ];

  return (
    <div className={`audio-container modern ${isDarkMode ? "dark" : "light"}`}>
      <div className="audio-content">
        <span className="audio-eyebrow">Originals · Remixes</span>
        <h2>Audio</h2>
        <p className="audio-sub">My audio production and sound design work.</p>

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
