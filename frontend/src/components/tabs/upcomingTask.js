import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { FaEdit, FaTrash } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import './workArea.css';

function UpcomingTask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks(selectedDate);
  }, [selectedDate]);

  const fetchTasks = (date) => {
    setLoading(true);
    const formattedDate = date.toISOString().split("T")[0];
    return fetch(`https://to-do-list-backend-6.onrender.com/api/tasks/upcoming?fromDate=${formattedDate}`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        alert("Failed to load upcoming tasks");
      });
  };

  const handleToggleCompleted = (task) => {
    const updatedTask = {
      id: task.id,
      title: task.title,
      description: task.description,
      flag: task.flag,
      colour: task.colour,
      status: !task.status,
      date: task.date,
    };
    fetch(`https://to-do-list-backend-6.onrender.com/api/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return fetchTasks(selectedDate);
      })
      .catch((err) => {
        alert("Failed to update task status");
      });
  };

  const handleEdit = (task) => {
    navigate(`/edit-task/${task.id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      fetch(`https://to-do-list-backend-6.onrender.com/api/tasks/${id}`, { method: "DELETE" })
        .then(() => fetchTasks(selectedDate))
        .catch(() => alert("Failed to delete task"));
    }
  };

  return (
    <div className="workarea">
      <h3>Upcoming Tasks</h3>
      <label>Select Starting Date: </label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy-MM-dd"
      /><br/>
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No upcoming tasks found.</p>
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
                  title="Mark as completed"
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

export default UpcomingTask;
