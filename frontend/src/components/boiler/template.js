import React, { useState, useEffect } from "react";
import "./template.css";

function Template() {
  const [darkMode, setDarkMode] = useState(false);

  // Update body class when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  // Handler for toggle switch
  const handleToggle = (e) => {
    setDarkMode(e.target.checked);
  };

  return (
    <div className="main">
      <div className="header">
        <text>Mark it UP!</text>
        <label className="switch">
          <input
            type="checkbox"
            id="mode-toggle"
            checked={darkMode}
            onChange={handleToggle}
          />
          <span className="slider"></span>
        </label>
      </div>
      <div className="middle">
        <div className="leftCol">
          <div className="search">
            <button className="searchTab">
              <span>Search Task</span>
            </button>
          </div>
          <div className="today">
            <button className="todayTab">
              <span>Today's Tasks</span>
            </button>
          </div>
          <div className="upcoming">
            <button className="upcomingTab">
              <span>Upcoming Tasks</span>
            </button>
          </div>
          <div className="flag">
            <button className="flagTab">
              <span>Flags</span>
            </button>
          </div>
          <div className="completed">
            <button className="completedTab">
              <span>Completed Tasks</span>
            </button>
          </div>
        </div>
        <div className="workarea"></div>
      </div>
      <div className="footer">by Agniva Sardar 24BPS1125</div>
    </div>
  );
}

export default Template;
