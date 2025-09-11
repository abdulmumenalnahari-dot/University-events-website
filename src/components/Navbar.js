import React, { useState } from 'react';
import { 
  BsPerson, 
  BsCalendarEvent, 
  BsEnvelope,
  BsList,
  BsHouseDoor,
  BsImages,
  BsInfoCircle,
   
} from 'react-icons/bs';
import { IoIosNotificationsOutline } from 'react-icons/io';
 
import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.css';
import {PATHS} from'../routes'

const Navbar = ({ navbarScrolled }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

 const navItems = [
  { path: PATHS.HOME, label: 'Home', icon: <BsHouseDoor size={16} />, activeKey: 'home' },
  { path: PATHS.ABOUT, label: 'About Us', icon: <BsInfoCircle size={16} />, activeKey: 'about' },
   { path: PATHS.EVENTS, label: 'Event Details', icon: <IoIosNotificationsOutline size={16} />, activeKey: 'events' },
  { path: PATHS.REGISTER, label: 'Registration', icon: <BsPerson size={16} />, activeKey: 'register' },
  { path: PATHS.FEEDBACK, label: 'feedback', icon: <BsPerson size={16} />, activeKey: 'register' },
  { path: PATHS.GALLERY, label: 'Gallery', icon: <BsImages size={16} />, activeKey: 'exhibition' },
  { path: PATHS.CONTACT, label: 'Contact Us', icon: <BsEnvelope size={16} />, activeKey: 'contact' },
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

        
         
        {/* Logo */}
        <div className="logo-container" onClick={() => window.location.href = '/'}>
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