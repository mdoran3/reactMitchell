import React from "react";
import "../style/Audio.css";

const Audio = ({ setCurrentSong, isDarkMode }) => {
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
          {songs.map((song, index) => (
            <li key={index}>
              <button
                className="audio-button"
                onClick={() => setCurrentSong(song)}
              >
                {song.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Audio;