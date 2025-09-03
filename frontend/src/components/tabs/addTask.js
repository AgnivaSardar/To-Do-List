import React, { useState } from "react";
import './workArea.css';

function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [flag, setFlag] = useState(false);
  const [colour, setColour] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      alert("Task title is required.");
      return;
    }
    const newTask = {
      title,
      description,
      flag,
      colour,
      status: false, 
      date,
    };

    fetch("http://31.97.207.137:8090/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add task.");
        alert("Task added successfully!");
        setTitle("");
        setDescription("");
        setFlag(false);
        setColour("");
        setDate("");
      })
      .catch((err) => {
        alert("Error adding task: " + err.message);
      });
  };

  return (
    <div className="workarea" style={{ maxWidth: 600 }}>
      <h3>Add New Task</h3>
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
          Add Task
        </button>
      </form>
    </div>
  );
}

export default AddTask;
