import React from "react";

const AlumniFriends = ({ alumni }) => {
  if (!alumni) return null;
  return (
    <div className="section mb-4">
      <h2 className="h5">Alumni & Friends</h2>
      <ul>
        {alumni.network_features.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
      <a
        href="https://mau.se/en/collaboration-and-innovation/alumni--friends/"
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-block",
          marginTop: "12px",
          color: "#0d6efd",
          textDecoration: "none",
          fontWeight: "600",
        }}
      >
        Join the Alumni Network →
      </a>
    </div>
  );
};

export default AlumniFriends;