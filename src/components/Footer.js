// src/components/Footer.jsx
import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  const footerLinks = {
    campusConnect: {
      title: "CampusConnect",
      description: "Your gateway to campus life and community engagement at Springfield University."
    },
    quickLinks: [
      "Events",
      "Organizations",
      "Campus Life",
      "Resources"
    ],
    support: [
      "Help Center",
      "Contact Us",
      "Student Services",
      "FAQ"
    ],
    connect: [
      "Social Media",
      "Newsletter",
      "Mobile App",
      "Notifications"
    ]
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-column">
          <h3 className="footer-title">{footerLinks.campusConnect.title}</h3>
          <p className="footer-description">{footerLinks.campusConnect.description}</p>
        </div>

        <div className="footer-column">
          <h4 className="footer-subtitle">Quick Links</h4>
          {footerLinks.quickLinks.map((link, index) => (
            <a key={index} href="#" className="footer-link">
              {link}
            </a>
          ))}
        </div>

        <div className="footer-column">
          <h4 className="footer-subtitle">Support</h4>
          {footerLinks.support.map((link, index) => (
            <a key={index} href="#" className="footer-link">
              {link}
            </a>
          ))}
        </div>

        <div className="footer-column">
          <h4 className="footer-subtitle">Connect</h4>
          {footerLinks.connect.map((link, index) => (
            <a key={index} href="#" className="footer-link">
              {link}
            </a>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">
          © 2024 Springfield University CampusConnect. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;