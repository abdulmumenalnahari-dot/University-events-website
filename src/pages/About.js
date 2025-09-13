import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/aboutcomponents/HeadeAboutr";
import Kpis from "../components/aboutcomponents/Kpis";
import UpcomingHighlights from "../components/aboutcomponents/UpcomingHighlights";
import OrganizingBodies from "../components/aboutcomponents/OrganizingBodies";
import Traditions from "../components/aboutcomponents/Traditions";
import VisionStrategy from "../components/aboutcomponents/VisionStrategy";
import EventTimeline from "../components/aboutcomponents/EventTimeline";
import AlumniFriends from "../components/aboutcomponents/AlumniFriends";
import Contact from "../components/aboutcomponents/Contact";

// ✅ البيانات الثابتة للجامعة — بدون الحاجة لـ about.json
const COLLEGE_DATA = {
  name: "Malmö University",
  location: "Malmö, Sweden",
  founded: 1998,
  recognitions: [
    "27,667 students and 2,199 employees",
    "250+ global partner universities",
    "Ranked among top 300 universities under 50 years old (THE 2024)"
  ]
};

const ORGANIZERS = [
  {
    name: "Student Council",
    role: "Coordinates student governance and cross-campus events"
  },
  {
    name: "Cultural Committee",
    role: "Manages arts, music, theatre, and cultural events including Verdi's Requiem"
  },
  {
    name: "Sports Board",
    role: "Organizes athletics, competitions, and wellness initiatives"
  },
  {
    name: "Alumni & Friends Network",
    role: "Connects graduates with current students and the university community"
  }
];

const STRATEGY = {
  vision: "Contribute to a sustainable and just society through research-based knowledge, critical thinking, and readiness for action.",
  core_values: [
    "Academic freedom",
    "Academic integrity",
    "Academic quality",
    "Academic accountability",
    "Academic collegiality"
  ],
  focus_areas: [
    "Openness and interdisciplinarity",
    "Societal collaboration",
    "Inclusion and widened participation"
  ]
};

const ALUMNI = {
  purpose: "Keep lifelong ties, support students, and foster professional development",
  network_features: [
    "Career events and job fairs",
    "Theme days for professional groups",
    "Seminars with top researchers",
    "Alumni & Friends newsletter (4 times per year)",
    "Opportunities to mentor students or speak at campus events"
  ]
};

