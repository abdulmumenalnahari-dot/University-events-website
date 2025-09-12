// src/components/CoordinatorCard.jsx
import React from 'react';
 
const CoordinatorCard = ({ coordinator }) => {
  return (
    <div className="coordinator-card">
      <div className="avatar">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
      </div>
      <h4 className="name">{coordinator.name}</h4>
      <p className="title">{coordinator.title}</p>
      <p className="department">{coordinator.department}</p>
      <p className="contact-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 17.46 17.46 0 0 0-10.12-2.82A17.46 17.46 0 0 0 2 19.1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h1"></path>
          <path d="M2 16.92a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3z"></path>
          <path d="M16 3.05a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V3.05z"></path>
        </svg>
        <a href={`tel:${coordinator.phone}`} className="contact-link">{coordinator.phone}</a>
      </p>
      <p className="contact-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
        <a href={`mailto:${coordinator.email}`} className="contact-link">{coordinator.email}</a>
      </p>
    </div>
  );
};

export default CoordinatorCard;