import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { getEvents } from "../../models/eventModel";
import { useBookmarks } from "../../viewmodels/useBookmarks";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const { list } = useBookmarks();

  useEffect(() => {
    getEvents().then((events) => setFavorites(events.filter((event) => list.includes(Number(event.id)))));
  }, [list]);

  return (
    <div className="container my-5">
      {favorites.length === 0 ? (
        <div className="text-center py-5">
          <h1 className="h3">Your saved events</h1>
          <p className="text-muted">Save an event from the catalog and it will appear here.</p>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {favorites.map(event => (
            <div className="col" key={event.id}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;