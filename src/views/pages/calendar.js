import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft, BsArrowRight, BsCalendar3 } from "react-icons/bs";
import "../styles/Calendar.css";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar() {
    const [events, setEvents] = useState([]);
    const today = new Date();
    const [cursor, setCursor] = useState({ year: today.getFullYear(), month: today.getMonth() + 1 });
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDay, setSelectedDay] = useState(null);

    useEffect(() => {
        fetch("/data/calendar.json")
            .then((response) => {
                if (!response.ok) throw new Error("Unable to load calendar");
                return response.json();
            })
            .then((data) => setEvents(Array.isArray(data) ? data : []))
            .catch(() => setLoadError(true))
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        if (!selectedEvent) return undefined;
        const closeOnEscape = (event) => {
            if (event.key === "Escape") setSelectedEvent(null);
        };
        document.addEventListener("keydown", closeOnEscape);
        return () => document.removeEventListener("keydown", closeOnEscape);
    }, [selectedEvent]);

    const days = useMemo(() => {
        const firstDay = new Date(cursor.year, cursor.month - 1, 1).getDay();
        const totalDays = new Date(cursor.year, cursor.month, 0).getDate();
        return [...Array(firstDay).fill(null), ...Array.from({ length: totalDays }, (_, index) => index + 1)];
    }, [cursor]);

    const categories = useMemo(() => ["All", ...new Set(events.map((event) => event.category).filter(Boolean))], [events]);

    const visibleEvents = useMemo(() => events.filter((event) => {
        const matchesMonth = event.month === `${cursor.year}-${String(cursor.month).padStart(2, "0")}`;
        const matchesCategory = categoryFilter === "All" || event.category === categoryFilter;
        const matchesSearch = !searchTerm.trim() || `${event.title} ${event.location}`.toLowerCase().includes(searchTerm.toLowerCase().trim());
        return matchesMonth && matchesCategory && matchesSearch;
    }), [events, cursor, categoryFilter, searchTerm]);

    const eventsByDay = useMemo(() => visibleEvents.reduce((result, event) => {
        result[event.day] = [...(result[event.day] || []), event];
        return result;
    }, {}), [visibleEvents]);

    const monthEvents = useMemo(() => Object.values(eventsByDay).flat().sort((first, second) => first.day - second.day), [eventsByDay]);
    const isCurrentMonth = cursor.year === today.getFullYear() && cursor.month === today.getMonth() + 1;

    const moveMonth = (offset) => {
        const next = new Date(cursor.year, cursor.month - 1 + offset, 1);
        setCursor({ year: next.getFullYear(), month: next.getMonth() + 1 });
        setSelectedDay(null);
    };

    return (
        <div className="calendar-page">
            <section className="calendar-hero"><div><span className="calendar-eyebrow">CAMPUS CONNECT / 2026</span><h1>Make room for<br /><em>what matters.</em></h1><p>Your living map of lectures, exhibitions, workshops and the people who make campus move.</p></div><div className="calendar-hero-mark"><BsCalendar3 /><span>01<br /><small>PLAN</small></span></div></section>
            <section className="calendar-toolbar"><div className="calendar-search"><span>⌕</span><input type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search events or places" aria-label="Search events or places" /></div><div className="calendar-filters" aria-label="Filter by category">{categories.map((category) => <button type="button" className={categoryFilter === category ? "is-active" : ""} key={category} onClick={() => setCategoryFilter(category)}>{category}</button>)}</div></section>
            <section className="calendar-board"><div className="calendar-heading"><button type="button" onClick={() => moveMonth(-1)} aria-label="Previous month"><BsArrowLeft /></button><div><span>{cursor.year} / {String(cursor.month).padStart(2, "0")}</span><h2>{monthNames[cursor.month - 1]}</h2></div><button type="button" onClick={() => moveMonth(1)} aria-label="Next month"><BsArrowRight /></button></div><button className="calendar-today" type="button" onClick={() => setCursor({ year: today.getFullYear(), month: today.getMonth() + 1 })} disabled={isCurrentMonth}>Today</button>{isLoading ? <p className="calendar-status">Loading calendar...</p> : loadError ? <p className="calendar-status calendar-status-error">Calendar events could not be loaded. Please refresh and try again.</p> : <><div className="calendar-weekdays">{weekdays.map((day) => <span key={day}>{day}</span>)}</div><div className="calendar-grid">{days.map((day, index) => <div className={`calendar-day ${day ? "" : "is-empty"} ${day && isCurrentMonth && day === today.getDate() ? "is-today" : ""} ${day === selectedDay ? "is-selected" : ""}`} key={`${day || "empty"}-${index}`} onClick={() => day && setSelectedDay(day)}>{day && <><span className="calendar-day-number">{day}</span>{(eventsByDay[day] || []).map((event) => <button type="button" className="calendar-event" key={event.id} onClick={(clickEvent) => { clickEvent.stopPropagation(); setSelectedEvent(event); }}>{event.image && <img src={event.image} alt="" className="calendar-event-image" />}{event.title}</button>)}</>}</div>)}</div></>}</section>
            <section className="calendar-upcoming"><div className="calendar-section-heading"><div><span className="calendar-eyebrow">THE MONTH AHEAD</span><h2>Events in {monthNames[cursor.month - 1]}</h2></div><strong>{monthEvents.length.toString().padStart(2, "0")} <small>EVENTS</small></strong></div>{!isLoading && !loadError && monthEvents.length === 0 ? <p className="text-muted">No events match your current filters.</p> : monthEvents.map((event) => <article key={event.id}><span>{String(event.day).padStart(2, "0")}</span>{event.image && <img className="calendar-event-thumb" src={event.image} alt="" /> }<div><h3>{event.title}</h3><p>{event.location}</p></div><button type="button" onClick={() => setSelectedEvent(event)}>View <BsArrowRight /></button></article>)}</section>
            {selectedEvent && <div className="calendar-dialog" role="dialog" aria-modal="true" aria-labelledby="calendar-dialog-title" onClick={(event) => event.target === event.currentTarget && setSelectedEvent(null)}><div>{selectedEvent.image && <img className="calendar-dialog-image" src={selectedEvent.image} alt={selectedEvent.title} />}<button className="calendar-dialog-close" type="button" onClick={() => setSelectedEvent(null)} aria-label="Close">×</button><span className="calendar-eyebrow">{selectedEvent.category}</span><h2 id="calendar-dialog-title">{selectedEvent.title}</h2><p>{selectedEvent.description}</p><p><strong>{selectedEvent.date}</strong> · {selectedEvent.location}</p>{selectedEvent.url && selectedEvent.url !== "#" && <a href={selectedEvent.url} target="_blank" rel="noreferrer">Open event source</a>}{selectedEvent.id && <Link to={`/events/${selectedEvent.id}`}>Open event details</Link>}</div></div>}
        </div>
    );
}