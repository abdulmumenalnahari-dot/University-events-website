import React, { useState, useRef, useEffect } from "react";
import EventCard from "./EventCard";

const EventCarousel = ({ events, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // ✅ حساب عدد الكروت المعروضة حسب حجم الشاشة
  const getCardsPerView = () => {
    if (window.innerWidth < 576) return 1; // xs
    if (window.innerWidth < 768) return 2; // sm
    return 3; // md وأكبر
  };

  const [cardsPerView, setCardsPerView] = useState(getCardsPerView());

  // ✅ تحديث عند تغيير حجم الشاشة
  useEffect(() => {
    const handleResize = () => setCardsPerView(getCardsPerView());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalCards = events.length;
  const maxIndex = Math.max(0, totalCards - cardsPerView);

  // ✅ التحكم بالسحب (Touch Swipe)
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (diff > threshold && currentIndex < maxIndex) {
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    } else if (diff < -threshold && currentIndex > 0) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // ✅ التحكم بالأزرار
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    }
  };

  // ✅ التمرير السلس عند تغيير currentIndex
  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = window.innerWidth < 576 ? 280 : window.innerWidth < 768 ? 320 : 350;
      const gap = 16;
      const scrollOffset = currentIndex * (cardWidth + gap);
      carouselRef.current.scrollTo({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  }, [currentIndex, cardsPerView]);

  return (
    <div className="container my-4 my-md-5">
      <h2 className="text-center mb-4 mb-md-5 fw-bold text-primary px-3">{title}</h2>

      <div className="position-relative">
        {/* زر السابق — يظهر فقط على الشاشات المتوسطة+ */}
        <button
          className="btn btn-outline-secondary rounded-circle p-2 p-md-3 shadow-sm position-absolute top-50 start-0 translate-middle-y d-none d-md-flex z-2"
          style={{
            width: "40px",
            height: "40px",
            fontSize: "1rem",
            marginLeft: "-10px",
          }}
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="Previous"
        >
          <i className="bi bi-chevron-left"></i>
        </button>

        {/* كروت الكاروسيل */}
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
        >
          {events.map((event) => (
            <div
              key={event.id}
              className="flex-shrink-0"
              style={{
                width: window.innerWidth < 576 ? "280px" : window.innerWidth < 768 ? "320px" : "350px",
              }}
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>

        {/* زر التالي — يظهر فقط على الشاشات المتوسطة+ */}
        <button
          className="btn btn-outline-secondary rounded-circle p-2 p-md-3 shadow-sm position-absolute top-50 end-0 translate-middle-y d-none d-md-flex z-2"
          style={{
            width: "40px",
            height: "40px",
            fontSize: "1rem",
            marginRight: "-10px",
          }}
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
          aria-label="Next"
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>

      {/* أزرار التنقل للشاشات الصغيرة */}
      <div className="d-flex justify-content-center gap-2 mt-3 d-md-none">
        <button
          className="btn btn-sm btn-outline-secondary rounded-circle px-2 py-1"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        <button
          className="btn btn-sm btn-outline-secondary rounded-circle px-2 py-1"
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>

      {/* نقاط التقدم (اختياري) */}
      {totalCards > cardsPerView && (
        <div className="d-flex justify-content-center mt-3 d-md-none">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <span
              key={i}
              className={`mx-1 rounded-circle ${i === currentIndex ? "bg-primary" : "bg-light"}`}
              style={{
                width: "8px",
                height: "8px",
                display: "inline-block",
                cursor: "pointer",
              }}
              onClick={() => setCurrentIndex(i)}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventCarousel;