import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "favorites";
const LEGACY_KEY = "cc.bookmarks";

function readBookmarkIds() {
  try {
    const current = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(current)) return current.map((item) => Number(item.id ?? item)).filter(Boolean);
    const legacy = JSON.parse(localStorage.getItem(LEGACY_KEY));
    return Array.isArray(legacy) ? legacy.map((item) => Number(item.id ?? item)).filter(Boolean) : [];
  } catch {
    return [];
  }
}

export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => { localStorage.setItem(key, JSON.stringify(value)); }, [key, value]);
  return [value, setValue];
}

export function useBookmarks() {
  const [list, setList] = useLocalStorage(STORAGE_KEY, readBookmarkIds());
  const isBookmarked = useCallback((id) => list.includes(Number(id)), [list]);
  const toggle = useCallback((item) => {
    const eventId = Number(item.id);
    setList((previous) => previous.includes(eventId)
      ? previous.filter((id) => id !== eventId)
      : [...previous, eventId]);
  }, [setList]);
  return { list, isBookmarked, toggle };
}