// src/pages/Feedback.jsx
import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaUsers, FaCalendarAlt, FaStar, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import '../styles/Feedback.css';

const userTypes = ['Student', 'Faculty', 'Staff', 'Visitor'];
const ratingLabels = { 1:'Poor', 2:'Fair', 3:'Average', 4:'Good', 5:'Excellent' };
const init = { name:'', email:'', userType:'', eventSel:'', comments:'' };

export default function Feedback() {
  const [form, setForm] = useState(init);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [eventOptions, setEventOptions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Load events from the last 30 days when available.
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/data/Events.json', { cache: 'no-store' });
        const data = await res.json();
        const allEvents = (Array.isArray(data) ? data : []).filter((event) => event.title);
        const now = new Date();
        const monthAgo = new Date(now);
        monthAgo.setDate(now.getDate() - 30);
        const recentEvents = allEvents.filter((event) => {
          const date = new Date(event.date);
          return !Number.isNaN(date.getTime()) && date >= monthAgo && date <= now;
        });
        const sourceEvents = recentEvents.length ? recentEvents : allEvents;
        const opts = sourceEvents
          .sort((first, second) => String(first.title).localeCompare(String(second.title)))
          .map(ev => ev.title);

        setEventOptions(opts);
      } catch {
        setEventOptions([]);
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

  const onChange = (e) => {
    setSubmitted(false);
    setSubmitError('');
    setForm(f => ({ ...f, [e.target.id]: e.target.value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setIsSending(true);
    setSubmitError('');
    const feedback = {
      ...form,
      rating,
      submittedAt: new Date().toISOString(),
    };
    try {
      const response = await fetch('https://formsubmit.co/ajax/anasahmedmohammedkasem@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...feedback,
          _subject: `CampusConnect feedback: ${form.eventSel}`,
          _captcha: 'false',
        }),
      });
      if (!response.ok) throw new Error('Feedback request failed');
      const savedFeedback = JSON.parse(localStorage.getItem('campusconnect-feedback') || '[]');
      localStorage.setItem('campusconnect-feedback', JSON.stringify([...savedFeedback, feedback]));
      setSubmitted(true);
      setForm(init);
      setRating(0);
    } catch {
      setSubmitError('The feedback could not be sent. Check your internet connection and try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <div className="icon-wrapper">
          <FaUser size={48} color="#667eea" />
        </div>
        <span className="feedback-eyebrow">HELP SHAPE THE NEXT EVENT</span>
        <h1>Tell us how it felt.</h1>
        <p className="subtitle">
          Your feedback helps us improve future events and enhance the campus experience.<br />
          Share your thoughts about an event you attended. A few honest words help us make campus life better.
        </p>
      </div>

      <div className="feedback-layout">
      <aside className="feedback-side">
        <span className="feedback-side-number">01</span>
        <h2>Your voice has momentum.</h2>
        <p>Rate the experience, tell us what worked, and help the next event feel even more welcoming.</p>
        <div className="feedback-progress"><span style={{ width: `${[form.name, form.email, form.userType, form.eventSel, rating].filter(Boolean).length * 20}%` }} /></div>
        <small>{[form.name, form.email, form.userType, form.eventSel, rating].filter(Boolean).length} of 5 required fields complete</small>
      </aside>

      <div className="feedback-form">
        {submitted && <div className="feedback-success" role="status"><FaCheckCircle /> Your feedback was sent successfully to the CampusConnect team.</div>}
        {submitError && <div className="feedback-error" role="alert">{submitError}</div>}
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
              <option value="">{eventOptions.length ? 'Choose an event' : 'No events available'}</option>
              {eventOptions.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <small className="form-note">Choose the event you would like to review.</small>
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

          <button type="submit" className={`submit-btn ${isValid && !isSending ? 'active' : ''}`} disabled={!isValid || isSending}>
            <FaPaperPlane size={15} />
            <span>{isSending ? 'Sending...' : 'Submit Feedback'}</span>
          </button>
        </form>
      </div>
      </div>
    </div>
  );
}
