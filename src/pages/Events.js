// src/pages/Events.jsx
import { useEffect, useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import { fetchAndSortEvents } from "../utils/fetchAndSortEvents";
import { filterAndSortEvents } from "../utils/filterAndSortEvents";
import EventCard from "../components/EventCard";
import EventDetail from "../components/EventDetail";

export default function Events() {
  const [allEvents, setAllEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("date-desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // جلب جميع الأحداث من ملف واحد أو دمجها
  useEffect(() => {
    const loadAllEvents = async () => {
      try {
        // الخيار 1: إذا كانت لديك ملف events.json واحد يحتوي على جميع الأحداث
        const response = await fetch("/data/arts.json");
        if (!response.ok) throw new Error("Failed to load events");
        const events = await response.json();
        setAllEvents(events);
        
        // الخيار 2: إذا كنت تفضل الاحتفاظ بالملفات المنفصلة
        // const [cultureEvents, sportsEvents, artsEvents] = await Promise.all([
        //   fetchAndSortEvents("/data/culture.json"),
        //   fetchAndSortEvents("/data/sports.json"),
        //   fetchAndSortEvents("/data/arts.json")
        // ]);
        // setAllEvents([...cultureEvents, ...sportsEvents, ...artsEvents]);
        
      } catch (err) {
        setError("Failed to load events.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAllEvents();
  }, []);

  // تصفية وترتيب الأحداث
  const filteredAndSortedEvents = useMemo(
    () => filterAndSortEvents(allEvents, { search, category, sort }),
    [allEvents, search, category, sort]
  );

  const EventList = (
    <div className="container my-4">
      <h1 className="h3 mb-4">Event Catalog</h1>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <FilterBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {filteredAndSortedEvents.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {filteredAndSortedEvents.map((event) => (
                <div className="col" key={event.id}>
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center my-5">
              <p className="text-muted">No events found matching your criteria.</p>
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <Routes>
      <Route index element={EventList} />
      <Route path=":id" element={<EventDetail />} />
    </Routes>
  );
}