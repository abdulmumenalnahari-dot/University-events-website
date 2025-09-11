import React, { useState } from 'react';
import { 
  BsFillMoonStarsFill, 
  BsPerson, 
  BsCalendarEvent, 
  BsEnvelope,
  BsList,
  BsHouseDoor,
  BsImages,
  BsInfoCircle,
  BsGear
} from 'react-icons/bs';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { BiMessageRounded } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = ({ navbarScrolled }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: <BsHouseDoor size={16} />, activeKey: 'home' },
    { path: '/about', label: 'About Us', icon: <BsInfoCircle size={16} />, activeKey: 'about' },
    { path: '/calendar', label: 'Event Calendar', icon: <BsCalendarEvent size={16} />, activeKey: 'calendar' },
    { path: '/events', label: 'Event Details', icon: <IoIosNotificationsOutline size={16} />, activeKey: 'events' },
    { path: '/register', label: 'Registration', icon: <BsPerson size={16} />, activeKey: 'register' },
    { path: '/exhibition', label: 'Gallery', icon: <BsImages size={16} />, activeKey: 'exhibition' },
    { path: '/contact', label: 'Contact Us', icon: <BsEnvelope size={16} />, activeKey: 'contact' },
  ];

  // تحديد الزر النشط بناءً على المسار الحالي
  const getActiveClass = (item) => {
    return location.pathname === item.path ? 'active' : '';
  };

  // تبديل حالة القائمة المحمولة
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // إغلاق القائمة المحمولة عند النقر على رابط
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // دالة لمعالجة النقر على زر الدوران
  const handleSpinButtonClick = () => {
    
    // يمكنك إضافة أي منطق إضافي هنا
  };

  return (
    <nav className={`navbar ${navbarScrolled ? 'scrolled' : ''}`}>
      {/* قسم اليسار: زر القائمة والشعار وزر الدوران */}
      <div className="left-section">
        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <BsList size={24} />
        </button>

        
        <button 
          className="spin-button" 

          onClick={handleSpinButtonClick}
          title="Rotate me!"
           
        >
           <img 
            src="/images/logo.png" 
            alt="Logo" 
            className="spin-button-img"
          />
        </button>

        {/* Logo */}
        <div className="logo-container" onClick={() => window.location.href = '/'}>
          <BsFillMoonStarsFill size={24} className="logo-icon" />
          <span className="brand">Event Platform</span>
        </div>
      </div>

      {/* Desktop Navigation Links */}
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

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
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