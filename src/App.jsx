import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AudioPlayer from "./components/AudioPlayer";
import Body from "./components/Body";       // Travel tab
import Projects from "./components/Projects"; // New
import Audio from "./components/Audio";       // New
import { Helmet } from "react-helmet";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default is dark mode
  const [currentTab, setCurrentTab] = useState("travel"); // Default tab

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    document.body.classList.toggle("light-mode", !isDarkMode);
  }, [isDarkMode]);

  const renderTabContent = () => {
    switch (currentTab) {
      case "travel":
        return <Body isDarkMode={isDarkMode} />;
      case "projects":
        return <Projects />;
      case "music":
        return <Audio />;
      default:
        return <Body isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div>
      <Helmet>
        <title>Mitchell D. | Software Engineer</title>
        <link rel="icon" type="image/x-icon" href="/turqbits.ico" />
      </Helmet>

      <Header
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />

      {renderTabContent()}

      <div className="audio-player">
        <AudioPlayer isDarkMode={isDarkMode} />
      </div>

      <Footer />
    </div>
  );
};

export default App;