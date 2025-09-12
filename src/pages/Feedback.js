// src/pages/Feedback.jsx
import React from 'react';
import { FaUser, FaEnvelope, FaUsers, FaCalendarAlt, FaStar } from 'react-icons/fa';
import '../styles/Feedback.css';

const Feedback = () => {
  const userTypes = [
    'Student',
    'Faculty',
    'Staff',
    'Visitor'
  ];

  const events = [
    'Fall Festival 2024',
    'Campus Music Festival',
    'Student Organization Fair',
    'Academic Conference 2024'
  ];

  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <div className="icon-wrapper">
          <FaUser size={48} color="#667eea" />
        </div>
        <h1>Event Feedback</h1>
        <p className="subtitle">
          Your feedback helps us improve future events and enhance the campus experience.<br />
          Share your thoughts about recent events you've attended.
        </p>
      </div>

      <div className="feedback-form">
        {/* Disclaimer */}
        <div className="info-box">
          <div className="info-icon">
            <FaUsers size={16} color="#1976d2" />
          </div>
          <div>
            <strong>UI Demonstration Form</strong>
            <p>This feedback form is designed for user interface demonstration purposes. Form submissions are not processed or stored in any database.</p>
          </div>
        </div>

        <form>
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="name">
              <FaUser size={16} color="#667eea" />
              <span> Full Name *</span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              className="form-input"
            />
          </div>

          {/* Email Address */}
          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope size={16} color="#667eea" />
              <span> Email Address *</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              className="form-input"
            />
          </div>

          {/* User Type */}
          <div className="form-group">
            <label htmlFor="userType">
              <FaUsers size={16} color="#667eea" />
              <span> User Type *</span>
            </label>
            <select id="userType" className="form-select">
              <option value="">Select your role</option>
              {userTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Event Attended */}
          <div className="form-group">
            <label htmlFor="event">
              <FaCalendarAlt size={16} color="#667eea" />
              <span> Event Attended *</span>
            </label>
            <select id="event" className="form-select">
              <option value="">Select an event from the past month</option>
              {events.map(event => (
                <option key={event} value={event}>{event}</option>
              ))}
            </select>
            <small className="form-note">* Limited to events from the past month only</small>
          </div>

          {/* Event Rating */}
          <div className="form-group">
            <label>
              <FaStar size={16} color="#667eea" />
              <span> Event Rating *</span>
            </label>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map(star => (
                <FaStar
                  key={star}
                  size={24}
                  color="#ccc"
                  className="star-icon"
                />
              ))}
            </div>
            <small className="form-note">Rate your overall experience with the event (1 = Poor, 5 = Excellent)</small>
          </div>

          {/* Comments */}
          <div className="form-group">
            <label htmlFor="comments">
              <span>Additional Comments & Suggestions</span>
            </label>
            <textarea
              id="comments"
              placeholder="Please share your detailed feedback, suggestions for improvement, or any additional remarks about the event..."
              rows={5}
              className="form-textarea"
            ></textarea>
            <small className="form-note">Optional: Share your thoughts, suggestions, or any specific aspects you'd like to highlight</small>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">
            <FaUser size={16} color="#fff" />
            <span>Submit Feedback</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;