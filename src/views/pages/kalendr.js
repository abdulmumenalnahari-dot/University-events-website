import React, { useState, useMemo } from "react";
import "../styles/about.css"; // تأكد من وجود ملف التنسيق

const Kalendr = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  // معالجة الأحداث لاستخراج الشهر واليوم من حقل date
  const processedEvents = useMemo(() => {
    if (!events || !Array.isArray(events)) return [];
    
    return events.map(event => {
      // استخراج التاريخ من حقل date
      const dateObj = new Date(event.date);
      if (isNaN(dateObj)) return null;
      
      return {
        ...event,
        month: `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`,
        day: dateObj.getDate(),
        _processedDate: dateObj,
      };
    }).filter(event => event !== null);
  }, [events]);

  // تصفية الأحداث لعرض الأحداث الخاصة بالشهر الحالي فقط
  const eventsInMonth = useMemo(() => {
    return processedEvents.filter((e) => e.month === currentMonth);
  }, [processedEvents, currentMonth]);

  // تجميع الأحداث حسب اليوم
  const dayEvents = useMemo(() => {
    const dayEventsMap = {};
    eventsInMonth.forEach((e) => {
      const dayNumber = parseInt(e.day, 10);
      if (!isNaN(dayNumber) && dayNumber > 0 && dayNumber <= 31) {
        if (!dayEventsMap[dayNumber]) dayEventsMap[dayNumber] = [];
        dayEventsMap[dayNumber].push(e);
      }
    });
    return dayEventsMap;
  }, [eventsInMonth]);

  // حساب أيام الشهر لعرضها في التقويم
  const firstDay = new Date(currentMonth + "-01");
  const startDay = firstDay.getDay(); // 0 = Sunday
  const daysInMonth = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0).getDate();

  const calendarRows = [];
  let week = [];

  // ملء الأيام الفارغة في بداية الشهر
  for (let i = 0; i < startDay; i++) {
    week.push(null);
  }

  // ملء أيام الشهر
  for (let d = 1; d <= daysInMonth; d++) {
    week.push(d);
    if (week.length === 7) {
      calendarRows.push([...week]);
      week = [];
    }
  }

  // ملء الأيام الفارغة في نهاية الأسبوع الأخير
  while (week.length < 7) {
    week.push(null);
  }
  calendarRows.push(week);

  // ألوان الفئات
  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case "academic":
        return "#0d6efd";
      case "conference":
        return "#6f42c1";
      case "workshop":
        return "#20c997";
      case "seminar":
        return "#fd7e14";
      case "education":
        return "#dc3545";
      case "culture":
      case "cultural":
        return "#d63384";
      case "school event":
        return "#198754";
      case "research":
        return "#0dcaf0";
      default:
        return "#6c757d";
    }
  };

  // عند النقر على حدث
  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  // إغلاق النافذة المنبثقة
  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="kalendr-container">
      {/* رأس التقويم مع أزرار التنقل */}
      <div className="kalendr-header">
        <button
          onClick={() => {
            const d = new Date(currentMonth + "-01");
            d.setMonth(d.getMonth() - 1);
            setCurrentMonth(d.toISOString().slice(0, 7));
          }}
          className="kalendr-nav-btn"
        >
          ‹
        </button>
        <h3 className="kalendr-month-title">
          {new Date(currentMonth + "-01").toLocaleDateString("en-GB", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <button
          onClick={() => {
            const d = new Date(currentMonth + "-01");
            d.setMonth(d.getMonth() + 1);
            setCurrentMonth(d.toISOString().slice(0, 7));
          }}
          className="kalendr-nav-btn"
        >
          ›
        </button>
      </div>

      {/* عناوين الأيام */}
      <div className="kalendr-weekdays">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="kalendr-day-header">
            {day}
          </div>
        ))}
      </div>

      {/* شبكة التقويم */}
      <div className="kalendr-grid">
        {calendarRows.map((week, wIdx) => (
          <React.Fragment key={wIdx}>
            {week.map((day, dIdx) => (
              <div
                key={`${wIdx}-${dIdx}`}
                className={`kalendr-day ${!day ? "empty" : ""}`}
              >
                {day && (
                  <>
                    <span className="kalendr-day-number">{day}</span>
                    <div className="kalendr-day-events">
                      {dayEvents[day]?.map((event, idx) => (
                        <div
                          key={idx}
                          className="kalendr-event"
                          style={{
                            backgroundColor: getCategoryColor(event.category),
                            color: "white",
                            fontSize: "0.7rem",
                            padding: "2px 4px",
                            borderRadius: "3px",
                            margin: "1px 0",
                            cursor: "pointer",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                          onClick={() => handleEventClick(event)}
                          title={`${event.title} - ${event.category}`}
                        >
                          {/* عرض صورة صغيرة إذا كانت موجودة */}
                          {event.image && (
                            <div
                              style={{
                                width: "12px",
                                height: "12px",
                                borderRadius: "50%",
                                backgroundImage: `url(${event.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                border: "1px solid rgba(255,255,255,0.5)",
                              }}
                            ></div>
                          )}
                          <span>
                            {event.title.substring(0, 15)}
                            {event.title.length > 15 ? "..." : ""}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* نافذة منبثقة لعرض تفاصيل الحدث */}
      {selectedEvent && (
        <div className="kalendr-modal-overlay" onClick={closeModal}>
          <div
            className="kalendr-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="kalendr-modal-close" onClick={closeModal}>
              ×
            </button>
            <h4>{selectedEvent.title}</h4>
            <p><strong>Category:</strong> {selectedEvent.category}</p>
            <p><strong>Date:</strong> {selectedEvent.date}</p>
            {selectedEvent.time && <p><strong>Time:</strong> {selectedEvent.time}</p>}
            <p><strong>Location:</strong> {selectedEvent.location}</p>
            <p>{selectedEvent.description}</p>

            {selectedEvent.image && (
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  marginTop: "12px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              />
            )}

            {selectedEvent.url && (
              <a
                href={selectedEvent.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  padding: "6px 12px",
                  backgroundColor: "#0d6efd",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "4px",
                  fontSize: "0.9rem",
                }}
              >
                View Event Page
              </a>
            )}
          </div>
        </div>
      )}

      {/* مفتاح الألوان */}
      <div className="kalendr-legend">
        <h6>Event Types</h6>
        {[
          { category: "Academic", color: "#0d6efd" },
          { category: "Conference", color: "#6f42c1" },
          { category: "Workshop", color: "#20c997" },
          { category: "Seminar", color: "#fd7e14" },
          { category: "Education", color: "#dc3545" },
          { category: "Cultural", color: "#d63384" },
          { category: "School event", color: "#198754" },
          { category: "Research", color: "#0dcaf0" },
        ].map((item) => (
          <div key={item.category} className="kalendr-legend-item">
            <span
              className="kalendr-legend-color"
              style={{ backgroundColor: item.color }}
            ></span>
            {item.category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kalendr;