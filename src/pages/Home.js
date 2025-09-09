import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import BannerSlider from '../components/BannerSlider';
import EventCard from '../components/EventCard';
import LoadingPlaceholder from '../components/LoadingPlaceholder';

const BASE_URL = process.env.PUBLIC_URL || '';

export default function Home() {
  const [banners, setBanners] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        // ✅ ملف البنرات
        const bannersRes = await fetch(`${BASE_URL}/data/banners.json`, { cache: 'no-store' });
        const bannersData = await bannersRes.json();
        setBanners(Array.isArray(bannersData) ? bannersData : []);

        // ✅ ملف الأحداث
        const eventsRes = await fetch(`${BASE_URL}/data/events.json`, { cache: 'no-store' });
        const eventsData = await eventsRes.json();
        setEvents(Array.isArray(eventsData) ? eventsData : []);
      } catch (err) {
        console.error(err);
        setError('Failed to load content. Please check data files.');
        setBanners([]);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  
  const upcomingEvents = useMemo(() => {
    const today = new Date(); today.setHours(0,0,0,0);
    return (events || [])
      .filter(ev => {
        const d = new Date(ev?.date);
        return ev?.date && !isNaN(d) && d >= today;
      })
      .sort((a,b) => new Date(a.date) - new Date(b.date))
      .slice(0, 6);
  }, [events]);

   

  return (
    <div className="container my-5">
      {/* Banner */}
      <BannerSlider items={banners} />

      {/* Error */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Upcoming */}
       
      <h2>
        الثقافه
      </h2>
       <section className="mb-4">
        
        <div className="grid mt-2">
          {upcomingEvents.map(e => (
            <EventCard key={e.id} evt={e} />
          ))}
          
        </div>
      </section>
      <h2>
        الرياضه
      </h2>
       <section className="mb-4">
         
        <div className="grid mt-2">
          {upcomingEvents.map(e => (
            <EventCard key={e.id} evt={e} />
          ))}
          
        </div>
      </section>
      <h2>
        الفنون
      </h2>
       <section className="mb-4">
         <div className="grid mt-2">
          {upcomingEvents.map(e => (
            <EventCard key={e.id} evt={e} />
          ))}
          
        </div>
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
