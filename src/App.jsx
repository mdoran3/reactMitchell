import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AudioPlayer from "./components/AudioPlayer";
import Draggable from "react-draggable";
import Body from "./components/Body";
import Projects from "./components/Projects";
import Audio from "./components/Audio";
import Synth from "./components/Synth";
import { Typewriter } from "react-simple-typewriter";
import { Helmet } from "react-helmet";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentTab, setCurrentTab] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [currentSong, setCurrentSong] = useState({
    url: "https://pub-5c6372312189426f903f701c7e1544e5.r2.dev/As%20Saigon%20Vanishes.wav",
    name: "As Saigon Vanishes (original mix)",
  });

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    document.body.classList.toggle("light-mode", !isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    if (showIntro) {
      const introTimeout = setTimeout(() => {
        setShowIntro(false);
        setCurrentTab("travel");
      }, 6000);
      return () => clearTimeout(introTimeout);
    }
  }, [showIntro]);

  const renderTabContent = () => {
    switch (currentTab) {
      case "travel":
        return <Body isDarkMode={isDarkMode} />;
      case "projects":
        return <Projects />;
      case "music":
        return (
          <Audio
            isDarkMode={isDarkMode}
            setCurrentSong={setCurrentSong}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={isDarkMode ? "app dark-mode" : "app light-mode"}>
      <Helmet>
        <title>Mitchell Doran | Portfolio</title>
      </Helmet>
      <Header
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        currentTab={currentTab}
        onTabChange={handleTabChange}
      />
      <main>
        {renderTabContent()}
      </main>
      {/* Floating draggable AudioPlayer */}
      <Draggable bounds="parent" defaultPosition={{x: 0, y: -30}}>
        <div style={{position: 'fixed', right: 24, bottom: 62, zIndex: 1000, minWidth: 320, maxWidth: 480, width: '32vw', boxShadow: '0 4px 24px rgba(0,0,0,0.18)', borderRadius: 12, background: isDarkMode ? '#111' : '#fff', padding: 0}}>
          <AudioPlayer isDarkMode={isDarkMode} currentSong={currentSong} />
        </div>
      </Draggable>
      <Footer isDarkMode={isDarkMode} currentSong={currentSong} />
    </div>
  );
};

export default App;