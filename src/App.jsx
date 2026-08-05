import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AudioPlayer from "./components/AudioPlayer";
import Body from "./components/Body";
import BentoHome from "./components/BentoHome";
import Projects from "./components/Projects";
import Audio from "./components/Audio";
import Synth from "./components/Synth";
import { Typewriter } from "react-simple-typewriter";
import { Helmet } from "react-helmet";
import songs from "./data/songs";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentTab, setCurrentTab] = useState('travel');
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const handleNextSong = () => {
    const currentIndex = songs.findIndex((song) => song.url === currentSong?.url);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
  };

  const handlePrevSong = () => {
    const currentIndex = songs.findIndex((song) => song.url === currentSong?.url);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    document.body.classList.toggle("light-mode", !isDarkMode);
  }, [isDarkMode]);

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
            onNextSong={handleNextSong}
            onPrevSong={handlePrevSong}
          />
        );
      case "projects":
        return <Projects isDarkMode={isDarkMode} />;
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
      {/* Fixed-position AudioPlayer (position is not draggable, only minimizable) */}
      <div className={`floating-audio-player-wrapper ${isPlaying ? 'is-playing' : ''}`}>
        <AudioPlayer
          isDarkMode={isDarkMode}
          currentSong={currentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
      <Footer isDarkMode={isDarkMode} currentSong={currentSong} />
    </div>
  );
};

export default App;