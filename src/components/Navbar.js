import React, { useState } from "react";
import {
  BsPerson,
  BsEnvelope,
  BsList,
  BsHouseDoor,
  BsImages,
  BsInfoCircle,

  
} from "react-icons/bs";
import { IoIosNotificationsOutline ,IoIosStarOutline} from "react-icons/io";
import { MdStarOutline } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css";
import { PATHS } from "../routes";

const Navbar = ({ navbarScrolled }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      label: "Event Details",
      icon: <IoIosNotificationsOutline size={16} />,
      activeKey: "events",
    },
  {
      path: PATHS.FAVORITES,
      label: "favorites",
      icon: <MdStarOutline size={16} />,
      activeKey: "favorites ",
    },
    {
      path: PATHS.REGISTER,
      label: "Registration",
      icon: <BsPerson size={16} />,
      activeKey: "register",
    },
    {
      path: PATHS.FEEDBACK,
      label: "feedback",
      icon: <BsPerson size={16} />,
      activeKey: "feedback",
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
  ];

  const getActiveClass = (item) => {
    if (location.pathname === item.path) {
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

  const handleSpinButtonClick = () => {};

  return (
    <nav className={`navbar ${navbarScrolled ? "scrolled" : ""}`}>
      <div className="left-section">
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <BsList size={24} />
        </button>

        <div
          className="logo-container"
          onClick={() => (window.location.href = "/")}
        >
          <button
            className="spin-button"
            onClick={handleSpinButtonClick}
            title="Rotate me!"
          >
            <img
              src="/images/mau_en_logotype.svg"
              alt="Malmö University Logo"
              className="spin-button-img"
            />
          </button>
          <span className="brand">Event Platform</span>
        </div>
      </div>

      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.path} className="nav-item">
            <Link
              to={item.path}
              className={`nav-link ${getActiveClass(item)}`}
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
                className={`mobile-nav-link ${getActiveClass(item)}`}
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
