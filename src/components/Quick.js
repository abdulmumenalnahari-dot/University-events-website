// src/components/HomeBegin.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MdEvent } from 'react-icons/md';
import { IoPeopleOutline } from 'react-icons/io5';
import { BiBookOpen } from 'react-icons/bi';
import '../styles/HomeBegin.css';

const HomeBegin = () => {
  // بيانات البطاقات
  const featureCards = [
    {
      icon: <MdEvent size={24} color="#667eea" />,
      title: "Campus Events",
      description: "Discover exciting events, workshops, and activities happening across campus. Never miss out on what matters to you."
    },
    {
      icon: <IoPeopleOutline size={24} color="#bcdbfa" />,
      title: "Student Organizations",
      description: "Join clubs, societies, and organizations that match your interests. Build connections and develop new skills."
    },
    {
      icon: <BiBookOpen size={24} color="#a8e6cf" />,
      title: "Resources & Support",
      description: "Access academic resources, student services, and support systems to help you succeed in your university journey."
    }
  ];

  return (
    <div className="home-begin">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="welcome-badge">
          <span>✨ Welcome to Campus Life</span>
        </div>
        <h1>Welcome to SpringField University Event Hub</h1>
        <p className="subtitle">Stay Updated, Stay Involved!</p>
        <p className="description">
          Your gateway to campus life, events, and community engagement. Discover upcoming events, join student organizations, 
          and stay connected with everything happening at SpringField University.
        </p>

        {/* Features Cards */}
        <div className="features-container">
          {featureCards.map((card, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                {card.icon}
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="cta-buttons">
          <Link to="/events" className="btn-primary">
            Explore Events
          </Link>
          <Link to="/register" className="btn-outline">
            Join Organizations
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomeBegin;