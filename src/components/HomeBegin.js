// src/components/HomeBegin.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // ✅ إضافة Link
import '../styles/HomeBegin.css';

const HomeBegin = () => {
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
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-calendar-alt" style={{ color: '#667eea' }}></i>
            </div>
             
            <h3>Campus Events</h3>
            
            <p>Discover exciting events, workshops, and activities happening across campus. Never miss out on what matters to you.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-users" style={{ color: '#bcdbfa' }}></i>
            </div>
            <h3>Student Organizations</h3>
            <p>Join clubs, societies, and organizations that match your interests. Build connections and develop new skills.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-book" style={{ color: '#a8e6cf' }}></i>
            </div>
            <h3>Resources & Support</h3>
            <p>Access academic resources, student services, and support systems to help you succeed in your university journey.</p>
          </div>

          
        </div>

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