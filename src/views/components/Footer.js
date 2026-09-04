import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowUp, BsCalendar3, BsEnvelope, BsFacebook, BsGeoAlt, BsWhatsapp } from "react-icons/bs";
import "../styles/Footer.css";

const Footer = () => {
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    fetch("/data/coordinators.json")
      .then((response) => (response.ok ? response.json() : []))
      .then((data) => setDevelopers(Array.isArray(data) ? data.slice(0, 2) : []))
      .catch(() => setDevelopers([]));
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-column footer-intro">
            <div className="footer-brand-lockup"><span className="footer-mark"><BsCalendar3 /></span><div><div className="footer-brand">CampusConnect</div><span className="footer-tagline">YOUR CAMPUS, IN ONE PLACE</span></div></div>
            <p>One clear place to discover, save, and join university events.</p>
            <a className="footer-email" href="mailto:anasahmedmohammedkasem@gmail.com"><BsEnvelope /> anasahmedmohammedkasem@gmail.com</a>
            <div className="footer-socials" aria-label="Social contact links"><a className="footer-whatsapp" href="https://wa.me/771644308" target="_blank" rel="noreferrer" aria-label="Contact us on WhatsApp" title="WhatsApp"><BsWhatsapp /></a><a className="footer-facebook" href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Visit Facebook" title="Facebook"><BsFacebook /></a></div>
          </div>

          <div className="footer-column">
            <span className="footer-section-label">01</span><h2 className="footer-subtitle">Explore</h2>
            <Link className="footer-link" to="/events">All events</Link>
            <Link className="footer-link" to="/calendar">Event calendar</Link>
            <Link className="footer-link" to="/gallery">Gallery</Link>
          </div>

          <div className="footer-column">
            <span className="footer-section-label">02</span><h2 className="footer-subtitle">Campus</h2>
            <Link className="footer-link" to="/about">Our university</Link>
            <Link className="footer-link" to="/contact">Contact team</Link>
            <Link className="footer-link" to="/feedback">Share feedback</Link>
            <Link className="footer-link" to="/register">Join the community</Link>
          </div>

          <div className="footer-column footer-contact footer-contact-panel">
            <span className="footer-section-label">03</span><h2 className="footer-subtitle">Find us</h2>
            <p><BsGeoAlt /> Malmö University<br /><span>Nordenskiöldsgatan 1<br />211 19 Malmö, Sweden</span></p>
            <Link className="footer-contact-link" to="/contact">Get in touch <span aria-hidden="true">↗</span></Link>
          </div>

        </div>

        <div className="footer-meta">
          <div>
            <p className="footer-credit">© {new Date().getFullYear()} CampusConnect · Built by Eng. Anas Al-Rifai</p>
            {developers.length > 0 && <p className="footer-developers"> </p>}
          </div>
          <button className="back-to-top" onClick={scrollToTop} type="button"><BsArrowUp /> Back to top</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
