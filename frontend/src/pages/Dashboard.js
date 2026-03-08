import React, { useEffect, useState } from "react";
import api from "../api";
import TaskCard from "../components/TaskCard";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleStatusChange = async (taskId, nextStatus) => {
    try {
      await api.put(`/tasks/${taskId}`, { status: nextStatus });
      fetchTasks();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Failed to update status.");
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks((previous) => previous.filter((task) => task._id !== taskId));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Failed to delete task.");
    }
  };

  return (
    <section className="panel full-width">
      <h2>Task Dashboard</h2>
      {loading && <p>Loading tasks...</p>}
      {error && <p className="feedback error">{error}</p>}

      {!loading && !error && tasks.length === 0 && <p>No tasks found.</p>}

      <div className="task-grid">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  );
}

export default Dashboard;
