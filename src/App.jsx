import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AudioPlayer from "./components/AudioPlayer";
import Body from "./components/Body"; // Import the Body component for digital rain effect
import { Helmet } from "react-helmet";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default is dark mode

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    // Apply the dark or light mode class to the body
    document.body.classList.toggle("dark-mode", isDarkMode);
    document.body.classList.toggle("light-mode", !isDarkMode);
  }, [isDarkMode]);

  return (
    <div>
      <Helmet>
        <title>Mitchell D. | Software Engineer</title>
        {/* Set favicon */}
        <link rel="icon" type="image/x-icon" href="/turqbits.ico" />
      </Helmet>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Body isDarkMode={isDarkMode} /> {/* Pass dark mode status to Body */}
      <div className="audio-player">
        <AudioPlayer isDarkMode={isDarkMode} />
      </div>
      <Footer />
    </div>
  );
};

export default App;