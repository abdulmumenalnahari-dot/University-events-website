// src/pages/Contact.jsx
import React, { useState, useEffect } from "react";
import CoordinatorsList from "../components/CoordinatorsList";
import MapEmbed from "../components/MapEmbed";
import "../styles/Contact.css";

export default function Contact() {
  const [coordinators, setCoordinators] = useState([]);

  useEffect(() => {
    fetch("/data/coordinators.json")
      .then((r) => r.json())
      .then(setCoordinators)
      .catch((e) => console.error("Error loading coordinators: - Contact.js:14", e));
  }, []);

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1 className="contact-title">Contact & Support</h1>
          <p className="contact-subtitle">
            Reach the right coordinator, find our location, and get quick help.
          </p>
        </div>
      </section>

      <section className="container contact-grid">
        <div className="contact-main card-surface">
       
          <CoordinatorsList coordinators={coordinators} defaultTab="student" />
        </div>

        <aside className="contact-side">
         

          <div className="card-surface">
          
            <MapEmbed />
          </div>
        </aside>
      </section>
    </div>
  );
}
