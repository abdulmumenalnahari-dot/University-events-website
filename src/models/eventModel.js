const EVENTS_URL = "/data/Events.json";

export async function getEvents(url = EVENTS_URL) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const events = await response.json();
  return Array.isArray(events) ? events : [];
}

export function filterAndSortEvents(events, { search = "", category = "", sort = "date-desc" }) {
  const term = search.toLowerCase().trim();
  const selectedCategory = category.toLowerCase().trim();

  return events
    .filter((event) => {
      if (!selectedCategory || selectedCategory === "all") return true;
      return (event.category || "").toLowerCase() === selectedCategory;
    })
    .filter((event) => {
      if (!term) return true;
      return (
        (event.title || "").toLowerCase().includes(term) ||
        (event.description || "").toLowerCase().includes(term) ||
        (event.tags || []).some((tag) => tag.toLowerCase().includes(term))
      );
    })
    .sort((first, second) => {
      if (sort === "date-asc") return new Date(first.date) - new Date(second.date);
      if (sort === "date-desc") return new Date(second.date) - new Date(first.date);
      if (sort === "name-asc") return (first.title || "").localeCompare(second.title || "");
      if (sort === "category-asc") return (first.category || "").localeCompare(second.category || "");
      if (sort === "pop-desc") return (second.popularity || 0) - (first.popularity || 0);
      return 0;
    });
}
