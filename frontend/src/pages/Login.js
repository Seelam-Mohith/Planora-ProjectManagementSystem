import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!email.trim() || !password) {
      setMessage("Email and password are required.");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/auth/login", {
        email: email.trim(),
        password,
      });

      localStorage.setItem("planora_token", response.data.token);
      localStorage.setItem("planora_user", JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="panel auth-panel">
      <div className="auth-brand">
        <span className="brand-logo" aria-hidden="true">
          <span className="brand-logo-core" />
        </span>
        <span className="brand-text">Planora</span>
      </div>

      <div className="auth-tabs" role="tablist" aria-label="Authentication">
        <Link
          to="/login"
          role="tab"
          aria-selected={location.pathname === "/login"}
          className={
            location.pathname === "/login" ? "auth-tab active" : "auth-tab"
          }
        >
          Login
        </Link>
        <Link
          to="/register"
          role="tab"
          aria-selected={location.pathname === "/register"}
          className={
            location.pathname === "/register" ? "auth-tab active" : "auth-tab"
          }
        >
          Sign Up
        </Link>
      </div>

      <h2 className="auth-title">Welcome back</h2>
      <p className="auth-subtitle">Sign in to track your project tasks.</p>

      <form className="form-grid auth-form" onSubmit={handleSubmit}>
        <label className="field">
          <span className="field-label">Email</span>
          <input
            placeholder="you@example.com"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label className="field">
          <span className="field-label">Password</span>
          <input
            placeholder="Your password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button className="auth-btn" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {message && <p className="feedback error">{message}</p>}
      <p className="feedback">
        No account? <Link to="/register">Create one</Link>
      </p>
    </section>
  );
}

export default Login;
