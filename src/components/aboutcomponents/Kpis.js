import React from "react";

const Kpis = ({ college }) => {
  if (!college) return null;
  
  return (
    <div className="kpis mb-4">
      {college.recognitions.map((r, i) => (
        <div key={i} className="kpi p-3 bg-light rounded shadow-sm d-inline-block me-3 mb-2">
          {r}
        </div>
      ))}
    </div>
  );
};

export default Kpis;