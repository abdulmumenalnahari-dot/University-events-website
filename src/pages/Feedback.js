// src/pages/Feedback.jsx
import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaUsers, FaCalendarAlt, FaStar } from 'react-icons/fa';
import '../styles/Feedback.css';

const Feedback = () => {
  const userTypes = ['Student', 'Faculty', 'Staff', 'Visitor'];
  const events = ['Fall Festival 2024', 'Campus Music Festival', 'Student Organization Fair', 'Academic Conference 2024'];

  // حالة الحقول
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userType: '',
    event: '',
    rating: 0,
    comments: ''
  });

  // تحديث التقييم عند النقر على النجوم
  const handleRating = (value) => {
    setFormData(prev => ({ ...prev, rating: value }));
  };

  // التحقق من إذا كانت جميع الحقول ممتلئة
  const isFormComplete = formData.name && formData.email && formData.userType && formData.event && formData.rating > 0;

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
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
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
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="form-input"
            />
          </div>

          {/* User Type */}
          <div className="form-group">
            <label htmlFor="userType">
              <FaUsers size={16} color="#667eea" />
              <span> User Type *</span>
            </label>
            <select
              id="userType"
              value={formData.userType}
              onChange={(e) => setFormData(prev => ({ ...prev, userType: e.target.value }))}
              className="form-select"
            >
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
            <select
              id="event"
              value={formData.event}
              onChange={(e) => setFormData(prev => ({ ...prev, event: e.target.value }))}
              className="form-select"
            >
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
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRating(star)}
                  className={`star-icon ${formData.rating >= star ? 'active' : ''}`}
                  aria-label={`Rate ${star}`}
                >
                  <FaStar size={24} color={formData.rating >= star ? '#ffd700' : '#ccc'} />
                </button>
              ))}
            </div>

            {/* نصوص توضيحية حسب التقييم */}
            <div className="rating-legend">
              {formData.rating === 1 && <small className="rating-text">Poor - Needs significant improvement</small>}
              {formData.rating === 2 && <small className="rating-text">Below Average - Some areas need work</small>}
              {formData.rating === 3 && <small className="rating-text">Average - Decent experience</small>}
              {formData.rating === 4 && <small className="rating-text">Good - Well organized and enjoyable</small>}
              {formData.rating === 5 && <small className="rating-text">Excellent - Outstanding experience!</small>}
            </div>
          </div>

          {/* Comments */}
          <div className="form-group">
            <label htmlFor="comments">
              <span>Additional Comments & Suggestions</span>
            </label>
            <textarea
              id="comments"
              placeholder="Please share your detailed feedback, suggestions for improvement, or any additional remarks about the event..."
              value={formData.comments}
              onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
              rows={5}
              className="form-textarea"
            ></textarea>
            <small className="form-note">Optional: Share your thoughts, suggestions, or any specific aspects you'd like to highlight</small>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`submit-btn ${isFormComplete ? 'active' : ''}`}
            disabled={!isFormComplete}
          >
            <FaUser size={16} color="#fff" />
            <span>Submit Feedback</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;