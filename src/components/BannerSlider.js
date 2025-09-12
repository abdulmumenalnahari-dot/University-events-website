import React, { useState, useEffect } from 'react';
import '../styles/BannerSlider.css';

const BannerSlider = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (items && items.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [items]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const prevSlide = () => {
    if (items && items.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    }
  };

  const nextSlide = () => {
    if (items && items.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }
  };

  if (!items || items.length === 0) {
    return <div className="no-banners">No banners available</div>;
  }

  const currentBanner = items[currentIndex];

  return (
    <div className="banner-slider-container">
      <h2 className="banner-title">Featured Events</h2>
      <p className="banner-subtitle">
        Stay updated with the latest happenings on campus. From academic events to social gatherings, discover what's coming up.
      </p>

      <div className="banner-slider">
        <button className="slider-btn prev-btn" onClick={prevSlide}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 19 8 12 15 5"></polyline>
          </svg>
        </button>

        <div className="slide">
          <img src={currentBanner.image} alt={currentBanner.title} className="slide-image" />
          <div className="slide-content">
            <span className="category-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              {currentBanner.category}
            </span>
            <h3 className="slide-title">{currentBanner.title}</h3>
            <p className="slide-subtitle">{currentBanner.subtitle}</p>
            <div className="slide-date">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              {currentBanner.date}
            </div>
          </div>
        </div>

        <button className="slider-btn next-btn" onClick={nextSlide}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 5 16 12 9 19"></polyline>
          </svg>
        </button>

        <div className="dots-container">
          {items.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;