import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AudioPlayer from "./components/AudioPlayer";
import Body from "./components/Body";
import Projects from "./components/Projects";
import Audio from "./components/Audio";
import Synth from "./components/Synth";
import { Helmet } from "react-helmet";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentTab, setCurrentTab] = useState("travel");
  const [showSynthPopup, setShowSynthPopup] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    setShowSynthPopup(true);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    document.body.classList.toggle("light-mode", !isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
     setShowSynthPopup(true); // <--- Trigger popup on load
  }, []);

  const renderTabContent = () => {
    switch (currentTab) {
      case "travel": return <Body isDarkMode={isDarkMode} />;
      case "projects": return <Projects />;
      case "music": return <Audio />;
      default: return <Body isDarkMode={isDarkMode} />;
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
        setCurrentTab={handleTabChange}
      />

      {renderTabContent()}

      {showSynthPopup && (
        <Synth onClose={() => setShowSynthPopup(false)} />
      )}

      <div className="audio-player">
        <AudioPlayer isDarkMode={isDarkMode} />
      </div>

      <Footer />
    </div>
  );
};

export default App;