// src/App.js
import { useRoutes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // ← إن وُجد
import routes from './routes'; // ✅ استيراد المسارات الموحدة

export default function App() {
  const element = useRoutes(routes); // ✅ React Router يعرض الصفحة المناسبة

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-fill py-4">
        {element} {/* ✅ هنا يتم عرض الصفحة الحالية */}
      </main>
      <Footer /> {/* ← إن وُجد */}
    </div>
  );
}