import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import { fetchAndSortEvents } from "../utils/fetchAndSortEvents";
import { filterAndSortEvents } from "../utils/filterAndSortEvents";
import EventCarousel from "../components/EventCarousel";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [sports, setSports] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("date-desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const sortedEvents = await fetchAndSortEvents("/data/events.json");
        setEvents(sortedEvents);
      } catch (err) {
        setError("تعذّر تحميل قائمة الفعاليات.");
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

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

  if (loading) {
    return (
      <div className="container my-4">
        <h1 className="h3 text-center">الثقافة</h1>
        <div className="row g-3">
          {[...Array(6)].map((_, i) => (
            <div className="col-sm-6 col-md-4" key={i}>
              <div className="card shadow-sm">
                <div className="placeholder" style={{ height: 160 }} />
                <div className="card-body">
                  <div className="placeholder-glow">
                    <span className="placeholder col-8" />
                    <span className="placeholder col-6" />
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
                  title="الثقافة"
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
