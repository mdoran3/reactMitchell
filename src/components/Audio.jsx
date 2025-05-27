// import React from "react";
// import "../style/Audio.css";

// const Audio = ({ setCurrentSong }) => {
//   const songs = [
//     {
//       title: "The Eulogy",
//       url: "https://pub-5c6372312189426f903f701c7e1544e5.r2.dev/The%20Eulogy.wav",
//     },
//     {
//       title: "I Want You - Savage Garden (remix)",
//       url: "https://pub-5c6372312189426f903f701c7e1544e5.r2.dev/I%20Want%20Your%20-%20Savage%20Garden%20(remix).wav",
//     },
//   ];

//   return (
//     <div className="audio-container">
//       <div className="audio-content">
//         <h2>Audio</h2>
//         <p>This section showcases my music production and sound design work.</p>
//         {songs.map((song, i) => (
//           <button
//             key={i}
//             onClick={() => setCurrentSong(song.url)}
//             className="song-button"
//           >
//             ▶ {song.title}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Audio;

import React from "react";
import "../style/Audio.css";

const Audio = ({ setCurrentSong, isDarkMode }) => {
  const songs = [
    {
      name: "The Eulogy",
      url: "https://pub-5c6372312189426f903f701c7e1544e5.r2.dev/The%20Eulogy.wav",
    },
    {
      name: "I Want You",
      url: "https://pub-5c6372312189426f903f701c7e1544e5.r2.dev/I%20Want%20Your%20-%20Savage%20Garden%20(remix).wav",
    },
  ];

  return (
    <div className={`audio-container ${isDarkMode ? "dark" : "light"}`}>
      <div className="audio-content">
        <h2>Audio</h2>
        <p>This section showcases my music production and sound design work.</p>

        <ul>
          {songs.map((song, index) => (
            <li key={index}>
              <button
                className="audio-button"
                onClick={() => setCurrentSong(song.url)}
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