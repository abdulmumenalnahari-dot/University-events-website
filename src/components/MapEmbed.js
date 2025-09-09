export default function MapEmbed({query='XYZ College'}){
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  return (
    <div className="ratio ratio-16x9 rounded shadow-sm border">
      <iframe title="College Map" src={src} allowFullScreen loading="lazy"></iframe>
    </div>
  )
}