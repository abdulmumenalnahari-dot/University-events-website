import React from "react";

const OrganizingBodies = ({ organizers }) => {
  if (!organizers) return null;

  return (
    <div className="section">
      <h2 className="h5">Organizing Bodies</h2>
      <ul className="org-list">
        {organizers.map((o, i) => (
          <li key={i}>
            <strong>{o.name}</strong> — {o.role}
          </li>
        ))}
      </ul>

      <div className="cta mt-3 p-3 border rounded bg-light">
        <h6 className="mb-1">Partners & Sponsors</h6>
        <p className="small mb-2">
          Support research, education, and cultural initiatives at Malmö University.
        </p>
        <a
          href="https://mau.se/en/collaboration-and-innovation/"
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline-primary btn-sm"
        >
          Get in touch
        </a>
      </div>
    </div>
  );
};

export default OrganizingBodies;