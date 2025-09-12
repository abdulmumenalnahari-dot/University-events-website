// src/pages/Events.jsx
import { useEffect, useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import EventCard from "../components/EventCard";
import EventDetail from "../components/EventDetail";
import { filterAndSortEvents } from "../utils/filterAndSortEvents";

export default function Events() {
  const [allEvents, setAllEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("date-desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // عرض تدريجي
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // 1) جلب جميع الفعاليات
  useEffect(() => {
    const loadAllEvents = async () => {
      try {
        const response = await fetch("/data/events.json");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const events = await response.json();
        setAllEvents(Array.isArray(events) ? events : []);
      } catch (err) {
        console.error("Failed to load events:", err);
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };
    loadAllEvents();
  }, []);

  // 2) تصفية/فرز
  const filteredAndSortedEvents = useMemo(() => {
    return filterAndSortEvents(allEvents, { search, category, sort });
  }, [allEvents, search, category, sort]);

  // عند تغيّر الفلاتر ارجع للصفحة الأولى
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, sort]);

  // 3) حساب العناصر المعروضة بحسب الصفحة الحالية
  useEffect(() => {
    const slice = filteredAndSortedEvents.slice(0, currentPage * eventsPerPage);
    setDisplayedEvents(slice);
  }, [filteredAndSortedEvents, currentPage]);

  // 4) تحميل المزيد
  const hasMoreEvents = displayedEvents.length < filteredAndSortedEvents.length;

  const loadMoreEvents = () => {
    if (isLoadingMore || !hasMoreEvents) return;
    setIsLoadingMore(true);
    // تأخير بسيط لإظهار السبنر (اختياري)
    setTimeout(() => {
      setCurrentPage((p) => p + 1);
      setIsLoadingMore(false);
    }, 400);
  };

  const EventList = (
    <div className="container my-4">
      <h1 className="h3 mb-4">Event Catalog</h1>

      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      <FilterBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />

      {loading ? (
        <div className="text-center my-5">Loading...</div>
      ) : (
        <>
          <p className="text-muted">
            Showing {displayedEvents.length} of {filteredAndSortedEvents.length} events
            {category ? ` in category "${category}"` : ""}
            {search ? ` matching "${search}"` : ""}.
          </p>

          {displayedEvents.length > 0 ? (
            <>
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {displayedEvents.map((event) => (
                  <div className="col" key={event.id}>
                    <EventCard event={event} />
                  </div>
                ))}
              </div>

              {/* زر تحميل المزيد بالأسفل */}
              {hasMoreEvents ? (
                <div className="d-flex justify-content-center mt-4">
                  <button
                    onClick={loadMoreEvents}
                    className="btn btn-primary rounded-pill px-4 py-2"
                    disabled={isLoadingMore}
                    aria-label="Load more events"
                  >
                    {isLoadingMore ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Loading...
                      </>
                    ) : (
                      "Load More Events"
                    )}
                  </button>
                </div>
              ) : (
                filteredAndSortedEvents.length > 0 && (
                  <div className="text-center mt-4">
                    <p className="text-muted">You've reached the end of the list.</p>
                  </div>
                )
              )}
            </>
          ) : (
            <div className="text-center my-5">
              <p className="text-muted">
                No events found matching your criteria.
                {category && <span> (Checked for category: {category})</span>}
              </p>
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
