import React, { useEffect, useState } from "react";
import { BsArrowRight, BsEnvelope, BsFacebook, BsGeoAlt, BsTelephone, BsWhatsapp } from "react-icons/bs";
import CoordinatorsList from "../components/CoordinatorsList";
import MapEmbed from "../components/MapEmbed";
import "../styles/Contact.css";

const contactInfo = {
  email: "anasahmedmohammedkasem@gmail.com",
  phone: "+46 40 665 70 00",
  address: "Malmö University, 205 06 Malmö, Sweden",
  whatsapp: "771644308",
  facebook: "https://www.facebook.com",
};

export default function Contact() {
  const [coordinators, setCoordinators] = useState([]);

  useEffect(() => {
    fetch("/data/coordinators.json")
      .then((response) => (response.ok ? response.json() : []))
      .then((data) => setCoordinators(Array.isArray(data) ? data : []))
      .catch(() => setCoordinators([]));
  }, []);

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-inner">
          <div>
            <span className="contact-eyebrow">WE ARE HERE TO HELP</span>
            <h1 className="contact-title">Let’s keep campus connected.</h1>
            <p className="contact-subtitle">Questions about an event, registration, or getting involved? Find a useful answer or send the team a message.</p>
            <div className="contact-hero-links"><a href="#contact-location">View campus location <BsArrowRight /></a></div>
          </div>
          <div className="contact-hero-note"><span>Response time</span><strong>1–2 days</strong><small>during weekdays</small></div>
        </div>
      </section>

      <section className="contact-container contact-quick-grid" aria-label="Contact details">
        <a className="contact-quick-card" href={`mailto:${contactInfo.email}`}><span className="contact-icon"><BsEnvelope /></span><span><small>Email the team</small><strong>{contactInfo.email}</strong></span><BsArrowRight /></a>
        <a className="contact-quick-card" href={`tel:${contactInfo.phone.replaceAll(" ", "")}`}><span className="contact-icon contact-icon-teal"><BsTelephone /></span><span><small>Call the switchboard</small><strong>{contactInfo.phone}</strong></span><BsArrowRight /></a>
        <a className="contact-quick-card" href="#contact-location"><span className="contact-icon contact-icon-gold"><BsGeoAlt /></span><span><small>Visit the campus</small><strong>Malmö, Sweden</strong></span><BsArrowRight /></a>
      </section>

      <section className="contact-container contact-social-grid" aria-label="Social contact links">
        <a className="contact-social-card contact-social-whatsapp" href={`https://wa.me/${contactInfo.whatsapp}`} target="_blank" rel="noreferrer"><span className="contact-social-icon"><BsWhatsapp /></span><span><small>Chat with us</small><strong>WhatsApp</strong></span><span className="contact-social-arrow">↗</span></a>
        <a className="contact-social-card contact-social-facebook" href={contactInfo.facebook} target="_blank" rel="noreferrer"><span className="contact-social-icon"><BsFacebook /></span><span><small>Visit Facebook</small><strong>Facebook</strong></span><span className="contact-social-arrow">↗</span></a>
      </section>

      <section className="contact-container contact-location" id="contact-location"><div className="contact-location-head"><div><span className="contact-eyebrow">COME BY</span><h2>Find Malmö University.</h2><p>{contactInfo.address}</p></div><div><strong>Opening information</strong><span>Weekdays 08:00–16:00</span><small>Hours may vary during summer and public holidays.</small></div></div><MapEmbed /></section>

      <section className="contact-container contact-coordinators"><div className="contact-section-heading"><div><span className="contact-eyebrow">PEOPLE TO KNOW</span><h2>Connect with coordinators.</h2></div><p>Find student and faculty contacts who help shape campus events.</p></div><CoordinatorsList coordinators={coordinators} /></section>
    </div>
  );
}
