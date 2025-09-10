import { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import { fetchAndSortEvents } from "../utils/fetchAndSortEvents";
<<<<<<< HEAD
import { filterAndSortEvents } from "../utils/filterAndSortEvents";


import EventCarousel from "../components/EventCarousel";
=======
import EventCarousel from "../components/EventCarousel.js";
>>>>>>> e1d3ef9dfc1b06374782b8067ae006f013b499bd

const BASE_URL = process.env.PUBLIC_URL || "";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [sports, setSports] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("date-desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ تحميل بيانات الثقافه
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const sortedEvents = await fetchAndSortEvents("/data/events.json");
        setEvents(sortedEvents);
      } catch (err) {
         
         
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  // ✅ تحميل بيانات الرياضة
  useEffect(() => {
    const loadSports = async () => {
      try {
        const sortedSports = await fetchAndSortEvents("/data/sports.json");
        setSports(sortedSports);
      } catch (err) {
        setError("تعذّر تحميل قائمة الرياضة.");
      }
    };
    loadSports();
  }, []);

  // ✅ دمج البيانات وتصفية وترتيب
  const combinedEvents = [...events, ...sports];

  const filteredSortedEvents = useMemo(() => {
    return filterAndSortEvents(combinedEvents, { search, category, sort });
  }, [combinedEvents, search, category, sort]);

  if (loading) {
    return (
      <div className="container my-4">
        <h1 className="h3 text-center">الثقافه</h1>
        <div className="row g-3">
          {[...Array(6)].map((_, i) => (
            <div className="col-sm-6 col-md-4" key={i}>
              <div className="card shadow-sm">
                <div className="placeholder" style={{ height: 160 }}></div>
                <div className="card-body">
                  <div className="placeholder-glow">
                    <span className="placeholder col-8"></span>
                    <span className="placeholder col-6"></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }


  return (
    <div className="container my-4">
      <h1 className="h3">Event Catalog</h1>

       {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <>
                <FilterBar
                  search={search}
                  setSearch={setSearch}
                  category={category}
                  setCategory={setCategory}
                  sort={sort}
                  setSort={setSort}
                />

                {events.length > 0 && (
                  <EventCarousel
                    events={filterAndSortEvents(events, { search, category, sort })}
                    title="الثقافه"
                  />
                )}

                {sports.length > 0 && (
                  <EventCarousel
                    events={filterAndSortEvents(sports, { search, category, sort })}
                    title="الرياضة"
                  />
                )}
              </>
            }
          />
        </Routes>
    </div>
  );
}
