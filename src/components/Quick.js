 HEAD

    
 bc4f49c7449d13330fef415ff209919cb703d591
import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUsers, FaImages, FaEnvelope } from 'react-icons/fa';
import '../styles/Quick.css';
import { PATHS } from '../routes';

const Quick = () => {
  const quickItems = [
    {
      title: 'Event Calendar',
      description: 'View all upcoming events and important dates',
      icon: <FaCalendarAlt size={20} color="#1976d2" />,
      link:  PATHS.EVENTS
    },
    {
      title: 'Registration',
      description: 'Register for events and join activities',
      icon: <FaUsers size={20} color="#7b1fa2" />,
      link: PATHS.FEEDBACK
    },
    {
      title: 'Gallery',
      description: 'Browse photos from past events and activities',
      icon: <FaImages size={20} color="#2e7d32" />,
      link:  PATHS.GALLERY
    },
    {
      title: 'Contact Us',
      description: 'Get in touch with event organizers',
      icon: <FaEnvelope size={20} color="#d84315" />,
      link:  PATHS.CONTACT
    }
  ];


  return (
    <div className="quick-access-container">
      <h2 className="text-center mb-4">Quick Access</h2>
      <div className="row g-4">
        {quickItems.map((item, index) => (
          <div key={index} className="col-lg-3 col-md-6 col-sm-12">
            <Link to={item.link} className="quick-card-link">
              <div className={`quick-card ${index === 0 ? 'bg-light-blue' : 
                              index === 1 ? 'bg-light-purple' : 
                              index === 2 ? 'bg-light-green' : 'bg-light-orange'}`}>
                <div className="icon-wrapper">
                  {item.icon}
                </div>
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quick;