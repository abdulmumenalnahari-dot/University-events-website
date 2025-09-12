import React, { useEffect, useMemo, useState } from "react";
import "../styles/about.css";
import Kalendr from "./kalendr.js";

const CATEGORY_IMAGE = {
  Academic: "/images/arshogtid_2023_41.jpg",
  Conference: "/images/medarbetare_2023-10-24_122.jpg",
  Workshop: "/images/lunch_2023-09-21_03.jpg",
  Seminar: "/images/idrottslektion_2022-02-17_31.jpg",
  Education: "/images/oresundsbron_2009-06-30_03.jpg",
  Culture: "/images/verdis-requiem.jpg",
  "School event": "/images/niagara_malmo_universitet_2018-04-09_02.jpg",
};

const DEFAULT_IMG = "/images/niagara_malmo_universitet_2018-04-09_02.jpg";

const withImage = (ev) => ({
  ...ev,
  image:
    ev.image && !/^https?:\/\//i.test(ev.image)
      ? ev.image
      : CATEGORY_IMAGE[ev.category] || DEFAULT_IMG,
});

export default function About() {
  const [about, setAbout] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL || ""}/data/about.json`, {
      cache: "no-store",
    })
      .then((r) => {
        if (!r.ok) throw new Error("about.json not found");
        return r.json();
      })
      .then(setAbout)
      .catch((e) => setErr(e.message));
  }, []);

  // ---- parse dates
  const parseDate = (s) => {
    if (!s) return null;
    const cleaned = String(s).replace(/–/g, "-");
    const first = cleaned.split("-")[0].trim();
    const y = cleaned.match(/\b(20\d{2})\b/);
    const candidate =
      y && !/\b20\d{2}\b/.test(first) ? `${first} ${y[1]}` : first;
    const d = new Date(candidate);
    return isNaN(d) ? null : d;
  };

  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  // ✅ تعريف events مرة واحدة فقط
  const events = about?.events ?? [];

  const decorated = useMemo(
    () => events.map((ev) => withImage({ ...ev, _d: parseDate(ev.date) })),
    [events]
  );

  const upcomingAll = useMemo(
    () =>
      decorated
        .filter((ev) => ev._d && ev._d >= today)
        .sort((a, b) => a._d - b._d),
    [decorated, today]
  );

  const highlights = useMemo(() => upcomingAll.slice(0, 9), [upcomingAll]);

  if (err)
    return <div className="container my-4 text-danger">Error: {err}</div>;
  if (!about) return <div className="container my-4">Loading…</div>;

  const { college, organizers, strategy, alumni, contacts } = about;

  return (
    
    <div className="container my-4">
      {/* Hero Section */}
     <div className="d-flex align-items-center">
  <img 
    src="/images/mau_en_logotype.svg" 
    alt="Malmö University Logo" 
    className="me-3" 
    style={{ height: '40px', width: 'auto' }} 
  />
  <h1 className="h3 about-hero mb-0">About {college.name} & Events</h1>
</div>
      <p className="lead">
        {college.name}, {college.location}. Founded in {college.founded}.
      </p>

      {/* Recognitions */}
      <div className="kpis">
        {college.recognitions.map((r, i) => (
          <div key={i} className="kpi">
            {r}
          </div>
        ))}
      </div>
      <div className="divider"></div>

      {/* Upcoming Highlights */}
      <div className="row g-4 mt-3">
        <div className="col-md-7">
          <h2 className="h5">Upcoming Highlights</h2>
          {highlights.length === 0 ? (
            <p className="text-muted">No upcoming events.</p>
          ) : (
            <div className="card-grid">
              {highlights.map((ev) => (
                <div className="card h-100" key={ev.title}>
                  <img
                    src={ev.image}
                    alt={ev.title}
                    className="card-img-top"
                    style={{ height: 160, objectFit: "cover" }}
                    onError={(e) => {
                      e.currentTarget.src = DEFAULT_IMG;
                    }}
                  />
                  <div className="card-body">
                    <span
                      className={
                        "badge-cat " +
                        (ev.category === "Academic"
                          ? "badge-tech"
                          : ev.category === "Conference"
                          ? "badge-cult"
                          : ev.category === "Workshop"
                          ? "badge-sport"
                          : ev.category === "Seminar"
                          ? "badge-tech"
                          : ev.category === "Education"
                          ? "badge-cult"
                          : ev.category === "Culture"
                          ? "badge-sport"
                          : "badge-tech")
                      }
                    >
                      {ev.category}
                    </span>
                    <h6 className="card-title mt-2">{ev.title}</h6>
                    <div className="text-muted small">
                      {ev.date} · {ev.location}
                    </div>
                    {ev.url && (
                      <a
                        href={ev.url}
                        target="_blank"
                        rel="noreferrer"
                        className="small"
                      >
                        Details
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="col-md-5 section">
          <h2 className="h5">Organizing Bodies</h2>
          <ul className="org-list">
            {organizers.map((o, i) => (
              <li key={i}>
                {o.name} — {o.role}
              </li>
            ))}
          </ul>

          <div className="cta mt-3">
            <h6 className="mb-1">Partners & Sponsors</h6>
            <p className="small mb-2">
              Support research, education, and cultural initiatives at Malmö
              University.
            </p>
            <a
              className="btn btn-outline-primary btn-sm"
              href="https://mau.se/en/collaboration-and-innovation/"
              target="_blank"
              rel="noreferrer"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>

      {/* Traditions */}
      <div className="section">
        <h2 className="h5">Traditions</h2>
        <ul>
          <li>Annual Academic Celebration (October)</li>
          <li>Faculty symposia and public lectures</li>
          <li>Europe Day activities</li>
          <li>Malmö Academic Choir performances</li>
        </ul>
      </div>

      {/* Vision & Strategy */}
      <div className="section">
        <h2 className="h5">Vision & Strategy</h2>
        <p>{strategy.vision}</p>
        <h6>Core Values</h6>
        <ul>
          {strategy.core_values.map((v, i) => (
            <li key={i}>{v}</li>
          ))}
        </ul>
        <h6>Focus Areas</h6>
        <ul>
          {strategy.focus_areas.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </div>

      {/* Calendar (Kalendr) */}
      <div className="section">
        <h2 className="h5">Event Timeline (Monthly Calendar)</h2>
        <Kalendr events={events} />
      </div>

      {/* Alumni */}
      <div className="section">
        <h2 className="h5">Alumni & Friends</h2>
        <ul>
          {alumni.network_features.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
        <a
          href="https://mau.se/en/collaboration-and-innovation/alumni--friends/"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-block",
            marginTop: "12px",
            color: "#0d6efd",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Join the Alumni Network →
        </a>
      </div>

      {/* Contact */}
      <div className="section">
        <h2 className="h5">Contact</h2>
        <p>
          <strong>Email:</strong> {contacts.email}
        </p>
        <p>
          <strong>Phone:</strong> {contacts.phone}
        </p>
        <p>
          <strong>Address:</strong> {contacts.address}
        </p>
        {contacts.notes && <p className="small text-muted">{contacts.notes}</p>}
      </div>

      {/* Footer */}
      <footer className="text-center mt-6 pt-4 text-muted small">
        © Aptech Limited
      </footer>
    </div>
  );
}
