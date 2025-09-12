import React, { useState, useRef, useEffect } from "react";
import EventCard from "./EventCard";

const EventCarousel = ({ events = [], title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(getCardsPerView());
  const carouselRef = useRef(null);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const gap = 16;

  function getCardsPerView() {
    const w = window.innerWidth;
    if (w < 576) return 1;
    if (w < 768) return 2;
    return 3;
  }

  const getCardWidth = () => {
    const w = window.innerWidth;
    if (w < 576) return 280;
    if (w < 768) return 320;
    return 300;
  };

  useEffect(() => {
    const onResize = () => setCardsPerView(getCardsPerView());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const totalCards = events.length;
  const maxIndex = Math.max(0, totalCards - cardsPerView);

  useEffect(() => {
    if (currentIndex > maxIndex) setCurrentIndex(maxIndex);
  }, [cardsPerView, totalCards, maxIndex, currentIndex]);

  useEffect(() => {
    if (!carouselRef.current) return;
    const step = getCardWidth() + gap;
    carouselRef.current.scrollTo({ left: currentIndex * step, behavior: "smooth" });
  }, [currentIndex, cardsPerView]);

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

  const onMouseDown = (e) => {
    if (!carouselRef.current) return;
    isDragging.current = true;
    startX.current = e.clientX;
    startScrollLeft.current = carouselRef.current.scrollLeft;
    carouselRef.current.style.cursor = "grabbing";
  };

  const onMouseMove = (e) => {
    if (!isDragging.current || !carouselRef.current) return;
    e.preventDefault();
    const dx = e.clientX - startX.current;
    carouselRef.current.scrollLeft = startScrollLeft.current - dx;
  };

  const snapToNearest = () => {
    if (!carouselRef.current) return;
    const step = getCardWidth() + gap;
    const idx = Math.round(carouselRef.current.scrollLeft / step);
    setCurrentIndex(Math.max(0, Math.min(idx, maxIndex)));
  };

  const onMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    carouselRef.current.style.cursor = "grab";
    snapToNearest();
  };

  const onMouseLeave = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    carouselRef.current.style.cursor = "grab";
    snapToNearest();
  };

  const handlePrev = () => currentIndex > 0 && setCurrentIndex((p) => Math.max(p - 1, 0));
  const handleNext = () => currentIndex < maxIndex && setCurrentIndex((p) => Math.min(p + 1, maxIndex));

  if (!totalCards) return null;

  return (
    <div className="container my-4 my-md-5">
      <h2 className="text-center mb-4 mb-md-5 fw-bold text-primary px-3">{title}</h2>

      <div className="position-relative d-flex justify-content-center align-items-center flex-column flex-md-row gap-4">
        {totalCards > cardsPerView && (
          <button
            className="btn btn-outline-secondary rounded-circle p-2 p-md-3 shadow-sm position-absolute top-50 start-0 translate-middle-y d-none d-md-flex z-2"
            style={{ width: 40, height: 40, fontSize: "1rem", marginLeft: -10 }}
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous"
          >
            <i className="bi bi-chevron-left" />
          </button>
        )}

        <div
          ref={carouselRef}
          className="d-flex gap-3 gap-md-4 pb-3 pb-md-4 px-2 px-md-0"
          style={{
            overflowX: "auto",
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingTop: 10,
            paddingBottom: 20,
            cursor: "grab",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
        >
          {events.map((event) => (
            <div key={event.id} className="flex-shrink-0" style={{ width: `${getCardWidth()}px` }}>
              <div onDragStart={(e) => e.preventDefault()}>
                <EventCard event={event} />
              </div>
            </div>
          ))}
        </div>

        {totalCards > cardsPerView && (
          <button
            className="btn btn-outline-secondary rounded-circle p-2 p-md-3 shadow-sm position-absolute top-50 end-0 translate-middle-y d-none d-md-flex z-2"
            style={{ width: 40, height: 40, fontSize: "1rem", marginRight: -10 }}
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            aria-label="Next"
          >
            <i className="bi bi-chevron-right" />
          </button>
        )}
      </div>

      {totalCards > cardsPerView && (
        <div className="d-flex justify-content-center mt-3 d-md-none">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <span
              key={i}
              className={`mx-1 rounded-circle ${i === currentIndex ? "bg-primary" : "bg-light"}`}
              style={{ width: 8, height: 8, display: "inline-block", cursor: "pointer" }}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventCarousel;
