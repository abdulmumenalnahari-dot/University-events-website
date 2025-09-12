import React, { useState } from "react";
import "../styles/about.css";

const Kalendr = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const eventsInMonth = events.filter((e) => e.month === currentMonth);

  const dayEvents = {};
  eventsInMonth.forEach((e) => {
    if (!dayEvents[e.day]) dayEvents[e.day] = [];
    dayEvents[e.day].push(e);
  });

  const firstDay = new Date(currentMonth + "-01");
  const startDay = firstDay.getDay(); // 0 = Sunday
  const daysInMonth = getDaysInMonth(
    firstDay.getFullYear(),
    firstDay.getMonth()
  );

  const calendarRows = [];
  let week = [];

  for (let i = 0; i < startDay; i++) {
    week.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    week.push(d);
    if (week.length === 7) {
      calendarRows.push([...week]);
      week = [];
    }
  }

  while (week.length < 7) {
    week.push(null);
  }
  calendarRows.push(week);

  const getCategoryColor = (category) => {
    switch (category) {
      case "Academic":
        return "#0d6efd";
      case "Conference":
        return "#6f42c1";
      case "Workshop":
        return "#20c997";
      case "Seminar":
        return "#fd7e14";
      case "Education":
        return "#dc3545";
      case "Culture":
        return "#d63384";
      case "School event":
        return "#198754";
      default:
        return "#adb5bd";
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="kalendr-container">
      <div className="kalendr-header">
        <button
          onClick={() => {
            const d = new Date(currentMonth + "-01");
            d.setMonth(d.getMonth() - 1);
            setCurrentMonth(d.toISOString().slice(0, 7));
          }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1.5rem",
          }}
        >
          ‹
        </button>
        <h3>
          {new Date(currentMonth + "-01").toLocaleDateString("en-GB", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <button
          onClick={() => {
            const d = new Date(currentMonth + "-01");
            d.setMonth(d.getMonth() + 1);
            setCurrentMonth(d.toISOString().slice(0, 7));
          }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1.5rem",
          }}
        >
          ›
        </button>
      </div>

      <div className="kalendr-weekdays">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="kalendr-day-header">
            {day}
          </div>
        ))}
      </div>

      <div className="kalendr-grid">
        {calendarRows.map((week, wIdx) => (
          <React.Fragment key={wIdx}>
            {week.map((day, dIdx) => (
              <div
                key={`${wIdx}-${dIdx}`}
                className={`kalendr-day ${!day ? "empty" : ""}`}
              >
                {day && (
                  <>
                    <span className="kalendr-day-number">{day}</span>
                    <div className="kalendr-day-events">
                      {dayEvents[day]?.map((event, idx) => (
                        <div
                          key={idx}
                          className="kalendr-event"
                          style={{
                            backgroundColor: getCategoryColor(event.category),
                            color: "white",
                            fontSize: "0.7rem",
                            padding: "2px 4px",
                            borderRadius: "3px",
                            margin: "1px 0",
                            cursor: "pointer",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                          onClick={() => handleEventClick(event)}
                          title={event.title}
                        >
                          {event.image && (
                            <div
                              style={{
                                width: "12px",
                                height: "12px",
                                borderRadius: "50%",
                                backgroundImage: `url(${event.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                border: "1px solid rgba(255,255,255,0.5)",
                              }}
                            ></div>
                          )}
                          <span>
                            {event.title.substring(0, 15)}
                            {event.title.length > 15 ? "..." : ""}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      {selectedEvent && (
        <div className="kalendr-modal-overlay" onClick={closeModal}>
          <div
            className="kalendr-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="kalendr-modal-close" onClick={closeModal}>
              ×
            </button>
            <h4>{selectedEvent.title}</h4>
            <p>
              <strong>Date:</strong> {selectedEvent.date}
            </p>
            <p>
              <strong>Location:</strong> {selectedEvent.location}
            </p>
            <p>{selectedEvent.description}</p>

            {selectedEvent.image && (
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  marginTop: "12px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              />
            )}

            <a
              href={selectedEvent.url}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-block",
                marginTop: "10px",
                padding: "6px 12px",
                backgroundColor: "#0d6efd",
                color: "white",
                textDecoration: "none",
                borderRadius: "4px",
                fontSize: "0.9rem",
              }}
            >
              View Event Page
            </a>
          </div>
        </div>
      )}

      <div className="kalendr-legend">
        <h6>Event Types</h6>
        {[
          { category: "Academic", color: "#0d6efd" },
          { category: "Conference", color: "#6f42c1" },
          { category: "Workshop", color: "#20c997" },
          { category: "Seminar", color: "#fd7e14" },
          { category: "Education", color: "#dc3545" },
          { category: "Culture", color: "#d63384" },
          { category: "School event", color: "#198754" },
        ].map((item) => (
          <div key={item.category} className="kalendr-legend-item">
            <span
              className="kalendr-legend-color"
              style={{ backgroundColor: item.color }}
            ></span>
            {item.category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kalendr;
