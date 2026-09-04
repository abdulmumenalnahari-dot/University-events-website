import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowRight, BsCalendar3, BsEnvelope, BsPeople, BsSearch, BsStars } from "react-icons/bs";
import "../styles/about.css";

const tabs = [
  { id: "services", label: "What we offer" },
  { id: "organizers", label: "Who makes it happen" },
  { id: "strategy", label: "Our direction" },
  { id: "alumni", label: "Alumni network" },
];

const categoryColors = {
  Academic: "about-tag-blue",
  Conference: "about-tag-gold",
  Workshop: "about-tag-green",
  Culture: "about-tag-coral",
};

const services = [
  {
    icon: <BsCalendar3 />,
    title: "Discover events",
    text: "Browse academic, cultural, sports, and community activities in one focused calendar.",
    link: "/events",
    action: "Explore events",
  },
  {
    icon: <BsStars />,
    title: "Save what matters",
    text: "Keep a personal shortlist of events you want to attend and return to later.",
    link: "/favorites",
    action: "View saved events",
  },
  {
    icon: <BsPeople />,
    title: "Join the community",
    text: "Find groups, organizers, registration details, and ways to participate on campus.",
    link: "/register",
    action: "Join now",
  },
];

const getDate = (value) => {
  if (!value) return null;
  const year = String(value).match(/20\d{2}/)?.[0];
  const month = String(value).match(/(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*/i)?.[0];
  const day = String(value).match(/\b\d{1,2}\b/)?.[0];
  if (!year || !month || !day) return null;
  const parsed = new Date(`${month} ${day}, ${year}`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export default function About() {
  const [about, setAbout] = useState(null);
  const [activeTab, setActiveTab] = useState("services");
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL || ""}/data/About.json`, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("About information could not be loaded.");
        return response.json();
      })
      .then(setAbout)
      .catch((loadError) => setError(loadError.message));
  }, []);

  const events = about?.events || [];
  const categories = useMemo(
    () => ["All", ...new Set(events.map((event) => event.category).filter(Boolean))],
    [events]
  );
  const filteredEvents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return events
      .filter((event) => category === "All" || event.category === category)
      .filter((event) => !normalizedQuery || `${event.title} ${event.description}`.toLowerCase().includes(normalizedQuery))
      .sort((first, second) => (getDate(first.date)?.getTime() || 0) - (getDate(second.date)?.getTime() || 0));
  }, [events, category, query]);

  if (error) return <div className="about-state about-error">{error}</div>;
  if (!about) return <div className="about-state">Loading university information...</div>;

  const { college, organizers, strategy, alumni, contacts } = about;

  return (
    <div className="about-page">
      <section className="about-hero-panel">
        <div className="about-hero-copy">
          <span className="about-eyebrow">THE CAMPUSCONNECT GUIDE</span>
          <h1>More than a calendar.<br /><em>A campus in motion.</em></h1>
          <p>CampusConnect brings Malmö University events, people, and opportunities into one welcoming place so you can find your next meaningful campus moment.</p>
          <div className="about-hero-actions">
            <Link className="about-primary-action" to="/events">Find an event <BsArrowRight /></Link>
            <a className="about-text-action" href="#about-services">See how it works</a>
          </div>
        </div>
        <div className="about-hero-stat">
          <span className="about-stat-number">{college.founded}</span>
          <span>years of learning,<br />research, and community</span>
        </div>
      </section>

      <section className="about-intro" id="about-services">
        <div>
          <span className="about-eyebrow">A SIMPLE WAY IN</span>
          <h2>Everything you need to take part.</h2>
        </div>
        <p>Whether you are looking for a lecture, a workshop, a concert, or a new circle of people, the platform helps you move from curiosity to participation.</p>
      </section>

      <section className="about-service-grid">
        {services.map((service) => (
          <article className="about-service-card" key={service.title}>
            <div className="about-service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
            <Link to={service.link}>{service.action} <BsArrowRight /></Link>
          </article>
        ))}
      </section>

      <section className="about-facts-strip">
        <div><strong>{college.recognitions?.[0]?.split(" ")[0] || "27k+"}</strong><span>students and staff</span></div>
        <div><strong>250+</strong><span>global partners</span></div>
        <div><strong>{events.length}</strong><span>featured event stories</span></div>
        <div><strong>{organizers.length}</strong><span>community organizers</span></div>
      </section>

      <section className="about-explorer">
        <div className="about-section-heading">
          <div><span className="about-eyebrow">GET TO KNOW US</span><h2>Choose your doorway.</h2></div>
          <p>Explore how the university community is organized and how you can connect with it.</p>
        </div>
        <div className="about-tabs" role="tablist" aria-label="About university">
          {tabs.map((tab) => (
            <button key={tab.id} type="button" role="tab" aria-selected={activeTab === tab.id} className={activeTab === tab.id ? "is-active" : ""} onClick={() => setActiveTab(tab.id)}>{tab.label}</button>
          ))}
        </div>
        <div className="about-tab-panel">
          {activeTab === "services" && <div className="about-panel-columns"><div><h3>One place, many ways to belong.</h3><p>Use the event catalog to search by keyword, category, or date. Save the events you care about, then use the gallery and calendar to stay close to campus life.</p><Link className="about-inline-link" to="/calendar">Open the event calendar <BsArrowRight /></Link></div><div className="about-mini-list"><span>01 / Search</span><span>02 / Save</span><span>03 / Show up</span></div></div>}
          {activeTab === "organizers" && <div className="about-organizer-grid">{organizers.map((organizer) => <article key={organizer.name}><BsPeople /><h3>{organizer.name}</h3><p>{organizer.description || organizer.role}</p></article>)}</div>}
          {activeTab === "strategy" && <div className="about-panel-columns"><div><h3>Knowledge with a purpose.</h3><p>{strategy.vision}</p></div><div className="about-value-list">{strategy.core_values.slice(0, 6).map((value) => <span key={value}>{value}</span>)}</div></div>}
          {activeTab === "alumni" && <div className="about-panel-columns"><div><h3>Connections that continue.</h3><p>{alumni.purpose}. Stay involved through talks, mentoring, career events, and shared experiences.</p><Link className="about-inline-link" to="/contact">Connect with the team <BsArrowRight /></Link></div><div className="about-value-list">{alumni.network_features.slice(0, 5).map((feature) => <span key={feature}>{feature}</span>)}</div></div>}
        </div>
      </section>

      <section className="about-event-explorer">
        <div className="about-section-heading"><div><span className="about-eyebrow">FROM THE ARCHIVE</span><h2>Find a story that interests you.</h2></div><Link className="about-inline-link" to="/events">See all events <BsArrowRight /></Link></div>
        <div className="about-event-controls"><div className="about-search"><BsSearch /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search event stories" aria-label="Search event stories" /></div><div className="about-category-filters">{categories.map((item) => <button className={category === item ? "is-active" : ""} key={item} type="button" onClick={() => setCategory(item)}>{item}</button>)}</div></div>
        <div className="about-event-grid">{filteredEvents.slice(0, 6).map((event) => <article className="about-event-card" key={event.title}><img src={event.image || "/images/niagara_malmo_universitet_2018-04-09_02.jpg"} alt="" onError={(image) => { image.currentTarget.src = "/images/niagara_malmo_universitet_2018-04-09_02.jpg"; }} /><div><span className={`about-tag ${categoryColors[event.category] || "about-tag-blue"}`}>{event.category}</span><h3>{event.title}</h3><p>{event.date} · {event.location}</p></div></article>)}</div>
      </section>

      <section className="about-contact-panel"><div><span className="about-eyebrow">NEED A HAND?</span><h2>Let’s make campus easier to navigate.</h2><p>Reach the university team for questions about events, registration, or getting involved.</p></div><div className="about-contact-actions"><a href={`mailto:${contacts.email}`}><BsEnvelope /> {contacts.email}</a><Link to="/contact">Contact us <BsArrowRight /></Link></div></section>
    </div>
  );
}
