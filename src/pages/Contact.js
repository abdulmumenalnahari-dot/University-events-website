import { useEffect, useState } from 'react';
import MapEmbed from '../components/MapEmbed';

export default function Contact(){
  const [contacts, setContacts] = useState([]);
  const [coords, setCoords] = useState(null);
  const [geoError, setGeoError] = useState('');

  useEffect(()=>{ fetch('/data/contacts.json').then(r=>r.json()).then(setContacts); },[]);

  const geo = ()=>{
    if(!('geolocation' in navigator)){ setGeoError('Geolocation not supported'); return; }
    navigator.geolocation.getCurrentPosition(
      pos => { setCoords(pos.coords); setGeoError(''); },
      err => { setGeoError(err.message); }
    );
  };

  return (
    <div className="container my-4">
      <h1 className="h3">Contact</h1>
      <div className="row g-4">
        <div className="col-lg-6">
          <h2 className="h5">Coordinators</h2>
          <div className="list-group">
            {contacts.map(c=>(
              <div key={c.email} className="list-group-item">
                <div className="fw-semibold">{c.name}</div>
                <div className="text-muted small">{c.role} • {c.department}</div>
                <div><a href={`mailto:${c.email}`}>{c.email}</a> • <a href={`tel:${c.phone}`}>{c.phone}</a></div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-lg-6">
          <h2 className="h5">Locate Us</h2>
          <MapEmbed query="XYZ College" />
          <div className="mt-3">
            <button className="btn btn-outline-primary btn-sm" onClick={geo}>Use my GPS (demo)</button>
            {coords && <p className="small mt-2 mb-0">Your coords: {coords.latitude.toFixed(5)}, {coords.longitude.toFixed(5)}. <a target="_blank" rel="noreferrer" href={`https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`}>Open in Maps</a></p>}
            {geoError && <p className="small text-danger mt-2 mb-0">{geoError}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}