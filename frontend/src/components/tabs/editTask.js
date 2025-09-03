import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './workArea.css';

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [flag, setFlag] = useState(false);
  const [colour, setColour] = useState("");
  const [status, setStatus] = useState(false);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://31.97.207.137:8090/api/tasks/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Task not found");
        return res.json();
      })
      .then((task) => {
        setTitle(task.title);
        setDescription(task.description);
        setFlag(task.flag);
        setColour(task.colour);
        setStatus(task.status);
        setDate(task.date);
        setLoading(false);
      })
      .catch((err) => {
        alert("Failed to load task: " + err.message);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTask = {
      title,
      description,
      flag,
      colour,
      status,
      date,
    };

    fetch(`http://31.97.207.137:8090/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update task");
        alert("Task updated successfully!");
        navigate("/"); 
      })
      .catch((err) => alert("Error updating task: " + err.message));
  };

  if (loading) return <p>Loading task data...</p>;

  return (
    <div className="workarea" style={{ maxWidth: 600 }}>
      <h3>Edit Task</h3>
      <form onSubmit={handleSubmit} className="edit-task-form">
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="form-input"
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-textarea"
        />

        <label>
          <input
            type="checkbox"
            checked={flag}
            onChange={(e) => setFlag(e.target.checked)}
            style={{ marginRight: "8px" }}
          />
          Flag
        </label>


        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="form-input"
        />

        <button type="submit" className="btn-primary">
          Update Task
        </button>
      </form>
    </div>
  );
}

export default EditTask;
