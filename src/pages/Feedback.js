// src/pages/Feedback.jsx
import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaUsers, FaCalendarAlt, FaStar } from 'react-icons/fa';
import '../styles/Feedback.css';

const userTypes = ['Student', 'Faculty', 'Staff', 'Visitor'];
const ratingLabels = { 1:'Poor', 2:'Fair', 3:'Average', 4:'Good', 5:'Excellent' };
const init = { name:'', email:'', userType:'', eventSel:'', comments:'' };

export default function Feedback() {
  const [form, setForm] = useState(init);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [eventOptions, setEventOptions] = useState([]);

  // تحميل أحداث آخر 30 يوم فقط
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/data/events.json', { cache: 'no-store' });
        const data = await res.json();
        const now = new Date();
        const monthAgo = new Date(now);
        monthAgo.setDate(now.getDate() - 30);

        const opts = (Array.isArray(data) ? data : [])
          .filter(ev => {
            const d = new Date(ev.date); // صيغة YYYY-MM-DD
            return !isNaN(d) && d >= monthAgo && d <= now;
          })
          .sort((a,b) => new Date(b.date) - new Date(a.date))
          .map(ev => ev.title);

        setEventOptions(opts);
      } catch {
        setEventOptions([]); // لا شيء
      }
    })();
  }, []);

  const isEmailValid = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((v||'').trim());
  const isValid =
    form.name.trim().length >= 2 &&
    isEmailValid(form.email) &&
    form.userType &&
    form.eventSel &&
    rating > 0;

  const onChange = (e) => setForm(f => ({ ...f, [e.target.id]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    // UI فقط: مسح النموذج
    setForm(init);
    setRating(0);
    setHoverRating(0);
  };

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
        <div className="info-box">
          <div className="info-icon"><FaUsers size={16} color="#1976d2" /></div>
          <div>
            <strong>UI Demonstration Form</strong>
            <p>This feedback form is designed for UI demonstration purposes. Form submissions are not processed or stored.</p>
          </div>
        </div>

        <form onSubmit={submit} noValidate>
          <div className="form-group">
            <label htmlFor="name"><FaUser size={16} color="#667eea" /><span> Full Name *</span></label>
            <input id="name" type="text" placeholder="Enter your full name" value={form.name} onChange={onChange} />
          </div>

          <div className="form-group">
            <label htmlFor="email"><FaEnvelope size={16} color="#667eea" /><span> Email Address *</span></label>
            <input id="email" type="email" placeholder="Enter your email address" value={form.email} onChange={onChange} />
            {!form.email || isEmailValid(form.email) ? null : (
              <small className="form-note" style={{ color: '#c2410c' }}>Please enter a valid email address</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="userType"><FaUsers size={16} color="#667eea" /><span> User Type *</span></label>
            <select id="userType" className="form-select" value={form.userType} onChange={onChange}>
              <option value="">Select your role</option>
              {userTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="eventSel"><FaCalendarAlt size={16} color="#667eea" /><span> Event Attended *</span></label>
            <select
              id="eventSel"
              className="form-select"
              value={form.eventSel}
              onChange={onChange}
            >
              <option value="">
                {eventOptions.length ? 'Select an event from the past month' : 'No events found in the past 30 days'}
              </option>
              {eventOptions.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <small className="form-note">* Limited to events from the past month only</small>
          </div>

          <div className="form-group">
            <label><FaStar size={16} color="#667eea" /><span> Event Rating *</span></label>
            <div className="rating-stars" role="radiogroup" aria-label="Event rating">
              {[1,2,3,4,5].map(star => {
                const filled = star <= (hoverRating || rating);
                const cls = `star-icon ${filled ? 'filled' : ''}`;
                return (
                  <button
                    key={star}
                    type="button"
                    className={cls}
                    aria-label={`${star} / 5`}
                    aria-checked={rating === star}
                    role="radio"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    <FaStar size={24} />
                  </button>
                );
              })}
            </div>
            <div className="rating-legend">
              <span className="rating-text">
                {rating ? `Your rating: ${ratingLabels[rating]} (${rating}/5)` : 'Choose a rating'}
              </span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="comments"><span>Additional Comments & Suggestions</span></label>
            <textarea
              id="comments"
              rows={5}
              placeholder="Share any comments..."
              className="form-textarea"
              value={form.comments}
              onChange={onChange}
            />
            <small className="form-note">Optional</small>
          </div>

          <button type="submit" className={`submit-btn ${isValid ? 'active' : ''}`} disabled={!isValid}>
            <FaUser size={16} color="#fff" />
            <span>Submit Feedback</span>
          </button>
        </form>
      </div>
    </div>
  );
}
