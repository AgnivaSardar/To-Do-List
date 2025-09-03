import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Template from "./components/boiler/template";

import SearchTask from './components/tabs/searchTask';
import TodayTask from './components/tabs/todayTask';
import UpcomingTask from './components/tabs/upcomingTask';
import FlagTask from './components/tabs/flagTask';
import CompletedTask from './components/tabs/completedTask';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Template />}>
          <Route index element={<SearchTask />} />
          <Route path="search-task" element={<SearchTask />} />
          <Route path="today-task" element={<TodayTask />} />
          <Route path="upcoming-task" element={<UpcomingTask />} />
          <Route path="flag-task" element={<FlagTask />} />
          <Route path="completed-task" element={<CompletedTask />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
