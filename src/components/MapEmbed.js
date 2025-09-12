// src/components/MapEmbed.jsx
import React from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa'; // استيراد الأيقونات
import '../styles/MapEmbed.css';

const MapEmbed = () => {
  const campusInfo = {
    name: "Malmö University",
    address: "Universitetsgatan 10, 211 19 Malmö, Sweden", // تحديث العنوان
    officeHours: [
      "Monday - Friday: 9:00 AM - 5:00 PM",
      "Saturday: 9:00 AM - 1:00 PM",
      "Sunday: Closed"
    ],
    // تحديث رابط الخريطة لجامعة Malmö
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2220.098291517993!2d13.000160377544966!3d55.60037099209096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4653a52e8451c7d7%3A0x4019078290e7c40!2sMalm%C3%B6%20University!5e0!3m2!1sen!2sse!4v1718574820277!5m2!1sen!2sse"
  };

  return (
    <div className="map-embed-container">
      <h2 className="section-title">Campus Location</h2>
      <div className="map-content">
        <div className="info-panel">
          <h3>{campusInfo.name}</h3>
          <div className="info-item">
            {/* استخدام أيقونة react-icons */}
            <FaMapMarkerAlt className="info-icon" />
            <div>
              <strong>Address</strong>
              <p>{campusInfo.address}</p>
            </div>
          </div>
          <div className="info-item">
            {/* استخدام أيقونة react-icons */}
            <FaCalendarAlt className="info-icon" />
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
            {/* استخدام أيقونة react-icons */}
            <a href='https://maps.app.goo.gl/cbSxNemCKMksAG3h7' >
              <FaExternalLinkAlt className="link-icon" />
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