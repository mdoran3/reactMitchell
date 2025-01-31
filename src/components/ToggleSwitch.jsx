import React from "react";

const ToggleSwitch = ({ isDarkMode, toggleDarkMode }) => (
  <label className="toggle-switch">
    <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
    <span>
      <span className="toggle-icon sun-icon">☀️</span>
      <span className="toggle-icon moon-icon">🌙</span>
    </span>
  </label>
);

export default ToggleSwitch;