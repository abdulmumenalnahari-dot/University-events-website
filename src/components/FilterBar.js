export default function FilterBar({search,setSearch,category,setCategory,sort,setSort}){
  return (
    <form className="row g-2 align-items-end mb-3" onSubmit={e=>e.preventDefault()}>
      <div className="col-12 col-md-5">
        <label className="form-label">Search by name or department</label>
        <input className="form-control" placeholder="e.g. TechFest or CSE" value={search} onChange={e=>setSearch(e.target.value)} />
      </div>
      <div className="col-6 col-md-3">
        <label className="form-label">Category</label>
        <select className="form-select" value={category} onChange={e=>setCategory(e.target.value)}>
          <option value="">All</option>
          <option>Academic</option>
          <option>Cultural</option>
          <option>Sports</option>
        </select>
      </div>
      <div className="col-6 col-md-3">
        <label className="form-label">Sort by</label>
        <select className="form-select" value={sort} onChange={e=>setSort(e.target.value)}>
          <option value="date-asc">Date (Upcoming)</option>
          <option value="date-desc">Date (Recent first)</option>
          <option value="name-asc">Name (A–Z)</option>
          <option value="pop-desc">Popularity (high→low)</option>
        </select>
      </div>
      <div className="col-12 col-md-1">
        <button className="btn btn-outline-secondary w-100" type="button" onClick={()=>{setSearch('');setCategory('');setSort('date-asc')}}>Reset</button>
      </div>
    </form>
  )
}