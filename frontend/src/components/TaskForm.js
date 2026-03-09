import React, { useState } from "react";
import api from "../api";

function TaskForm({ users, onTaskCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!title.trim() || !assignedTo) {
      setMessage("Title and assignee are required.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/tasks", {
        title: title.trim(),
        description: description.trim(),
        assignedTo,
      });

      setTitle("");
      setDescription("");
      setAssignedTo("");
      setMessage("Task created successfully.");
      onTaskCreated();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to create task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="panel">
      <h2>Add Task</h2>
      <form className="form-grid" onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={4}
        />
        <select value={assignedTo} onChange={(event) => setAssignedTo(event.target.value)}>
          <option value="">Assign to user</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
        <button type="submit" disabled={loading || users.length === 0}>
          {loading ? "Saving..." : "Create Task"}
        </button>
      </form>
      {users.length === 0 && <p className="feedback">Create at least one user first.</p>}
      {message && <p className="feedback">{message}</p>}
    </section>
  );
}

export default TaskForm;
