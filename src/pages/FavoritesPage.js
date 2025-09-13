import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      let savedEvents = JSON.parse(localStorage.getItem("allEvents")) || [];

      if (savedEvents.length === 0) {
        try {
          const response = await fetch("/data/events.json");
          if (response.ok) {
            savedEvents = await response.json();
            localStorage.setItem("allEvents", JSON.stringify(savedEvents));
          }
        } catch (err) {
          console.error("Failed to load events in FavoritesPage:", err);
          return;
        }
      }

      const favoriteEvents = savedEvents.filter(event => 
        savedFavorites.includes(Number(event.id))
      );
      setFavorites(favoriteEvents);
    };

    loadFavorites();
  }, []);

  const handleFavoriteToggle = (eventId) => {
    setFavorites(prev => prev.filter(event => event.id !== eventId));
  };

  return (
    <div className="container my-5">
      {favorites.length === 0 ? (
        <div className="text-center py-5">
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {favorites.map(event => (
            <div className="col" key={event.id}>
              <EventCard event={event} onFavoriteToggle={handleFavoriteToggle} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;