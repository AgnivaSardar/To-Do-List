import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import './workArea.css';

function CompletedTask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadTasks = () => {
    fetch("http://localhost:8080/api/tasks/completed")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        alert("Failed to load completed tasks");
      });
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleToggleCompleted = (task) => {
    const updatedTask = { ...task, status: !task.status };
    fetch(`http://localhost:8080/api/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        loadTasks();
      })
      .catch(() => alert("Failed to update task status"));
  };

  const handleEdit = (task) => {
    navigate(`/edit-task/${task.id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      fetch(`http://localhost:8080/api/tasks/${id}`, { method: "DELETE" })
        .then(() => loadTasks())
        .catch(() => alert("Failed to delete task"));
    }
  };

  return (
    <div className="workarea">
      <h3>Completed Tasks</h3>
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No completed tasks found.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id}>
              <div className="task-content">
                <div className="task-title">{task.title}</div>
                <div className="task-description">{task.description}</div>
                <div>Due date: {task.date}</div>
              </div>
              <div className="task-controls">
                <input
                  type="checkbox"
                  checked={task.status}
                  onChange={() => handleToggleCompleted(task)}
                  title="Mark as incomplete"
                />
                <button onClick={() => handleEdit(task)} title="Edit task">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(task.id)} title="Delete task">
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CompletedTask;
