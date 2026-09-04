// src/pages/Events.jsx
import { Routes, Route } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import EventCard from "../components/EventCard";
import EventDetail from "../components/EventDetail";
import { useEventsViewModel } from "../../viewmodels/useEventsViewModel";
import "../styles/Events.css";

export default function Events() {
  const {
    search,
    setSearch,
    category,
    setCategory,
    categories,
    sort,
    setSort,
    loading,
    error,
    displayedEvents,
    filteredAndSortedEvents,
    hasMoreEvents,
    isLoadingMore,
    loadMoreEvents,
  } = useEventsViewModel();

  const hasFilters = Boolean(search || category || sort !== "date-desc");
  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setSort("date-desc");
  };

  const EventList = (
    <div className="events-page">
      <section className="events-hero">
        <div>
          <span className="events-eyebrow">CAMPUSCONNECT EVENTS</span>
          <h1>Find your next<br /><em>good reason to go.</em></h1>
          <p>Explore talks, workshops, culture, sport, and the people bringing campus life together.</p>
        </div>
        <div className="events-hero-mark"><span>03</span><small>ways to explore<br />search · filter · save</small></div>
      </section>

      <section className="events-toolbar-section">
        <div className="events-section-heading"><div><span className="events-eyebrow">THE EVENT CATALOG</span><h2>What is happening?</h2></div><span className="events-result-count">{loading ? "..." : filteredAndSortedEvents.length} results</span></div>

      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      <FilterBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        categories={categories}
        sort={sort}
        setSort={setSort}
      />

      {hasFilters && <div className="events-active-filters"><span>Showing a tailored list</span><button type="button" onClick={clearFilters}>Clear filters ×</button></div>}

      {loading ? (
        <div className="events-skeleton-grid" aria-label="Loading events"><span /><span /><span /></div>
      ) : (
        <>
          <p className="events-summary">Showing <strong>{displayedEvents.length}</strong> of <strong>{filteredAndSortedEvents.length}</strong> events{category ? ` in ${category}` : ""}{search ? ` matching “${search}”` : ""}.</p>

          {displayedEvents.length > 0 ? (
            <>
              <div className="events-grid">
                {displayedEvents.map((event) => (
                  <div className="events-grid-item" key={event.id}>
                    <EventCard event={event} />
                  </div>
                ))}
              </div>

              {/* زر تحميل المزيد بالأسفل */}
              {hasMoreEvents ? (
                <div className="events-load-more">
                  <button
                    onClick={loadMoreEvents}
                    className="events-load-button"
                    disabled={isLoadingMore}
                    aria-label="Load more events"
                  >
                    {isLoadingMore ? (
                      <>
                        <span className="events-spinner" role="status" aria-hidden="true"></span>
                        Loading...
                      </>
                    ) : (
                      "Load More Events"
                    )}
                  </button>
                </div>
              ) : (
                filteredAndSortedEvents.length > 0 && (
                  <div className="events-end-message">
                    <p>You have reached the end of the list.</p>
                  </div>
                )
              )}
            </>
          ) : (
            <div className="events-empty">
              <span className="events-empty-icon">⌁</span>
              <h3>No matching events yet.</h3>
              <p>Try another search or clear your filters to see the full campus calendar.</p>
              {hasFilters && <button type="button" onClick={clearFilters}>Show all events</button>}
            </div>
          )}
        </>
      )}
      </section>
    </div>
  );

  return (
    <>
     <Routes>
      <Route index element={EventList} />
      <Route path=":id" element={<EventDetail />} />
     
    </Routes>
    </>

   
  );
}
