// src/components/BannerSlider.jsx
import React, { useEffect, useState } from "react";
import "../styles/BannerSlider.css";

const BannerSlider = ({ items = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // إعادة ضبط المؤشر إذا تغيّر طول القائمة
  useEffect(() => {
    if (currentIndex >= items.length) setCurrentIndex(0);
  }, [items.length, currentIndex]);

  // تشغيل تلقائي
  useEffect(() => {
    if (items.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [items.length]);

  const goToSlide = (index) => setCurrentIndex(index);
  const prevSlide = () => items.length && setCurrentIndex((p) => (p - 1 + items.length) % items.length);
  const nextSlide = () => items.length && setCurrentIndex((p) => (p + 1) % items.length);

  if (!items.length) return <div className="no-banners">No banners available</div>;

  const currentBanner = items[currentIndex];

  return (
    <div className="banner-slider-container">
      {/* نص ترحيبي أعلى السلايدر */}
    
      <h1>Welcome to SpringField University Event Hub</h1>
    
      <p className="description">
        Your gateway to campus life, events, and community engagement. Discover upcoming events, join student organizations,
        and stay connected with everything happening at SpringField University.
      </p>

      <div className="banner-slider">
        <button className="slider-btn prev-btn" onClick={prevSlide} type="button" aria-label="Previous slide">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 19 8 12 15 5"></polyline>
          </svg>
        </button>

        <div className="slide">
          <img src={currentBanner.image} alt={currentBanner.title} className="slide-image" />
          <div className="slide-content">
            <span className="category-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              {currentBanner.category}
            </span>
            <h3 className="slide-title">{currentBanner.title}</h3>
            <p className="slide-subtitle">{currentBanner.subtitle}</p>
            <div className="slide-date">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              {currentBanner.date}
            </div>
          </div>
        </div>

        <button className="slider-btn next-btn" onClick={nextSlide} type="button" aria-label="Next slide">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 5 16 12 9 19"></polyline>
          </svg>
        </button>

        <div className="dots-container">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;
