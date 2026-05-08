import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AudioPlayer from "./components/AudioPlayer";
import Draggable from "react-draggable";
import Body from "./components/Body";
import BentoHome from "./components/BentoHome";
import Projects from "./components/Projects";
import Audio from "./components/Audio";
import Synth from "./components/Synth";
import { Typewriter } from "react-simple-typewriter";
import { Helmet } from "react-helmet";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentTab, setCurrentTab] = useState('travel');
  const [currentSong, setCurrentSong] = useState({
    url: "https://pub-5c6372312189426f903f701c7e1544e5.r2.dev/Run%20-%20Wet%20Stem%20Mix%20(3%3A27).wav",
    name: "Outrun (original mix)",
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dragBounds, setDragBounds] = useState({ top: 0, left: 0, right: 0, bottom: 0 });

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

  // Calculate drag bounds to exclude header and footer
  useEffect(() => {
    const calculateBounds = () => {
      const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 80;
      const footerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--footer-height')) || 80;
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      
      // AudioPlayer dimensions (approximate)
      const playerWidth = Math.min(380, Math.max(260, window.innerWidth * 0.24));
      const playerHeight = 72; // Approximate height
      
      setDragBounds({
        top: headerHeight,
        left: -(windowWidth - playerWidth - 48), // Allow drag to left edge minus padding
        right: 0, // Already positioned from right
        bottom: -(windowHeight - footerHeight - headerHeight - playerHeight - 24) // Constrain above footer
      });
    };

    calculateBounds();
    window.addEventListener('resize', calculateBounds);
    return () => window.removeEventListener('resize', calculateBounds);
  }, []);

  //
  const renderTabContent = () => {
    switch (currentTab) {
      case "travel":
        return (
          <BentoHome
            isDarkMode={isDarkMode}
            currentSong={currentSong}
            isPlaying={isPlaying}
            onTabChange={handleTabChange}
          />
        );
      case "projects":
        return <Projects />;
      case "music":
        return (
          <Audio
            isDarkMode={isDarkMode}
            setCurrentSong={setCurrentSong}
            currentSong={currentSong}
            isPlaying={isPlaying}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={isDarkMode ? "app dark-mode" : "app light-mode"}>
      <div className="bg"></div>
      <Helmet>
        <title>Mitchell D. | Software Engineer</title>
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
      <Draggable 
        bounds={dragBounds} 
        defaultPosition={{x: 0, y: -30}}
        handle=".audio-player-drag-handle"
      >
        <div
          className={`floating-audio-player-wrapper ${isPlaying ? 'is-playing' : ''}`}
          style={{
            position: 'fixed',
            right: 24,
            bottom: 'calc(var(--footer-height, 80px) - 18px)',
            zIndex: 2100, // Higher than header/footer (2000)
            minWidth: 260,
            maxWidth: 380,
            width: '24vw',
            borderRadius: 14,
            padding: 0
          }}>
          <AudioPlayer 
            isDarkMode={isDarkMode} 
            currentSong={currentSong} 
            isPlaying={isPlaying} 
            setIsPlaying={setIsPlaying} 
            isLoading={isLoading} 
            setIsLoading={setIsLoading} 
          />
        </div>
      </Draggable>
      <Footer isDarkMode={isDarkMode} currentSong={currentSong} />
    </div>
  );
};

export default App;