const CONTACTS = {
  email: "info@mau.se",
  phone: "+46 40 665 70 00",
  address: "Malmö University, 205 06 Malmö, Sweden",
  notes: "Switchboard open weekdays 8–16; hours may vary in summer/public holidays"
};

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
  const [events, setEvents] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL || ""}/data/calendar.json`, {
      cache: "no-store",
    })
      .then((r) => {
        if (!r.ok) throw new Error("calendar.json not found");
        return r.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          throw new Error("Expected an array of events in calendar.json");
        }
      })
      .catch((e) => {
        console.error(e);
        setErr(e.message);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (window.location.hash === "#event-calendar-section") {
      const element = document.getElementById("event-calendar-section");
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []); // <-- dependency fixed (was [about] causing ReferenceError)

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

  const decorated = useMemo(
    () => events.map((ev) => withImage({ ...ev, _d: parseDate(ev.date) })),
    [events]
  );

  const upcomingHighlights = [
    {
      id: 1,
      title: "PhD Summer School: Building theory in STEM education research",
      category: "Education",
      date: "Aug 20–22, 2025",
      location: "Malmö University",
      description: "International PhD course to develop theoretical framing and methodology in science and technology education.",
      url: "https://mau.se/en/calendar/phd-summer-school-building-theory-in-stem-education-research/",
      image: "https://mau.se/contentassets/7c36f8a67fbe4738b8754c1e02e76ca5/oresundsbron_2009-06-30_03.jpg?w=770&h=433&mode=crop&quality=10",
    },
    {
      id: 2,
      title: "BRCB — The Annual Workshop at Biofilms Research Centre",
      category: "Workshop",
      date: "Oct 23–24, 2025",
      location: "Biofilms Research Centre for Biointerfaces",
      description: "20th annual workshop focused on water research, biofilm dynamics, and biointerfaces.",
      url: "https://mau.se/en/calendar/brcb---the-annual-workshop-at-biofilms-research-centre-/ ",
      image: "https://mau.se/contentassets/c19a1715d00b4618ba87435579da8bf2/lunch_2023-09-21_03.jpg?w=770&h=433&mode=crop&quality=10",
    },
    {
      id: 3,
      title: "The Nordic Police Research Seminar",
      category: "Conference",
      date: "Aug 19–21, 2025",
      location: "Malmö University",
      description: "Interdisciplinary conference on police organization, operations and training across the Nordics.",
      url: "https://mau.se/en/calendar/the-nordic-police-research-seminar/",
      image: "https://mau.se/contentassets/ff1c1563f1454d6ba95370a2716de26b/poliskonferens_siluett.jpg?w=770&h=433&mode=crop&quality=10",
    },
    {
      id: 4,
      title: "Annual Academic Celebration and Ceremony 2025",
      category: "Academic",
      date: "Oct 13–17, 2025",
      location: "Malmö University",
      description: "Week-long celebration of academic achievements with public events, new professor appointments, and keynote lectures.",
      url: "https://mau.se/en/about-us/annual-academic-celebration/academic-traditions/",
      image: "https://mau.se/en/about-us/annual-academic-celebration/academic-traditions/",
    },
    {
      id: 5,
      title: "Verdi's Requiem",
      category: "Culture",
      date: "See event page",
      location: "Malmö (venue per page)",
      description: "Malmö Academic Choir and Orchestra performing this monumental choral work.",
      url: "https://mau.se/en/calendar/verdis-requiem/",
      image: "https://mau.se/contentassets/9e5f1b6a5a6e3d3e/verdis-requiem.jpg?w=770&h=433&mode=crop&quality=10",
    },
    {
      id: 6,
      title: "Europe Day 2025",
      category: "Culture",
      date: "May 9, 2025",
      location: "Ballroom, Triangeln 2",
      description: "Celebration of European unity and values with performances and speeches.",
      url: "https://mau.se/en/calendar/europe-day-2025/",
      image: "https://mau.se/contentassets/4e8e9d4e4e4e4e4e4e4e4e4e4e4e4e4e/unic-malmo4-webb.jpg?w=770&h=433&mode=crop&quality=10",
    },
    {
      id: 7,
      title: "Migration seminar: Children and youth empowerment through sports",
      category: "Seminar",
      date: "Oct 16, 2025",
      location: "Niagara building / Zoom",
      description: "Participatory Action Research with sport-for-development initiatives in Sweden and Uganda.",
      url: "https://mau.se/en/calendar/migration-seminar-children-and-youth-empowerment-through-sports/",
      image: "https://mau.se/contentassets/d44db7b15e094f1c8aed49d75fb29de3/idrottslektion_2022-02-17_31.jpg?w=770&h=433&mode=crop&quality=10",
    },
    {
      id: 8,
      title: "Doctoral school: Sustainable Movement Education",
      category: "Education",
      date: "Ongoing",
      location: "Faculty of Education and Society",
      description: "Interdisciplinary doctoral program focusing on physical activity, health, and societal change.",
      url: "https://mau.se/en/research/doctoral-schools/sustainable-movement-education/",
      image: "https://mau.se/contentassets/9d58adda99c0402781b366285b98ef8a/orkanens_exterior.jpg?w=770&h=433&mode=crop&quality=10",
    },
    {
      id: 9,
      title: "Alumni & Friends Network Events",
      category: "Alumni",
      date: "Ongoing",
      location: "Malmö University",
      description: "Career events, theme days, seminars with top researchers, and quarterly newsletters for alumni.",
      url: "https://mau.se/en/collaboration-and-innovation/alumni--friends/",
      image: "https://mau.se/contentassets/c8f87d14bb684d81904b8a3633e83ee0/alexandru-al-qassam.jpg?w=220&h=220&mode=crop",
    },
  ];

  const highlights = upcomingHighlights;

  if (err)
    return <div className="container my-4 text-danger">Error: {err}</div>;
  if (loading) return <div className="container my-4">Loading…</div>;

  return (
    <div className="container my-4">
      {/* Hero Section */}
      <div className="d-flex align-items-center">
        <img
          src="/images/mau_en_logotype.svg"
          alt="Malmö University Logo"
          className="me-3"
          style={{
            height: '48px',
            width: 'auto',
            filter: 'grayscale(100%) brightness(1.2)',
            transition: 'filter 0.4s ease'
          }}
        />
        <h1 className="h3 about-hero mb-0">About {COLLEGE_DATA.name} & Events</h1>
      </div>
      <p className="lead">
        {COLLEGE_DATA.name}, {COLLEGE_DATA.location}. Founded in {COLLEGE_DATA.founded}.
      </p>

      {/* Recognitions */}
      <div className="kpis">
        {COLLEGE_DATA.recognitions.map((r, i) => (
          <div key={i} className="kpi">{r}</div>
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
                <div className="card h-100" key={ev.id}>
                  <img
                    src={ev.image}
                    alt={ev.title}
                    className="card-img-top"
                    style={{ height: 160, objectFit: "cover" }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
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
                          : ev.category === "Alumni"
                          ? "badge-tech"
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
            {ORGANIZERS.map((o, i) => (
              <li key={i}>{o.name} — {o.role}</li>
            ))}
          </ul>

          <div className="cta mt-3">
            <h6 className="mb-1">Partners & Sponsors</h6>
            <p className="small mb-2">
              Support research, education, and cultural initiatives at Malmö University.
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
        <p>{STRATEGY.vision}</p>
        <h6>Core Values</h6>
        <ul>{STRATEGY.core_values.map((v, i) => <li key={i}>{v}</li>)}</ul>
        <h6>Focus Areas</h6>
        <ul>{STRATEGY.focus_areas.map((f, i) => <li key={i}>{f}</li>)}</ul>
      </div>

      {/* Calendar — استخدم EventTimeline بدلاً من Kalendr */}
      <div id="event-calendar-section" className="section">
        <h2 className="h5">Event Timeline (Monthly Calendar)</h2>
        <EventTimeline events={decorated} today={today} />
      </div>

      {/* Alumni */}
      <div className="section">
        <h2 className="h5">Alumni & Friends</h2>
        <ul>
          {ALUMNI.network_features.map((n, i) => (
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
        <p><strong>Email:</strong> {CONTACTS.email}</p>
        <p><strong>Phone:</strong> {CONTACTS.phone}</p>
        <p><strong>Address:</strong> {CONTACTS.address}</p>
        {CONTACTS.notes && <p className="small text-muted">{CONTACTS.notes}</p>}
      </div>
    </div>
  );
}
