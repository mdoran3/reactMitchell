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
        return <Audio />;
      default:
        return null;
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
      {!showIntro && renderTabContent()}

      {showSynthPopup && currentTab && (
        <Synth
          key={currentTab}
          currentTab={currentTab}
          onClose={() => setShowSynthPopup(false)}
        />
      )}

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default App;