import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AudioPlayer from "./components/AudioPlayer";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="main-content">
        {/* Your main content goes here */}
        <p>This is the main content of the page.</p>
      </main>
      <AudioPlayer />
      <Footer />
    </div>
  );
};

export default App;