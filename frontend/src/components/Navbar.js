import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <header className="navbar">
      <div className="brand" aria-label="Planora">
        <span className="brand-logo" aria-hidden="true">
          <span className="brand-logo-core" />
        </span>
        <span className="brand-text">Planora</span>
      </div>
      <nav className="nav-links">
        <Link className={location.pathname === "/" ? "active" : ""} to="/">
          Home
        </Link>
        <Link className={location.pathname === "/dashboard" ? "active" : ""} to="/dashboard">
          Dashboard
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
