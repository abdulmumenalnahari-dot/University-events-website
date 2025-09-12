
export const fetchAndSortEvents = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to load events");
    const data = await response.json();

    const sortedEvents = data.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });

    return sortedEvents;
  } catch (err) {
    console.error("Error fetching and sorting events:", err);
    return [];
  }
};