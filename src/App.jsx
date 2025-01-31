import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AudioPlayer from "./components/AudioPlayer";
import { Helmet } from "react-helmet";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
      <Helmet>
        <title>Mitchell D. | Software Engineer</title>
        {/* Set favicon */}
        <link rel="icon" type="image/x-icon" href="/turqbits.ico" />
      </Helmet>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="main-content">
        {/* Your main content goes here */}
        <p>This is the main content of the page.</p>
      </main>
      <div className="audio-player">
        <AudioPlayer />
      </div>
      <Footer />
    </div>
  );
};

export default App;