import { useCallback, useEffect, useState } from 'react';

export function useLocalStorage(key, initial){
  const [value, setValue] = useState(()=>{
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : initial; }
    catch { return initial; }
  });
  useEffect(()=>{ localStorage.setItem(key, JSON.stringify(value)); }, [key,value]);
  return [value, setValue];
}

export function useBookmarks(){
  const [list, setList] = useLocalStorage('cc.bookmarks', []);
  const isBookmarked = useCallback((id)=> list.some(x=>x.id===id), [list]);
  const toggle = useCallback((item)=>{
    setList(prev=>{
      const exists = prev.some(x=>x.id===item.id);
      return exists ? prev.filter(x=>x.id!==item.id) : [...prev, item];
    });
  }, [setList]);
  return { list, isBookmarked, toggle };
}