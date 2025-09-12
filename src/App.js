import { useRoutes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import routes from "./routes";

export default function App() {
  const element = useRoutes(routes);

  return (
    <>
      <div style={{ position: 'relative', zIndex: 99999 }}>
        <Navbar />
      </div>

      <div className="d-flex flex-column min-vh-100">
        <main
          className="flex-fill"
          style={{
            paddingTop: "72px",
            paddingBottom: "60px",
          }}
        >
          <div
            className="container hide-scrollbar"
            style={{
              overflowY: "auto",
              height: "100%",
              padding: "0 15px",
              paddingBottom: "20px",
            }}
          >
            {element}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}