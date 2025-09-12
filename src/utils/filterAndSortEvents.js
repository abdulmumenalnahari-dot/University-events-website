// src/utils/filterAndSortEvents.js

export const filterAndSortEvents = (events, { search = "", category = "", sort = "date-desc" }) => {
  const term = search.toLowerCase().trim();
  const cat = category.toLowerCase().trim();

  let arr = events.filter((e) => {
    // ✅ إذا لم يكن هناك تصنيف محدد، اعرض الجميع
    if (!cat || cat === "all") return true;

    // ✅ إذا كان هناك تصنيف، تحقق من الحقل `category`
    const eCat = (e.category || "").toLowerCase();
    return eCat === cat;
  });

  // ✅ بحث
  arr = arr.filter((e) => {
    const inTerm =
      !term ||
      (e.title || "").toLowerCase().includes(term) ||
      (e.description || "").toLowerCase().includes(term) ||
      (e.tags || []).some(tag => tag.toLowerCase().includes(term));
    return inTerm;
  });

  // ✅ الترتيب
  arr.sort((a, b) => {
    if (sort === "date-asc") return new Date(a.date) - new Date(b.date);
    if (sort === "date-desc") return new Date(b.date) - new Date(a.date);
    if (sort === "name-asc")
      return (a.title || "").localeCompare(b.title || "");
    if (sort === "pop-desc") return (b.popularity || 0) - (a.popularity || 0);
    return 0;
  });

  return arr;
};