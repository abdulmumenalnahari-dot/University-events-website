 import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaWhatsapp, FaInstagram } from 'react-icons/fa';  
import '../styles/Footer.css';

const Footer = () => {
  const [developers, setDevelopers] = useState([]);

   useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await fetch('/data/coordinators.json');
        const data = await response.json();
        setDevelopers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load developers data:", error);
         setDevelopers([
          { id: 1, name: "Towheeb algafri", email: "towheebalgafri@gmail.com" },
        ]);
      }
    };

    fetchDevelopers();
  }, []);

  const socialLinks = [
    { name: 'Facebook', url: 'https://www.facebook.com', icon: <FaFacebookF className="fs-5" /> },
    { name: 'WhatsApp', url: 'https://wa.me/', icon: <FaWhatsapp className="fs-5" /> },
    { name: 'Instagram', url: 'https://www.instagram.com', icon: <FaInstagram className="fs-5" /> },
  ];

  return (
    <footer className="bg-dark text-light w-100 mt-auto">
      <div className="container py-4">
        <div className="row gy-4 align-items-start">
           <div className="col-12 col-md-6">
            <h4 className="h6 text-uppercase fw-semibold mb-3">Developed by</h4>
            {developers.length > 0 ? (
              <ul className="list-group list-group-flush">
                {developers.map((dev) => (
                  <li
                    key={dev.id ?? dev.email}
                    className="list-group-item bg-transparent text-light px-0 py-2 d-flex flex-wrap gap-2 justify-content-between align-items-center border-0 border-bottom border-secondary-subtle"
                  >
                    <span className="fw-medium">{dev.name}</span>
                    <a
                      href={`mailto:${dev.email}`}
                      className="link-light text-decoration-none small"
                      aria-label={`Email ${dev.name}`}
                    >
                      {dev.email}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-secondary mb-0">Loading developers...</p>
            )}
          </div>

           <div className="col-12 col-md-6">
            <h4 className="h6 text-uppercase fw-semibold mb-3">Connect with us</h4>
            <div className="d-flex flex-wrap gap-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-light btn-sm rounded-circle d-inline-flex align-items-center justify-content-center"
                  style={{ width: 40, height: 40 }}
                  aria-label={social.name}
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

         <div className="border-top border-secondary-subtle mt-4 pt-3">
          <p className="small text-center text-secondary mb-0">
            &copy; {new Date().getFullYear()} Springfield University CampusConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
