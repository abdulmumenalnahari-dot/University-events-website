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
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39292.03941324358!2d13.086280315863755!3d55.582223439613024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4653a1559b147d81%3A0xa2379237f618d968!2z2KzYp9mF2LnYqSDZhdin2YTZhdmI!5e0!3m2!1sar!2s!4v1757716190445!5m2!1sar!2s"
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
  
 