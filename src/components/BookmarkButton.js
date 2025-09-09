import { useBookmarks } from '../utils/useBookmarks';

export default function BookmarkButton({item}){
  const { isBookmarked, toggle } = useBookmarks();
  const saved = isBookmarked(item.id);
  return (
    <button aria-label="Bookmark" className={"btn btn-sm " + (saved? "btn-warning":"btn-outline-warning")} onClick={()=>toggle(item)}>
      {saved ? "★" : "☆"}
    </button>
  )
}