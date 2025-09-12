// src/pages/Feedback.jsx
import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaUsers, FaCalendarAlt, FaStar } from 'react-icons/fa';
import '../styles/Feedback.css';

const userTypes = ['Student', 'Faculty', 'Staff', 'Visitor'];
const events = ['Fall Festival 2024', 'Campus Music Festival', 'Student Organization Fair', 'Academic Conference 2024'];
const ratingLabels = { 1:'Poor', 2:'Fair', 3:'Average', 4:'Good', 5:'Excellent' };
const initForm = { name:'', email:'', userType:'', eventSel:'', comments:'' };

export default function Feedback() {
  const [form, setForm] = useState(initForm);
  const [rating, setRating] = useState(0);

  const isValid =
    form.name.trim().length >= 2 &&
    form.email.trim() !== '' &&
    form.userType &&
    form.eventSel &&
    rating > 0;

  const onChange = (e) => setForm(f => ({ ...f, [e.target.id]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    setForm(initForm);
    setRating(0);
  };

  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <div className="icon-wrapper"><FaUser size={48} color="#667eea" /></div>
        <h1>Event Feedback</h1>
        <p className="subtitle">
          Your feedback helps us improve future events and enhance the campus experience.<br/>
          Share your thoughts about recent events you've attended.
        </p>
      </div>

      <div className="feedback-form">
        <div className="info-box">
          <div className="info-icon"><FaUsers size={16} color="#1976d2" /></div>
          <div>
            <strong>UI Demonstration Form</strong>
            <p>This feedback form is for UI demo only. Submissions are not stored.</p>
          </div>
        </div>

        <form onSubmit={submit} noValidate>
          <div className="form-group">
            <label htmlFor="name"><FaUser size={16} color="#667eea" /><span> Full Name *</span></label>
            <input id="name" type="text" placeholder="Enter your full name" value={form.name} onChange={onChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="email"><FaEnvelope size={16} color="#667eea" /><span> Email Address *</span></label>
            <input id="email" type="email" placeholder="Enter your email address" value={form.email} onChange={onChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="userType"><FaUsers size={16} color="#667eea" /><span> User Type *</span></label>
            <select id="userType" className="form-select" value={form.userType} onChange={onChange} required>
              <option value="">Select your role</option>
              {userTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="eventSel"><FaCalendarAlt size={16} color="#667eea" /><span> Event Attended *</span></label>
            <select id="eventSel" className="form-select" value={form.eventSel} onChange={onChange} required>
              <option value="">Select an event from the past month</option>
              {events.map(ev => <option key={ev} value={ev}>{ev}</option>)}
            </select>
            <small className="form-note">* Limited to events from the past month only</small>
          </div>

          <div className="form-group">
            <label><FaStar size={16} color="#667eea" /><span> Event Rating *</span></label>
            <div className="rating-stars" role="radiogroup" aria-label="Event rating">
              {[1,2,3,4,5].map(star => (
                <button
                  key={star}
                  type="button"
                  className={`star-icon ${star <= rating ? 'filled' : ''}`}
                  aria-label={`${star} / 5`}
                  aria-checked={rating === star}
                  role="radio"
                  onClick={() => setRating(star)}
                >
                  <FaStar size={24} />
                </button>
              ))}
            </div>
            <div className="rating-legend">
              <span className="rating-text">{rating ? `Your rating: ${ratingLabels[rating]} (${rating}/5)` : 'Choose a rating'}</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="comments"><span>Additional Comments & Suggestions</span></label>
            <textarea id="comments" rows={5} placeholder="Share any comments..." value={form.comments} onChange={onChange}></textarea>
            <small className="form-note">Optional</small>
          </div>

          <button type="submit" className={`submit-btn ${isValid ? 'active' : ''}`} disabled={!isValid}>
            <FaUser size={16} color="#fff" /><span>Submit Feedback</span>
          </button>
        </form>
      </div>
    </div>
  );
}
