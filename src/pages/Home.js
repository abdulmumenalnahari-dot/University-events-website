import { useState, useEffect, useMemo } from 'react';
import BannerSlider from '../components/BannerSlider';
import { fetchAndSortEvents } from "../utils/fetchAndSortEvents";
import '../styles/HomeBegin.css'
import Quick from '../components/Quick';
import HomeBegin from '../components/HomeBegin';
const BASE_URL = process.env.PUBLIC_URL || '';

export default function Home() {
   
  const [sports, setSports] = useState([]);


 const [banners, setBanners] = useState([]);
 
  useEffect(() => {
    fetch('/data/banners.json')
      .then(res => res.json())
      .then(data => setBanners(data))
      .catch(err => console.error("Error loading banners: - Home.js:23", err));
      
  }, []);
    

 
 
  useEffect(() => {

  fetch('/data/banners.json')
    .then(res => {
      if (!res.ok) throw new Error("Failed to load banners");
      return res.json();
    })
    .then(data => setBanners(data))
    .catch(err => console.error("Error loading banners: - Home.js:37", err));
}, []);


  useEffect(() => {
    const loadSports = async () => {
      const sortedSports = await fetchAndSortEvents("/data/sports.json");
      setSports(sortedSports);
    };
    loadSports();
  }, []);


  return (
    <>

    
     
      
<BannerSlider items={banners} />      
     <HomeBegin />

      <Quick />
       
    

    </>
  );
}
