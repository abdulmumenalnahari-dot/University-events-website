import { useEffect, useMemo, useState } from "react";
import { BsArrowRight, BsCalendar3, BsSearch, BsX } from "react-icons/bs";
import "../styles/gallery.css";

const BASE_URL = process.env.PUBLIC_URL || "";
const fallbackImage = `${BASE_URL}/images/niagara_malmo_universitet_2018-04-09_02.jpg`;

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    fetch(`${BASE_URL}/data/gallery.json`, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Gallery data could not be loaded.");
        return response.json();
      })
      .then((data) => active && setItems(Array.isArray(data) ? data : []))
      .catch((loadError) => active && setError(loadError.message))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const closeOnEscape = (event) => event.key === "Escape" && setSelectedItem(null);
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  const years = useMemo(
    () => [...new Set(items.map((item) => item.year || item.academicYear).filter(Boolean))].sort((a, b) => String(b).localeCompare(String(a))),
    [items]
  );
  const categories = useMemo(
    () => [...new Set(items.map((item) => item.category).filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b))),
    [items]
  );
  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return items.filter((item) => {
      const itemYear = item.year || item.academicYear || "";
      const searchable = `${item.title || ""} ${item.description || ""} ${item.category || ""}`.toLowerCase();
      return (!year || itemYear === year) && (!category || item.category === category) && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [items, query, year, category]);

  const clearFilters = () => {
    setQuery("");
    setYear("");
    setCategory("");
  };

  if (loading) {
    return <div className="gallery-page gallery-loading"><span className="gallery-spinner" /> Loading campus memories...</div>;
  }

  return (
    <div className="gallery-page">
      <section className="gallery-hero">
        <div>
          <span className="gallery-eyebrow">CAMPUS MEMORIES</span>
          <h1>Moments worth<br /><em>remembering.</em></h1>
          <p>Explore the people, ideas, and shared experiences that make university life feel connected.</p>
        </div>
        <div className="gallery-hero-count"><strong>{items.length}</strong><span>stories<br />in the archive</span></div>
      </section>

      {error && <div className="gallery-error" role="alert">{error}</div>}
      <section className="gallery-toolbar">
        <div className="gallery-section-heading"><div><span className="gallery-eyebrow">THE ARCHIVE</span><h2>Browse the collection</h2></div><span>{filteredItems.length} of {items.length} images</span></div>
        <div className="gallery-controls">
          <label className="gallery-search"><BsSearch /><span className="visually-hidden">Search gallery</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search memories" /></label>
          <label><span className="visually-hidden">Filter by year</span><select value={year} onChange={(event) => setYear(event.target.value)}><option value="">All years</option>{years.map((itemYear) => <option key={itemYear} value={itemYear}>{itemYear}</option>)}</select></label>
          <label><span className="visually-hidden">Filter by category</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option value="">All categories</option>{categories.map((itemCategory) => <option key={itemCategory} value={itemCategory}>{itemCategory}</option>)}</select></label>
          {(query || year || category) && <button className="gallery-clear" type="button" onClick={clearFilters}>Clear filters</button>}
        </div>
      </section>

      {filteredItems.length === 0 ? (
        <div className="gallery-empty"><span>⌁</span><h2>No memories found.</h2><p>Try another search or clear the filters to view the full archive.</p><button type="button" onClick={clearFilters}>Show all images</button></div>
      ) : (
        <section className="gallery-grid" aria-label="Event gallery">
          {filteredItems.map((item, index) => {
            const source = item.image?.startsWith("/") ? `${BASE_URL}${item.image}` : item.image || fallbackImage;
            return <button className={`gallery-card gallery-card-${index % 4}`} key={item.id || item.title} type="button" onClick={() => setSelectedItem({ ...item, image: source })}><div className="gallery-card-image"><img src={source} alt={item.title || "Campus event"} onError={(event) => { event.currentTarget.src = fallbackImage; }} /><span className="gallery-card-open">View story <BsArrowRight /></span></div><div className="gallery-card-body"><span className="gallery-tag">{item.category || "Campus"}</span><h3>{item.title}</h3><p><BsCalendar3 /> {item.date || item.year || "University archive"}</p></div></button>;
          })}
        </section>
      )}

      {selectedItem && <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={selectedItem.title} onClick={() => setSelectedItem(null)}><div className="gallery-lightbox-card" onClick={(event) => event.stopPropagation()}><button className="gallery-close" type="button" onClick={() => setSelectedItem(null)} aria-label="Close image"><BsX /></button><img src={selectedItem.image} alt={selectedItem.title} /><div className="gallery-lightbox-content"><span className="gallery-tag">{selectedItem.category || "Campus"}</span><h2>{selectedItem.title}</h2><p>{selectedItem.description || "A moment from the university community."}</p><small>{selectedItem.date || selectedItem.year || "University archive"}</small></div></div></div>}
    </div>
  );
}
