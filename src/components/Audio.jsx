
import React from "react";
import "../style/Audio.css";
import { Typewriter } from "react-simple-typewriter";

const Audio = ({ setCurrentSong, isDarkMode, currentSong, isPlaying, isLoading }) => {
  const songs = [
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
    <div className={`audio-container ${isDarkMode ? "dark" : "light"}`}>
      <div className="audio-content">
        <h2>Audio</h2>
        <p>My audio production and sound design work</p>

        <ul>
          {songs.map((song, index) => {
            const isActive = currentSong && currentSong.url === song.url;
            return (
              <li key={index} style={{position: 'relative'}}>
                <button
                  className={`audio-button${isActive ? ' active' : ''}`}
                  onClick={() => {
                    if (isActive && !isPlaying && !isLoading) {
                      // Resume playback if paused and this is the active song
                      const audioPlayer = window.document.querySelector('.audio-player');
                      if (audioPlayer) {
                        // Find the play button and click it
                        const playBtn = audioPlayer.querySelector('button');
                        if (playBtn) playBtn.click();
                      }
                    } else {
                      setCurrentSong(song);
                    }
                  }}
                >
                  {song.name}
                  {isActive && (
                    <span className="now-playing-typewriter">
                      <Typewriter
                        key={`${isLoading ? 'loading' : isPlaying ? 'playing' : 'paused'}-${song.url}`}
                        words={[
                          isLoading && currentSong && currentSong.url === song.url
                            ? "loading"
                            : isPlaying && currentSong && currentSong.url === song.url
                            ? "now playing"
                            : !isPlaying && currentSong && currentSong.url === song.url
                            ? "paused"
                            : ""
                        ]}
                        loop={1}
                        cursor={isLoading || isPlaying}
                        cursorStyle="█"
                        typeSpeed={60}
                        deleteSpeed={0}
                        delaySpeed={2000}
                      />
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