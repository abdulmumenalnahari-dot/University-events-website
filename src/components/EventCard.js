import React, { useState, useEffect } from "react";

const EventCard = ({ event }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [likes, setLikes] = useState(event.likes || 0);
  const [countdown, setCountdown] = useState("Loading...");

  // ✅ دالة لتحليل النص "Xd Yh Zm Ws"
  const parseCountdownString = (str) => {
    const parts = str.match(/(\d+)d\s*(\d+)h\s*(\d+)m\s*(\d+)s/);
    if (!parts) return null;
    return {
      days: parseInt(parts[1], 10),
      hours: parseInt(parts[2], 10),
      minutes: parseInt(parts[3], 10),
      seconds: parseInt(parts[4], 10),
    };
  };

  const toTotalSeconds = (cd) => {
    if (!cd) return 0;
    return cd.days * 86400 + cd.hours * 3600 + cd.minutes * 60 + cd.seconds;
  };

  const formatCountdown = (totalSecs) => {
    if (totalSecs <= 0) return "Expired";
    const days = Math.floor(totalSecs / 86400);
    const hours = Math.floor((totalSecs % 86400) / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = totalSecs % 60;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  // ✅ العد التنازلي من النص
  useEffect(() => {
    const parsed = parseCountdownString(event.countdown);
    if (!parsed) {
      setCountdown(event.countdown || "Invalid Format");
      return;
    }

    const totalStartSeconds = toTotalSeconds(parsed);
    const startTime = Date.now();

    const updateCountdown = () => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      const remainingSeconds = totalStartSeconds - elapsedSeconds;
      setCountdown(formatCountdown(remainingSeconds));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [event.countdown]);

  // ✅ جلب الحالة من localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(savedFavorites.includes(event.id));

    const savedLikes = JSON.parse(localStorage.getItem("likes")) || {};
    if (savedLikes[event.id] !== undefined) {
      setLikes(savedLikes[event.id]);
    }
  }, [event.id]);

  // ✅ تبديل المفضلة
  const toggleFavorite = () => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const updated = isFavorite
      ? savedFavorites.filter(id => id !== event.id)
      : [...savedFavorites, event.id];
    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  // ✅ زيادة الإعجاب
  const handleLike = () => {
    const savedLikes = JSON.parse(localStorage.getItem("likes")) || {};
    const newLikes = (savedLikes[event.id] || 0) + 1;
    savedLikes[event.id] = newLikes;
    localStorage.setItem("likes", JSON.stringify(savedLikes));
    setLikes(newLikes);
  };

  return (
    <div
      className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 d-flex flex-column"
      style={{ width: "100%", minWidth: "280px", maxWidth: "350px" }}
    >
      <div className="position-relative">
        <img
          src={event.image}
          alt={event.title}
          className="card-img-top w-100"
          style={{
            height: "160px",
            objectFit: "cover",
            borderRadius: "8px 8px 0 0",
          }}
        />
        <span
          className="position-absolute top-0 end-0 m-1 p-1 rounded-2 fs-6 fw-bold cursor-pointer"
          style={{
            backgroundColor: isFavorite ? "#FFD700" : "#fff",
            color: isFavorite ? "#000" : "#000",
            border: "1px solid #ddd",
            fontSize: "0.9rem",
          }}
          onClick={toggleFavorite}
        >
          ★
        </span>
      </div>

      <div
        className="card-body p-2 p-md-3 d-flex flex-column"
        style={{ flexGrow: 1 }}
      >
        <h5
          className="card-title mb-1 fw-bold text-truncate"
          style={{ fontSize: "0.95rem", lineHeight: "1.3" }}
        >
          {event.title}
        </h5>

        <div className="d-flex align-items-center mb-2 text-muted small" style={{ fontSize: "0.75rem" }}>
          <i className="bi bi-calendar me-1"></i>
          <span className="text-truncate" style={{ maxWidth: "70px" }}>
            {event.date}
          </span>
          <i className="bi bi-clock ms-2 me-1"></i>
          <span className="text-truncate" style={{ maxWidth: "50px" }}>
            {event.time}
          </span>
          <i className="bi bi-geo-alt ms-2 me-1"></i>
          <span className="text-truncate d-none d-sm-inline" style={{ maxWidth: "60px" }}>
            {event.location}
          </span>
        </div>

        <div className="mb-2">
          <span
            className="badge bg-primary rounded-pill px-2 py-1 text-white text-truncate"
            style={{ fontSize: "0.7rem", maxWidth: "100%" }}
          >
            {countdown}
          </span>
        </div>

        <p
          className="card-text text-muted small mb-2 text-truncate"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            fontSize: "0.75rem",
            lineHeight: "1.3",
            flexGrow: 1,
          }}
        >
          {event.description}
        </p>

        <div className="d-flex flex-wrap gap-1 mb-2">
          {event.tags.map((tag, i) => (
            <span
              key={i}
              className="badge bg-secondary text-white rounded-pill px-2 py-1 text-truncate"
              style={{ fontSize: "0.65rem", maxWidth: "55px" }}
            >
              {tag}
            </span>
          ))}
          <span
            className="badge bg-light text-dark rounded-pill px-2 py-1 d-flex align-items-center cursor-pointer"
            style={{ fontSize: "0.65rem" }}
            onClick={handleLike}
          >
            <i
              className={`bi bi-hand-thumbs-up me-1 ${
                likes > 0 ? "text-primary" : "text-muted"
              }`}
              style={{ fontSize: "0.7rem" }}
            ></i>
            {likes}
          </span>
        </div>

        <button
          className="btn btn-outline-primary w-100 rounded-3 mt-auto"
          style={{ minHeight: "34px", fontSize: "0.85rem" }}
        >
          {event.buttonText} →
        </button>
      </div>
    </div>
  );
};

export default EventCard;