 import React from "react";

const GalleryCard = ({ event }) => {
   return (
    <div className="gallery-card h-100 shadow-sm border rounded overflow-hidden">
      <img
        src={event.image}
        alt={event.title}
        className="gallery-image w-100"
        style={{ height: "200px", objectFit: "cover" }}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
        }}
      />
      <div className="p-2 p-md-3 d-flex flex-column h-100">
        <div className="d-flex justify-content-between align-items-start mb-1">
          <span className="badge bg-secondary bg-opacity-10 text-secondary fs-7">
            {event.category}
          </span>
          <span className="text-muted small">{event.year}</span>
        </div>
        <h5 className="card-title fs-6 fw-bold mb-1">{event.title}</h5>
        <p className="card-text text-muted small flex-grow-1">
          {event.description?.substring(0, 80)}{event.description?.length > 80 ? '...' : ''}
        </p>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <small className="text-muted">
            <i className="bi bi-calendar-event me-1"></i>
            {event.date}
          </small>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
