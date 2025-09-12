import React from 'react';
import '../styles/MapEmbed.css';

const MapEmbed = () => {
  const campusInfo = {
    name: "Springfield University College of Engineering & Technology",
    address: "100 University Drive, Springfield, MA 01109, USA",
    officeHours: [
      "Monday - Friday: 9:00 AM - 5:00 PM",
      "Saturday: 9:00 AM - 1:00 PM",
      "Sunday: Closed"
    ],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3007.156487752353!2d-72.59004678422326!3d42.10024797905592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cf0a8c3e75c7b89%3A0x3633c5633250844d!2sSpringfield%20University%20College%20of%20Engineering%20%26%20Technology!5e0!3m2!1sen!2sus!4v1718574820277!5m2!1sen!2sus"
  };

  return (
    <div className="map-embed-container">
      <h2 className="section-title">Campus Location</h2>
      <div className="map-content">
        <div className="info-panel">
          <h3>{campusInfo.name}</h3>
          <div className="info-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <div>
              <strong>Address</strong>
              <p>{campusInfo.address}</p>
            </div>
          </div>
          <div className="info-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <div>
              <strong>Office Hours</strong>
              <ul>
                {campusInfo.officeHours.map((hour, index) => (
                  <li key={index}>{hour}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="map-link">
            <a href={`https://www.google.com/maps?q=${encodeURIComponent(campusInfo.address)}`} target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7 3H3"></path>
              </svg>
              Open in Google Maps
            </a>
          </div>
        </div>
        <div className="map-container">
          <iframe
            src={campusInfo.mapUrl}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Campus Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default MapEmbed;