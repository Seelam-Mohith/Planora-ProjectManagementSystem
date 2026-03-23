import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const TOKEN_KEY = "planora_token";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem(TOKEN_KEY);

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("planora_user");
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="brand" aria-label="Planora">
        <span className="brand-logo" aria-hidden="true">
          <span className="brand-logo-core" />
        </span>
        <span className="brand-text">Planora</span>
      </div>
      <nav className="nav-links">
        {token ? (
          <>
            <Link className={location.pathname === "/" ? "active" : ""} to="/">
              Home
            </Link>
            <Link className={location.pathname === "/dashboard" ? "active" : ""} to="/dashboard">
              Dashboard
            </Link>
            <button type="button" className="nav-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className={location.pathname === "/login" ? "active" : ""} to="/login">
              Login
            </Link>
            <Link className={location.pathname === "/register" ? "active" : ""} to="/register">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
