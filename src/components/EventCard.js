import React from "react";

const EventCard = ({ event }) => {
  return (
    <div
      className="card border-0 shadow-sm rounded-4 overflow-hidden flex-shrink-0"
      style={{ minWidth: "300px", maxWidth: "350px" }}
    >
      <div className="position-relative">
        <img
          src={event.image}
          alt={event.title}
          className="card-img-top w-100"
          style={{ height: "180px", objectFit: "cover", borderRadius: "8px 8px 0 0" }}
        />
        <span className="position-absolute top-0 end-0 m-2 bg-warning text-dark p-1 rounded-2 fs-6 fw-bold">
          ★
        </span>
      </div>

      <div className="card-body p-3">
        <h5 className="card-title mb-2 fw-bold text-truncate" style={{ fontSize: "1rem" }}>
          {event.title}
        </h5>

        <div className="d-flex align-items-center mb-2 text-muted small">
          <i className="bi bi-calendar me-1"></i>
          <span>{event.date}</span>
          <i className="bi bi-clock ms-2 me-1"></i>
          <span>{event.time}</span>
          <i className="bi bi-geo-alt ms-2 me-1"></i>
          <span>{event.location}</span>
        </div>

        <div className="mb-2">
          <span className="badge bg-primary rounded-pill px-2 py-1 text-white text-truncate" style={{ fontSize: "0.75rem" }}>
            {event.countdown}
          </span>
        </div>

        <p className="card-text text-muted small mb-3 text-truncate" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {event.description}
        </p>

        <div className="d-flex flex-wrap gap-1 mb-3">
          {event.tags.map((tag, i) => (
            <span key={i} className="badge bg-secondary text-white rounded-pill px-2 py-1 text-truncate" style={{ fontSize: "0.7rem" }}>
              {tag}
            </span>
          ))}
          <span className="badge bg-light text-dark rounded-pill px-2 py-1 d-flex align-items-center">
            <i className="bi bi-hand-thumbs-up me-1"></i>
            {event.likes}
          </span>
        </div>

        <button className="btn btn-outline-primary w-100 rounded-3">
          {event.buttonText} →
        </button>
      </div>
    </div>
  );
};

export default EventCard;