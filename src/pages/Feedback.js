import { useEffect, useMemo, useState } from 'react';

const BASE_URL = process.env.PUBLIC_URL || '';

export default function Feedback(){
  const [name,setName]       = useState('');
  const [email,setEmail]     = useState('');
  const [role,setRole]       = useState('Student');
  const [eventId,setEventId] = useState('');
  const [rating,setRating]   = useState(5);
  const [comments,setComments] = useState('');

  const [events, setEvents]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const [preview, setPreview] = useState(null); // object | null

  useEffect(()=>{
    let alive = true;
    (async ()=>{
      try{
        const res = await fetch(`${BASE_URL}/data/events.json`, { headers: { 'Cache-Control': 'no-cache' }});
        if(!res.ok) throw new Error(`Failed to load events.json: ${res.status}`);
        const data = await res.json();
        if(!alive) return;

        // آخر 30 يومًا فقط
        const now = new Date();
        const past30 = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30);

        const filtered = (Array.isArray(data) ? data : [])
          .filter(e=>{
            const d = new Date(e.date);
            return !isNaN(d) && d >= past30 && d <= now;
          })
          .sort((a,b)=> new Date(b.date) - new Date(a.date));

        setEvents(filtered);
      }catch(err){
        console.error(err);
        setError('تعذّر تحميل قائمة الفعاليات. تأكّد من وجود /public/data/events.json.');
      }finally{
        setLoading(false);
      }
    })();
    return ()=>{ alive = false; };
  }, []);

  const monthEvents = useMemo(()=> events.map(e=>({
    id: e.id,
    label: `${e.title} — ${new Date(e.date).toLocaleDateString()}`
  })), [events]);

  const handleSubmit = (e)=>{
    e.preventDefault();

    // تحقّق بسيط إضافي للإيميل
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if(!emailOk){
      alert('الرجاء إدخال بريد إلكتروني صالح.');
      return;
    }
    if(!eventId){
      alert('الرجاء اختيار الفعالية التي حضرتها خلال آخر 30 يومًا.');
      return;
    }

    // UI Preview فقط — بدون إرسال
    const selected = events.find(x=>x.id === eventId);
    setPreview({
      name, email, role, rating, comments,
      event: selected ? `${selected.title} — ${new Date(selected.date).toLocaleDateString()}` : '—'
    });
  };

  return (
    <div className="container my-4">
      <h1 className="h3">Feedback (UI Demo Only)</h1>
      <p className="text-muted">
        هذا النموذج للعرض فقط — لا يتم حفظ أو إرسال أي بيانات.
      </p>

      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      <form className="row g-3" onSubmit={handleSubmit} noValidate>
        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input className="form-control" value={name} onChange={e=>setName(e.target.value)} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} required />
        </div>

        <div className="col-md-4">
          <label className="form-label">User Type</label>
          <select className="form-select" value={role} onChange={e=>setRole(e.target.value)}>
            <option>Student</option>
            <option>Faculty</option>
            <option>Visitor</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">
            Event Attended (last 30 days)
          </label>
          <select
            className="form-select"
            value={eventId}
            onChange={e=>setEventId(e.target.value)}
            disabled={loading || (!!error)}
            aria-busy={loading ? 'true' : 'false'}
          >
            <option value="">{loading ? 'Loading…' : 'Select…'}</option>
            {monthEvents.map(x=> <option key={x.id} value={x.id}>{x.label}</option>)}
          </select>
          {!loading && monthEvents.length === 0 && !error && (
            <div className="form-text">لا توجد فعاليات ضمن آخر 30 يومًا.</div>
          )}
        </div>

        <div className="col-md-4">
          <label className="form-label">Rating</label>
          <select className="form-select" value={rating} onChange={e=>setRating(Number(e.target.value))}>
            {[1,2,3,4,5].map(n=><option key={n} value={n}>{n}</option>)}
          </select>
        </div>

        <div className="col-12">
          <label className="form-label">Comments</label>
          <textarea className="form-control" rows="4" value={comments} onChange={e=>setComments(e.target.value)}></textarea>
        </div>

        <div className="col-12 d-flex gap-2">
          <button className="btn btn-primary" type="submit">Preview (no submit)</button>
          <button className="btn btn-outline-secondary" type="button" onClick={()=>{
            setName(''); setEmail(''); setRole('Student'); setEventId(''); setRating(5); setComments(''); setPreview(null);
          }}>Reset</button>
        </div>
      </form>

      {preview && (
        <div className="card shadow-sm mt-4">
          <div className="card-header">Preview</div>
          <div className="card-body">
            <div className="row g-2">
              <div className="col-md-4"><strong>Name:</strong> {preview.name}</div>
              <div className="col-md-4"><strong>Email:</strong> {preview.email}</div>
              <div className="col-md-4"><strong>User Type:</strong> {preview.role}</div>
              <div className="col-md-6"><strong>Event:</strong> {preview.event}</div>
              <div className="col-md-6"><strong>Rating:</strong> {preview.rating}</div>
              <div className="col-12"><strong>Comments:</strong><br/>{preview.comments || '—'}</div>
            </div>
            <div className="mt-3">
              <button className="btn btn-outline-primary btn-sm" type="button" onClick={()=>setPreview(null)}>Close Preview</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
