import { useEffect, useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import { fetchAndSortEvents } from "../utils/fetchAndSortEvents";
import { filterAndSortEvents } from "../utils/filterAndSortEvents";
import EventCarousel from "../components/EventCarousel";
import EventDetail from "../components/EventDetail";

export default function Events() {
  const [culture, setECulture] = useState([]);
  const [sports, setSports] = useState([]);
  const [arts, setArts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("date-desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCulture = async () => {
      try {
        const sortedCulture = await fetchAndSortEvents("/data/culture.json");
        setECulture(sortedCulture);
      } catch {
        setError("Failed to load the CULTURE list.");
      } finally {
        setLoading(false);
      }
    };
    loadCulture();
  }, []);

  useEffect(() => {
    const loadSports = async () => {
      try {
        const sortedSports = await fetchAndSortEvents("/data/sports.json");
        setSports(sortedSports);
      } catch {
        setError("Failed to load the SPORTS list.");
      }
    };
    loadSports();
  }, []);

  useEffect(() => {
    const loadArts = async () => {
      try {
        const sortedArts = await fetchAndSortEvents("/data/arts.json");
        setArts(sortedArts);
      } catch {
        setError("Failed to load the ARTS list.");
      }
    };
    loadArts();
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

      {filteredCulture.length > 0 && (
        <EventCarousel events={filteredCulture} title="CULTURE" />
      )}

      {filteredSports.length > 0 && (
        <EventCarousel events={filteredSports} title="SPORTS" />
      )}

      {filteredArts.length > 0 && (
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
