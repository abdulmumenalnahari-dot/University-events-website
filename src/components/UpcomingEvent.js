// src/components/UpcomingEventsHighlight.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/UpcomingEventsHighlight.css";

const UpcomingEventsHighlight = () => {
  const [eventsToShow, setEventsToShow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetch("/data/events.json");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("The response from the server is not valid JSON.");
        }

        let events = await response.json();

        const now = new Date();

        events.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          const diffA = Math.abs(now - dateA);
          const diffB = Math.abs(now - dateB);
          return diffA - diffB;
        });

        const closestThreeEvents = events.slice(0, 3);
        setEventsToShow(closestThreeEvents);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (loading) return <div className="text-center my-4">Loading events...</div>;
  if (error) return <div className="alert alert-danger text-center my-4">Error: {error}</div>;
  if (eventsToShow.length === 0) {
    return (
      <section className="upcoming-events-section my-5">
        <div className="container">
          <div className="text-center my-4">No events available at the moment.</div>
        </div>
      </section>
    );
  }

  return (
    <section className="upcoming-events-section my-5">
      <div className="container">
        <h2 className="text-center mb-4">Recent & Upcoming Events</h2>
        <div className="row g-4">
          {eventsToShow.map((event) => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={event.id}>
              <div className="card h-100 shadow-sm">
                {event.image && (
                  <img
                    src={event.image}
                    className="card-img-top"
                    alt={event.title}
                    style={{ height: "200px", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
                    }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text text-muted small">
                    <i className="bi bi-calendar-event"></i> {event.date} | <i className="bi bi-clock"></i> {event.time}
                  </p>
                  <p className="card-text flex-grow-1">
                    {event.description.length > 100
                      ? `${event.description.substring(0, 100)}...`
                      : event.description}
                  </p>
                  <Link to={`/events/${event.id}`} className="btn btn-primary mt-auto">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link to="/events" className="btn btn-outline-primary">
            View All Events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsHighlight;