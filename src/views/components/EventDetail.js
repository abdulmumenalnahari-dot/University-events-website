import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BsArrowLeft, BsCalendar3, BsCheck2, BsClock, BsGeoAlt, BsHeart, BsShare } from "react-icons/bs";
import { fetchAndSortEvents } from "../../models/fetchAndSortEvents";
import BookmarkButton from "./BookmarkButton";
import "../styles/EventDetail.css";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchAndSortEvents("/data/Events.json")
      .then((events) => {
        if (active) setEvent(events.find((item) => Number(item.id) === Number(id)) || null);
      })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [id]);

  const shareEvent = async () => {
    const shareData = { title: event.title, text: `Join ${event.title}`, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(shareData);
      else await navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2200);
    } catch {
      setShared(false);
    }
  };

  if (loading) return <div className="event-detail-state"><span className="event-detail-spinner" /> Loading event details...</div>;
  if (!event) return <div className="event-detail-state"><h1>Event not found</h1><p>We could not find that event, but there are plenty more to explore.</p><Link className="event-detail-primary" to="/events"><BsArrowLeft /> Back to events</Link></div>;

  return (
    <article className="event-detail-page">
      <Link to="/events" className="event-detail-back"><BsArrowLeft /> Back to events</Link>
      <section className="event-detail-hero">
        <img src={event.image} alt="" className="event-detail-image" onError={(image) => { image.currentTarget.style.display = "none"; }} />
        <div className="event-detail-overlay" />
        <div className="event-detail-hero-content"><span className="event-detail-category">{event.category || "Campus event"}</span><h1>{event.title}</h1><p>{event.status || "Featured event"} <span>•</span> {event.likes || 0} people are interested</p></div>
        <div className="event-detail-actions"><BookmarkButton item={event} /><button type="button" onClick={shareEvent} aria-label="Share event" title="Share event"><BsShare /></button></div>
      </section>

      <div className="event-detail-layout">
        <div className="event-detail-main">
          <div className="event-detail-facts"><div><BsCalendar3 /><span><small>Date</small><strong>{event.date || "To be announced"}</strong></span></div><div><BsClock /><span><small>Time</small><strong>{event.time || "See event information"}</strong></span></div><div><BsGeoAlt /><span><small>Location</small><strong>{event.location || "University campus"}</strong></span></div></div>
          <section className="event-detail-copy"><span className="event-detail-eyebrow">ABOUT THIS EVENT</span><h2>Something worth showing up for.</h2><p>{event.description}</p></section>
          {event.tags?.length > 0 && <div className="event-detail-tags">{event.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>}
        </div>
        <aside className="event-detail-side"><div className="event-detail-join-card"><span className="event-detail-eyebrow">MAKE IT PART OF YOUR DAY</span><h2>Interested?</h2><p>Save this event so it stays close when you are ready to plan.</p><div className="event-detail-join-actions"><BookmarkButton item={event} /><button type="button" onClick={shareEvent}>{shared ? <><BsCheck2 /> Link copied</> : <><BsHeart /> Share with a friend</>}</button></div></div><div className="event-detail-tip"><strong>Good to know</strong><p>Check the event details before you leave. Times and locations can change.</p></div></aside>
      </div>
    </article>
  );
}
