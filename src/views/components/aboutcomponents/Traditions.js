import React from "react";

const Traditions = () => {
  const traditions = [
    "Annual Academic Celebration (October)",
    "Faculty symposia and public lectures",
    "Europe Day activities",
    "Malmö Academic Choir performances",
  ];

  return (
    <div className="section mb-4">
      <h2 className="h5">Traditions</h2>
      <ul>
        {traditions.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
};

export default Traditions;