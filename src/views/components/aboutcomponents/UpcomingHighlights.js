import React from "react";

const UpcomingHighlights = ({ highlights }) => {
  if (!highlights) return null;

  return (
    <div className="section">
      <h2 className="h5">Upcoming Highlights</h2>
      {highlights.length === 0 ? (
        <p className="text-muted">No upcoming events.</p>
      ) : (
        <div className="card-grid">
          {highlights.map((ev) => (
            <div className="card h-100 mb-3" key={ev.title}>
              <img
                src={ev.image}
                alt={ev.title}
                className="card-img-top"
                style={{ height: 160, objectFit: "cover" }}
                onError={(e) => {
                  e.currentTarget.src = "/images/niagara_malmo_universitet_2018-04-09_02.jpg";
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
                 
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingHighlights;