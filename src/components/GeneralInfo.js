 import React from 'react';
import '../styles/GeneralInfo.css';

const GeneralInfo = () => {
  const infoItems = [
    {
      title: "Event Inquiries",
      description: "For questions about upcoming events, registration, or event proposals.",
      email: "events@sfcet.edu"
    },
    {
      title: "Student Support",
      description: "For student-related queries, academic support, and campus life information.",
      email: "support@sfcet.edu"
    },
    {
      title: "Main Reception",
      description: "General inquiries, visitor information, and administrative matters.",
      phone: "+1 (413) 555-0100"
    }
  ];

  const emergencyContact = {
    title: "Emergency Contact",
    description: "For emergencies on campus, contact campus security immediately.",
    phone: "+1 (413) 555-0911"
  };

  return (
    <div className="general-info-container">
      <h2 className="section-title">General Information</h2>
      <div className="info-grid">
        {infoItems.map((item, index) => (
          <div key={index} className="info-card">
            <h3 className="info-title">{item.title}</h3>
            <p className="info-description">{item.description}</p>
            {item.email && (
              <a href={`mailto:${item.email}`} className="info-link">
                {item.email}
              </a>
            )}
            {item.phone && (
              <a href={`tel:${item.phone}`} className="info-link">
                {item.phone}
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="emergency-section">
        <h3 className="emergency-title">{emergencyContact.title}</h3>
        <p className="emergency-description">{emergencyContact.description}</p>
        <a href={`tel:${emergencyContact.phone}`} className="emergency-link">
          {emergencyContact.phone}
        </a>
      </div>
    </div>
  );
};

export default GeneralInfo;