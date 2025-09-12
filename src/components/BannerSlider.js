// src/components/BannerSlider.jsx
import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaDownload, FaCalendarAlt } from 'react-icons/fa';
import '../styles/BannerSlider.css';

const BannerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bannerItems, setBannerItems] = useState([]);

  // جلب البيانات مباشرة من arts.json
  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await fetch('/data/events.json');
        if (!response.ok) throw new Error('Failed to fetch banner data');
        
        const data = await response.json();
        // أخذ أول 3 أحداث من ملف arts.json
        setBannerItems(data.slice(0, 3));
      } catch (error) {
        console.error('Error loading banner data:', error);
        // بيانات افتراضية في حالة الخطأ
        setBannerItems([
          {
            id: 1,
            title: "_featured Art Exhibition",
            subtitle: "Explore contemporary artworks by local artists",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
            category: "Arts",
            date: "March 15, 2025"
          }
        ]);
      }
    };

    fetchBannerData();
  }, []);

  // التحكم التلقائي في التمرير
  useEffect(() => {
    if (bannerItems.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % bannerItems.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [bannerItems]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const prevSlide = () => {
    if (bannerItems.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + bannerItems.length) % bannerItems.length);
    }
  };

  const nextSlide = () => {
    if (bannerItems.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % bannerItems.length);
    }
  };

  if (bannerItems.length === 0) {
    return <div className="no-banners">Loading banners...</div>;
  }

  const currentBanner = bannerItems[currentIndex];

  return (
    <div className="banner-slider-container">
      <h2 className="banner-title">Featured Events</h2>
      <p className="banner-subtitle">
        Stay updated with the latest happenings on campus. From academic events to social gatherings, discover what's coming up.
      </p>

      <div className="banner-slider">
        <button className="slider-btn prev-btn" onClick={prevSlide}>
          <FaChevronLeft size={24} />
        </button>

        <div className="slide">
          <img 
            src={currentBanner.image} 
            alt={currentBanner.title} 
            className="slide-image" 
             
          />
          <div className="slide-content">
            <span className="category-badge">
              
               {currentBanner.category || currentBanner.tags?.[0] || 'Event'}
            </span>
            <h3 className="slide-title">{currentBanner.title}</h3>
            <p className="slide-subtitle">
              {currentBanner.description?.substring(0, 100) || 
               currentBanner.subtitle || 
               'Join us for this exciting event'}
              {currentBanner.description?.length > 100 ? '...' : ''}
            </p>
            <div className="slide-date">
              <FaCalendarAlt size={16} />
              {currentBanner.date}
            </div>
          </div>
        </div>

        <button className="slider-btn next-btn" onClick={nextSlide}>
          <FaChevronRight size={24} />
        </button>

        <div className="dots-container">
          {bannerItems.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;