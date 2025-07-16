import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Body from "./components/Body";
import Projects from "./components/Projects";
import Audio from "./components/Audio";
import Synth from "./components/Synth";
import { Typewriter } from "react-simple-typewriter";
import { Helmet } from "react-helmet";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentTab, setCurrentTab] = useState(null);
  const [showSynthPopup, setShowSynthPopup] = useState(false);
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
    setShowSynthPopup(true);
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
        setShowSynthPopup(true);
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
            setCurrentSong={setCurrentSong} // Pass this down to Audio
          />
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: isDarkMode ? "#000000" : "#ffffff",
      display: "flex",
      flexDirection: "column"
    }}>
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

      {/* Intro overlay */}
      {showIntro && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: "1.5rem",
            color: "#0ff",
            zIndex: 9999,
            padding: "2rem",
            textAlign: "center",
            textShadow: "0 0 4px #0ff, 0 0 8px #0ff, 0 0 12px #00ffff",
          }}
        >
          <Typewriter
            words={["Welcome to the page of Earth, code, and audio."]}
            typeSpeed={100}
            cursor
          />
        </div>
      )}

      {/* Main content */}
      {!showIntro && (
        <div style={{ 
          flex: 1, 
          backgroundColor: isDarkMode ? "#000000" : "#ffffff",
          paddingBottom: "160px" // Add padding for footer + audio player space
        }}>
          {renderTabContent()}
        </div>
      )}

      {showSynthPopup && currentTab && (
        <Synth
          key={currentTab}
          currentTab={currentTab}
          onClose={() => setShowSynthPopup(false)}
        />
      )}

      <Footer
        isDarkMode={isDarkMode}
        currentSong={currentSong} // Pass currentSong to Footer
      />
    </div>
  );
};

export default App;