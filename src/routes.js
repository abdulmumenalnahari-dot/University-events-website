// src/routes.js
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';      // ← تأكد من وجودها
import Gallery from './pages/Gallery';    // ← تأكد من وجودها
import Feedback from './pages/Feedback';
import Contact from './pages/Contact';
import Calendar from './pages/calendar';
import Register from './pages/register';


// ✅ كائن PATHS موحد — تستخدمه في الروابط والتنقل والـ useRoutes
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

// ✅ مسارات التطبيق لاستخدامها مع useRoutes
const routes = [
  { path: PATHS.HOME, element: <Home /> },
  { path: PATHS.ABOUT, element: <About /> },
  { path: PATHS.EVENTS, element: <Events /> },
  { path: PATHS.GALLERY, element: <Gallery /> },
  { path: PATHS.FEEDBACK, element: <Feedback /> },
  { path: PATHS.CONTACT, element: <Contact /> },
   { path: PATHS.CALENDAR , element: <Calendar /> },
   { path: PATHS.REGISTER , element: <Register /> },
];

export default routes;