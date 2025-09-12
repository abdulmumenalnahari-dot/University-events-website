import { useState, useEffect } from "react";
import BannerSlider from "../components/BannerSlider";
import { fetchAndSortEvents } from "../utils/fetchAndSortEvents";
import "../styles/HomeBegin.css";
import Quick from "../components/Quick";
import HomeBegin from "../components/HomeBegin";
import UpcomingEventsHighlight from "../components/UpcomingEventsHighlight";

export default function Home() {
  const [banners, setBanners] = useState([]);
  const [sports, setSports] = useState([]);

  useEffect(() => {
    fetch("/data/banners.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load banners");
        return res.json();
      })
      .then((data) => setBanners(data))
      .catch((err) => console.error("Error loading banners: - Home.js:20", err));
  }, []);

  useEffect(() => {
    const loadSports = async () => {
      try {
        const sortedSports = await fetchAndSortEvents("/data/sports.json");
        setSports(sortedSports);
      } catch (err) {
        console.error("Error loading sports: - Home.js:29", err);
      }
    };
    loadSports();
  }, []);

  return (
    <div>
      <BannerSlider banners={banners} />
      <HomeBegin />
       <Quick />
    </div>
  );
}
