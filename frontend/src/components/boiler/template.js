import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from 'react-router-dom'; 
import "./template.css";

function Template() {
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const handleToggle = (e) => {
    setDarkMode(e.target.checked);
  };

  // Optional: to highlight active tab, determine active path
  const activePath = location.pathname;

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
          <div className={`search ${activePath === "/search-task" ? "active" : ""}`}>
            <button className="searchTab" onClick={() => navigate('/search-task')}>
              <span>Search Task</span>
            </button>
          </div>
          <div className={`today ${activePath === "/today-task" ? "active" : ""}`}>
            <button className="todayTab" onClick={() => navigate('/today-task')}>
              <span>Today's Tasks</span>
            </button>
          </div>
          <div className={`upcoming ${activePath === "/upcoming-task" ? "active" : ""}`}>
            <button className="upcomingTab" onClick={() => navigate('/upcoming-task')}>
              <span>Upcoming Tasks</span>
            </button>
          </div>
          <div className={`flag ${activePath === "/flag-task" ? "active" : ""}`}>
            <button className="flagTab" onClick={() => navigate('/flag-task')}>
              <span>Flags</span>
            </button>
          </div>
          <div className={`completed ${activePath === "/completed-task" ? "active" : ""}`}>
            <button className="completedTab" onClick={() => navigate('/completed-task')}>
              <span>Completed Tasks</span>
            </button>
          </div>
        </div>
        <div className="workarea">
          <Outlet />
        </div>
      </div>
      <div className="footer">by Agniva Sardar 24BPS1125</div>
    </div>
  );
}

export default Template;
