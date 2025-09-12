// src/components/FilterBar.jsx
import React from "react";

const FilterBar = ({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
}) => {
  // التصنيفات المطلوبة في SRS
  const allCategories = ["academic", "cultural", "sports", "departmental"];

  return (
    <div className="row g-3 mb-4">
      <div className="col-md-6 col-lg-4">
        <input
          type="text"
          placeholder="Search in events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
        />
      </div>

      <div className="col-md-6 col-lg-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-select"
        >
          <option value="">All Categories</option>
          {allCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-6 col-lg-4">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="form-select"
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="pop-desc">Most Popular</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;