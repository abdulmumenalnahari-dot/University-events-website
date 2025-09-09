import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import BannerSlider from '../components/BannerSlider';
import EventCard from '../components/EventCard';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import Countdown from '../components/Countdown';

const BASE_URL = process.env.PUBLIC_URL || '';

export default function Home() {
  const [data, setData] = useState({ banners: [], events: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`${BASE_URL}./data/home.json`);
        if (!res.ok) throw new Error(`Failed to load  ${res.status}`);
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
        setError('Failed to load content. Please check data files.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const upcomingEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return data.events
      .filter((event) => new Date(event.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 6);
  }, [data.events]);

  if (loading) return (
    <div className="container my-5">
      <div className="placeholder rounded-4" style={{ height: '320px' }} />
      <LoadingPlaceholder />
    </div>
  );

  return (
    <div className="container my-5">
      {/* Banner */}
      <BannerSlider items={data.banners} />

      {/* Error Alert */}
      {error && <div className="alert alert-danger">{error}</div>}

     
       
      {/* Upcoming Events */}
      <section className="mb-5">
        <div className="d-flex align-items-center justify-content-center mb-4">
          <h2 className="fw-bold text-primary mb-0">Upcoming Highlights</h2>
          <span className="badge bg-primary ms-3 rounded-pill px-3 py-2">Live</span>
        </div>

        {upcomingEvents.length > 0 ? (
          <div className="row g-4">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <p className="text-muted fs-5">No upcoming events yet.</p>
          </div>
        )}
      </section>

      {/* Purpose */}
      <section className="text-center py-5 bg-light bg-opacity-25 rounded-4">
        <h2 className="fw-bold text-primary mb-3">Why CampusConnect?</h2>
        <p className="lead px-3 mb-0" style={{ maxWidth: '700px', margin: '0 auto' }}>
          Centralized event information, department-wise browsing, and dynamic, responsive UI — all powered by lightweight JSON. No backend required.
        </p>
      </section>
    </div>
  );
}