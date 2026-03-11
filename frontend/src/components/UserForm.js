import React, { useState } from "react";
import api from "../api";

function UserForm({ onUserCreated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!name.trim() || !email.trim()) {
      setMessage("Name and email are required.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/users", {
        name: name.trim(),
        email: email.trim(),
      });

      setName("");
      setEmail("");
      setMessage("User created successfully.");
      onUserCreated();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to create user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="panel">
      <h2>Add User</h2>
      <form className="form-grid" onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Create User"}
        </button>
      </form>
      {message && <p className="feedback">{message}</p>}
    </section>
  );
}

export default UserForm;
