// src/pages/Events.jsx (أو المكون الرئيسي لقائمة الأحداث)
import { useEffect, useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import EventCard from "../components/EventCard";
import EventDetail from "../components/EventDetail";
// تأكد من استيراد الدالة المساعدة
import { filterAndSortEvents } from "../utils/filterAndSortEvents"; 

export default function Events() {
  const [allEvents, setAllEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(""); // القيمة الابتدائية يجب أن تكون نص فارغ
  const [sort, setSort] = useState("date-desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAllEvents = async () => {
      try {
        const response = await fetch("/data/events.json"); // تأكد من المسار الصحيح
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const events = await response.json();
        console.log("Events loaded:", events); // Debugging
        setAllEvents(events);
      } catch (err) {
        console.error("Failed to load events:", err);
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };

    loadAllEvents();
  }, []);

  // استخدام useMemo بشكل صحيح
  const filteredAndSortedEvents = useMemo(
    () => {
      console.log("Recalculating filteredAndSortedEvents..."); // Debugging
      return filterAndSortEvents(allEvents, { search, category, sort });
    },
    [allEvents, search, category, sort] // الاعتماديات ضرورية
  );

  // ... باقي الكود لعرض التحميل/الأخطاء/القائمة ...

  const EventList = (
    <div className="container my-4">
      <h1 className="h3 mb-4">Event Catalog</h1>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* تمرير الحالة والدوال لتحديثها إلى FilterBar */}
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
          {/* عرض عدد الأحداث المفلترة لمساعدتك في التتبع */}
          <p className="text-muted">
            Showing {filteredAndSortedEvents.length} events
            {category && category !== "" ? ` in category "${category}"` : ""}
            {search ? ` matching "${search}"` : ""}.
          </p> 

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
              <p className="text-muted">
                No events found matching your criteria.
                {/* رسالة مساعدة للتصحيح */}
                {category && category !== "" && (
                  <span> (Checked for category: {category})</span>
                )}
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