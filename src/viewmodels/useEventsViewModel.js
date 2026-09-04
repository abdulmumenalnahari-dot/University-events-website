import { useEffect, useMemo, useState } from "react";
import { filterAndSortEvents, getEvents } from "../models/eventModel";

const EVENTS_PER_PAGE = 6;

export function useEventsViewModel() {
  const [allEvents, setAllEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("date-desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    getEvents()
      .then(setAllEvents)
      .catch((loadError) => {
        console.error("Failed to load events:", loadError);
        setError("Failed to load events.");
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredAndSortedEvents = useMemo(
    () => filterAndSortEvents(allEvents, { search, category, sort }),
    [allEvents, search, category, sort]
  );

  const categories = useMemo(() => {
    const counts = allEvents.reduce((result, event) => {
      const eventCategory = String(event.category || "").trim().toLowerCase();
      if (eventCategory) result[eventCategory] = (result[eventCategory] || 0) + 1;
      return result;
    }, {});

    return Object.entries(counts)
      .sort(([first], [second]) => first.localeCompare(second))
      .map(([name, count]) => ({ name, count }));
  }, [allEvents]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, sort]);

  const displayedEvents = filteredAndSortedEvents.slice(0, currentPage * EVENTS_PER_PAGE);
  const hasMoreEvents = displayedEvents.length < filteredAndSortedEvents.length;

  const loadMoreEvents = () => {
    if (isLoadingMore || !hasMoreEvents) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setCurrentPage((page) => page + 1);
      setIsLoadingMore(false);
    }, 400);
  };

  return {
    search,
    setSearch,
    category,
    setCategory,
    categories,
    sort,
    setSort,
    loading,
    error,
    displayedEvents,
    filteredAndSortedEvents,
    hasMoreEvents,
    isLoadingMore,
    loadMoreEvents,
  };
}
