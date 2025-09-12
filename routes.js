// src/routes/index.js (أو نفس ملفك الذي عرضته)
import React, { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import Home from './src/pages/Home';
import About from './src/pages/About';
import Events from './src/pages/Events';
import Gallery from './src/pages/Gallery';
import Feedback from './src/pages/Feedback';
import Contact from './src/pages/Contact';
import Calendar from './src/pages/calendar';
import Register from './src/pages/register';

export const PATHS = {
  HOME: '/',
  ABOUT: '/about',
  EVENTS: '/events',
  GALLERY: '/gallery',
  FEEDBACK: '/feedback',
  CONTACT: '/contact',
  CALENDAR: '/calendar',
  REGISTER: '/register',
};

/* ========================
   1) عنوان المتصفح تلقائيًا
   ======================== */
const TITLE_MAP = {
  [PATHS.HOME]: 'Home',
  [PATHS.ABOUT]: 'About Us',
  [PATHS.EVENTS]: 'Event Details',
  [PATHS.GALLERY]: 'Gallery',
  [PATHS.FEEDBACK]: 'Feedback',
  [PATHS.CONTACT]: 'Contact Us',
  [PATHS.CALENDAR]: 'Calendar',
  [PATHS.REGISTER]: 'Registration',
};

const BRAND = 'Event Platform';

function PageTitle({ title, children }) {
  useEffect(() => {
    document.title = title ? `${title} | ${BRAND}` : BRAND;
  }, [title]);
  return children;
}

/* =========================================
   2) تمويه الروابط (اختياري) + فك التمويه
   ========================================= */
const SALT = 0x7a;
const b64u = (bin) => btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/,'');
const ub64 = (s) => atob(s.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(s.length/4)*4, '='));

export function encodePath(path) {
  try {
    const bytes = new TextEncoder().encode(path);
    let bin = '';
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i] ^ SALT);
    return `/p/${b64u(bin)}`;
  } catch {
    return path;
  }
}

function ObfRedirect() {
  const { c } = useParams();
  try {
    const bin = ub64(c || '');
    const bytes = Uint8Array.from(bin, ch => ch.charCodeAt(0) ^ SALT);
    const path = new TextDecoder().decode(bytes);
    return <Navigate to={path || PATHS.HOME} replace />;
  } catch {
    return <Navigate to={PATHS.HOME} replace />;
  }
}

/* ===========
   تعريف المسارات
   =========== */
const routes = [
  // مسار فك التمويه (اختياري للاستخدام عند مشاركة /p/<code>)
  { path: '/p/:c', element: <ObfRedirect /> },

  { path: PATHS.HOME, element:
    <PageTitle title={TITLE_MAP[PATHS.HOME]}><Home /></PageTitle> },

  { path: PATHS.ABOUT, element:
    <PageTitle title={TITLE_MAP[PATHS.ABOUT]}><About /></PageTitle> },

  { path: `${PATHS.EVENTS}/*`, element:
    <PageTitle title={TITLE_MAP[PATHS.EVENTS]}><Events /></PageTitle> },

  { path: PATHS.GALLERY, element:
    <PageTitle title={TITLE_MAP[PATHS.GALLERY]}><Gallery /></PageTitle> },

  { path: PATHS.FEEDBACK, element:
    <PageTitle title={TITLE_MAP[PATHS.FEEDBACK]}><Feedback /></PageTitle> },

  { path: PATHS.CONTACT, element:
    <PageTitle title={TITLE_MAP[PATHS.CONTACT]}><Contact /></PageTitle> },

  { path: PATHS.CALENDAR, element:
    <PageTitle title={TITLE_MAP[PATHS.CALENDAR]}><Calendar /></PageTitle> },

  { path: PATHS.REGISTER, element:
    <PageTitle title={TITLE_MAP[PATHS.REGISTER]}><Register /></PageTitle> },
];

export default routes;
