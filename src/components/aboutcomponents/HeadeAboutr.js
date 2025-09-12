import React from "react";

const HeadeAboutr = ({ college }) => {
  if (!college) return null;
  
  return (
    <div className="d-flex align-items-center mb-4">
      <img
        src="/images/mau_en_logotype.svg"
        alt="Malmö University Logo"
        className="me-3"
        style={{ height: "40px", width: "auto" }}
      />
      <h1 className="h3 about-hero mb-0">About {college.name} & Events</h1>
    </div>
  );
};

export default HeadeAboutr;