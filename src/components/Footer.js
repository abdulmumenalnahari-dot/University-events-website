export default function Footer(){
  return (
    <footer className="py-4 bg-dark text-light mt-4">
      <div className="container d-flex flex-wrap justify-content-between gap-3 small">
        <div>© 2025 CampusConnect — All rights reserved.</div>
        <div className="d-flex gap-3">
          <a className="text-decoration-none text-warning" href="mailto:info@campusconnect.example" aria-label="Email">info@campusconnect.example</a>
          <span>|</span>
          <a className="text-decoration-none text-warning" href="tel:+971555000111" aria-label="Phone">+971 555 000 111</a>
        </div>
      </div>
    </footer>
  )
}