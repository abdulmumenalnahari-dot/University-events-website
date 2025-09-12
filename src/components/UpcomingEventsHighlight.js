// src/components/UpcomingEventsHighlight.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/UpcomingEventsHighlight.css"; // يمكنك إنشاء هذا الملف للتنسيق

const UpcomingEventsHighlight = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 useEffect(() => {
  const loadEvents = async () => {
    try {
      const response = await fetch("/data/events.json"); // ملف يحتوي على جميع الأحداث
      if (!response.ok) throw new Error("Failed to fetch events");
      
      let events = await response.json();
      
      // تصفية الأحداث القادمة
      const now = new Date();
      events = events.filter(event => new Date(event.date) >= now);
      
      // ترتيب حسب التاريخ
      events.sort((a, b) => new Date(a.date) - new Date(b.date));
      
      // أخذ أول 3 أحداث
      setUpcomingEvents(events.slice(0, 3));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  loadEvents();
}, []);

  if (loading) return <div className="text-center my-4">Loading upcoming events...</div>;
  if (error) return <div className="alert alert-danger text-center my-4">Error: {error}</div>;
  if (upcomingEvents.length === 0) return null; // لا تظهر القسم إذا لم توجد أحداث

  return (
    <section className="upcoming-events-section my-5">
      <div className="container">
        <h2 className="text-center mb-4">Upcoming Events</h2>
        <div className="row g-4">
          {upcomingEvents.map((event) => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={event.id}>
              <div className="card h-100 shadow-sm">
                {event.image && (
                  <img
                    src={event.image}
                    className="card-img-top"
                    alt={event.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text text-muted">
                    <i className="bi bi-calendar-event"></i> {event.date} | <i className="bi bi-clock"></i> {event.time}
                  </p>
                  <p className="card-text flex-grow-1">{event.description.substring(0, 100)}...</p>
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