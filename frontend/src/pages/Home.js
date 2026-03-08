import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import UserForm from "../components/UserForm";
import TaskForm from "../components/TaskForm";

function Home() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    const response = await api.get("/users");
    setUsers(response.data);
  };

  const fetchTasks = async () => {
    const response = await api.get("/tasks");
    setTasks(response.data);
  };

  // Load initial dashboard data for forms and quick overview.
  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      await Promise.all([fetchUsers(), fetchTasks()]);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="page-grid">
      <UserForm onUserCreated={loadData} />
      <TaskForm users={users} onTaskCreated={loadData} />

      <section className="panel full-width">
        <div className="panel-head">
          <h2>Task Dashboard Snapshot</h2>
          <Link className="link-btn" to="/dashboard">
            Open Full Dashboard
          </Link>
        </div>

        {loading && <p>Loading dashboard snapshot...</p>}
        {error && <p className="feedback error">{error}</p>}

        {!loading && !error && (
          <div className="snapshot-list">
            {tasks.length === 0 ? (
              <p>No tasks yet. Create your first task above.</p>
            ) : (
              tasks.map((task) => (
                <div className="snapshot-item" key={task._id}>
                  <span>{task.title}</span>
                  <span>{task.assignedTo?.name || "Unassigned"}</span>
                  <span>{task.status}</span>
                </div>
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
