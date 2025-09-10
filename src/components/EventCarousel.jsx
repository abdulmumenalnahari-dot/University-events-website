import React, { useState } from "react";
import EventCard from "./EventCard";

const EventCarousel = ({ events, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 3;

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(events.length - cardsPerView, prev + 1));
  };

  const visibleEvents = events.slice(currentIndex, currentIndex + cardsPerView);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-5 fw-bold text-primary">{title}</h2>

      <div className="d-flex justify-content-center align-items-center flex-column flex-md-row gap-4 position-relative">
        
        {/* زر Prev */}
        <button
          className="btn btn-outline-secondary rounded-circle p-3 shadow-sm"
          style={{ width: "60px", height: "60px", fontSize: "1.4rem", transition: "transform 0.2s" }}
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="Previous"
        >
          <i className="bi bi-chevron-left"></i>
        </button>

        {/* كرتات الكارديا - ثابتة الحجم */}
        <div className="d-flex gap-4 overflow-x-auto pb-3 flex-shrink-1" style={{ flexGrow: 1 }}>
          {visibleEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* زر Next */}
        <button
          className="btn btn-outline-secondary rounded-circle p-3 shadow-sm"
          style={{ width: "60px", height: "60px", fontSize: "1.4rem", transition: "transform 0.2s" }}
          onClick={handleNext}
          disabled={currentIndex >= events.length - cardsPerView}
          aria-label="Next"
        >
          <i className="bi bi-chevron-right"></i>
        </button>

      </div>
    </div>
  );
};

export default EventCarousel;