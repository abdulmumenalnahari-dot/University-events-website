import { useEffect, useMemo, useState } from "react";
import FilterBar from "../components/FilterBar";
import { fetchAndSortEvents } from "../utils/fetchAndSortEvents";
import EventCarousel from "../components/EventCarousel.js";

const BASE_URL = process.env.PUBLIC_URL || "";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [sports, setSports] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("date-asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/data/events.json`, {
          headers: { "Cache-Control": "no-cache" },
        });
        if (!res.ok)
          throw new Error(`Failed to load events.json: ${res.status}`);
        const data = await res.json();
        if (!alive) return;
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
         
         
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const loadEvents = async () => {
      const sortedEvents = await fetchAndSortEvents("/data/events.json");
      setEvents(sortedEvents);
    };
    loadEvents();
  }, []);

  // ✅ تحميل البيانات من ملف الرياضة
  useEffect(() => {
    const loadSports = async () => {
      const sortedSports = await fetchAndSortEvents("/data/sports.json");
      setSports(sortedSports);
    };
    loadSports();
  }, []);

  const list = useMemo(() => {
    const term = search.toLowerCase().trim();
    const cat = (category || "").toLowerCase().trim();

    let arr = events.filter((e) => {
      const inCat = !cat || (e.category || "").toLowerCase() === cat;
      const inTerm =
        !term ||
        (e.title || "").toLowerCase().includes(term) ||
        (e.department || "").toLowerCase().includes(term);
      return inCat && inTerm;
    });

    arr.sort((a, b) => {
      if (sort === "date-asc") return new Date(a.date) - new Date(b.date);
      if (sort === "date-desc") return new Date(b.date) - new Date(a.date);
      if (sort === "name-asc")
        return (a.title || "").localeCompare(b.title || "");
      if (sort === "pop-desc") return (b.popularity || 0) - (a.popularity || 0);
      return 0;
    });

    return arr;
  }, [events, search, category, sort]);

  if (loading) {
    return (
      <div className="container my-4">
        <h1 className="h3">Event Catalog</h1>
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

      <FilterBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />

 
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
     

      {list.length === 0 && !error && (
        <p className="mt-3 text-muted">
          No events found. جرّب إزالة الفلاتر أو ابحث بعنوان/قسم مختلف.
        </p>
      )}
    </div>
  );
}
