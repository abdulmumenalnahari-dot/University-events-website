import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookmarkButton from './BookmarkButton';
import Countdown from './Countdown';

const BASE_URL = process.env.PUBLIC_URL || '';

export default function EventCard({ evt, evtId }) {
  const [data, setData]     = useState(evt || null);
  const [loading, setLoad]  = useState(!evt && !!evtId);
  const [error, setError]   = useState('');

  useEffect(()=>{
    let alive = true;
    // إذا ما وصل evt لكن عندنا evtId: جيب الحدث من events.json
    if (!evt && evtId){
      (async ()=>{
        try{
          const res = await fetch(`${BASE_URL}/data/events.json`, { headers:{'Cache-Control':'no-cache'} });
          if(!res.ok) throw new Error(`events.json ${res.status}`);
          const list = await res.json();
          if(!alive) return;
          const found = Array.isArray(list) ? list.find(x => x.id === evtId) : null;
          if (!found) { setError('الحدث غير موجود في events.json'); }
          setData(found || null);
        }catch(ex){
          console.error(ex);
          setError('تعذّر تحميل بيانات الحدث.');
        }finally{
          if (alive) setLoad(false);
        }
      })();
    }
    return ()=>{ alive = false; };
  }, [evt, evtId]);

 

  

  const dt = new Date(data.date);
  const pretty = !isNaN(dt)
    ? dt.toLocaleDateString(undefined, { year:'numeric', month:'short', day:'2-digit' })
    : data.date || '—';

  const thumb = data.thumbnail?.startsWith('/')
    ? `${BASE_URL}${data.thumbnail}`
    : (data.thumbnail || `${BASE_URL} `);

  return (
    <>
   
    <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden hover-lift">
       
      <img
        src={thumb}
        className="card-img-top"
        alt={data.title}
        style={{ height: '180px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column p-3">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
          <h5 className="card-title mb-1 fw-bold text-dark">{data.title}</h5>
          <BookmarkButton item={data} />
        </div>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="text-muted small">
            📅 {pretty} • ⏰ {data.time} • 📍 {data.venue}
          </div>
          <Countdown dateString={data.date} />
        </div>

        <p className="card-text flex-fill text-secondary small mb-3">
          {data.description}
        </p>

        <div className="d-flex flex-wrap gap-2 mt-auto">
          {data.department && <span className="badge bg-secondary rounded-pill">{data.department}</span>}
          {data.category && <span className="badge bg-info text-dark rounded-pill">{data.category}</span>}
          {typeof data.popularity === 'number' && (
            <span className="badge bg-light text-dark border rounded-pill">👍 {data.popularity}</span>
          )}
        </div>

        <Link
          to={`/events/${data.id}`}
          className="btn btn-sm btn-outline-primary mt-3 rounded-pill"
        >
          Learn More →
        </Link>
      </div>
    </div>
    </>
  );
}
