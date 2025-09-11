import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import BannerSlider from '../components/BannerSlider';
import { fetchAndSortEvents } from "../utils/fetchAndSortEvents";
import EventCarousel from "../components/EventCarousel";
import HomeBegin from './HomeBegin';
import '../styles/HomeBegin.css'
import Quick from '../components/Quick';
const BASE_URL = process.env.PUBLIC_URL || '';

export default function Home() {
   
  const [events, setEvents] = useState([]);
  const [sports, setSports] = useState([]);

 const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetch('/data/banners.json')
      .then(res => res.json())
      .then(data => setBanners(data))
      .catch(err => console.error("Error loading banners:", err));
  }, []);
    

  useEffect(() => {
  fetch('/data/banners.json')
    .then(res => {
      if (!res.ok) throw new Error("Failed to load banners");
      return res.json();
    })
    .then(data => setBanners(data))
    .catch(err => console.error("Error loading banners:", err));
}, []);

  // ✅ تحميل البيانات من ملف الرياضة
  useEffect(() => {
    const loadSports = async () => {
      const sortedSports = await fetchAndSortEvents("/data/sports.json");
      setSports(sortedSports);
    };
    loadSports();
  }, []);


  return (
    <>
    
    <div >
       <HomeBegin />
      
<BannerSlider items={banners} />      

      

        {/* قسم الثقافه */}
        {events.length > 0 ? (
          <EventCarousel events={events} title="الثقافه" />
        ) : (
          <div className="text-center py-5">Loading...</div>
        )}

        {/* قسم الرياضة */}
        {sports.length > 0 ? (
          <EventCarousel events={sports} title="الرياضة" />
        ) : (
          <div className="text-center py-5">Loading...</div>
        )}


      {/* Purpose */}
      <section className="text-center py-5 bg-light bg-opacity-25 rounded-4">
        <h2 className="fw-bold text-primary mb-3">Why CampusConnect?</h2>
        <p className="lead px-3 mb-0" style={{ maxWidth: '700px', margin: '0 auto' }}>
          Centralized event information, department-wise browsing, and dynamic, responsive UI — all powered by lightweight JSON. No backend required.
        </p>
      </section>
      <Quick />
    </div>
    </>
  );
}
