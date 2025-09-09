// src/components/Navbar.js
import { Link, NavLink } from 'react-router-dom';
import { PATHS } from '../routes'; 
 

export default function Navbar() {
  return (
    <>
    <div style={{ backgroundColor: '#528ac2ff' }} className="p-3 p-md-4 mb-4 rounded-3 shadow-sm">
    <nav aria-label="Primary navigation" className="mb-5">
            <ul
              className="nav justify-content-center flex-wrap gap-3"
              style={{ fontWeight: '600', fontSize: '1rem' }}
            >
              <li className="nav-item">
                <Link className="nav-link px-3 py-2 rounded text-primary border border-primary" to={PATHS.HOME}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-3 py-2 rounded text-secondary border border-secondary" to={PATHS.ABOUT}>
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-3 py-2 rounded text-success border border-success" to={PATHS.CALENDAR}>
                  Event Calendar
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-3 py-2 rounded text-dark border border-dark" to={PATHS.EVENTS}>
                  Event Details
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-3 py-2 rounded text-warning border border-warning" to={PATHS.REGISTER}>
                  Registration
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-3 py-2 rounded text-info border border-info" to= {PATHS.GALLERY}>
                  Gallery
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-3 py-2 rounded text-danger border border-danger" to= {PATHS.CONTACT}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>

    </div>
    </>
  );
}