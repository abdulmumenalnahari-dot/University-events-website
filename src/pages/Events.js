import { useEffect, useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import { fetchAndSortEvents } from "../utils/fetchAndSortEvents";
import { filterAndSortEvents } from "../utils/filterAndSortEvents";
import EventCarousel from "../components/EventCarousel";
import EventDetail from "../components/EventDetail";

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
      } catch {
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
      } catch {
        setError("تعذّر تحميل قائمة الرياضة.");
      }
    };
    loadSports();
  }, []);

  // Hooks غير مشروطة دائمًا
  const filteredEvents = useMemo(
    () => filterAndSortEvents(events, { search, category, sort }),
    [events, search, category, sort]
  );
  const filteredSports = useMemo(
    () => filterAndSortEvents(sports, { search, category, sort }),
    [sports, search, category, sort]
  );

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

  const Catalog = (
    <>
      <h1 className="h3">Event Catalog</h1>

      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      <FilterBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />

      {filteredEvents.length > 0 && (
        <EventCarousel events={filteredEvents} title="الثقافة" />
      )}

      {filteredSports.length > 0 && (
        <EventCarousel events={filteredSports} title="الرياضة" />
      )}
    </>
  );

  return (
    <div className="container my-4">
      <Routes>
        <Route index element={Catalog} />
        <Route path=":id" element={<EventDetail />} />
      </Routes>
    </div>
  );
}
