import React from "react";

const VisionStrategy = ({ strategy }) => {
  if (!strategy) return null;
  return (
    <div className="section mb-4">
      <h2 className="h5">Vision & Strategy</h2>
      <p>{strategy.vision}</p>
      <h6>Core Values</h6>
      <ul>
        {strategy.core_values.map((v, i) => (
          <li key={i}>{v}</li>
        ))}
      </ul>
      <h6>Focus Areas</h6>
      <ul>
        {strategy.focus_areas.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
    </div>
  );
};

export default VisionStrategy;