import { useEffect, useMemo, useState } from 'react';

const BASE_URL = process.env.PUBLIC_URL || '';

export default function Gallery(){
  const [list, setList]   = useState([]);
  const [group, setGroup] = useState('year');       // 'year' | 'category'
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(()=>{
    let alive = true;

    async function load(){
      try{
        const res = await fetch(`${BASE_URL}/data/gallery.json`, { headers: { 'Cache-Control': 'no-cache' }});
        if(!res.ok) throw new Error(`Failed to load gallery.json: ${res.status}`);
        const data = await res.json();
        if(!alive) return;
        setList(Array.isArray(data) ? data : []);
      }catch(err){
        console.error(err);
        setError('تعذّر تحميل المعرض. تأكّد من وجود /public/data/gallery.json.');
      }finally{
        setLoading(false);
      }
    }
    load();
    return ()=>{ alive = false; };
  }, []);

  const options = useMemo(()=>{
    const vals = list.map(x => group === 'year' ? x.year : x.category).filter(Boolean);
    return Array.from(new Set(vals));
  }, [list, group]);

  const groups = useMemo(()=>{
    const map = new Map();
    const keyFn = group === 'year' ? (x=>x.year) : (x=>x.category);
    list.forEach(item=>{
      const key = keyFn(item) || 'Unspecified';
      if (filter && key !== filter) return;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(item);
    });
    return Array.from(map.entries());
  }, [list, group, filter]);

  if (loading){
    return (
      <div className="container my-4">
        <h1 className="h3">Gallery</h1>
        <div className="row g-3">
          {[...Array(6)].map((_,i)=>(
            <div className="col-sm-6 col-md-4" key={i}>
              <div className="card shadow-sm">
                <div className="placeholder" style={{height:180}}></div>
                <div className="card-body">
                  <div className="placeholder-glow">
                    <span className="placeholder col-8"></span>
                    <span className="placeholder col-6"></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h1 className="h3">Gallery</h1>

      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      <div className="row g-2 align-items-end mb-3">
        <div className="col-6 col-md-3">
          <label className="form-label">Group by</label>
          <select
            className="form-select"
            value={group}
            onChange={e=>{ setGroup(e.target.value); setFilter(''); }}
          >
            <option value="year">Year</option>
            <option value="category">Category</option>
          </select>
        </div>
        <div className="col-6 col-md-3">
          <label className="form-label">Filter</label>
          <select
            className="form-select"
            value={filter}
            onChange={e=>setFilter(e.target.value)}
          >
            <option value="">All</option>
            {options.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      </div>

      {groups.length === 0 && !error && (
        <div className="text-muted">لا توجد عناصر للعرض.</div>
      )}

      {groups.map(([key, items])=>(
        <section key={key} className="mb-4">
          <h2 className="h5">{key}</h2>
          <div className="grid">
            {items.map(g=>(
              <figure key={g.id} className="card shadow-sm">
                <img
                  className="card-img-top"
                  src={
                    g.image?.startsWith('/')
                      ? `${BASE_URL}${g.image}`
                      : (g.image || `${BASE_URL}/images/banner1.svg`)
                  }
                  alt={g.title}
                />
                <figcaption className="card-body">
                  <div className="fw-semibold">{g.title}</div>
                  <div className="text-muted small">
                    {(g.category || 'Uncategorized')} • {(g.year || 'Unknown')}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
