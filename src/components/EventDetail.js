import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAndSortEvents } from "../utils/fetchAndSortEvents";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const load = async () => {
      const list = await fetchAndSortEvents("/data/events.json");
      const e = list.find((x) => Number(x.id) === Number(id));
      setEvent(e || null);
    };
    load();
  }, [id]);

  if (!event) return <div className="container my-4">الفعالية غير موجودة.</div>;

  return (
    <div className="container my-4">
      <Link to="/events" className="btn btn-link px-0">← رجوع</Link>
      <h1 className="h3 mb-3">{event.title}</h1>

      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          className="img-fluid rounded mb-3"
          style={{ maxHeight: 420, objectFit: "cover", width: "100%" }}
        />
      )}

      <p className="lead">{event.description}</p>
    </div>
  );
}
