// src/components/EventCarousel.js
import React, { useState, useRef, useEffect } from "react";
import EventCard from "./EventCard";

const EventCarousel = ({ events = [], title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const getCardsPerView = () => {
    if (window.innerWidth < 576) return 1;
    if (window.innerWidth < 768) return 2;
    return 3;
  };
  const [cardsPerView, setCardsPerView] = useState(getCardsPerView());

  useEffect(() => {
    const handleResize = () => setCardsPerView(getCardsPerView());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalCards = events.length;
  const maxIndex = Math.max(0, totalCards - cardsPerView);
  const showNav = totalCards > cardsPerView;

  // أعِد ضبط المؤشر عند تغيّر القائمة
  useEffect(() => {
    setCurrentIndex(0);
  }, [totalCards]);

  // تأكد أن المؤشر داخل الحدود عند تغيّر العرض
  useEffect(() => {
    if (currentIndex > maxIndex) setCurrentIndex(maxIndex);
  }, [cardsPerView, maxIndex, currentIndex]);

  const handleTouchStart = (e) => (touchStartX.current = e.targetTouches[0].clientX);
  const handleTouchMove = (e) => (touchEndX.current = e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStartX.current == null || touchEndX.current == null) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (diff > threshold && currentIndex < maxIndex) setCurrentIndex((p) => Math.min(p + 1, maxIndex));
    else if (diff < -threshold && currentIndex > 0) setCurrentIndex((p) => Math.max(p - 1, 0));
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handlePrev = () => currentIndex > 0 && setCurrentIndex((p) => Math.max(p - 1, 0));
  const handleNext = () => currentIndex < maxIndex && setCurrentIndex((p) => Math.min(p + 1, maxIndex));

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  useEffect(() => {
    if (!carouselRef.current) return;
    const cardWidth = window.innerWidth < 576 ? 280 : window.innerWidth < 768 ? 320 : 350;
    const gap = 16;
    carouselRef.current.scrollTo({ left: currentIndex * (cardWidth + gap), behavior: "smooth" });
  }, [currentIndex, cardsPerView]);

  const cardWidthPx = window.innerWidth < 576 ? "280px" : window.innerWidth < 768 ? "320px" : "350px";

  if (!totalCards) return null;

  return (
    <div className="container my-4 my-md-5">
      <h2 className="text-center mb-4 mb-md-5 fw-bold text-primary px-3">{title}</h2>

      <div
        className="position-relative d-flex justify-content-center align-items-center flex-column flex-md-row gap-4"
        role="region"
        aria-label={`Carousel for ${title}`}
        onKeyDown={onKeyDown}
        tabIndex={0}
      >
        {showNav && (
          <button
            className="btn btn-outline-secondary rounded-circle p-2 p-md-3 shadow-sm position-absolute top-50 start-0 translate-middle-y d-none d-md-flex z-2"
            style={{ width: "40px", height: "40px", fontSize: "1rem", marginLeft: "-10px" }}
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous"
          >
            <i className="bi bi-chevron-left" />
          </button>
        )}

        <div
          ref={carouselRef}
          className="d-flex gap-3 gap-md-4 pb-3 pb-md-4 overflow-x-auto hide-scrollbar px-2 px-md-0"
          style={{
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingTop: "10px",
            paddingBottom: "20px",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          aria-live="polite"
        >
          {events.slice(currentIndex, currentIndex + cardsPerView).map((event) => (
            <div key={event.id} className="flex-shrink-0" style={{ width: cardWidthPx }}>
              <EventCard event={event} />
            </div>
          ))}
        </div>

        {showNav && (
          <button
            className="btn btn-outline-secondary rounded-circle p-2 p-md-3 shadow-sm position-absolute top-50 end-0 translate-middle-y d-none d-md-flex z-2"
            style={{ width: "40px", height: "40px", fontSize: "1rem", marginRight: "-10px" }}
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            aria-label="Next"
          >
            <i className="bi bi-chevron-right" />
          </button>
        )}
      </div>

      {/* أزرار للشاشات الصغيرة */}
      {showNav && (
        <div className="d-flex justify-content-center gap-2 mt-3 d-md-none">
          <button className="btn btn-sm btn-outline-secondary rounded-circle px-2 py-1" onClick={handlePrev} disabled={currentIndex === 0}>
            <i className="bi bi-chevron-left"></i>
          </button>
          <button className="btn btn-sm btn-outline-secondary rounded-circle px-2 py-1" onClick={handleNext} disabled={currentIndex >= maxIndex}>
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      )}

      {/* نقاط التقدم */}
      {showNav && (
        <div className="d-flex justify-content-center mt-3 d-md-none">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <span
              key={i}
              className={`mx-1 rounded-circle ${i === currentIndex ? "bg-primary" : "bg-light"}`}
              style={{ width: "8px", height: "8px", display: "inline-block", cursor: "pointer" }}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventCarousel;
