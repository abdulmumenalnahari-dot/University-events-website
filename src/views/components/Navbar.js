import React, { useEffect, useState } from "react";
import {
  BsCalendar3,
  BsEnvelope,
  BsHouseDoor,
  BsImages,
  BsInfoCircle,
  BsList,
  BsPerson,
} from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css";
import { PATHS } from "../../routes";

const Navbar = ({ navbarScrolled }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    useEffect(() => {
      setIsMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, [location.pathname]);

  const navItems = [
    {
      path: PATHS.HOME,
      label: "Home",
      icon: <BsHouseDoor size={16} />,
      activeKey: "home",
    },
    {
      path: PATHS.ABOUT,
      label: "About Us",
      icon: <BsInfoCircle size={16} />,
      activeKey: "about",
    },
    {
      path: PATHS.EVENTS,
      label: "Events",
      icon: <BsCalendar3 size={16} />,
      activeKey: "events",
    },
    {
      path: PATHS.CALENDAR,
      label: "Calendar",
      icon: <BsCalendar3 size={16} />,
      activeKey: "calendar",
    },
    {
      path: PATHS.GALLERY,
      label: "Gallery",
      icon: <BsImages size={16} />,
      activeKey: "exhibition",
    },
    {
      path: PATHS.CONTACT,
      label: "Contact Us",
      icon: <BsEnvelope size={16} />,
      activeKey: "contact",
    },
    {
      path: PATHS.FEEDBACK,
      label: "Feedback",
      icon: <BsPerson size={16} />,
      activeKey: "feedback",
    },
    {
      path: PATHS.REGISTER,
      label: "Registration",
      icon: <BsPerson size={16} />,
      activeKey: "register",
    },
  ];

  const getActiveClass = (item) => {
    const isNestedRoute = item.path === PATHS.EVENTS && location.pathname.startsWith(`${PATHS.EVENTS}/`);
    if (location.pathname === item.path || isNestedRoute) {
      return `active-${item.activeKey}`;
    }
    return "";
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${navbarScrolled ? "scrolled" : ""}`}>
      <div className="left-section">
        <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Toggle navigation menu" aria-expanded={isMobileMenuOpen}>
          <BsList size={24} />
        </button>

        <Link to={PATHS.HOME} className="logo-container" aria-label="CampusConnect home">
          <span className="spin-button" title="CampusConnect home">
            <img src="/images/mau_en_logotype.svg" alt="Malmö University Logo" className="spin-button-img" />
          </span>
          <span className="brand">CampusConnect</span>
        </Link>
      </div>

      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.path} className="nav-item">
            <Link
              to={item.path}
              className={`nav-link ${getActiveClass(item)} ${item.activeKey === "register" ? "nav-cta" : ""}`}
              data-active={item.activeKey}
            >
              {item.icon}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <ul className="mobile-nav-links">
          {navItems.map((item) => (
            <li key={item.path} className="mobile-nav-item">
              <Link
                to={item.path}
                className={`mobile-nav-link ${getActiveClass(item)} ${item.activeKey === "register" ? "nav-cta" : ""}`}
                data-active={item.activeKey}
                onClick={closeMobileMenu}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
