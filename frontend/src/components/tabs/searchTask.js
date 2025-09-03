import React, { useState } from "react";

function SearchTask() {
  const [query, setQuery] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) {
      alert("Please enter a search term");
      return;
    }

    setLoading(true);
    fetch(`http://localhost:8080/api/tasks/search?query=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to fetch tasks");
        setLoading(false);
      });
  };

  return (
    <div class="inside  ">
      <h3>Search Tasks</h3>
      <input
        type="text"
        placeholder="Enter search keywords"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
      />
      <button onClick={handleSearch} style={{ marginLeft: "10px" }}>
        Search
      </button>

      {loading && <p>Loading...</p>}

      {!loading && tasks.length === 0 && query !== "" && <p>No tasks found.</p>}

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong> — {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchTask;
