import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from 'react-router-dom'; 
import { FaPlus, FaSearch, FaCalendarDay, FaCalendarAlt, FaFlag, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
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
          <div className={`add ${activePath === "/add-task" ? "active" : ""}`}>
            <button className="addTab" onClick={() => navigate('/add-task')}>
              <span>Add Task <FaPlus /> </span>
            </button>
          </div>
          <div className={`search ${activePath === "/search-task" ? "active" : ""}`}>
            <button className="searchTab" onClick={() => navigate('/search-task')}>
              <span>My Tasks <FaSearch /> </span>
            </button>
          </div>
          <div className={`today ${activePath === "/today-task" ? "active" : ""}`}>
            <button className="todayTab" onClick={() => navigate('/today-task')}>
              <span>Today's Tasks <FaCalendarDay /> </span>
            </button>
          </div>
          <div className={`upcoming ${activePath === "/upcoming-task" ? "active" : ""}`}>
            <button className="upcomingTab" onClick={() => navigate('/upcoming-task')}>
              <span>Upcoming Tasks <FaCalendarAlt /> </span>
            </button>
          </div>
          <div className={`flag ${activePath === "/flag-task" ? "active" : ""}`}>
            <button className="flagTab" onClick={() => navigate('/flag-task')}>
              <span>Flagged Tasks <FaFlag /> </span>
            </button>
          </div>
          <div className={`completed ${activePath === "/completed-task" ? "active" : ""}`}>
            <button className="completedTab" onClick={() => navigate('/completed-task')}>
              <span>Completed Tasks <FaCheckCircle /> </span>
            </button>
          </div>
          <div className={`incomplete ${activePath === "/incomplete-task" ? "active" : ""}`}>
            <button className="incompleteTab" onClick={() => navigate('/incomplete-task')}>
              <span>Incomplete Tasks <FaTimesCircle /> </span>
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
