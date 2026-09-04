import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Registration.css";

const initialForm = {
  name: "",
  email: "",
  organization: "",
  interests: "",
};

export default function Register() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setForm(initialForm);
  };

  return (
    <div className="registration-container">
      <section className="registration-card" aria-labelledby="registration-title">
        <header className="registration-header">
          <h1 id="registration-title" className="registration-title">
            Join University Events
          </h1>
          <p className="registration-subtitle">
            Register your interest to receive updates about upcoming activities.
          </p>
        </header>

        {submitted && (
          <div className="alert alert-success" role="status">
            Thank you. Your registration has been received.
          </div>
        )}

        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="registration-name">Full name</label>
            <input
              id="registration-name"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="registration-email">Email address</label>
            <input
              id="registration-email"
              name="email"
              type="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="registration-organization">Organization or role</label>
            <input
              id="registration-organization"
              name="organization"
              className="form-control"
              value={form.organization}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="registration-interests">Event interests</label>
            <textarea
              id="registration-interests"
              name="interests"
              className="form-control"
              rows="4"
              value={form.interests}
              onChange={handleChange}
              placeholder="Tell us which activities interest you"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Submit registration
          </button>
        </form>

        <footer className="registration-footer">
          <Link to="/events">Browse upcoming events</Link>
        </footer>
      </section>
    </div>
  );
}
