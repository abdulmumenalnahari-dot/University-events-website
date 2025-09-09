import { Link } from 'react-router-dom';
import BookmarkButton from './BookmarkButton';
import Countdown from './Countdown';

export default function EventCard({ evt }) {
  const dt = new Date(evt.date);
  const pretty = dt.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
if (!evt) {
    console.warn('EventCard received undefined "evt" prop');
    return null; // أو عرض رسالة خطأ
  }

  // الآن يمكنك استخدام evt بأمان
   
  return (
    <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden hover-lift">
      <img
        src={evt.thumbnail}
        className="card-img-top"
        alt={evt.title}
        style={{ height: '180px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column p-3">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
          <h5 className="card-title mb-1 fw-bold text-dark">{evt.title}</h5>
          <BookmarkButton item={evt} />
        </div>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="text-muted small">
            📅 {pretty} • ⏰ {evt.time} • 📍 {evt.venue}
          </div>
          <Countdown dateString={evt.date} />
        </div>

        <p className="card-text flex-fill text-secondary small mb-3">
          {evt.description}
        </p>

        <div className="d-flex flex-wrap gap-2 mt-auto">
          <span className="badge bg-secondary rounded-pill">{evt.department}</span>
          <span className="badge bg-info text-dark rounded-pill">{evt.category}</span>
          <span className="badge bg-light text-dark border rounded-pill">
            👍 {evt.popularity}
          </span>
        </div>

        <Link
          to={`/events/${evt.id}`}
          className="btn btn-sm btn-outline-primary mt-3 rounded-pill"
        >
          Learn More →
        </Link>
      </div>
    </div>
  );
}