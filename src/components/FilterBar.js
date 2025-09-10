// src/components/FilterBar.jsx

import React from "react";

const FilterBar = ({ search, setSearch, category, setCategory, sort, setSort }) => {
  // ✅ جمع جميع الفئات من(events + sports)
  const allCategories = [
    "culture",
    "sports",
    "tech",
    "arts",
    "education",
    "all"
  ];

  return (
    <div className="row g-3 mb-4">
      {/* بحث */}
      <div className="col-md-6 col-lg-4">
        <input
          type="text"
          placeholder="ابحث في الأحداث..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control p-3"
          style={{ borderRadius: "50px", fontSize: "1rem" }}
        />
      </div>

      {/* تصنيف */}
      <div className="col-md-6 col-lg-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-select p-3"
          style={{ borderRadius: "50px" }}
        >
          <option value="">كل الفئات</option>
          {allCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "culture" && "الثقافه"}
              {cat === "sports" && "الرياضة"}
              {cat === "tech" && "التقنية"}
              {cat === "arts" && "الفنون"}
              {cat === "education" && "التعليم"}
              {cat === "all" && "الكل"}
            </option>
          ))}
        </select>
      </div>

      {/* ترتيب */}
      <div className="col-md-6 col-lg-4">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="form-select p-3"
          style={{ borderRadius: "50px" }}
        >
          <option value="date-desc">الأحدث أولاً</option>
          <option value="date-asc">الأقدم أولاً</option>
          <option value="name-asc">الاسم (أ-ي)</option>
          <option value="pop-desc">الأكثر شعبية</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;