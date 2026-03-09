import React, { useState } from "react";

const statuses = ["Todo", "In Progress", "Testing", "Done"];

function TaskCard({ task, onStatusChange, onDelete }) {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <article className="task-card">
      <h3>{task.title}</h3>
      <p className="task-meta">
        <strong>Assigned:</strong> {task.assignedTo?.name || "Unassigned"}
      </p>
      <p className="task-meta">
        <strong>Description:</strong> {task.description || "No description"}
      </p>

      <label className="status-row">
        <span>Status</span>
        <select value={task.status} onChange={(event) => onStatusChange(task._id, event.target.value)}>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>

      <div className="task-actions">
        <button type="button" onClick={() => setShowHistory((prev) => !prev)}>
          {showHistory ? "Hide History" : "View History"}
        </button>
        <button type="button" className="danger" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>

      {showHistory && (
        <div className="history-box">
          <h4>Status History</h4>
          {task.history?.length ? (
            <ul>
              {task.history.map((item, index) => (
                <li key={`${item.status}-${item.date}-${index}`}>
                  <span>{item.status}</span>
                  <span>{new Date(item.date).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No history available.</p>
          )}
        </div>
      )}
    </article>
  );
}

export default TaskCard;
