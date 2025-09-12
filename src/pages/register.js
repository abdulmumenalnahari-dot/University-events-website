// src/pages/Registration.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // لربط مع صفحة أخرى إذا لزم
import '../styles/Registration.css'; // ملف التنسيق (سننشئه لاحقاً)

const Registration = () => {
  return (
    <div className="registration-container">
      <div className="registration-card">
        <div className="registration-header">
          <h1 className="registration-title">Register for CampusConnect</h1>
          <p className="registration-subtitle">
            Join our community to stay updated on events and opportunities.
          </p>
        </div>

        <form className="registration-form">
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              className="form-control"
              // onChange, value, etc. for functionality can be added later if needed for demo
            />
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="form-control"
            />
          </div>

          {/* User Type Field */}
          <div className="form-group">
            <label htmlFor="userType">I am a...</label>
            <select id="userType" name="userType" className="form-control">
              <option value="">Select your role</option>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="staff">Staff</option>
              <option value="alumni">Alumni</option>
              <option value="guest">Guest</option>
            </select>
          </div>

          {/* Event Interest (Optional/Example) */}
          <div className="form-group">
            <label htmlFor="eventInterest">Event Category of Interest</label>
            <select id="eventInterest" name="eventInterest" className="form-control">
              <option value="">Select a category (Optional)</option>
              <option value="academic">Academic</option>
              <option value="cultural">Cultural</option>
              <option value="sports">Sports</option>
              <option value="departmental">Departmental</option>
            </select>
          </div>
 
          <button type="button" className="btn btn-primary btn-block" onClick={() => alert('This is a UI demonstration. Form submission is not functional.')}>
            Register Now
          </button>
        </form>

        <div className="registration-footer">
         
        </div>
      </div>
    </div>
  );
};

export default Registration;