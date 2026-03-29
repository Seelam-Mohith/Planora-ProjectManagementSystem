import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand-block">
            <div className="footer-brand">
              <span className="brand-logo" aria-hidden="true">
                <span className="brand-logo-core" />
              </span>
              <div>
                <h3 className="footer-title">Planora</h3>
                <p className="footer-tagline">Kanban-style SDLC, made simple.</p>
              </div>
            </div>

            <p className="footer-desc">
              Track your project tasks, follow the SDLC workflow, and keep your
              team moving — all in one place.
            </p>
          </div>

          <div className="footer-cols">
            <div className="footer-col">
              <h4 className="footer-heading">Contact</h4>
              <a
                href="mailto:seelammohith2222@gmail.com"
                className="footer-link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>seelammohith2222@gmail.com</span>
              </a>
            </div>

            <div className="footer-col">
              <h4 className="footer-heading">Creator</h4>
              <a
                href="https://github.com/Seelam-Mohith"
                target="_blank"
                rel="noreferrer"
                className="footer-link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="6" x2="6" y1="3" y2="15" />
                  <circle cx="18" cy="6" r="3" />
                  <circle cx="6" cy="18" r="3" />
                  <path d="M18 9a9 9 0 0 1-9 9" />
                </svg>
                <span>github.com/Seelam-Mohith</span>
              </a>
            </div>

            <div className="footer-col">
              <h4 className="footer-heading">Issues</h4>
              <a
                href="https://github.com/Seelam-Mohith/Planora-ProjectManagementSystem/issues"
                target="_blank"
                rel="noreferrer"
                className="footer-link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m8 2 1.88 1.88" />
                  <path d="M14.12 3.88 16 2" />
                  <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
                  <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" />
                  <path d="M12 20v-9" />
                  <path d="M6.53 9C4.6 8.8 3 7.1 3 5" />
                  <path d="M6 13H2" />
                  <path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
                  <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" />
                  <path d="M22 13h-4" />
                  <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
                </svg>
                <span>Report issues here</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          Built by Seelam Mohith for project task management.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
