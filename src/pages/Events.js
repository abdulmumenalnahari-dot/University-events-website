import { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import EventCarousel from "../components/EventCarousel";
import EventDetail from "../components/EventDetail";
import { fetchAndSortEvents } from "../utils/fetchAndSortEvents";
import { filterAndSortEvents } from "../utils/filterAndSortEvents";

export default function Events() {
  const [culture, setCulture] = useState([]);
  const [sports, setSports] = useState([]);
  const [arts, setArts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("date-desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const all = await fetchAndSortEvents("/data/events.json");
        setCulture(all.filter(e => e.category === "culture"));
        setSports(all.filter(e => e.category === "sports"));
        setArts(all.filter(e => e.category === "arts"));
      } catch {
        setError("تعذّر تحميل قائمة الفعاليات.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredCulture = useMemo(
    () => filterAndSortEvents(culture, { search, category, sort }),
    [culture, search, category, sort]
  );
  const filteredSports = useMemo(
    () => filterAndSortEvents(sports, { search, category, sort }),
    [sports, search, category, sort]
  );
  const filteredArts = useMemo(
    () => filterAndSortEvents(arts, { search, category, sort }),
    [arts, search, category, sort]
  );

  const Catalog = (
    <>
      <h1 className="h3">Event Catalog</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      <FilterBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />

      {loading && <div className="text-muted">Loading…</div>}

      {!loading && filteredCulture.length > 0 && (
        <EventCarousel events={filteredCulture} title="CULTURE" />
      )}
      {!loading && filteredSports.length > 0 && (
        <EventCarousel events={filteredSports} title="SPORTS" />
      )}
      {!loading && filteredArts.length > 0 && (
        <EventCarousel events={filteredArts} title="ARTS" />
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
