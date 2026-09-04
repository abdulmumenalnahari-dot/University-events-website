import React from "react";

const FilterBar = ({
  search,
  setSearch,
  category,
  setCategory,
  categories = [],
  sort,
  setSort,
}) => {
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
          {categories.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)} ({cat.count})
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
          <option value="category-asc">Category (A-Z)</option>
          <option value="pop-desc">Most Popular</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;