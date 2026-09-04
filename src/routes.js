import Home from './views/pages/Home';
import About from './views/pages/About';
import Events from './views/pages/Events';
import Gallery from './views/pages/Gallery';
import Feedback from './views/pages/Feedback';
import Contact from './views/pages/Contact';
import Calendar from './views/pages/calendar';
import Register from './views/pages/register';
import FavoritesPage from './views/pages/FavoritesPage';
import NotFound from './views/pages/NotFound';

export const PATHS = {
  HOME: '/',
  ABOUT: '/about',
  EVENTS: '/events',
  GALLERY: '/gallery',
  FEEDBACK: '/feedback',
  CONTACT: '/contact',
  CALENDAR: '/calendar',
  REGISTER: '/register',
  FAVORITES: '/favorites',
};

const routes = [
  { path: PATHS.HOME, element: <Home /> },
  { path: PATHS.ABOUT, element: <About /> },
  { path: `${PATHS.EVENTS}/*`, element: <Events /> },
  { path: PATHS.GALLERY, element: <Gallery /> },
  { path: PATHS.FAVORITES, element: <FavoritesPage /> },
  { path: PATHS.FEEDBACK, element: <Feedback /> },
  { path: PATHS.CONTACT, element: <Contact /> },
  { path: PATHS.CALENDAR, element: <Calendar /> },
  { path: PATHS.REGISTER, element: <Register /> },
  { path: '*', element: <NotFound /> },
];

export default routes;
