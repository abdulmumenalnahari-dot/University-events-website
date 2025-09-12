import React, { useEffect, useMemo, useState } from "react";
import "../styles/gallery.css";

const BASE_URL = process.env.PUBLIC_URL || "";

export default function Gallery() {
  const [list, setList] = useState([]);
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/data/gallery.json`, {
          headers: { "Cache-Control": "no-cache" },
        });
        if (!res.ok) throw new Error(`gallery.json ${res.status}`);
        const data = await res.json();
        if (!alive) return;
        setList(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setError("Failed to load /public/data/gallery.json.");
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const years = useMemo(() => {
    return Array.from(new Set(list.map((x) => x.academicYear).filter(Boolean))).sort(
      (a, b) => String(b).localeCompare(String(a))
    );
  }, [list]);

  const categories = useMemo(() => {
    return Array.from(new Set(list.map((x) => x.category).filter(Boolean))).sort(
      (a, b) => String(a).localeCompare(String(b))
    );
  }, [list]);

  const filtered = useMemo(() => {
    return list.filter(
      (x) => (!year || x.academicYear === year) && (!category || x.category === category)
    );
  }, [list, year, category]);

  if (loading) {
    return (
      <div className="container my-4">
        <h1 className="h3 text-center">Event Gallery</h1>
        <div className="row g-3">
          {[...Array(8)].map((_, i) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={i}>
              <div className="card shadow-sm">
                <div className="placeholder" style={{ height: 180 }} />
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
      <div className="text-center mb-3">
        <h1 className="display-6 fw-bold">Event Gallery</h1>
        <p className="text-muted mb-0">
          Explore memories from our campus events, organized by academic year and category.
        </p>
        <p className="text-muted">Relive the moments that make our university community special.</p>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="d-flex flex-wrap align-items-end justify-content-between gap-2 mb-3">
        <div className="d-flex flex-wrap gap-2">
          <div>
            <label className="form-label mb-1">Academic Year</label>
            <select className="form-select" value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="">All Years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label mb-1">Category</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-muted small ms-auto">
          Showing <strong>{filtered.length}</strong> of <strong>{list.length}</strong> images
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-muted">No items to display.</div>
      ) : (
        <div className="row g-3">
          {filtered.map((g) => {
            const src = g.image?.startsWith("/")
              ? `${BASE_URL}${g.image}`
              : g.image || `${BASE_URL}/images/banner1.svg`;
            return (
              <div key={g.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="card shadow-sm h-100">
                  <img
                    src={src}
                    alt={g.title}
                    className="card-img-top"
                    style={{ height: 180, objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="badge bg-primary-subtle text-primary">
                        {g.category}
                      </span>
                      <span className="text-muted small">{g.academicYear}</span>
                    </div>
                    <div className="fw-semibold">{g.title}</div>
                    <div
                      className="text-muted small mb-2"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {g.description}
                    </div>
                    <div className="text-muted small">
                      <i className="bi bi-calendar-event me-1"></i>
                      {g.date}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}