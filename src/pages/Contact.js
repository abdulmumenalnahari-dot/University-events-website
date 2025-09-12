 import React, { useState, useEffect } from 'react';
import CoordinatorsList from '../components/CoordinatorsList';
import MapEmbed from '../components/MapEmbed';
import GeneralInfo from '../components/GeneralInfo';

const Contact = () => {
  const [coordinators, setCoordinators] = useState([]);

  useEffect(() => {
    fetch('/data/coordinators.json')
      .then(res => res.json())
      .then(data => setCoordinators(data))
      .catch(err => console.error("Error loading coordinators:", err));
  }, []);

  return (
    <div className="contact-page">
      <div className="container">
        <h1 className="text-center mb-4">Contact Us</h1>
        
        
        <CoordinatorsList 
          coordinators={coordinators} 
          defaultTab="student" 
        />

      </div>
      <MapEmbed />
      <GeneralInfo />
    </div>
  );
};

export default Contact;