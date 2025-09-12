// src/pages/Events.jsx
import { useEffect, useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import FilterBar from "../components/FilterBar";
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
  
  // States for pagination
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6; // Show 6 events per page/load

  // Load all events
  useEffect(() => {
    const loadAllEvents = async () => {
      try {
        const response = await fetch("/data/events.json");
        if (!response.ok) throw new Error("Failed to load events");
        const events = await response.json();
        setAllEvents(events);
      } catch (err) {
        setError("Failed to load events.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAllEvents();
  }, []);

  // Filter and sort events
  const filteredAndSortedEvents = useMemo(
    () => filterAndSortEvents(allEvents, { search, category, sort }),
    [allEvents, search, category, sort]
  );

  // Handle pagination: update displayed events when filtered/sorted events or page changes
  useEffect(() => {
    const startIndex = 0;
    const endIndex = currentPage * eventsPerPage;
    setDisplayedEvents(filteredAndSortedEvents.slice(startIndex, endIndex));
  }, [filteredAndSortedEvents, currentPage]);

  // Function to load more events
  const loadMoreEvents = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  // Check if there are more events to load
  const hasMoreEvents = displayedEvents.length < filteredAndSortedEvents.length;

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
          {displayedEvents.length > 0 ? (
            <>
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {displayedEvents.map((event) => (
                  <div className="col" key={event.id}>
                    <EventCard event={event} />
                  </div>
                ))}
              </div>
              
              {/* Load More Button - Responsive */}
              {hasMoreEvents && (
                <div className="d-flex justify-content-center mt-4">
                  <button
                    onClick={loadMoreEvents}
                    className="btn btn-primary rounded-pill px-4 py-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Loading...
                      </>
                    ) : (
                      "Load More Events"
                    )}
                  </button>
                </div>
              )}
              
              {/* Message when no more events to load */}
              {!hasMoreEvents && filteredAndSortedEvents.length > 0 && (
                <div className="text-center mt-4">
                  <p className="text-muted">You've reached the end of the list.</p>
                </div>
              )}
            </>
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