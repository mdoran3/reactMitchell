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
  const [currentTab, setCurrentTab] = useState('travel');
  const [currentSong, setCurrentSong] = useState({
    url: "https://pub-5c6372312189426f903f701c7e1544e5.r2.dev/1%20mile%202%20mile.wav",
    name: "1 mile 2 mile (original mix)",
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
      const playerWidth = Math.min(480, window.innerWidth * 0.32);
      const playerHeight = 120; // Approximate height
      
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
        return <Body isDarkMode={isDarkMode} />;
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
        <div style={{
          position: 'fixed', 
          right: 24, 
          bottom: 62, 
          zIndex: 2100, // Higher than header/footer (2000)
          minWidth: 320, 
          maxWidth: 480, 
          width: '32vw', 
          boxShadow: '0 4px 24px rgba(0,0,0,0.18)', 
          borderRadius: 12, 
          background: isDarkMode ? '#111' : '#fff', 
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