// src/components/HomeBegin.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/HomeBegin.css";
import UpcomingEventsHighlight from "./UpcomingEventsHighlight";

// Lightweight inline SVG icons
const Icon = ({ name, color = "#6366f1", size = 28 }) => {
  const p = { width: size, height: size, fill: "none", stroke: color, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };

  if (name === "calendar") {
    return (
      <svg {...p} viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M8 2v4M16 2v4M3 10h18" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
      </svg>
    );
  }
  if (name === "users") {
    return (
      <svg {...p} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }
  // support (lifebuoy)
  return (
    <svg {...p} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <path d="M4.93 4.93l3.54 3.54M15.53 15.53l3.54 3.54M19.07 4.93l-3.54 3.54M8.47 15.53L4.93 19.07" />
    </svg>
  );
};

export default function HomeBegin() {
  return (
    <div className="home-begin">
      <section className="hero-section">
        <h2 className="section-heading">Campus Events & Activities</h2>

        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon" style={{ background: "#eef2ff" }}>
              <Icon name="calendar" color="#6366f1" />
            </div>
            <h3>Campus Events</h3>
            <p>
              Discover exciting events, workshops, and activities happening across campus. Never miss out on what matters to you.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon" style={{ background: "#e6f3ff" }}>
              <Icon name="users" color="#3b82f6" />
            </div>
            <h3>Student Organizations</h3>
            <p>
              Join clubs, societies, and organizations that match your interests. Build connections and develop new skills.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon" style={{ background: "#e9fff6" }}>
              <Icon name="support" color="#10b981" />
            </div>
            <h3>Resources & Support</h3>
            <p>
              Access academic resources, student services, and support systems to help you succeed in your university journey.
            </p>
          </div>
        </div>

        <div className="cta-buttons">
          <Link to="/events" className="btn-primary">Explore Events</Link>
          <Link to="/register" className="btn-outline">Join Organizations</Link>
        </div>
      </section>

      <UpcomingEventsHighlight />
    </div>
  );
}
