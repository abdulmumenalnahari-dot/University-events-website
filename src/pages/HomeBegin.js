import React from 'react';
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="#667eea" strokeWidth="2"/>
                <path d="M7 12H17M7 16H17" stroke="#667eea" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 8V12" stroke="#667eea" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Campus Events</h3>
            <p>Discover exciting events, workshops, and activities happening across campus. Never miss out on what matters to you.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21V19C17 16.7909 15.2091 15 13 15H11C8.79086 15 7 16.7909 7 19V21" stroke="#bcdbfa" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#bcdbfa" strokeWidth="2"/>
              </svg>
            </div>
            <h3>Student Organizations</h3>
            <p>Join clubs, societies, and organizations that match your interests. Build connections and develop new skills.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5L19 12L12 19L5 12L12 5Z" stroke="#a8e6cf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 5V19" stroke="#a8e6cf" strokeWidth="2" strokeLinecap="round"/>
                <path d="M5 12H19" stroke="#a8e6cf" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Resources & Support</h3>
            <p>Access academic resources, student services, and support systems to help you succeed in your university journey.</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="cta-buttons">
          <button className="btn-primary">Explore Events</button>
          <button className="btn-outline">Join Organizations</button>
        </div>
      </section>
    </div>
  );
};

export default HomeBegin;