// src/components/EventDetail.jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAndSortEvents } from "../utils/fetchAndSortEvents";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const load = async () => {
      const list = await fetchAndSortEvents("/data/events.json");
      setEvent(list.find((x) => Number(x.id) === Number(id)) || null);
    };
    load();
  }, [id]);

  if (!event) return <div className="container my-4">Event not found.</div>;

  return (
    <div className="container my-4">
      <div className="mx-auto" style={{ maxWidth: 720 }}>
        <Link to="/events" className="btn btn-link px-0">← Back</Link>

        <h1 className="display-6 fw-bold text-center mb-3">{event.title}</h1>

        {event.image && (
          <img
            src={event.image}
            alt={event.title}
            className="img-fluid rounded-4 shadow-sm d-block mx-auto mb-2"
            style={{ maxHeight: 320, width: "100%", objectFit: "cover" }}
          />
        )}

        {/* date & time under the image */}
        <div className="d-flex justify-content-center text-muted small mb-4 gap-3 flex-wrap">
          <span><i className="bi bi-calendar-event"></i> {event.date}</span>
          <span><i className="bi bi-clock"></i> {event.time}</span>
          <span><i className="bi bi-geo-alt"></i> {event.location}</span>
        </div>

        <p className="text-muted fs-6 lh-lg text-center">
          {event.description}
        </p>
      </div>
    </div>
  );
}
