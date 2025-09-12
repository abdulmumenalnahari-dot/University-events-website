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

  useEffect(() => {
    if (window.location.hash === "#event-calendar-section") {
      const element = document.getElementById("event-calendar-section");
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [about]);

  const parseDate = (s) => {
    if (!s) return null;
    const cleaned = String(s).replace(/–/g, "-");
    const first = cleaned.split("-")[0].trim();
    const y = cleaned.match(/\b(20\d{2})\b/);
    const candidate = y && !/\b20\d{2}\b/.test(first) ? `${first} ${y[1]}` : first;
    const d = new Date(candidate);
    return isNaN(d) ? null : d;
  };

  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

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
      <Header college={college} />
      <Kpis college={college} />

      <div className="row g-4 mt-3">
        <div className="col-md-7">
          <UpcomingHighlights highlights={highlights} />
        </div>
        <div className="col-md-5">
          <OrganizingBodies organizers={organizers} />
        </div>
      </div>

      <Traditions />
      <VisionStrategy strategy={strategy} />

      <div id="event-calendar-section">
        <EventTimeline events={decorated} />
      </div>

      <AlumniFriends alumni={alumni} />
      <Contact contacts={contacts} />

      
    </div>
  );

}