import { useState, useEffect, useRef } from 'react';

export default function BannerSlider({ items = [], intervalMs = 5000 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!items.length) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(timerRef.current);
  }, [items, intervalMs]);

  if (!items.length) return null;

  const { image, caption } = items[activeIndex];

  return (
    <div className="position-relative mb-5 rounded-4 overflow-hidden shadow-lg" style={{ height: '320px' }}>
      <img
        src={image}
        alt={caption || 'Event Banner'}
        className="w-100 h-100 object-fit-cover"
        style={{ filter: 'brightness(0.6)' }}
      />
      <div className="position-absolute top-50 start-50 translate-middle text-center text-white px-4">
        <h1 className="display-6 fw-bold mb-3 text-shadow">
          {""}
        </h1>
        <p className="lead mb-0 opacity-90">Discover, Register, Participate</p>
      </div>

      {/* Dots */}
      <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 d-flex gap-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`rounded-circle border-0 ${idx === activeIndex ? 'bg-white' : 'bg-light bg-opacity-50'}`}
            style={{ width: '10px', height: '10px', padding: 0 }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// إضافة CSS للـ text-shadow (في App.css أو index.css)
/*
.text-shadow {
  text-shadow: 2px 2px 8px rgba(0,0,0,0.8);
}
*/